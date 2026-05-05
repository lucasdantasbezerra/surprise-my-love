import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Senha atualizada!");
    navigate("/account");
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-romance px-5 py-12">
      <div className="w-full max-w-md rounded-3xl bg-card border border-border shadow-soft p-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Heart className="h-6 w-6 fill-primary text-primary heartbeat" />
          <span className="font-display text-xl font-bold">Definir nova senha</span>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
            <input required type="password" minLength={6} placeholder="Nova senha" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <button disabled={busy} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-rose text-primary-foreground py-3 font-semibold shadow-rose">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar nova senha"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
