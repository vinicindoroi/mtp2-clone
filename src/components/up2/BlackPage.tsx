import { useEffect, useState } from "react";
import { Wallet, ChevronDown } from "lucide-react";
import { markBlackFunnel } from "@/lib/upsell-cloak";
import { withFunnelParams, getFunnelParams } from "@/lib/funnel-params";
import type { Lang } from "@/lib/reels-i18n";
import { getUp2Copy } from "@/lib/up2-i18n";
import { trkStep } from "@/lib/trackly";
import { chargeUpsell } from "@/lib/upsell-charge";
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

// Next-step button destination
const NEXT_STEP_URL = "https://go.centerpag.com/PPU38CQDEP0?upsell=true";

export function BlackPage({ lang = "en" }: { lang?: Lang }) {
  const t = getUp2Copy(lang).black;
  const [isTt, setIsTt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsTt(Boolean(getFunnelParams()["ttclid"]));
  }, []);

  useEffect(() => {
    trkStep("up2");
  }, []);

  const goNext = () => {
    markBlackFunnel();
    window.location.href = withFunnelParams(NEXT_STEP_URL, { ur: "1" });
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
          @keyframes up-arrow {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(6px); }
          }
          @keyframes up-fade-in {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .up-card  { animation: up-fade-in 500ms ease-out both; }
          .up-cta   { animation: up-pulse 2s ease-in-out infinite; }
          .up-cta:hover { filter: brightness(1.1); animation: none; }
          .up-arrow { animation: up-arrow 1.4s ease-in-out infinite; }
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

          <div className="mt-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-(--up-accent-2)/25 blur-xl" />
              <div className="up-arrow relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-(--up-accent) to-(--up-accent-2) shadow-lg">
                <ChevronDown className="h-8 w-8 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            data-funnel-step="checkout"
            className="up-cta mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-(--up-accent) to-(--up-accent-2) py-3.5 text-base font-bold text-white transition-transform active:scale-[0.98]"
          >
            <Wallet className="h-5 w-5" />
            {t.cta}
          </button>

          <p className="mt-4 text-center text-[11px] text-(--up-faint)">
            {t.secure}
          </p>
        </div>

        <p className="mt-6 text-center text-[11px] text-(--up-faint)">
          © {new Date().getFullYear()} {t.rights}
        </p>
      </div>
    </>
  );
}
