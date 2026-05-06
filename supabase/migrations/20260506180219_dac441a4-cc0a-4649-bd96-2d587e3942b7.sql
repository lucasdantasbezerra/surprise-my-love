
DO $$ BEGIN
  CREATE POLICY "public read love-images of published pages" ON storage.objects FOR SELECT TO anon, authenticated
    USING (
      bucket_id = 'love-images'
      AND EXISTS (
        SELECT 1 FROM public.love_pages lp
        WHERE lp.is_published = true
          AND lp.id::text = (storage.foldername(name))[2]
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "public read love-music of published pages" ON storage.objects FOR SELECT TO anon, authenticated
    USING (
      bucket_id = 'love-music'
      AND EXISTS (
        SELECT 1 FROM public.love_pages lp
        WHERE lp.is_published = true
          AND lp.id::text = (storage.foldername(name))[2]
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
