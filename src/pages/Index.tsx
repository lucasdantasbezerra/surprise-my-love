import { Heart, ArrowRight, Sparkles, Music, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { FloatingHearts } from "@/components/FloatingHearts";

const templates = [
  {
    slug: "classico",
    name: "Carta Eterna",
    tag: "Clássico minimalista",
    desc: "Uma página etérea como uma carta de amor — palavras grandes, espaço para respirar, e um coração que pulsa por você.",
    palette: ["bg-background", "bg-primary", "bg-foreground"],
  },
  {
    slug: "revista",
    name: "Edição Especial",
    tag: "Estilo revista editorial",
    desc: "Manchetes ousadas, capa de revista e marquee romântico. Uma declaração que parece publicada só pra ela(e).",
    palette: ["bg-background", "bg-primary", "bg-foreground"],
  },
  {
    slug: "meia-noite",
    name: "Meia-Noite",
    tag: "Dramático & íntimo",
    desc: "Fundo escuro, brilho vermelho e corações flutuantes. Para enviar quando o mundo dormir e só vocês dois ficarem acordados.",
    palette: ["bg-foreground", "bg-primary", "bg-background"],
  },
];

const features = [
  { icon: Clock, title: "Contador ao vivo", desc: "Anos, dias, horas, minutos e segundos juntos — em tempo real." },
  { icon: Music, title: "Playlist romântica", desc: "Suas músicas em destaque com player visual elegante." },
  { icon: Heart, title: "Design apaixonado", desc: "Tipografia editorial, animações sutis, vermelho vibrante." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-foreground/5">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 fill-primary text-primary heartbeat" />
            <span className="font-display text-xl font-bold tracking-tight">Loverse</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
            <a href="#templates" className="story-link">Templates</a>
            <a href="#como-funciona" className="story-link">Como funciona</a>
          </nav>
          <a
            href="#templates"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:scale-105 transition-transform"
          >
            Criar surpresa <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <FloatingHearts count={10} />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/60 px-4 py-1.5 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-foreground/70">
              Surpresas que ficam para sempre
            </span>
          </div>

          <h1 className="mt-8 font-display text-6xl sm:text-7xl md:text-[8rem] font-black leading-[0.9] text-balance">
            Diga <span className="italic font-normal text-primary">eu te amo</span>
            <br />
            de um jeito
            <br />
            inesquecível.
          </h1>

          <p className="mt-10 mx-auto max-w-2xl text-lg sm:text-xl text-foreground/65 leading-relaxed">
            Crie uma página de surpresa única para o seu amor. Escolha um template,
            personalize a mensagem, e envie um link que vai marcar o dia dela(e) para sempre.
          </p>

          <div className="mt-12 flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#templates"
              className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-medium shadow-[var(--shadow-heart)] hover:scale-105 transition-transform"
            >
              Escolher template
              <Heart className="h-4 w-4 fill-current group-hover:scale-125 transition-transform" />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-8 py-4 text-base font-medium hover:bg-foreground/5 transition-colors"
            >
              Como funciona
            </a>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="border-t border-foreground/10 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">Galeria</div>
              <h2 className="mt-3 font-display text-4xl sm:text-6xl font-black tracking-tight text-balance">
                Templates feitos com <span className="italic text-primary">coração.</span>
              </h2>
            </div>
            <p className="max-w-md text-foreground/60 leading-relaxed">
              Três estilos diferentes, todos com contador de tempo juntos e playlist personalizada.
              Clique para ver o template completo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {templates.map((t, i) => (
              <Link
                key={t.slug}
                to={`/template/${t.slug}`}
                className="group relative rounded-2xl border border-foreground/10 bg-card overflow-hidden hover:border-primary/40 transition-all hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Preview */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  {t.slug === "classico" && (
                    <div className="absolute inset-0 bg-background p-6 flex flex-col justify-center items-center text-center">
                      <Heart className="h-8 w-8 fill-primary text-primary mb-4 heartbeat" />
                      <div className="font-display text-3xl font-black leading-tight">
                        Eu te amo,
                        <br />
                        <span className="italic font-normal text-primary">infinitamente.</span>
                      </div>
                      <div className="mt-6 grid grid-cols-5 gap-1.5 w-full">
                        {[2, 14, 7, 32, 18].map((n, k) => (
                          <div key={k} className="text-center">
                            <div className="font-display font-bold text-sm">{String(n).padStart(2, "0")}</div>
                            <div className="text-[8px] uppercase tracking-wider text-foreground/40">·</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {t.slug === "revista" && (
                    <div className="absolute inset-0 bg-background p-5 flex flex-col">
                      <div className="border-y-2 border-foreground py-1.5 flex items-center justify-between text-[8px] uppercase tracking-widest">
                        <span>Vol. ∞</span>
                        <span className="font-display font-black text-base tracking-tight">LOVERSE</span>
                        <span>Hoje</span>
                      </div>
                      <div className="flex-1 grid grid-cols-5 gap-3 mt-4">
                        <div className="col-span-3">
                          <div className="text-[8px] uppercase tracking-widest text-primary font-bold">Manchete</div>
                          <div className="mt-1 font-display text-2xl font-black leading-[0.95]">
                            A melhor <span className="italic text-primary">história</span>.
                          </div>
                        </div>
                        <div className="col-span-2 bg-foreground rounded-sm grid place-items-center">
                          <Heart className="h-12 w-12 fill-primary text-primary" strokeWidth={0} />
                        </div>
                      </div>
                      <div className="mt-3 border-y border-foreground/20 py-2 overflow-hidden">
                        <div className="font-display text-sm whitespace-nowrap text-foreground/70">
                          te amo · meu amor · para sempre · te amo
                        </div>
                      </div>
                    </div>
                  )}
                  {t.slug === "meia-noite" && (
                    <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center text-white" style={{ backgroundColor: "hsl(0 0% 4%)" }}>
                      <div
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full blur-2xl opacity-50"
                        style={{ background: "hsl(354 90% 62%)" }}
                      />
                      <div className="relative">
                        <Heart className="h-7 w-7 fill-primary text-primary mx-auto mb-3 heartbeat" />
                        <div className="font-display text-2xl font-black leading-tight">
                          Em qualquer
                          <br />
                          <span className="italic font-normal text-primary">universo,</span>
                          <br />
                          eu te escolho.
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity grid place-items-end p-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
                      Ver template <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="font-display text-2xl font-bold">{t.name}</h3>
                    <div className="flex gap-1">
                      {t.palette.map((c, k) => (
                        <span key={k} className={`h-3 w-3 rounded-full border border-foreground/10 ${c}`} />
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">{t.tag}</div>
                  <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Como funciona */}
      <section id="como-funciona" className="border-t border-foreground/10 py-24 bg-foreground text-background">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">Como funciona</div>
            <h2 className="mt-3 font-display text-4xl sm:text-6xl font-black tracking-tight text-balance">
              Três passos. Uma <span className="italic text-primary">surpresa.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={f.title} className="relative">
                <div className="text-7xl font-display font-black text-primary/20 leading-none">
                  0{i + 1}
                </div>
                <div className="mt-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground -mt-8 ml-2 relative">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{f.title}</h3>
                <p className="mt-2 text-background/65 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <Heart className="h-10 w-10 fill-primary text-primary mx-auto heartbeat" />
          <h2 className="mt-6 font-display text-5xl sm:text-7xl font-black leading-[0.95] text-balance">
            Pronto para fazer
            <br />
            o coração dela(e) <span className="italic text-primary">acelerar?</span>
          </h2>
          <a
            href="#templates"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-medium shadow-[var(--shadow-heart)] hover:scale-105 transition-transform"
          >
            Escolher meu template
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-foreground/10 py-8 text-center text-xs uppercase tracking-[0.3em] text-foreground/50">
        Loverse · feito com <Heart className="inline h-3 w-3 fill-primary text-primary" /> para você
      </footer>
    </div>
  );
};

export default Index;
