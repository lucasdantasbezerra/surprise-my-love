import { Heart } from "lucide-react";
import { LoveCounter } from "@/components/LoveCounter";
import { PlaylistCard } from "@/components/PlaylistCard";
import { FloatingHearts } from "@/components/FloatingHearts";

const tracks = [
  { title: "Make You Feel My Love", artist: "Adele" },
  { title: "Perfect", artist: "Ed Sheeran" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley" },
  { title: "All of Me", artist: "John Legend" },
];

export const TemplateClassic = ({ startDate = "2022-02-14T20:00:00" }: { startDate?: string }) => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <FloatingHearts />

      {/* Top bar */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/60">
          <Heart className="h-3 w-3 fill-primary text-primary" />
          uma carta para você
        </div>
        <div className="text-xs uppercase tracking-[0.3em] text-foreground/60">no.01</div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/60 px-4 py-1.5 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary heartbeat" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-foreground/70">Para a minha pessoa favorita</span>
        </div>

        <h1 className="mt-8 font-display text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95] text-balance">
          Eu te amo,
          <br />
          <span className="italic font-normal text-primary">infinitamente.</span>
        </h1>

        <p className="mt-8 mx-auto max-w-xl text-lg text-foreground/70 leading-relaxed">
          Se eu pudesse escolher de novo, escolheria você. De novo, e de novo, e de novo —
          em todas as versões possíveis dessa vida.
        </p>

        {/* Counter */}
        <div className="mt-16 mx-auto max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.3em] text-foreground/55 mb-5">
            Estamos juntos há
          </div>
          <LoveCounter startDate={startDate} />
        </div>

        {/* Heart divider */}
        <div className="mt-16 flex items-center justify-center gap-4 text-foreground/30">
          <span className="h-px w-16 bg-foreground/15" />
          <Heart className="h-4 w-4 fill-primary text-primary" />
          <span className="h-px w-16 bg-foreground/15" />
        </div>

        {/* Playlist */}
        <div className="mt-16 text-left">
          <PlaylistCard tracks={tracks} />
        </div>

        <p className="mt-16 font-display italic text-xl text-foreground/70">
          — Seu, para sempre.
        </p>
      </main>
    </div>
  );
};
