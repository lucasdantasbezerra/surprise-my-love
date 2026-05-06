import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLovePages, LovePageRow } from "@/hooks/useLovePages";
import { Heart, LogOut, QrCode as QrIcon, Link as LinkIcon, Lock, Save, Loader2, ArrowLeft, Trash2, ExternalLink } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";

const Account = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { list, remove } = useLovePages();
  const [displayName, setDisplayName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [pages, setPages] = useState<LovePageRow[]>([]);
  const [activeSlug, setActiveSlug] = useState<string>("");

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("display_name").eq("user_id", user.id).maybeSingle().then(({ data }) => {
      if (data?.display_name) setDisplayName(data.display_name);
    });
    list(user.id).then((rows) => {
      setPages(rows);
      const firstPublished = rows.find((r) => r.is_published && r.slug);
      if (firstPublished?.slug) setActiveSlug(firstPublished.slug);
    }).catch(() => {});
  }, [user, list]);

  const pageUrl = activeSlug ? `${window.location.origin}/p/${activeSlug}` : "";

  const removePage = async (id: string) => {
    if (!confirm("Excluir esta página?")) return;
    try {
      await remove(id);
      setPages((p) => p.filter((x) => x.id !== id));
      toast.success("Página excluída");
    } catch (e: any) { toast.error(e.message); }
  };

  const saveProfile = async () => {
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("profiles").upsert({ user_id: user.id, display_name: displayName }, { onConflict: "user_id" });
    setBusy(false);
    if (error) toast.error(error.message); else toast.success("Perfil atualizado");
  };

  const changePassword = async () => {
    if (newPassword.length < 6) return toast.error("Mínimo 6 caracteres");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setBusy(false);
    if (error) toast.error(error.message); else { toast.success("Senha alterada"); setNewPassword(""); }
  };

  const downloadQR = () => {
    const canvas = document.querySelector<HTMLCanvasElement>("#account-qr canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${activeSlug || "minha-pagina"}-qrcode.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (loading || !user) {
    return <div className="min-h-screen grid place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-romance">
      <header className="border-b border-border/40 bg-card/60 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2"><ArrowLeft className="h-4 w-4" /><span className="text-sm">Voltar ao site</span></Link>
          <div className="flex items-center gap-2 font-display font-bold"><Heart className="h-5 w-5 fill-primary text-primary" /> Minha conta</div>
          <button onClick={() => signOut().then(() => navigate("/"))} className="inline-flex items-center gap-1.5 text-sm text-foreground/70 hover:text-primary"><LogOut className="h-4 w-4" /> Sair</button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 sm:px-8 py-10 grid lg:grid-cols-2 gap-6">
        {/* QR + Link */}
        <section className="rounded-3xl bg-card border border-border p-6 shadow-soft">
          <h2 className="font-display text-xl font-bold flex items-center gap-2"><QrIcon className="h-5 w-5 text-primary" /> Sua página</h2>
          <p className="text-sm text-foreground/60 mt-1">Compartilhe o link ou imprima o QR Code para fazer a surpresa.</p>
          <div id="account-qr" className="mt-5 grid place-items-center bg-white rounded-2xl p-6">
            <QRCodeCanvas value={pageUrl} size={180} fgColor="#0a0a0a" />
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm">
            <LinkIcon className="h-4 w-4 text-foreground/50" />
            <input readOnly value={pageUrl} className="flex-1 bg-transparent focus:outline-none text-foreground/80" />
            <button onClick={() => { navigator.clipboard.writeText(pageUrl); toast.success("Link copiado"); }} className="text-xs font-semibold text-primary">Copiar</button>
          </div>
          <button onClick={downloadQR} className="mt-3 w-full rounded-xl bg-foreground text-background py-3 text-sm font-semibold hover:opacity-90">Baixar QR Code para imprimir</button>
        </section>

        {/* Profile + Password */}
        <section className="space-y-6">
          <div className="rounded-3xl bg-card border border-border p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold">Perfil</h2>
            <label className="block text-xs uppercase tracking-[0.2em] text-foreground/60 font-semibold mt-4 mb-2">E-mail</label>
            <input readOnly value={user.email || ""} className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-sm" />
            <label className="block text-xs uppercase tracking-[0.2em] text-foreground/60 font-semibold mt-4 mb-2">Nome</label>
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm" />
            <button onClick={saveProfile} disabled={busy} className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-rose text-primary-foreground py-3 font-semibold shadow-rose disabled:opacity-60">
              <Save className="h-4 w-4" /> Salvar
            </button>
          </div>

          <div className="rounded-3xl bg-card border border-border p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold flex items-center gap-2"><Lock className="h-5 w-5 text-primary" /> Alterar senha</h2>
            <input type="password" placeholder="Nova senha" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-4 w-full px-4 py-3 rounded-xl border border-border bg-background text-sm" />
            <button onClick={changePassword} disabled={busy || !newPassword} className="mt-3 w-full rounded-xl border border-border bg-background py-3 text-sm font-semibold hover:bg-accent disabled:opacity-60">Atualizar senha</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Account;
