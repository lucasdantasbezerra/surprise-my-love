export interface ThemeDef {
  id: string;
  name: string;
  tagline: { [key: string]: string };
  description: { [key: string]: string };
  bg: string;
  text: string;
  accent: string;
  accentHex: string;
  font: string;
  swatches: string[];
  vibe: "light" | "dark";
  vfx?: "stars" | "hearts" | "petals" | "sparkles" | "aurora" | "polaroid" | "marquee" | "magazine" | "stream" | "music" | "timeline" | "tube" | "chat" | "minimal";
  sample: { line1: string; em: string; line2?: string };
}

const allLangs = (text: string) => ({
  "pt-BR": text, en: text, es: text, fr: text, it: text, ru: text,
  ja: text, zh: text, hi: text, ar: text, id: text,
});

export const THEMES: ThemeDef[] = [
  {
    id: "stream-love",
    name: "Stream Love",
    tagline: allLangs("Cinema do nosso amor"),
    description: allLangs("Inspirado nas grandes plataformas de streaming. Sua história como série exclusiva — vermelho, preto e telona."),
    bg: "bg-[#0b0b0b]",
    text: "text-white",
    accent: "text-red-500",
    accentHex: "hsl(0 85% 55%)",
    font: "font-display",
    swatches: ["bg-black", "bg-red-600", "bg-neutral-900"],
    vibe: "dark",
    vfx: "stream",
    sample: { line1: "TEMPORADA 1", em: "Eu & Você", line2: "Episódio especial" },
  },
  {
    id: "music-love",
    name: "Music Love",
    tagline: allLangs("Trilha sonora de vocês"),
    description: allLangs("Estilo player de música. Capa, faixas, e a música que toca quando você lembra dela(e)."),
    bg: "bg-[linear-gradient(180deg,_#1a3d2e_0%,_#0a0a0a_100%)]",
    text: "text-white",
    accent: "text-emerald-400",
    accentHex: "hsl(142 70% 55%)",
    font: "font-display",
    swatches: ["bg-emerald-600", "bg-black", "bg-emerald-300"],
    vibe: "dark",
    vfx: "music",
    sample: { line1: "Tocando agora", em: "Nosso amor", line2: "♫ playlist eterna" },
  },
  {
    id: "timeline",
    name: "Timeline",
    tagline: allLangs("Linha do tempo do amor"),
    description: allLangs("Cada momento como um marco. Uma história contada em capítulos — datas, fotos e memórias em ordem."),
    bg: "bg-[#fafaf7]",
    text: "text-neutral-950",
    accent: "text-rose-600",
    accentHex: "hsl(348 78% 48%)",
    font: "font-display",
    swatches: ["bg-neutral-100", "bg-rose-500", "bg-neutral-900"],
    vibe: "light",
    vfx: "timeline",
    sample: { line1: "Capítulo I", em: "O começo", line2: "→ até o infinito" },
  },
  {
    id: "tube",
    name: "Tube",
    tagline: allLangs("Vídeo em destaque"),
    description: allLangs("Layout de vídeo com player gigante. A música/clipe de vocês como protagonista da página."),
    bg: "bg-[#0f0f0f]",
    text: "text-white",
    accent: "text-red-500",
    accentHex: "hsl(0 90% 55%)",
    font: "font-display",
    swatches: ["bg-black", "bg-red-600", "bg-neutral-800"],
    vibe: "dark",
    vfx: "tube",
    sample: { line1: "▶ Tocando", em: "Nossa música", line2: "1.2M visualizações do coração" },
  },
  {
    id: "chat",
    name: "Chat",
    tagline: allLangs("Conversa de amor"),
    description: allLangs("Bolhas de mensagem, online agora, digitando… Como aquele chat que vocês nunca apagam."),
    bg: "bg-[#e9eef3]",
    text: "text-neutral-950",
    accent: "text-blue-600",
    accentHex: "hsl(214 90% 55%)",
    font: "font-sans",
    swatches: ["bg-blue-500", "bg-neutral-100", "bg-emerald-400"],
    vibe: "light",
    vfx: "chat",
    sample: { line1: "online agora", em: "Eu te amo 💙", line2: "digitando…" },
  },
  {
    id: "polaroid",
    name: "Polaroid",
    tagline: allLangs("Memórias de papel"),
    description: allLangs("Fotos como polaroids espalhadas, fita crepe e tipografia manuscrita. Aconchego de álbum antigo."),
    bg: "bg-[#f5efe6]",
    text: "text-stone-900",
    accent: "text-rose-700",
    accentHex: "hsl(348 70% 45%)",
    font: "font-display",
    swatches: ["bg-stone-100", "bg-amber-200", "bg-rose-700"],
    vibe: "light",
    vfx: "polaroid",
    sample: { line1: "Cada foto,", em: "uma promessa." },
  },
  {
    id: "midnight",
    name: "Midnight",
    tagline: allLangs("Romance dramático"),
    description: allLangs("Fundo escuro, brilho rubi, corações flutuantes. Para mensagens que só fazem sentido à meia-noite."),
    bg: "bg-[radial-gradient(ellipse_at_center,_#3a0a1a_0%,_#0a0608_70%)]",
    text: "text-white",
    accent: "text-red-400",
    accentHex: "hsl(0 90% 65%)",
    font: "font-display",
    swatches: ["bg-black", "bg-red-600", "bg-red-300"],
    vibe: "dark",
    vfx: "hearts",
    sample: { line1: "Em qualquer", em: "universo,", line2: "eu te escolho." },
  },
  {
    id: "minimal",
    name: "Minimal",
    tagline: allLangs("Clássico minimalista"),
    description: allLangs("Branco, tipografia editorial e espaço para respirar. Elegância silenciosa para quem ama no detalhe."),
    bg: "bg-white",
    text: "text-neutral-950",
    accent: "text-rose-600",
    accentHex: "hsl(348 78% 48%)",
    font: "font-display",
    swatches: ["bg-neutral-100", "bg-rose-500", "bg-neutral-900"],
    vibe: "light",
    vfx: "minimal",
    sample: { line1: "Eu te amo,", em: "infinitamente." },
  },
];

export const getTheme = (id: string) => THEMES.find((t) => t.id === id) || THEMES[0];
