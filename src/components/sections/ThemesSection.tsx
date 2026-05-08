import { useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { THEMES } from "@/data/themes";
import { Heart, ArrowUpRight, Sparkles, Check } from "lucide-react";

interface Props {
  selected: string;
  onSelect: (id: string) => void;
}

export const ThemesSection = ({ selected, onSelect }: Props) => {
  const { t, lang } = useI18n();
  const [hovered, setHovered] = useState<string | null>(null);
  const activeId = hovered || selected;
  const active = THEMES.find((th) => th.id === activeId) || THEMES[0];
  const isDark = active.vibe === "dark";

  return (
    <section id="themes" className="relative py-24 sm:py-32 overflow-hidden bg-background">
      {/* Editorial backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Editorial header */}
        <div className="grid md:grid-cols-12 gap-6 items-end mb-16">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-primary font-semibold">
              <span className="h-px w-10 bg-primary/60" />
              <span>{t.themes.kicker}</span>
            </div>
            <h2 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-balance leading-[0.95]">
              {t.themes.title}{" "}
              <span className="text-gradient-rose italic">{t.themes.titleEm}</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-8 md:border-l md:border-border">
            <p className="text-foreground/65 text-lg leading-relaxed">{t.themes.sub}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/50">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {THEMES.length.toString().padStart(2, "0")} / {THEMES.length.toString().padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Showcase grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Stage — animated preview card */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="relative">
              {/* Tape decoration */}
              <div className="absolute -top-3 left-12 h-7 w-24 rotate-[-6deg] bg-primary/30 backdrop-blur-sm rounded-sm z-20 hidden md:block" />
              <div className="absolute -top-3 right-16 h-7 w-20 rotate-[8deg] bg-accent/60 backdrop-blur-sm rounded-sm z-20 hidden md:block" />

              <div
                key={active.id}
                className={`relative rounded-[2.5rem] overflow-hidden border border-border shadow-rose transition-all duration-500 animate-fadeInUp ${active.bg} ${active.text} ${active.font}`}
                style={{ aspectRatio: "4/5" }}
              >
                {/* VFX backgrounds */}
                {active.id === "midnight" && (
                  <div className="absolute inset-0">
                    {Array.from({ length: 60 }).map((_, i) => (
                      <span key={i} className="absolute rounded-full bg-white animate-pulse" style={{
                        left: `${(i * 7.3) % 100}%`, top: `${(i * 11.7) % 100}%`,
                        width: (i % 3) + 1, height: (i % 3) + 1,
                        opacity: 0.3 + (i % 5) * 0.12,
                        animationDelay: `${(i * 0.2) % 4}s`,
                      }} />
                    ))}
                  </div>
                )}
                {active.vfx === "hearts" && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <Heart key={i} className="floating-heart" style={{
                        left: `${(i * 13) % 100}%`,
                        animationDelay: `${(i * 0.9) % 6}s`,
                        animationDuration: `${7 + (i % 4)}s`,
                        width: 16 + (i % 3) * 6, height: 16 + (i % 3) * 6,
                        color: active.accentHex, fill: active.accentHex,
                      }} />
                    ))}
                  </div>
                )}

                {/* Frame chrome */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] opacity-60 z-10">
                  <span>{String(THEMES.findIndex((th) => th.id === active.id) + 1).padStart(2, "0")} / {String(THEMES.length).padStart(2, "0")}</span>
                  <span>{active.id}</span>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full w-full px-8 sm:px-14 flex flex-col items-center justify-center text-center">
                  <Heart className={`h-10 w-10 heartbeat ${active.accent}`} style={{ fill: active.accentHex }} />
                  <h3 className="mt-6 font-bold text-4xl sm:text-6xl leading-[0.95] tracking-tight">
                    {active.sample.line1}
                    <br />
                    <span className={`italic ${active.accent}`}>{active.sample.em}</span>
                  </h3>
                  {active.sample.line2 && (
                    <p className={`mt-5 text-sm sm:text-base ${isDark ? "text-white/60" : "text-black/55"}`}>{active.sample.line2}</p>
                  )}

                  {/* Mini gallery */}
                  <div className="mt-10 grid grid-cols-4 gap-2 w-full max-w-xs">
                    {Array.from({ length: 4 }).map((_, k) => (
                      <div key={k} className={`aspect-square rounded-md ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                    ))}
                  </div>

                  <div className={`mt-8 text-[10px] uppercase tracking-[0.4em] ${isDark ? "text-white/55" : "text-black/45"}`}>
                    2y · 4m · 12d
                  </div>
                </div>

                {/* Corner badge */}
                <div className="absolute bottom-5 right-5 z-10">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur"
                    style={{ backgroundColor: active.accentHex, color: "#fff" }}
                  >
                    {active.name}
                  </span>
                </div>
              </div>

              {/* Caption row */}
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-foreground/45">
                    {active.tagline[lang] || active.tagline.en}
                  </div>
                  <p className="mt-2 text-foreground/70 max-w-md leading-relaxed">
                    {active.description[lang] || active.description.en}
                  </p>
                </div>
                <div className="flex gap-1.5 shrink-0 pt-1">
                  {active.swatches.map((c, k) => (
                    <span key={k} className={`h-4 w-4 rounded-full border border-foreground/10 ${c}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Theme list */}
          <div className="lg:col-span-5">
            <ul className="divide-y divide-border border-y border-border">
              {THEMES.map((theme, i) => {
                const isSelected = selected === theme.id;
                const isActive = activeId === theme.id;
                return (
                  <li key={theme.id}>
                    <button
                      onMouseEnter={() => setHovered(theme.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(theme.id)}
                      onBlur={() => setHovered(null)}
                      onClick={() => onSelect(theme.id)}
                      className={`group relative w-full text-left py-5 px-2 sm:px-4 flex items-center gap-5 transition-all ${
                        isActive ? "bg-accent/40" : "hover:bg-accent/25"
                      }`}
                    >
                      <span className={`font-display text-2xl sm:text-3xl tabular-nums w-12 transition-colors ${
                        isActive ? "text-primary" : "text-foreground/30 group-hover:text-foreground/60"
                      }`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className="flex-1 min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="font-display font-bold text-xl sm:text-2xl tracking-tight truncate">
                            {theme.name}
                          </span>
                          {isSelected && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider">
                              <Check className="h-3 w-3" />
                              {t.themes.selected}
                            </span>
                          )}
                        </span>
                        <span className="block text-sm text-foreground/55 mt-0.5 truncate">
                          {theme.tagline[lang] || theme.tagline.en}
                        </span>
                      </span>

                      <span className="hidden sm:flex gap-1 shrink-0">
                        {theme.swatches.map((c, k) => (
                          <span key={k} className={`h-3 w-3 rounded-full border border-foreground/10 ${c}`} />
                        ))}
                      </span>

                      <ArrowUpRight className={`h-5 w-5 shrink-0 transition-all ${
                        isActive ? "text-primary translate-x-0 -translate-y-0 opacity-100"
                                 : "text-foreground/30 -translate-x-1 translate-y-1 opacity-60 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      }`} />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-xs text-foreground/50 leading-relaxed">
                {t.themes.choose} →
              </p>
              <button
                onClick={() => onSelect(activeId)}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-rose hover:opacity-90 transition"
              >
                {t.themes.choose}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
