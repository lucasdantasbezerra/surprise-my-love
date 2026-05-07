-- Tabela de mensagens de suporte (formulário do site)
CREATE TABLE public.support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa (anon ou autenticado) pode enviar uma mensagem
CREATE POLICY "anyone can submit support message"
ON public.support_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 120
  AND length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(message) BETWEEN 1 AND 4000
  AND (subject IS NULL OR length(subject) <= 200)
);

-- Apenas o próprio usuário (se autenticado e tiver registrado o user_id) pode ler suas mensagens
CREATE POLICY "user can read own support messages"
ON public.support_messages
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
