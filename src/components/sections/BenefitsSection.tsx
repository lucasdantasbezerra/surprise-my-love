import { Infinity, Zap, ShieldCheck, Smartphone, QrCode, Music2, Heart, Globe2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/i18n/I18nContext";

const ICONS = [Zap, Infinity, QrCode, Music2, Smartphone, ShieldCheck, Globe2, Heart];

export const BenefitsSection = () => {
  const { ui } = useI18n();
  return (
    <section id="benefits" className="py-20 sm:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">{ui.benefits.kicker}</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
            {ui.benefits.title} <span className="text-gradient-rose italic">{ui.benefits.titleEm}</span>
          </h2>
          <p className="mt-5 text-foreground/65 leading-relaxed">{ui.benefits.sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ui.benefits.items.map(({ title, desc }, i) => {
            const Icon = ICONS[i] || Heart;
            return (
              <Reveal key={i} delay={(i % 4) * 80}>
                <div className="group h-full rounded-3xl border border-border bg-card p-6 shadow-soft hover:shadow-rose hover:-translate-y-1 transition-all duration-300">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-rose grid place-items-center text-primary-foreground shadow-rose group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
