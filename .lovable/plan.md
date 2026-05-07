## Objetivo

Trazer do repositório `EquipeR2C/lovelink-surprise` apenas a parte de **idiomas e preços/moedas**:

1. Seletor de idiomas com **bandeiras reais** (imagens de `flagcdn.com`) em vez dos emojis atuais.
2. **Preços por mercado** (não conversão por taxa fixa): cada país tem preço definido localmente, e a moeda muda automaticamente conforme o idioma detectado.
3. Suporte a **3 novos idiomas**: Bengali (bn), Urdu (ur) — junto com mercados BD, PK, SA já fortalecidos.

Mantém todo o resto do projeto (design rosa, layout, animações, traduções já existentes) intocado.

## Mudanças

### 1. `src/i18n/translations.ts`
- Adicionar `bn` e `ur` ao tipo `Lang` e ao array `LANGUAGES`.
- Adicionar **export `LANGUAGE_META`**: mapa `Lang → { label, flagCode, rtl? }` com códigos de bandeira (`br`, `us`, `es`, `fr`, `it`, `ru`, `jp`, `cn`, `in`, `sa`, `id`, `bd`, `pk`).
- Adicionar entradas de tradução completas para `bn` e `ur` (copiar do repo de origem).

### 2. `src/i18n/I18nContext.tsx` (reescrita)
- Substituir o sistema atual de "USD base × rate" por **`MARKET_PRICES`** (preços absolutos por país, ex: BR=R$9,90/R$34,90, US=$1.99/$6.99, GB=£1.59/£5.59, EU=€1.79/€5.99, JP=¥320/¥1100, IN=₹179/₹649, etc.).
- `CURRENCIES` passa a guardar `{ code, locale }` e a formatação usa `Intl.NumberFormat(locale, { style:'currency', currency })`.
- `marketForLang(lang)` mapeia cada idioma ao seu mercado padrão; ao trocar idioma, a moeda atualiza automaticamente.
- `detectLang()` ganha `bn` e `ur`.
- API pública (`useI18n`, `prices.basic/premium`, `setLang`, `setCurrency`) permanece compatível — nenhum outro arquivo precisa mudar.

### 3. `src/components/LanguageSelector.tsx` (reescrita)
- Botão arredondado com **bandeira circular** (`https://flagcdn.com/w40/{code}.png`) + nome do idioma + chevron.
- Dropdown com lista de idiomas, cada um com bandeira circular real.
- Mantém o comportamento de fechar ao clicar fora e a prop `compact`.
- Estilo adaptado aos tokens do projeto (sem cores hardcoded fora do tema rosa): usa `border-primary/20`, `bg-card`, `shadow-soft`.

## Compatibilidade

- `Header.tsx` continua usando `<LanguageSelector />` sem alteração.
- `PlansSection`, `CreatorSection` etc. continuam recebendo `prices.basic/premium` já formatados.
- `CURRENCY_OPTIONS` permanece exportado.

## Resultado visual

- No header, o seletor mostra a bandeira do país do idioma atual (ex.: 🇧🇷 redonda real, não emoji).
- Ao trocar para "English US" → preços viram `$1.99 / $6.99`. Para "Français" → `1,79 € / 5,99 €`. Para "हिंदी" → `₹179 / ₹649`. Etc.
- Detecção automática no primeiro acesso pelo `navigator.language`.
