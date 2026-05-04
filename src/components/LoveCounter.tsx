import { useEffect, useState } from "react";

interface Props {
  startDate: string; // ISO
  className?: string;
  variant?: "light" | "dark";
}

export const LoveCounter = ({ startDate, className = "", variant = "light" }: Props) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = new Date(startDate);
  const diff = Math.max(0, now.getTime() - start.getTime());

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(totalDays / 365);
  const days = totalDays - years * 365;

  const items = [
    { v: years, l: "anos" },
    { v: days, l: "dias" },
    { v: hours, l: "horas" },
    { v: minutes, l: "min" },
    { v: seconds, l: "seg" },
  ];

  const muted = variant === "dark" ? "text-white/60" : "text-foreground/55";
  const value = variant === "dark" ? "text-white" : "text-foreground";

  return (
    <div className={`grid grid-cols-5 gap-2 sm:gap-4 ${className}`}>
      {items.map((it) => (
        <div key={it.l} className="text-center">
          <div className={`font-display text-2xl sm:text-4xl md:text-5xl font-bold tabular-nums ${value}`}>
            {String(it.v).padStart(2, "0")}
          </div>
          <div className={`mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] ${muted}`}>{it.l}</div>
        </div>
      ))}
    </div>
  );
};
