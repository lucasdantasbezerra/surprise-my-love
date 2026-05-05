import { useI18n } from "@/i18n/I18nContext";
import { Check, X, Sparkles } from "lucide-react";

interface Props {
  prices: { basic: string; premium: string };
  onSelect: (plan: "basic" | "premium") => void;
}

export const PlansSection = ({ prices, onSelect }: Props) => {
  const { t } = useI18n();

  return (
    <section id="plans" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">{t.plans.kicker}</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
            {t.plans.title} <span className="text-gradient-rose italic">{t.plans.titleEm}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Basic */}
          <div className="relative rounded-3xl border-2 border-border bg-card p-8 shadow-soft">
            <h3 className="font-display text-2xl font-bold">{t.plans.basic}</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold">{prices.basic}</span>
            </div>
            <p className="mt-1 text-sm text-foreground/60">{t.plans.perOnce}</p>
            <ul className="mt-6 space-y-3">
              {t.plans.basicFeats.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
              {t.plans.basicNo.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground/40">
                  <X className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelect("basic")}
              className="mt-7 w-full rounded-xl border-2 border-foreground text-foreground py-3.5 font-semibold hover:bg-foreground hover:text-background transition-colors"
            >
              {t.plans.chooseB}
            </button>
          </div>

          {/* Premium */}
          <div className="relative rounded-3xl bg-gradient-to-br from-foreground via-foreground to-primary/80 text-background p-8 shadow-rose overflow-hidden">
            <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/40 blur-3xl" />
            <div className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="h-3 w-3" /> {t.plans.popular}
            </div>
            <div className="relative">
              <h3 className="font-display text-2xl font-bold">{t.plans.premium}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold">{prices.premium}</span>
              </div>
              <p className="mt-1 text-sm text-background/70">{t.plans.perOnce}</p>
              <ul className="mt-6 space-y-3">
                {t.plans.premiumFeats.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary-foreground bg-primary rounded-full p-0.5 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSelect("premium")}
                className="mt-7 w-full rounded-xl bg-background text-foreground py-3.5 font-semibold hover:scale-[1.02] transition-transform"
              >
                {t.plans.chooseP}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
