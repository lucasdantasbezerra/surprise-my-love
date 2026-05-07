import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Mail, Send, Loader2, LifeBuoy } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Nome obrigatório").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(5, "Mensagem muito curta").max(4000),
});

export const SupportSection = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "Verifique os campos", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("support_messages").insert({
      ...parsed.data,
      user_id: user?.id ?? null,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Não foi possível enviar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Mensagem enviada 💌", description: "Responderemos no seu e-mail o quanto antes." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="support" className="py-20 sm:py-28 bg-gradient-to-b from-background to-accent/20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">
            <LifeBuoy className="h-3.5 w-3.5" /> Suporte
          </div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Precisa de <span className="text-gradient-rose italic">ajuda?</span>
          </h2>
          <p className="mt-4 text-foreground/65">
            Estamos aqui pra você. Resposta rápida, atendimento humano.
          </p>
          <a
            href="mailto:suporte@produtosdigitais.com.br"
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Mail className="h-4 w-4" /> suporte@produtosdigitais.com.br
          </a>
        </div>

        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Seu nome"
            maxLength={120}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
            required
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            placeholder="Seu e-mail"
            maxLength={255}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
            required
          />
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="Assunto (opcional)"
            maxLength={200}
            className="sm:col-span-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary/50"
          />
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Como podemos ajudar?"
            rows={5}
            maxLength={4000}
            className="sm:col-span-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary/50 resize-none"
            required
          />
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-rose text-primary-foreground px-7 py-3 font-semibold shadow-rose hover:scale-105 transition-transform disabled:opacity-60 disabled:scale-100"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Enviar mensagem
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
