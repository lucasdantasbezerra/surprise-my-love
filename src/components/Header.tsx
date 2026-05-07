import { useI18n } from "@/i18n/I18nContext";
import { LanguageSelector } from "./LanguageSelector";
import { Heart, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  onLogin?: () => void;
  onCreate: () => void;
}

export const Header = ({ onCreate }: Props) => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const onLogin = () => navigate(user ? "/account" : "/auth");

  const links = [
    { href: "#how", label: t.nav.how },
    { href: "#themes", label: t.nav.templates },
    { href: "#benefits", label: "Benefícios" },
    { href: "#plans", label: "Planos" },
    { href: "#faq", label: t.nav.faq },
    { href: "#support", label: "Suporte" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 glass">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-2 group">
          <Heart className="h-6 w-6 fill-primary text-primary heartbeat" />
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight">{t.brand}</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-foreground/75">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="story-link">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector />
          <button
            onClick={onLogin}
            className="hidden sm:inline-flex text-sm text-foreground/75 hover:text-foreground px-3 py-1.5 transition-colors"
          >
            {t.nav.account}
          </button>
          <button
            onClick={onCreate}
            className="relative inline-flex items-center gap-1.5 rounded-full bg-gradient-rose text-primary-foreground px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold shadow-rose hover:scale-105 transition-transform ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>{t.nav.cta}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="lg:hidden p-2 -mr-2">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg hover:bg-accent text-foreground/80">
                {l.label}
              </a>
            ))}
            <button onClick={() => { setOpen(false); onLogin(); }} className="text-left px-3 py-2.5 rounded-lg hover:bg-accent text-foreground/80">
              {t.nav.account}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
