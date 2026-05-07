import { useI18n } from "@/i18n/I18nContext";
import { THEMES } from "@/data/themes";
import { Heart } from "lucide-react";

interface Props {
  selected: string;
  onSelect: (id: string) => void;
}

export const ThemesSection = ({ selected, onSelect }: Props) => {
  const { t, lang } = useI18n();

  return (
    <section id="themes" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-romance opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">{t.themes.kicker}</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
            {t.themes.title} <span className="text-gradient-rose italic">{t.themes.titleEm}</span>
          </h2>
          <p className="mt-4 text-foreground/65">{t.themes.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {THEMES.map((theme) => {
            const isSelected = selected === theme.id;
            const isDark = theme.vibe === "dark";
            return (
              <button
                key={theme.id}
                onClick={() => onSelect(theme.id)}
                className={`group text-left rounded-3xl border-2 transition-all hover:-translate-y-1 ${
                  isSelected ? "border-primary shadow-rose" : "border-transparent shadow-soft hover:border-primary/30"
                }`}
              >
                <div className={`relative aspect-[4/5] rounded-3xl overflow-hidden ${theme.bg} ${theme.text} ${theme.font}`}>
                  {theme.id === "midnight" && (
                    <div className="absolute inset-0">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <span key={i} className="absolute rounded-full bg-white" style={{
                          left: `${(i * 13) % 100}%`, top: `${(i * 17) % 100}%`,
                          width: (i % 2) + 1, height: (i % 2) + 1, opacity: 0.4 + (i % 3) * 0.2,
                        }} />
                      ))}
                    </div>
                  )}
                  <div className="relative h-full w-full p-6 flex flex-col items-center justify-center text-center">
                    <Heart className={`h-7 w-7 heartbeat ${theme.accent}`} style={{ fill: theme.accentHex }} />
                    <h3 className="mt-4 font-bold text-2xl leading-tight">
                      Eu te amo<br />
                      <span className={`italic ${theme.accent}`}>infinitamente</span>
                    </h3>
                    <div className="mt-5 grid grid-cols-3 gap-2 w-full">
                      {Array.from({ length: 3 }).map((_, k) => (
                        <div key={k} className={`aspect-square rounded-md ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                      ))}
                    </div>
                    <div className={`mt-4 text-[10px] uppercase tracking-[0.25em] opacity-60`}>2y · 4m · 12d</div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-3 right-3 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold px-3 py-1 uppercase tracking-wider">
                      ✓
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2 gap-3">
                    <h4 className="font-display font-bold text-lg">{theme.name}</h4>
                    <div className="flex gap-1">
                      {theme.swatches.map((c, k) => (
                        <span key={k} className={`h-3 w-3 rounded-full border border-foreground/10 ${c}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">{theme.description[lang] || theme.description.en}</p>
                  <div className={`mt-4 inline-flex items-center text-xs font-semibold ${
                    isSelected ? "text-primary" : "text-foreground/70 group-hover:text-primary"
                  } transition-colors`}>
                    {t.themes.choose} →
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
