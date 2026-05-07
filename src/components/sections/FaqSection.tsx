import { useI18n } from "@/i18n/I18nContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";

export const FaqSection = () => {
  const { t } = useI18n();
  return (
    <section id="faq" className="py-20 sm:py-28 bg-gradient-romance">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center mb-12">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">{t.faq.kicker}</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
            {t.faq.title} <span className="text-gradient-rose italic">{t.faq.titleEm}</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {t.faqs.map(([q, a], i) => (
            <Reveal key={i} delay={i * 60}>
              <AccordionItem value={`i-${i}`} className="border-none rounded-2xl bg-card/80 backdrop-blur shadow-soft px-6">
                <AccordionTrigger className="py-5 text-left font-display text-base sm:text-lg font-semibold hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-foreground/70 leading-relaxed">{a}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
