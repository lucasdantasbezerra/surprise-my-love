
-- 1. Make storage buckets private
UPDATE storage.buckets SET public = false WHERE id IN ('love-images','love-music','qr-codes');

-- Add storage RLS for owner read/write on private buckets
DO $$ BEGIN
  -- Owner read
  CREATE POLICY "owner read love-images" ON storage.objects FOR SELECT TO authenticated
    USING (bucket_id = 'love-images' AND auth.uid()::text = (storage.foldername(name))[1]);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "owner write love-images" ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'love-images' AND auth.uid()::text = (storage.foldername(name))[1]);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "owner update love-images" ON storage.objects FOR UPDATE TO authenticated
    USING (bucket_id = 'love-images' AND auth.uid()::text = (storage.foldername(name))[1]);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "owner delete love-images" ON storage.objects FOR DELETE TO authenticated
    USING (bucket_id = 'love-images' AND auth.uid()::text = (storage.foldername(name))[1]);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "owner read love-music" ON storage.objects FOR SELECT TO authenticated
    USING (bucket_id = 'love-music' AND auth.uid()::text = (storage.foldername(name))[1]);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "owner write love-music" ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'love-music' AND auth.uid()::text = (storage.foldername(name))[1]);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "owner update love-music" ON storage.objects FOR UPDATE TO authenticated
    USING (bucket_id = 'love-music' AND auth.uid()::text = (storage.foldername(name))[1]);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "owner delete love-music" ON storage.objects FOR DELETE TO authenticated
    USING (bucket_id = 'love-music' AND auth.uid()::text = (storage.foldername(name))[1]);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "owner read qr-codes" ON storage.objects FOR SELECT TO authenticated
    USING (bucket_id = 'qr-codes' AND auth.uid()::text = (storage.foldername(name))[1]);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "owner write qr-codes" ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'qr-codes' AND auth.uid()::text = (storage.foldername(name))[1]);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. Payments: add CHECK constraint and remove direct insert policy
ALTER TABLE public.payments
  DROP CONSTRAINT IF EXISTS payments_status_check;
ALTER TABLE public.payments
  ADD CONSTRAINT payments_status_check
  CHECK (payment_status IN ('pending','completed','failed','refunded'));

DROP POLICY IF EXISTS "owner insert payments" ON public.payments;
-- (No INSERT policy => only service_role from edge functions can insert)

-- 3. Prevent client-side premium plan upgrades without completed payment
CREATE OR REPLACE FUNCTION public.enforce_plan_type_payment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.plan_type = 'premium' THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.payments
      WHERE user_id = NEW.user_id
        AND plan_type = 'premium'
        AND payment_status = 'completed'
        AND (love_page_id IS NULL OR love_page_id = NEW.id)
    ) THEN
      RAISE EXCEPTION 'Premium plan requires a completed payment';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_plan_type_payment_trg ON public.love_pages;
CREATE TRIGGER enforce_plan_type_payment_trg
BEFORE INSERT OR UPDATE OF plan_type ON public.love_pages
FOR EACH ROW
EXECUTE FUNCTION public.enforce_plan_type_payment();
