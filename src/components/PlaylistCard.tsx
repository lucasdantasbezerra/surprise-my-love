import { Heart, Pause, Play } from "lucide-react";
import { useState } from "react";

interface Track { title: string; artist: string; }

export const PlaylistCard = ({
  tracks,
  variant = "light",
}: {
  tracks: Track[];
  variant?: "light" | "dark";
}) => {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  const isDark = variant === "dark";
  const cardBg = isDark ? "bg-white/5 border-white/10" : "bg-card border-foreground/10";
  const textMain = isDark ? "text-white" : "text-foreground";
  const textMuted = isDark ? "text-white/60" : "text-foreground/55";

  return (
    <div className={`rounded-2xl border ${cardBg} backdrop-blur-sm p-5 sm:p-6`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center heartbeat">
          <Heart className="h-5 w-5 fill-current" />
        </div>
        <div>
          <div className={`font-display text-lg ${textMain}`}>Nossa playlist</div>
          <div className={`text-xs uppercase tracking-widest ${textMuted}`}>{tracks.length} músicas</div>
        </div>
      </div>
      <ul className="space-y-1">
        {tracks.map((t, i) => {
          const playing = playingIdx === i;
          return (
            <li key={i}>
              <button
                onClick={() => setPlayingIdx(playing ? null : i)}
                className={`group w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  isDark ? "hover:bg-white/10" : "hover:bg-foreground/5"
                }`}
              >
                <span
                  className={`h-8 w-8 rounded-full grid place-items-center transition-all ${
                    playing
                      ? "bg-primary text-primary-foreground scale-110"
                      : isDark
                      ? "bg-white/10 text-white/70 group-hover:bg-primary group-hover:text-primary-foreground"
                      : "bg-foreground/5 text-foreground/60 group-hover:bg-primary group-hover:text-primary-foreground"
                  }`}
                >
                  {playing ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current ml-0.5" />}
                </span>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${textMain}`}>{t.title}</div>
                  <div className={`text-xs truncate ${textMuted}`}>{t.artist}</div>
                </div>
                {playing && (
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-0.5 bg-primary animate-pulse" style={{ height: "60%" }} />
                    <span className="w-0.5 bg-primary animate-pulse" style={{ height: "100%", animationDelay: "0.15s" }} />
                    <span className="w-0.5 bg-primary animate-pulse" style={{ height: "40%", animationDelay: "0.3s" }} />
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
