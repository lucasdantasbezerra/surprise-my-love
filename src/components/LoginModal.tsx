import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/i18n/I18nContext";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export const LoginModal = ({ open, onOpenChange }: Props) => {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(t.login.soon);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-rose grid place-items-center mb-2">
            <Heart className="h-5 w-5 fill-white text-white" />
          </div>
          <DialogTitle className="text-center font-display text-2xl">{t.login.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3 mt-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.login.email}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <input
            type="password"
            required
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder={t.login.password}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button type="submit" className="w-full rounded-xl bg-gradient-rose text-primary-foreground py-3 font-semibold shadow-rose">
            {t.login.enter}
          </button>
          <p className="text-xs text-center text-foreground/55 px-2 pt-2">{t.login.soon}</p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
