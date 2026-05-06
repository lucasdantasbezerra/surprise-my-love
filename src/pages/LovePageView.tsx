import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2, Heart } from "lucide-react";
import { MiniSitePreview, MiniSiteData } from "@/components/MiniSitePreview";
import { useLovePages, LovePageRow, resolveImageUrl } from "@/hooks/useLovePages";

const LovePageView = () => {
  const { slug = "" } = useParams();
  const { getBySlug, getImages } = useLovePages();
  const [row, setRow] = useState<LovePageRow | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await getBySlug(slug);
        if (!alive) return;
        if (!r) { setNotFound(true); setLoading(false); return; }
        if (r.expires_at && new Date(r.expires_at) < new Date()) {
          setNotFound(true); setLoading(false); return;
        }
        const imgs = await getImages(r.id);
        if (!alive) return;
        setRow(r);
        setPhotos(imgs.map((i) => i.image_url));
      } catch {
        setNotFound(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [slug, getBySlug, getImages]);

  if (loading) {
    return <div className="min-h-screen grid place-items-center bg-background"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  if (notFound || !row) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-romance text-center px-6">
        <div>
          <Heart className="h-10 w-10 mx-auto fill-primary text-primary heartbeat" />
          <h1 className="mt-4 font-display text-3xl font-bold">Página não encontrada</h1>
          <p className="mt-2 text-foreground/60">Esta página pode ter expirado ou não existe mais.</p>
        </div>
      </div>
    );
  }

  const data: MiniSiteData = {
    themeId: row.theme,
    title: row.title || "",
    honoree: row.recipient_name || "",
    startDate: row.relationship_date || new Date().toISOString(),
    message: row.main_message || "",
    finalMessage: row.final_message || "",
    photos,
    music: row.music_url || "",
    hasMusic: row.plan_type === "premium" && !!row.music_url,
    hasAnimations: row.plan_type === "premium",
  };

  return (
    <div className="min-h-screen bg-gradient-romance py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <MiniSitePreview data={data} />
      </div>
    </div>
  );
};

export default LovePageView;
