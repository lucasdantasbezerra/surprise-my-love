import { useI18n } from "@/i18n/I18nContext";
import { LANGUAGE_META, LANGUAGES, Lang } from "@/i18n/translations";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const flagUrl = (code: string) => `https://flagcdn.com/w40/${code}.png`;

export const LanguageSelector = ({ compact = false }: { compact?: boolean }) => {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGE_META[lang];

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
        className={`inline-flex items-center justify-between gap-2 rounded-full border border-border/60 bg-card/70 backdrop-blur px-2.5 py-1.5 text-sm shadow-soft hover:border-primary/40 transition-colors ${compact ? "" : "min-w-[160px]"}`}
      >
        <span className="inline-flex min-w-0 items-center gap-2">
          <img
            src={flagUrl(current.flagCode)}
            alt={current.label}
            className="h-6 w-6 rounded-full object-cover ring-1 ring-border"
            loading="eager"
          />
          {!compact && <span className="truncate font-medium text-foreground">{current.label}</span>}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-foreground/60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-border bg-popover p-1.5 shadow-soft z-50 animate-scale-in">
          <ul className="max-h-96 overflow-y-auto">
            {LANGUAGES.map((l) => {
              const meta = LANGUAGE_META[l.code];
              const active = l.code === lang;
              return (
                <li key={l.code}>
                  <button
                    onClick={() => { setLang(l.code as Lang); setOpen(false); }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent ${active ? "bg-accent/70 font-semibold text-primary" : "text-foreground"}`}
                  >
                    <img
                      src={flagUrl(meta.flagCode)}
                      alt={meta.label}
                      className="h-6 w-6 rounded-full object-cover ring-1 ring-border"
                      loading="lazy"
                    />
                    <span className="truncate">{meta.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
