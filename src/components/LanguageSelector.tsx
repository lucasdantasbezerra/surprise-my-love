import { useI18n } from "@/i18n/I18nContext";
import { LANGUAGES, Lang } from "@/i18n/translations";
import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const LanguageSelector = ({ compact = false }: { compact?: boolean }) => {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Language selector"
        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur px-3 py-1.5 text-sm hover:border-primary/50 transition-colors"
      >
        <Globe className="h-4 w-4 text-foreground/70" />
        <span className="hidden sm:inline">{current.flag}</span>
        {!compact && <span className="hidden md:inline">{current.label}</span>}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border bg-popover shadow-soft z-50 overflow-hidden animate-scale-in">
          <ul className="max-h-80 overflow-y-auto py-1">
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => { setLang(l.code as Lang); setOpen(false); }}
                  className={`w-full text-left flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent ${l.code === lang ? "bg-accent/60 font-medium" : ""}`}
                >
                  <span className="text-base">{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
