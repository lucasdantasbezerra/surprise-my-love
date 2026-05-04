import { Heart } from "lucide-react";
import { LoveCounter } from "@/components/LoveCounter";
import { PlaylistCard } from "@/components/PlaylistCard";
import { FloatingHearts } from "@/components/FloatingHearts";

const tracks = [
  { title: "Stay With Me", artist: "Sam Smith" },
  { title: "Yellow", artist: "Coldplay" },
  { title: "I Will Always Love You", artist: "Whitney Houston" },
  { title: "Falling Like The Stars", artist: "James Arthur" },
];

export const TemplateMidnight = ({ startDate = "2020-12-31T23:59:00" }: { startDate?: string }) => {
  return (
    <div className="relative min-h-screen overflow-hidden text-white" style={{ backgroundColor: "hsl(0 0% 4%)" }}>
      {/* Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, hsl(354 90% 62%), transparent 60%)" }}
      />
      <FloatingHearts count={20} color="fill-primary text-primary" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-4 py-1.5">
          <Heart className="h-3 w-3 fill-primary text-primary heartbeat" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/70">Carta da meia-noite</span>
        </div>

        <h1 className="mt-10 font-display text-6xl sm:text-8xl font-black leading-[0.9] text-balance">
          Em qualquer
          <br />
          <span className="italic font-normal text-primary">universo,</span>
          <br />
          eu te escolho.
        </h1>

        <p className="mt-8 mx-auto max-w-xl text-lg text-white/70 leading-relaxed">
          Se as estrelas se apagassem hoje, ainda seria você quem iluminaria
          a minha noite. Obrigado por existir do meu lado.
        </p>

        <div className="mt-16">
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-5">
            Nosso tempo juntos
          </div>
          <LoveCounter startDate={startDate} variant="dark" />
        </div>

        <div className="mt-16 max-w-md mx-auto text-left">
          <PlaylistCard tracks={tracks} variant="dark" />
        </div>

        <div className="mt-20 flex items-center justify-center gap-4 text-white/30">
          <span className="h-px w-20 bg-white/15" />
          <Heart className="h-4 w-4 fill-primary text-primary" />
          <span className="h-px w-20 bg-white/15" />
        </div>

        <p className="mt-10 font-display italic text-2xl text-white/80">
          Boa noite, meu amor. Sonhe comigo.
        </p>
      </div>
    </div>
  );
};
