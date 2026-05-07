import { Star } from "lucide-react";

const testimonials = [
  { name: "Letícia M.", role: "Aniversário de namoro", quote: "Ele chorou. Foi a melhor surpresa que eu já fiz na vida. Valeu cada centavo.", avatar: "LM" },
  { name: "Rafael S.", role: "Pedido de noivado", quote: "Imprimi o QR Code, coloquei numa moldura. Ela escaneou e a página apareceu. Foi mágico.", avatar: "RS" },
  { name: "Camila B.", role: "10 anos de casamento", quote: "10 anos juntos cabem em uma página. Linda, simples, e pra sempre.", avatar: "CB" },
  { name: "Diego A.", role: "Dia dos namorados", quote: "Mandei o link no WhatsApp à meia-noite. Ela me ligou chorando 2 minutos depois.", avatar: "DA" },
  { name: "Júlia F.", role: "Aniversário do marido", quote: "Ele falou que foi o presente mais criativo que já recebeu em 35 anos.", avatar: "JF" },
  { name: "Marcos P.", role: "Pedido de namoro", quote: "Disse sim na hora. A página fez todo o trabalho de declaração por mim.", avatar: "MP" },
  { name: "Beatriz L.", role: "Aniversário de 1 ano", quote: "O contador em tempo real é simplesmente perfeito. Ela ficou olhando os segundos passarem.", avatar: "BL" },
  { name: "Pedro H.", role: "Surpresa pós-briga", quote: "Não tinha palavras para pedir desculpas. A página falou tudo que eu não conseguia.", avatar: "PH" },
  { name: "Aline R.", role: "Bodas de prata", quote: "25 anos. Um link. Um choro coletivo na sala. Obrigada por isso.", avatar: "AR" },
  { name: "Gustavo T.", role: "Dia das mães (esposa)", quote: "Para a mãe dos meus filhos. Ela imprimiu o QR e colou na geladeira.", avatar: "GT" },
];

const Card = ({ t }: { t: typeof testimonials[number] }) => (
  <div className="w-[320px] sm:w-[360px] shrink-0 rounded-3xl border border-border bg-card p-6 shadow-soft">
    <div className="flex items-center gap-1 text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
    <p className="mt-4 text-foreground/80 leading-relaxed text-[15px]">"{t.quote}"</p>
    <div className="mt-5 flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-gradient-rose grid place-items-center text-primary-foreground font-display font-bold text-sm">
        {t.avatar}
      </div>
      <div>
        <div className="font-display font-bold text-sm">{t.name}</div>
        <div className="text-xs text-foreground/55">{t.role}</div>
      </div>
    </div>
  </div>
);

export const TestimonialsSection = () => {
  const loop = [...testimonials, ...testimonials];
  return (
    <section id="testimonials" className="py-20 sm:py-28 overflow-hidden bg-gradient-romance">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">Histórias reais</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
            Quem já fez, <span className="text-gradient-rose italic">se emocionou.</span>
          </h2>
          <div className="mt-5 inline-flex items-center gap-2 text-sm text-foreground/70">
            <div className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span><b>4.9/5</b> · +2.000 casais surpreendidos</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-5 marquee-track">
          {loop.map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
};
