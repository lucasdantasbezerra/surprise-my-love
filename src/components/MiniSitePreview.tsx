import { useI18n } from "@/i18n/I18nContext";
import { LoveCounter } from "./LoveCounter";
import { getTheme } from "@/data/themes";
import { Heart, Music, Share2, QrCode } from "lucide-react";

interface MiniSiteData {
  themeId: string;
  title: string;
  honoree: string;
  startDate: string;
  message: string;
  finalMessage?: string;
  photos: string[]; // urls
  music?: string;
  hasMusic?: boolean;
  hasAnimations?: boolean;
}

export const MiniSitePreview = ({ data, compact = false }: { data: MiniSiteData; compact?: boolean }) => {
  const { t, ui } = useI18n();
  const theme = getTheme(data.themeId);
  const isDark = theme.vibe === "dark";
  const muted = isDark ? "text-white/55" : "text-black/50";

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border ${isDark ? "border-white/10" : "border-black/5"} ${theme.bg} ${theme.text} ${theme.font}`}
    >
      {data.hasAnimations && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <Heart
              key={i}
              className="floating-heart"
              style={{
                left: `${(i * 13) % 100}%`,
                animationDelay: `${(i * 0.8) % 6}s`,
                animationDuration: `${6 + (i % 4)}s`,
                width: 14 + (i % 3) * 4,
                height: 14 + (i % 3) * 4,
                color: theme.accentHex,
                fill: theme.accentHex,
              }}
            />
          ))}
        </div>
      )}
      {theme.id === "midnight" && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${(i * 7.3) % 100}%`,
                top: `${(i * 11.7) % 100}%`,
                width: (i % 3) + 1,
                height: (i % 3) + 1,
                opacity: 0.4 + (i % 5) * 0.1,
              }}
            />
          ))}
        </div>
      )}

      <div className={`relative px-5 sm:px-8 ${compact ? "py-6 sm:py-8" : "py-10 sm:py-14"}`}>
        <div className="text-center">
          <Heart className={`h-6 w-6 mx-auto heartbeat ${theme.accent}`} style={{ fill: theme.accentHex }} />
          <h3 className={`mt-3 font-bold ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-5xl"} leading-tight`}>
            {data.title || "Eu & Você"}
          </h3>
          {data.honoree && (
            <p className={`mt-2 italic ${compact ? "text-sm" : "text-base"} ${theme.accent}`}>
              ♡ {data.honoree}
            </p>
          )}
        </div>

        {/* Photos */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(data.photos.length > 0 ? data.photos : Array.from({ length: 4 }).map(() => "")).slice(0, 4).map((src, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl overflow-hidden ${
                isDark ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/5"
              } grid place-items-center`}
            >
              {src ? (
                <img src={src} alt="" className="h-full w-full object-cover" />
              ) : (
                <Heart className={`h-6 w-6 opacity-30 ${theme.accent}`} />
              )}
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="mt-6">
          <p className={`text-center text-xs uppercase tracking-[0.3em] ${muted}`}>{t.together}</p>
          <div className="mt-3">
            <LoveCounter
              startDate={data.startDate}
              size={compact ? "sm" : "md"}
              accentClass={theme.accent}
              textClass={theme.text}
              mutedClass={muted}
            />
          </div>
        </div>

        {/* Message */}
        {data.message && (
          <p className={`mt-6 text-center ${compact ? "text-sm" : "text-base sm:text-lg"} leading-relaxed italic`}>
            "{data.message}"
          </p>
        )}

        {/* Music */}
        {data.hasMusic && data.music && (() => {
          const url = data.music.trim();
          const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
          const spTrack = url.match(/open\.spotify\.com\/(?:intl-\w+\/)?track\/([\w]+)/);
          const spOther = url.match(/open\.spotify\.com\/(?:intl-\w+\/)?(album|playlist|episode)\/([\w]+)/);
          if (yt) {
            return (
              <div className="mt-5 rounded-2xl overflow-hidden aspect-video">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${yt[1]}?autoplay=0`} title="YouTube" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            );
          }
          if (spTrack) {
            return (
              <div className="mt-5 rounded-2xl overflow-hidden">
                <iframe className="w-full" style={{ height: 152 }} src={`https://open.spotify.com/embed/track/${spTrack[1]}`} allow="encrypted-media" loading="lazy" />
              </div>
            );
          }
          if (spOther) {
            return (
              <div className="mt-5 rounded-2xl overflow-hidden">
                <iframe className="w-full" style={{ height: 232 }} src={`https://open.spotify.com/embed/${spOther[1]}/${spOther[2]}`} allow="encrypted-media" loading="lazy" />
              </div>
            );
          }
          return (
            <div className={`mt-5 flex items-center gap-3 rounded-2xl px-4 py-3 ${
              isDark ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/5"
            }`}>
              <div className="h-9 w-9 rounded-full grid place-items-center" style={{ backgroundColor: theme.accentHex }}>
                <Music className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs uppercase tracking-widest ${muted}`}>{ui.miniSite.ourSong}</div>
                <div className={`text-sm font-medium truncate ${theme.text}`}>{data.music}</div>
              </div>
            </div>
          );
        })()}

        {data.finalMessage && (
          <p className={`mt-4 text-center text-sm sm:text-base ${theme.accent}`}>
            — {data.finalMessage}
          </p>
        )}

        {!compact && (
          <div className="mt-7 flex items-center justify-center gap-3">
            <button className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs ${
              isDark ? "bg-white/10 hover:bg-white/15 text-white" : "bg-black/5 hover:bg-black/10 text-black"
            }`}>
              <Share2 className="h-3.5 w-3.5" /> {t.share}
            </button>
            <button className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs ${
              isDark ? "bg-white/10 hover:bg-white/15 text-white" : "bg-black/5 hover:bg-black/10 text-black"
            }`}>
              <QrCode className="h-3.5 w-3.5" /> QR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export type { MiniSiteData };
