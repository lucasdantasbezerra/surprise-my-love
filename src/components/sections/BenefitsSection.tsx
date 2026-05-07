import { Infinity, Zap, ShieldCheck, Smartphone, QrCode, Music2, Heart, Globe2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const benefits = [
  { Icon: Zap, title: "Pronto em 3 minutos", desc: "Personalize, pague e receba o link na hora. Sem espera, sem complicação." },
  { Icon: Infinity, title: "Para sempre seu", desc: "Plano Premium é vitalício. Edite quantas vezes quiser, sem mensalidade." },
  { Icon: QrCode, title: "QR Code personalizado", desc: "Imprima, coloque numa moldura ou caixa de presente. Pronto para emocionar." },
  { Icon: Music2, title: "Trilha sonora do amor", desc: "Música tocando direto na página com Spotify ou YouTube." },
  { Icon: Smartphone, title: "Lindo em qualquer tela", desc: "Celular, tablet ou computador — a experiência é sempre impecável." },
  { Icon: ShieldCheck, title: "Garantia de 7 dias", desc: "Não amou? Devolvemos cada centavo. Sem perguntas, sem burocracia." },
  { Icon: Globe2, title: "Compartilhe com o mundo", desc: "Link curto e fácil de mandar no WhatsApp, Instagram ou e-mail." },
  { Icon: Heart, title: "Detalhes que emocionam", desc: "Animações sutis, contador em tempo real e tipografia editorial." },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 sm:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">Por que My Love Page</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
            Feito para quem ama de <span className="text-gradient-rose italic">verdade.</span>
          </h2>
          <p className="mt-5 text-foreground/65 leading-relaxed">
            Cada detalhe foi pensado para transformar uma surpresa simples em uma lembrança eterna.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map(({ Icon, title, desc }, i) => (
            <Reveal key={i} delay={(i % 4) * 80}>
              <div className="group h-full rounded-3xl border border-border bg-card p-6 shadow-soft hover:shadow-rose hover:-translate-y-1 transition-all duration-300">
                <div className="h-11 w-11 rounded-2xl bg-gradient-rose grid place-items-center text-primary-foreground shadow-rose group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
