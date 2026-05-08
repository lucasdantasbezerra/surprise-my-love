import { Star } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

const Card = ({ t }: { t: { name: string; role: string; quote: string } }) => (
  <div className="w-[320px] sm:w-[360px] shrink-0 rounded-3xl border border-border bg-card p-6 shadow-soft">
    <div className="flex items-center gap-1 text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
    <p className="mt-4 text-foreground/80 leading-relaxed text-[15px]">"{t.quote}"</p>
    <div className="mt-5 flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-gradient-rose grid place-items-center text-primary-foreground font-display font-bold text-sm">
        {t.name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
      </div>
      <div>
        <div className="font-display font-bold text-sm">{t.name}</div>
        <div className="text-xs text-foreground/55">{t.role}</div>
      </div>
    </div>
  </div>
);

export const TestimonialsSection = () => {
  const { t, ui } = useI18n();
  const items = t.testimonials.items;
  const loop = [...items, ...items, ...items, ...items];
  return (
    <section id="testimonials" className="py-20 sm:py-28 overflow-hidden bg-gradient-romance">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">{ui.testimonials.kicker}</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
            {ui.testimonials.title} <span className="text-gradient-rose italic">{ui.testimonials.titleEm}</span>
          </h2>
          <div className="mt-5 inline-flex items-center gap-2 text-sm text-foreground/70">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span>{ui.testimonials.stats}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-5 marquee-track">
          {loop.map((item, i) => <Card key={i} t={item} />)}
        </div>
      </div>
    </section>
  );
};
