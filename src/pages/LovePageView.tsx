import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2, Heart, Music, Share2, QrCode, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLovePages, LovePageRow, resolveImageUrl } from "@/hooks/useLovePages";
import { getTheme } from "@/data/themes";
import { CreativeCounter } from "@/components/CreativeCounter";
import { toast } from "sonner";

const LovePageView = () => {
  const { slug = "" } = useParams();
  const { getBySlug, getImages } = useLovePages();
  const [row, setRow] = useState<LovePageRow | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

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
        const resolved = await Promise.all(imgs.map((i) => resolveImageUrl(i.image_url)));
        setPhotos(resolved);
      } catch {
        setNotFound(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [slug, getBySlug, getImages]);

  // Update document title for SEO
  useEffect(() => {
    if (row) document.title = `${row.title || "Nossa história"} • My Love Page`;
  }, [row]);

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

  const theme = getTheme(row.theme);
  const isDark = theme.vibe === "dark";
  const muted = isDark ? "text-white/55" : "text-black/50";
  const isPremium = row.plan_type === "premium";
  const startDate = row.relationship_date || new Date().toISOString();

  const url = (row.music_url || "").trim();
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  const spTrack = url.match(/open\.spotify\.com\/(?:intl-\w+\/)?track\/([\w]+)/);
  const spOther = url.match(/open\.spotify\.com\/(?:intl-\w+\/)?(album|playlist|episode)\/([\w]+)/);

  const share = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: row.title || "Nossa história", url: shareUrl }); return; } catch {}
    }
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link copiado!");
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} ${theme.font} relative overflow-x-hidden`}>
      {/* Animations */}
      {isPremium && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: 16 }).map((_, i) => (
            <Heart
              key={i}
              className="floating-heart"
              style={{
                left: `${(i * 7) % 100}%`,
                animationDelay: `${(i * 0.7) % 8}s`,
                animationDuration: `${7 + (i % 5)}s`,
                width: 14 + (i % 4) * 4,
                height: 14 + (i % 4) * 4,
                color: theme.accentHex,
                fill: theme.accentHex,
              }}
            />
          ))}
        </div>
      )}
      {theme.id === "estrelas-sonhadoras" && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: 80 }).map((_, i) => (
            <span key={i} className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${(i * 7.3) % 100}%`,
                top: `${(i * 11.7) % 100}%`,
                width: (i % 3) + 1, height: (i % 3) + 1,
                opacity: 0.3 + (i % 5) * 0.12,
                animationDelay: `${(i * 0.2) % 4}s`,
              }} />
          ))}
        </div>
      )}

      {/* Floating share button */}
      <div className="fixed top-4 right-4 z-40 flex gap-2">
        <button onClick={share} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs backdrop-blur ${
          isDark ? "bg-white/10 hover:bg-white/20 text-white border border-white/15" : "bg-black/5 hover:bg-black/10 text-black border border-black/10"
        }`}>
          <Share2 className="h-3.5 w-3.5" /> Compartilhar
        </button>
      </div>

      {/* Hero — fullscreen */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
        <Heart className={`h-12 w-12 heartbeat ${theme.accent}`} style={{ fill: theme.accentHex }} />
        <h1 className="mt-6 font-display font-bold text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight">
          {row.title || "Eu & Você"}
        </h1>
        {row.recipient_name && (
          <p className={`mt-6 text-lg sm:text-xl italic ${theme.accent}`}>♡ {row.recipient_name}</p>
        )}
        <p className={`mt-12 text-xs uppercase tracking-[0.5em] ${muted}`}>role para baixo</p>
        <div className={`mt-3 h-12 w-px ${isDark ? "bg-white/30" : "bg-black/20"} animate-pulse`} />
      </section>

      {/* Counter */}
      <section className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
        <p className={`text-center text-xs uppercase tracking-[0.4em] ${muted} mb-10`}>Nosso tempo</p>
        <CreativeCounter startDate={startDate} themeId={theme.id} accentHex={theme.accentHex} isDark={isDark} />
      </section>

      {/* Photos */}
      {photos.length > 0 && (
        <section className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
          <p className={`text-center text-xs uppercase tracking-[0.4em] ${muted} mb-10`}>Nossos momentos</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {photos.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className={`group relative aspect-square rounded-2xl overflow-hidden ${
                  isDark ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/5"
                }`}
              >
                <img src={src} alt={`Memória ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Message */}
      {row.main_message && (
        <section className="relative z-10 px-6 py-24 max-w-3xl mx-auto text-center">
          <p className="font-display text-2xl sm:text-4xl leading-relaxed italic">
            "{row.main_message}"
          </p>
        </section>
      )}

      {/* Music */}
      {isPremium && url && (
        <section className="relative z-10 px-6 py-16 max-w-2xl mx-auto">
          <p className={`text-center text-xs uppercase tracking-[0.4em] ${muted} mb-6`}>Nossa música</p>
          {yt ? (
            <div className="rounded-2xl overflow-hidden aspect-video">
              <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${yt[1]}`} title="YouTube" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          ) : spTrack ? (
            <div className="rounded-2xl overflow-hidden">
              <iframe className="w-full" style={{ height: 152 }} src={`https://open.spotify.com/embed/track/${spTrack[1]}`} allow="encrypted-media" loading="lazy" />
            </div>
          ) : spOther ? (
            <div className="rounded-2xl overflow-hidden">
              <iframe className="w-full" style={{ height: 232 }} src={`https://open.spotify.com/embed/${spOther[1]}/${spOther[2]}`} allow="encrypted-media" loading="lazy" />
            </div>
          ) : (
            <div className={`flex items-center gap-3 rounded-2xl px-5 py-4 ${isDark ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/5"}`}>
              <div className="h-10 w-10 rounded-full grid place-items-center" style={{ backgroundColor: theme.accentHex }}>
                <Music className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm font-medium truncate">{url}</div>
            </div>
          )}
        </section>
      )}

      {/* Final message */}
      {row.final_message && (
        <section className="relative z-10 px-6 py-20 max-w-2xl mx-auto text-center">
          <p className={`text-lg sm:text-2xl ${theme.accent}`}>— {row.final_message}</p>
        </section>
      )}

      {/* Footer */}
      <footer className="relative z-10 px-6 py-10 text-center">
        <p className={`text-xs ${muted}`}>Feito com ♡ no <a href="/" className="underline hover:opacity-80">My Love Page</a></p>
      </footer>

      {/* Lightbox */}
      {lightbox !== null && photos[lightbox] && (
        <div className="fixed inset-0 z-50 bg-black/95 grid place-items-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white" onClick={() => setLightbox(null)}>
            <X className="h-7 w-7" />
          </button>
          {lightbox > 0 && (
            <button className="absolute left-4 text-white/80 hover:text-white" onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}>
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}
          {lightbox < photos.length - 1 && (
            <button className="absolute right-4 text-white/80 hover:text-white" onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}>
              <ChevronRight className="h-8 w-8" />
            </button>
          )}
          <img src={photos[lightbox]} alt="" className="max-h-[90vh] max-w-[92vw] object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default LovePageView;
