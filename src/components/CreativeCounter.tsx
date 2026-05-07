import { useEffect, useState } from "react";
import { Moon, BookOpen, Music, Sparkles, Leaf, Heart, Star, Camera, Film, Play, MessageCircle, Clock } from "lucide-react";

interface Props {
  startDate: string;
  themeId: string;
  accentHex: string;
  isDark: boolean;
}

export const CreativeCounter = ({ startDate, themeId, accentHex, isDark }: Props) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = new Date(startDate);
  const valid = !isNaN(start.getTime());
  const diffMs = valid ? Math.max(0, now.getTime() - start.getTime()) : 0;
  const totalSec = Math.floor(diffMs / 1000);
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalMin = Math.floor(diffMs / (1000 * 60));

  let years = 0, months = 0, days = 0;
  if (valid) {
    years = now.getFullYear() - start.getFullYear();
    months = now.getMonth() - start.getMonth();
    days = now.getDate() - start.getDate();
    if (days < 0) { months -= 1; const prev = new Date(now.getFullYear(), now.getMonth(), 0); days += prev.getDate(); }
    if (months < 0) { years -= 1; months += 12; }
    if (years < 0) { years = months = days = 0; }
  }

  const muted = isDark ? "text-white/55" : "text-black/50";
  const subtle = isDark ? "text-white/70" : "text-black/65";

  const heartbeats = Math.floor(totalSec * 1.2);
  const songs = Math.floor(totalDays / 3);
  const photosTaken = Math.floor(totalDays * 1.7);
  const fullMoons = Math.floor(totalDays / 29.53);
  const episodes = Math.max(1, Math.floor(totalDays / 7));
  const seasons = Math.max(1, Math.floor(totalDays / 91));
  const messages = Math.floor(totalDays * 47);
  const views = Math.floor(totalDays * 1234);

  const Big = ({ value, label, icon: Icon }: { value: string | number; label: string; icon?: any }) => (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2">
        {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: accentHex }} />}
        <div className="font-display font-bold text-4xl sm:text-6xl tabular-nums" style={{ color: accentHex }}>
          {value}
        </div>
      </div>
      <div className={`mt-2 uppercase tracking-[0.3em] text-[10px] sm:text-xs ${muted}`}>{label}</div>
    </div>
  );

  const Small = ({ value, label }: { value: string | number; label: string }) => (
    <div className="text-center">
      <div className={`font-display font-semibold text-lg sm:text-2xl tabular-nums ${subtle}`}>{value}</div>
      <div className={`mt-1 uppercase tracking-[0.25em] text-[9px] sm:text-[10px] ${muted}`}>{label}</div>
    </div>
  );

  const defaultRow = (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
      <Small value={years} label="anos" />
      <Small value={months} label="meses" />
      <Small value={days} label="dias" />
      <Small value={String(totalHours % 24).padStart(2, "0")} label="horas" />
      <Small value={String(totalMin % 60).padStart(2, "0")} label="min" />
      <Small value={String(totalSec % 60).padStart(2, "0")} label="seg" />
    </div>
  );

  switch (themeId) {
    case "stream-love":
      return (
        <div className="space-y-6">
          <Big value={`T${seasons} • E${episodes}`} label="da nossa série" icon={Film} />
          <div className="grid grid-cols-3 gap-3">
            <Small value={seasons} label="temporadas" />
            <Small value={episodes} label="episódios" />
            <Small value={`${(totalHours).toLocaleString()}h`} label="assistidas" />
          </div>
          {defaultRow}
        </div>
      );
    case "music-love":
      return (
        <div className="space-y-6">
          <Big value={songs.toLocaleString()} label="músicas tocadas por nós" icon={Music} />
          <div className="grid grid-cols-3 gap-3">
            <Small value={totalMin.toLocaleString()} label="min ouvidos" />
            <Small value={heartbeats.toLocaleString()} label="batidas" />
            <Small value={`${(totalDays / 365).toFixed(1)}`} label="álbuns de vida" />
          </div>
          {defaultRow}
        </div>
      );
    case "timeline":
      return (
        <div className="space-y-6">
          <Big value={`Cap. ${Math.max(1, Math.floor(totalDays / 30))}`} label="da nossa história" icon={BookOpen} />
          <div className="grid grid-cols-3 gap-3">
            <Small value={Math.floor(totalDays / 7)} label="capítulos" />
            <Small value={totalDays} label="páginas" />
            <Small value={`${Math.min(100, Math.floor((totalDays / (365 * 50)) * 100))}%`} label="da vida" />
          </div>
          {defaultRow}
        </div>
      );
    case "tube":
      return (
        <div className="space-y-6">
          <Big value={views.toLocaleString()} label="visualizações do coração" icon={Play} />
          <div className="grid grid-cols-3 gap-3">
            <Small value={Math.floor(views * 0.8).toLocaleString()} label="curtidas" />
            <Small value={totalDays.toLocaleString()} label="dias no ar" />
            <Small value={`${(totalHours).toLocaleString()}h`} label="reprisadas" />
          </div>
          {defaultRow}
        </div>
      );
    case "chat":
      return (
        <div className="space-y-6">
          <Big value={messages.toLocaleString()} label="mensagens trocadas" icon={MessageCircle} />
          <div className="grid grid-cols-3 gap-3">
            <Small value={Math.floor(messages / 3).toLocaleString()} label="“te amo”" />
            <Small value={totalDays.toLocaleString()} label="dias online" />
            <Small value={Math.floor(messages * 0.02).toLocaleString()} label="emojis ❤️" />
          </div>
          {defaultRow}
        </div>
      );
    case "polaroid":
      return (
        <div className="space-y-6">
          <Big value={photosTaken.toLocaleString()} label="memórias guardadas" icon={Camera} />
          <div className="grid grid-cols-3 gap-3">
            <Small value={totalDays} label="dias revelados" />
            <Small value={Math.floor(totalDays / 30)} label="álbuns" />
            <Small value={years} label="anos juntos" />
          </div>
          {defaultRow}
        </div>
      );
    case "midnight":
      return (
        <div className="space-y-6">
          <Big value={totalDays.toLocaleString()} label="noites te escolhendo" icon={Star} />
          <div className="grid grid-cols-3 gap-3">
            <Small value={fullMoons} label="luas cheias" />
            <Small value={Math.floor(totalHours).toLocaleString()} label="horas" />
            <Small value={heartbeats.toLocaleString()} label="batidas" />
          </div>
          {defaultRow}
        </div>
      );
    case "minimal":
    default:
      return (
        <div className="space-y-6">
          <Big value={totalDays.toLocaleString()} label="dias de nós" icon={Heart} />
          <div className="grid grid-cols-3 gap-3">
            <Small value={Math.floor(totalDays / 7)} label="semanas" />
            <Small value={Math.floor(totalDays / 30)} label="meses" />
            <Small value={years} label="anos" />
          </div>
          {defaultRow}
        </div>
      );
  }
};
