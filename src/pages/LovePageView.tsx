import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2, Heart, Music, Share2, X, ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import { useLovePages, LovePageRow, resolveImageUrl } from "@/hooks/useLovePages";
import { getTheme } from "@/data/themes";
import { CreativeCounter } from "@/components/CreativeCounter";
import { toast } from "sonner";
import { useI18n } from "@/i18n/I18nContext";

const LovePageView = () => {
  const { ui } = useI18n();
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

  useEffect(() => {
    if (row) document.title = `${row.title || ui.view.ourStory} • My Love Page`;
  }, [row, ui]);

  if (loading) {
    return <div className="min-h-screen grid place-items-center bg-background"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  if (notFound || !row) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-romance text-center px-6">
        <div>
          <Heart className="h-10 w-10 mx-auto fill-primary text-primary heartbeat" />
          <h1 className="mt-4 font-display text-3xl font-bold">{ui.view.notFoundTitle}</h1>
          <p className="mt-2 text-foreground/60">{ui.view.notFoundSub}</p>
        </div>
      </div>
    );
  }

  const theme = getTheme(row.theme);
  const isDark = theme.vibe === "dark";
  const muted = isDark ? "text-white/55" : "text-black/50";
  const subtle = isDark ? "text-white/70" : "text-black/65";
  const hairline = isDark ? "border-white/15" : "border-black/15";
  const hairlineSoft = isDark ? "border-white/10" : "border-black/10";
  const surface = isDark ? "bg-white/[0.04]" : "bg-black/[0.03]";
  const isPremium = row.plan_type === "premium";
  const startDate = row.relationship_date || new Date().toISOString();

  const url = (row.music_url || "").trim();
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  const spTrack = url.match(/open\.spotify\.com\/(?:intl-\w+\/)?track\/([\w]+)/);
  const spOther = url.match(/open\.spotify\.com\/(?:intl-\w+\/)?(album|playlist|episode)\/([\w]+)/);

  const share = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: row.title || ui.view.ourStory, url: shareUrl }); return; } catch {}
    }
    await navigator.clipboard.writeText(shareUrl);
    toast.success(ui.view.linkCopied);
  };

  const startD = new Date(startDate);
  const issueLabel = `${ui.view.issuePrefix} ${startD.getFullYear()} · ${ui.view.issueNo} ${String(startD.getMonth() + 1).padStart(2, "0")}`;

  const chapters: { n: string; title: string; show: boolean }[] = [
    { n: "I", title: ui.view.chapter1, show: true },
    { n: "II", title: ui.view.chapter2, show: photos.length > 0 },
    { n: "III", title: ui.view.chapter3, show: !!row.main_message },
    { n: "IV", title: ui.view.chapter4, show: isPremium && !!url },
  ].filter((c) => c.show);

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} ${theme.font} relative overflow-x-hidden`}>
      {/* Floating hearts (premium) */}
      {isPremium && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: 14 }).map((_, i) => (
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
      {theme.id === "midnight" && (
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

      {/* Top editorial bar */}
      <header className={`fixed top-0 inset-x-0 z-40 backdrop-blur-md border-b ${hairlineSoft} ${
        isDark ? "bg-black/30" : "bg-white/50"
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.35em]">
          <div className="flex items-center gap-3 min-w-0">
            <Heart className={`h-3.5 w-3.5 ${theme.accent} shrink-0`} style={{ fill: theme.accentHex }} />
            <span className={`${muted} truncate`}>{issueLabel}</span>
          </div>
          <div className={`hidden md:block ${muted} truncate`}>{row.title || ui.view.ourStory}</div>
          <button
            onClick={share}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 border ${hairline} hover:opacity-80 transition`}
          >
            <Share2 className="h-3 w-3" /> <span className="hidden sm:inline">{ui.view.share}</span>
          </button>
        </div>
      </header>

      {/* COVER — editorial magazine */}
      <section className="relative z-10 min-h-screen pt-24 pb-16 px-5 sm:px-8 flex flex-col">
        <div className="max-w-7xl w-full mx-auto flex-1 grid lg:grid-cols-12 gap-10 items-center">
          {/* Left rail — meta */}
          <div className="lg:col-span-3 order-2 lg:order-1 space-y-8">
            <div>
              <div className={`text-[10px] uppercase tracking-[0.4em] ${muted}`}>{ui.view.edition}</div>
              <div className="mt-1 font-display text-3xl">{startD.getFullYear()}</div>
            </div>
            <div className={`h-px w-16 ${isDark ? "bg-white/30" : "bg-black/25"}`} />
            <div>
              <div className={`text-[10px] uppercase tracking-[0.4em] ${muted}`}>{ui.view.chapters}</div>
              <ol className="mt-3 space-y-2">
                {chapters.map((c) => (
                  <li key={c.n} className="flex items-baseline gap-3 text-sm">
                    <span className={`font-display text-base ${theme.accent}`}>{c.n}</span>
                    <span className={subtle}>{c.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Center — title block */}
          <div className="lg:col-span-6 order-1 lg:order-2 text-center">
            <div className={`inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] ${muted}`}>
              <span className={`h-px w-8 ${isDark ? "bg-white/40" : "bg-black/30"}`} />
              {ui.view.aLoveStory}
              <span className={`h-px w-8 ${isDark ? "bg-white/40" : "bg-black/30"}`} />
            </div>

            <h1 className="mt-8 font-display font-bold text-6xl sm:text-8xl md:text-[9rem] leading-[0.85] tracking-tight">
              {(row.title || ui.view.youAndMe).split(/\s*&\s*|\s+e\s+|\s+and\s+|\s+y\s+|\s+et\s+|\s+e\s+/i).map((part, i, arr) => (
                <span key={i} className="block">
                  {i === 1 && <span className={`italic font-normal ${theme.accent}`}>&nbsp;&&nbsp;</span>}
                  <span className={i === 1 ? "italic" : ""}>{part}</span>
                </span>
              ))}
            </h1>

            {row.recipient_name && (
              <p className={`mt-10 text-base sm:text-lg ${subtle}`}>
                <span className={`text-[10px] uppercase tracking-[0.4em] ${muted} block mb-2`}>{ui.view.dedicatedTo}</span>
                <span className={`font-display text-2xl sm:text-3xl ${theme.accent}`}>♡ {row.recipient_name}</span>
              </p>
            )}
          </div>

          {/* Right rail — featured photo / monogram */}
          <div className="lg:col-span-3 order-3 hidden lg:block">
            {photos[0] ? (
              <div className="relative">
                <div className={`absolute -inset-2 rounded-2xl ${surface}`} />
                <img src={photos[0]} alt="" className="relative aspect-[3/4] w-full object-cover rounded-xl" />
                <div className={`mt-3 text-[10px] uppercase tracking-[0.3em] ${muted}`}>{ui.view.figCover}</div>
              </div>
            ) : (
              <div className={`aspect-[3/4] w-full rounded-xl border ${hairline} grid place-items-center`}>
                <div className="text-center">
                  <Heart className={`h-12 w-12 mx-auto heartbeat ${theme.accent}`} style={{ fill: theme.accentHex }} />
                  <div className={`mt-3 font-display text-4xl italic ${theme.accent}`}>♡</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer of cover */}
        <div className={`max-w-7xl w-full mx-auto mt-10 flex items-end justify-between gap-6 border-t ${hairlineSoft} pt-5`}>
          <div className={`text-[10px] uppercase tracking-[0.4em] ${muted}`}>{issueLabel}</div>
          <div className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] ${muted}`}>
            <span>{ui.view.continueLabel}</span>
            <ArrowDown className="h-3 w-3 animate-bounce" />
          </div>
          <div className={`text-[10px] uppercase tracking-[0.4em] ${muted}`}>My Love Page</div>
        </div>
      </section>

      {/* CHAPTER I — Counter */}
      <section className="relative z-10 px-5 sm:px-8 py-24 sm:py-32">
        <div className="max-w-5xl mx-auto">
          <ChapterMark n="I" title={ui.view.chapter1} chapterLabel={ui.view.chapters} theme={theme} muted={muted} hairline={hairlineSoft} />
          <div className="mt-12">
            <CreativeCounter startDate={startDate} themeId={theme.id} accentHex={theme.accentHex} isDark={isDark} />
          </div>
        </div>
      </section>

      {/* CHAPTER II — Photos (mosaic) */}
      {photos.length > 0 && (
        <section className="relative z-10 px-5 sm:px-8 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto">
            <ChapterMark n="II" title={ui.view.chapter2} chapterLabel={ui.view.chapters} theme={theme} muted={muted} hairline={hairlineSoft} />
            <div className="mt-12 grid grid-cols-12 auto-rows-[110px] sm:auto-rows-[140px] md:auto-rows-[170px] gap-3 sm:gap-4">
              {photos.map((src, i) => {
                // Editorial mosaic pattern
                const patterns = [
                  "col-span-7 row-span-3",
                  "col-span-5 row-span-2",
                  "col-span-5 row-span-2",
                  "col-span-4 row-span-2",
                  "col-span-4 row-span-3",
                  "col-span-4 row-span-2",
                  "col-span-6 row-span-2",
                  "col-span-6 row-span-2",
                ];
                const cls = patterns[i % patterns.length];
                return (
                  <button
                    key={i}
                    onClick={() => setLightbox(i)}
                    className={`group relative overflow-hidden rounded-xl ${surface} ${cls}`}
                  >
                    <img
                      src={src}
                      alt={`Memória ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute bottom-2 left-2 text-[9px] uppercase tracking-[0.3em] px-2 py-0.5 rounded-full backdrop-blur ${
                      isDark ? "bg-black/40 text-white/80" : "bg-white/70 text-black/70"
                    }`}>
                      fig. {String(i + 1).padStart(2, "0")}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CHAPTER III — Letter */}
      {row.main_message && (
        <section className="relative z-10 px-5 sm:px-8 py-24 sm:py-32">
          <div className="max-w-3xl mx-auto">
            <ChapterMark n="III" title={ui.view.chapter3} chapterLabel={ui.view.chapters} theme={theme} muted={muted} hairline={hairlineSoft} />
            <div className={`mt-12 relative rounded-3xl border ${hairline} ${surface} p-8 sm:p-14`}>
              <span
                className="absolute -top-6 left-8 font-display text-8xl leading-none select-none"
                style={{ color: theme.accentHex, opacity: 0.85 }}
              >
                "
              </span>
              <p className="font-display text-2xl sm:text-3xl md:text-4xl leading-[1.4] italic">
                {row.main_message}
              </p>
              {row.final_message && (
                <p className={`mt-10 text-right text-base sm:text-lg ${theme.accent} italic`}>
                  — {row.final_message}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CHAPTER IV — Music */}
      {isPremium && url && (
        <section className="relative z-10 px-5 sm:px-8 py-24 sm:py-32">
          <div className="max-w-3xl mx-auto">
            <ChapterMark n="IV" title={ui.view.chapter4} chapterLabel={ui.view.chapters} theme={theme} muted={muted} hairline={hairlineSoft} />
            <div className="mt-12">
              {yt ? (
                <div className="rounded-2xl overflow-hidden aspect-video shadow-soft">
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
                <div className={`flex items-center gap-4 rounded-2xl px-6 py-5 border ${hairline} ${surface}`}>
                  <div className="h-12 w-12 rounded-full grid place-items-center shrink-0" style={{ backgroundColor: theme.accentHex }}>
                    <Music className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-sm font-medium truncate">{url}</div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* COLOPHON / Footer */}
      <footer className="relative z-10 px-5 sm:px-8 py-16">
        <div className={`max-w-7xl mx-auto border-t ${hairlineSoft} pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.4em] ${muted}`}>
          <span>{issueLabel}</span>
          <span className="flex items-center gap-2">
            <Heart className={`h-3 w-3 ${theme.accent}`} style={{ fill: theme.accentHex }} />
            {ui.view.madeWithLove} <a href="/" className="underline-offset-4 hover:underline normal-case">My Love Page</a>
          </span>
          <span>{ui.view.end}</span>
        </div>
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
          <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] uppercase tracking-[0.4em] text-white/60">
            fig. {String(lightbox + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </div>
        </div>
      )}
    </div>
  );
};

// Editorial chapter mark
const ChapterMark = ({
  n, title, chapterLabel, theme, muted, hairline,
}: { n: string; title: string; chapterLabel: string; theme: ReturnType<typeof getTheme>; muted: string; hairline: string }) => (
  <div className={`flex items-end justify-between gap-6 border-b ${hairline} pb-5`}>
    <div className="flex items-baseline gap-5">
      <span className={`font-display text-5xl sm:text-6xl ${theme.accent}`} style={{ color: theme.accentHex }}>{n}</span>
      <div>
        <div className={`text-[10px] uppercase tracking-[0.4em] ${muted}`}>{chapterLabel}</div>
        <h2 className="font-display text-2xl sm:text-3xl tracking-tight">{title}</h2>
      </div>
    </div>
    <div className={`hidden sm:block text-[10px] uppercase tracking-[0.4em] ${muted}`}>—</div>
  </div>
);

export default LovePageView;
