import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Lang, LANGUAGES, translations, TranslationDict } from "./translations";

interface Currency {
  code: string;
  symbol: string;
  rate: number; // multiplier from base USD
  format: (n: number) => string;
}

const CURRENCIES: Record<string, Omit<Currency, "format">> = {
  BRL: { code: "BRL", symbol: "R$", rate: 1 }, // BRL is special, uses BR prices directly
  USD: { code: "USD", symbol: "US$", rate: 1 },
  EUR: { code: "EUR", symbol: "€", rate: 0.92 },
  GBP: { code: "GBP", symbol: "£", rate: 0.79 },
  JPY: { code: "JPY", symbol: "¥", rate: 155 },
  CNY: { code: "CNY", symbol: "¥", rate: 7.2 },
  INR: { code: "INR", symbol: "₹", rate: 84 },
  RUB: { code: "RUB", symbol: "₽", rate: 92 },
  IDR: { code: "IDR", symbol: "Rp", rate: 16000 },
};

// USD base prices
const PRICES_USD = { basic: 1.99, premium: 6.99 };
// BRL local prices
const PRICES_BRL = { basic: 9.9, premium: 34.9 };

function detectCountry(): string {
  // Use timezone heuristic for default country code
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  if (/America\/Sao_Paulo|America\/Fortaleza|America\/Recife|America\/Bahia|America\/Manaus|America\/Belem/i.test(tz)) return "BR";
  if (/Europe\/London/i.test(tz)) return "GB";
  if (/Europe\//i.test(tz)) return "EU";
  if (/Asia\/Tokyo/i.test(tz)) return "JP";
  if (/Asia\/Shanghai|Asia\/Hong_Kong/i.test(tz)) return "CN";
  if (/Asia\/Kolkata|Asia\/Calcutta/i.test(tz)) return "IN";
  if (/Europe\/Moscow|Asia\/Novosibirsk/i.test(tz)) return "RU";
  if (/Asia\/Jakarta|Asia\/Makassar/i.test(tz)) return "ID";
  return "US";
}

function detectLang(): Lang {
  const saved = localStorage.getItem("mlp_lang") as Lang | null;
  if (saved && LANGUAGES.find((l) => l.code === saved)) return saved;
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("pt")) return "pt-BR";
  if (nav.startsWith("es")) return "es";
  if (nav.startsWith("fr")) return "fr";
  if (nav.startsWith("it")) return "it";
  if (nav.startsWith("ru")) return "ru";
  if (nav.startsWith("ja")) return "ja";
  if (nav.startsWith("zh")) return "zh";
  if (nav.startsWith("hi")) return "hi";
  if (nav.startsWith("ar")) return "ar";
  if (nav.startsWith("id")) return "id";
  return "en";
}

function currencyFor(country: string): string {
  return ({
    BR: "BRL", US: "USD", GB: "GBP", EU: "EUR",
    JP: "JPY", CN: "CNY", IN: "INR", RU: "RUB", ID: "IDR",
  } as Record<string, string>)[country] || "USD";
}

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TranslationDict;
  rtl: boolean;
  currency: string;
  setCurrency: (c: string) => void;
  prices: { basic: string; premium: string };
}

const Ctx = createContext<I18nValue | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => detectLang());
  const [currency, setCurrencyState] = useState<string>(() => {
    const saved = localStorage.getItem("mlp_currency");
    if (saved && CURRENCIES[saved]) return saved;
    return currencyFor(detectCountry());
  });

  useEffect(() => {
    localStorage.setItem("mlp_lang", lang);
    const isRtl = !!LANGUAGES.find((l) => l.code === lang)?.rtl;
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("mlp_currency", currency);
  }, [currency]);

  const value = useMemo<I18nValue>(() => {
    const cur = CURRENCIES[currency] || CURRENCIES.USD;
    const fmt = (n: number) => {
      try {
        return new Intl.NumberFormat(lang, {
          style: "currency",
          currency: cur.code,
          maximumFractionDigits: cur.code === "JPY" || cur.code === "IDR" ? 0 : 2,
        }).format(n);
      } catch {
        return `${cur.symbol} ${n.toFixed(2)}`;
      }
    };
    let basic: number, premium: number;
    if (cur.code === "BRL") {
      basic = PRICES_BRL.basic;
      premium = PRICES_BRL.premium;
    } else {
      basic = PRICES_USD.basic * cur.rate;
      premium = PRICES_USD.premium * cur.rate;
      if (cur.code === "JPY" || cur.code === "IDR") {
        basic = Math.round(basic);
        premium = Math.round(premium);
      }
    }
    const rtl = !!LANGUAGES.find((l) => l.code === lang)?.rtl;
    return {
      lang,
      setLang: (l) => setLangState(l),
      t: translations[lang],
      rtl,
      currency,
      setCurrency: setCurrencyState,
      prices: { basic: fmt(basic), premium: fmt(premium) },
    };
  }, [lang, currency]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useI18n = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be inside I18nProvider");
  return v;
};

export const CURRENCY_OPTIONS = Object.keys(CURRENCIES);
