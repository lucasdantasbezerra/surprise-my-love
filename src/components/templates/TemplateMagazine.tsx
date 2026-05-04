import { Heart } from "lucide-react";
import { LoveCounter } from "@/components/LoveCounter";
import { PlaylistCard } from "@/components/PlaylistCard";

const tracks = [
  { title: "Lover", artist: "Taylor Swift" },
  { title: "Adore You", artist: "Harry Styles" },
  { title: "Sunflower", artist: "Rex Orange County" },
  { title: "Cherry", artist: "Harry Styles" },
];

export const TemplateMagazine = ({ startDate = "2021-06-12T15:30:00" }: { startDate?: string }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Masthead */}
        <div className="border-y-4 border-foreground py-4 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.3em]">Vol. ∞ · Edição você</span>
          <span className="font-display text-2xl font-black tracking-tight">LOVERSE</span>
          <span className="text-xs uppercase tracking-[0.3em]">{new Date().toLocaleDateString("pt-BR")}</span>
        </div>

        {/* Hero grid */}
        <div className="mt-10 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Manchete · Coração</div>
            <h1 className="mt-4 font-display text-6xl md:text-8xl font-black leading-[0.9] text-balance">
              Você é a melhor <span className="text-primary italic">história</span> que já me aconteceu.
            </h1>
            <p className="mt-6 text-lg text-foreground/70 max-w-lg leading-relaxed">
              Em uma era de pressa e ruído, encontrar você foi como abrir um livro
              num parágrafo perfeito — e nunca mais querer fechá-lo.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="aspect-[4/5] rounded-sm bg-foreground text-background relative overflow-hidden">
              <div className="absolute inset-0 grid place-items-center">
                <Heart className="h-48 w-48 fill-primary text-primary heartbeat" strokeWidth={0} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-[10px] uppercase tracking-[0.3em] text-background/60">Capa</div>
                <div className="font-display text-2xl font-bold">Para você, com amor.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-12 border-y border-foreground/15 py-4 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap font-display text-3xl">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex items-center">
                {["te amo", "minha pessoa", "para sempre", "meu amor", "obrigado por existir"].map((w) => (
                  <span key={w} className="mx-8 flex items-center gap-8">
                    {w} <Heart className="h-5 w-5 fill-primary text-primary" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Counter + Playlist */}
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          <div className="border border-foreground/15 rounded-sm p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Cronômetro do amor</div>
            <h2 className="mt-2 font-display text-3xl font-bold">Cada segundo conta</h2>
            <div className="mt-8">
              <LoveCounter startDate={startDate} />
            </div>
          </div>

          <PlaylistCard tracks={tracks} />
        </div>

        <footer className="mt-16 text-center text-xs uppercase tracking-[0.3em] text-foreground/50">
          Edição limitada · Tiragem: 1 leitor(a) · Você
        </footer>
      </div>
    </div>
  );
};
