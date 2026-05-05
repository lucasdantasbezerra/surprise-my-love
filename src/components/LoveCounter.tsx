import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nContext";

interface Props {
  startDate: string; // ISO YYYY-MM-DD or full
  className?: string;
  size?: "sm" | "md" | "lg";
  accentClass?: string;
  textClass?: string;
  mutedClass?: string;
}

export const LoveCounter = ({
  startDate,
  className = "",
  size = "md",
  accentClass,
  textClass = "text-foreground",
  mutedClass = "text-foreground/55",
}: Props) => {
  const { t } = useI18n();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = new Date(startDate);
  const valid = !isNaN(start.getTime());
  const diff = valid ? Math.max(0, now.getTime() - start.getTime()) : 0;

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;

  // Calendar-aware years/months/days
  let years = 0, months = 0, days = 0;
  if (valid) {
    years = now.getFullYear() - start.getFullYear();
    months = now.getMonth() - start.getMonth();
    days = now.getDate() - start.getDate();
    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) { years -= 1; months += 12; }
    if (years < 0) { years = 0; months = 0; days = 0; }
  }

  const items = [years, months, days, hours, minutes, seconds];
  const labels = t.counter;

  const sizeMap = {
    sm: { num: "text-lg sm:text-xl", lbl: "text-[8px] sm:text-[9px]" },
    md: { num: "text-2xl sm:text-3xl md:text-4xl", lbl: "text-[10px] sm:text-xs" },
    lg: { num: "text-3xl sm:text-5xl md:text-6xl", lbl: "text-xs sm:text-sm" },
  }[size];

  return (
    <div className={`grid grid-cols-6 gap-1.5 sm:gap-2 ${className}`}>
      {items.map((v, i) => (
        <div key={i} className="text-center">
          <div className={`font-display font-bold tabular-nums ${sizeMap.num} ${accentClass ?? textClass}`}>
            {String(v).padStart(2, "0")}
          </div>
          <div className={`mt-1 uppercase tracking-[0.2em] ${sizeMap.lbl} ${mutedClass}`}>{labels[i]}</div>
        </div>
      ))}
    </div>
  );
};
