-- Extend profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS language text DEFAULT 'pt',
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS currency text DEFAULT 'BRL';

-- updated_at trigger on profiles
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Ensure handle_new_user trigger exists on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- love_pages
CREATE TABLE IF NOT EXISTS public.love_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  slug text UNIQUE,
  title text NOT NULL DEFAULT '',
  recipient_name text,
  main_message text,
  final_message text,
  relationship_date timestamptz,
  theme text NOT NULL DEFAULT 'classic',
  plan_type text NOT NULL DEFAULT 'basic' CHECK (plan_type IN ('basic','premium')),
  is_published boolean NOT NULL DEFAULT false,
  expires_at timestamptz,
  music_url text,
  cover_image text,
  qr_code_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_love_pages_user ON public.love_pages(user_id);
CREATE INDEX IF NOT EXISTS idx_love_pages_slug ON public.love_pages(slug);

ALTER TABLE public.love_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner select love_pages" ON public.love_pages
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "public select published love_pages" ON public.love_pages
  FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "owner insert love_pages" ON public.love_pages
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner update love_pages" ON public.love_pages
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner delete love_pages" ON public.love_pages
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS trg_love_pages_updated_at ON public.love_pages;
CREATE TRIGGER trg_love_pages_updated_at
BEFORE UPDATE ON public.love_pages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto expire & plan-based limits via trigger
CREATE OR REPLACE FUNCTION public.set_love_page_defaults()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.plan_type = 'basic' AND NEW.expires_at IS NULL THEN
    NEW.expires_at := now() + interval '1 year';
  ELSIF NEW.plan_type = 'premium' THEN
    NEW.expires_at := NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_love_pages_defaults ON public.love_pages;
CREATE TRIGGER trg_love_pages_defaults
BEFORE INSERT OR UPDATE OF plan_type ON public.love_pages
FOR EACH ROW EXECUTE FUNCTION public.set_love_page_defaults();

-- love_page_images
CREATE TABLE IF NOT EXISTS public.love_page_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  love_page_id uuid NOT NULL REFERENCES public.love_pages(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_love_page_images_page ON public.love_page_images(love_page_id);

ALTER TABLE public.love_page_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner select images" ON public.love_page_images
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.love_pages lp WHERE lp.id = love_page_id AND lp.user_id = auth.uid())
  );
CREATE POLICY "public select images of published" ON public.love_page_images
  FOR SELECT TO anon, authenticated USING (
    EXISTS (SELECT 1 FROM public.love_pages lp WHERE lp.id = love_page_id AND lp.is_published = true)
  );
CREATE POLICY "owner write images" ON public.love_page_images
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.love_pages lp WHERE lp.id = love_page_id AND lp.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.love_pages lp WHERE lp.id = love_page_id AND lp.user_id = auth.uid()));

-- Enforce image limits per plan
CREATE OR REPLACE FUNCTION public.enforce_image_limit()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  v_plan text;
  v_count int;
  v_max int;
BEGIN
  SELECT plan_type INTO v_plan FROM public.love_pages WHERE id = NEW.love_page_id;
  v_max := CASE WHEN v_plan = 'premium' THEN 8 ELSE 4 END;
  SELECT count(*) INTO v_count FROM public.love_page_images WHERE love_page_id = NEW.love_page_id;
  IF v_count >= v_max THEN
    RAISE EXCEPTION 'Image limit reached (% max for % plan)', v_max, v_plan;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_image_limit ON public.love_page_images;
CREATE TRIGGER trg_enforce_image_limit
BEFORE INSERT ON public.love_page_images
FOR EACH ROW EXECUTE FUNCTION public.enforce_image_limit();

-- payments
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  love_page_id uuid REFERENCES public.love_pages(id) ON DELETE SET NULL,
  payment_provider text,
  payment_status text NOT NULL DEFAULT 'pending',
  amount numeric(10,2),
  currency text DEFAULT 'BRL',
  plan_type text NOT NULL DEFAULT 'basic',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner select payments" ON public.payments
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner insert payments" ON public.payments
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('love-images', 'love-images', true),
  ('love-music', 'love-music', true),
  ('qr-codes', 'qr-codes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, user-folder write (folder = auth.uid())
CREATE POLICY "public read love-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'love-images');
CREATE POLICY "user upload love-images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'love-images' AND auth.uid()::text = (storage.foldername(name))[1]
  );
CREATE POLICY "user update love-images" ON storage.objects
  FOR UPDATE TO authenticated USING (
    bucket_id = 'love-images' AND auth.uid()::text = (storage.foldername(name))[1]
  );
CREATE POLICY "user delete love-images" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'love-images' AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "public read love-music" ON storage.objects
  FOR SELECT USING (bucket_id = 'love-music');
CREATE POLICY "user upload love-music" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'love-music' AND auth.uid()::text = (storage.foldername(name))[1]
  );
CREATE POLICY "user update love-music" ON storage.objects
  FOR UPDATE TO authenticated USING (
    bucket_id = 'love-music' AND auth.uid()::text = (storage.foldername(name))[1]
  );
CREATE POLICY "user delete love-music" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'love-music' AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "public read qr-codes" ON storage.objects
  FOR SELECT USING (bucket_id = 'qr-codes');
CREATE POLICY "user upload qr-codes" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'qr-codes' AND auth.uid()::text = (storage.foldername(name))[1]
  );
CREATE POLICY "user update qr-codes" ON storage.objects
  FOR UPDATE TO authenticated USING (
    bucket_id = 'qr-codes' AND auth.uid()::text = (storage.foldername(name))[1]
  );
CREATE POLICY "user delete qr-codes" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'qr-codes' AND auth.uid()::text = (storage.foldername(name))[1]
  );