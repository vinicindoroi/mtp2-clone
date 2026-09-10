import { withFunnelParams } from "@/lib/funnel-params";
import { useEffect, useRef } from "react";
import type { Lang } from "@/lib/reels-i18n";
import { getUp1Copy } from "@/lib/up1-i18n";

// Variáveis globais — fácil de trocar
const OTO1_PRICE = "$27 USD";
const OTO1_OLD_PRICE = "$97";
const CHECKOUT_URL_OTO1 = "https://go.centerpag.com/PPU38CQDBC1?upsell=true";
const DECLINE_URL = "https://vitaprotocol-app.lovable.app";

const C = {
  bg: "#FFFFFF",
  green: "#2D6A4F",
  greenHover: "#1B4332",
  mint: "#52B788",
  text: "#1A1A1A",
  textMuted: "#5A5A5A",
  blockAlt: "#F0FAF5",
  urgent: "#C1121F",
};

const serif = { fontFamily: '"Playfair Display", Georgia, serif' };
const sans = { fontFamily: '"Inter", system-ui, sans-serif' };

export function OTO1Page({ lang }: { lang: Lang }) {
  const t = getUp1Copy(lang).oto;
  // Fade-up via IntersectionObserver
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Propaga TODOS os params do funil (URL atual + persistidos)
  const withParams = (url: string) => withFunnelParams(url);

  const goCheckout = () => {
    window.location.href = withParams(CHECKOUT_URL_OTO1);
  };
  const goDecline = () => {
    window.location.href = withParams(DECLINE_URL);
  };

  return (
    <div
      ref={rootRef}
      style={{ backgroundColor: C.bg, color: C.text, ...sans }}
      className="min-h-screen w-full overflow-x-hidden"
    >
      <style>{`
        @keyframes oto-bounce-in {
          0%   { transform: scale(0);   opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          80%  { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        @keyframes oto-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.02); }
        }
        .oto-check { animation: oto-bounce-in 600ms cubic-bezier(.34,1.56,.64,1) both; }
        [data-reveal] {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 600ms ease-out, transform 600ms ease-out;
        }
        [data-reveal].is-visible { opacity: 1; transform: translateY(0); }
        .oto-btn-primary {
          background-color: ${C.green};
          color: #fff;
          transition: background-color 150ms ease;
          animation: oto-pulse 2s ease-in-out infinite;
          box-shadow: 0 4px 14px rgba(45,106,79,0.25);
        }
        .oto-btn-primary:hover { background-color: ${C.greenHover}; }
        .oto-btn-secondary {
          background: transparent;
          color: #888888;
          border: 1px solid #CCCCCC;
          transition: color 150ms ease, border-color 150ms ease;
        }
        .oto-btn-secondary:hover { color: #555555; border-color: #999999; }
        .oto-testi-row::-webkit-scrollbar { display: none; }
        .oto-testi-row { scrollbar-width: none; }
      `}</style>

      {/* Welcome */}
      <section
        style={{ backgroundColor: C.blockAlt }}
        className="px-5 py-16 md:py-20 text-center"
      >
        <div className="mx-auto max-w-3xl flex flex-col items-center">
          <p
            className="text-xs md:text-sm font-semibold tracking-widest mb-4"
            style={{ color: C.green }}
          >
            {t.accessConfirmed}
          </p>
          <div
            className="oto-check mb-6 flex items-center justify-center rounded-full"
            style={{ width: 72, height: 72, backgroundColor: C.green }}
            aria-hidden="true"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1
            style={{ ...serif, color: C.text, lineHeight: 1.2 }}
            className="text-[26px] md:text-[38px] font-bold max-w-2xl"
          >
            {t.heroTitle}
          </h1>
          <p
            className="mt-5 text-base md:text-lg max-w-[600px]"
            style={{ color: C.textMuted, lineHeight: 1.6 }}
          >
            {t.heroBody}
          </p>
          <p className="mt-6 italic text-2xl md:text-3xl" style={{ ...serif, color: C.green }}>
            {t.heroQuote}
          </p>
        </div>
      </section>

      {/* Agitation */}
      <section className="px-5 py-14 md:py-20" data-reveal>
        <div
          className="mx-auto max-w-[640px] text-[17px] md:text-[18px]"
          style={{ color: C.text, lineHeight: 1.75 }}
        >
          <p>{t.agitation1}</p>
          <p className="mt-5 italic" style={{ color: C.urgent }}>
            {t.agitation2}
          </p>
          <p className="mt-5">{t.agitation3}</p>
        </div>
      </section>

      {/* Solution */}
      <section className="px-5 pb-14 md:pb-20" data-reveal>
        <div
          className="mx-auto max-w-[680px] text-center"
          style={{ backgroundColor: C.blockAlt, borderRadius: 16, padding: "32px 24px" }}
        >
          <span
            className="inline-block text-[11px] font-bold tracking-widest px-3 py-1 rounded-full"
            style={{ backgroundColor: C.green, color: "#fff" }}
          >
            {t.solutionBadge}
          </span>
          <h2
            className="mt-5 text-[22px] md:text-[30px] font-bold"
            style={{ ...serif, color: C.text, lineHeight: 1.25 }}
          >
            {t.solutionTitle}
          </h2>
          <p className="mt-4 text-[16px] md:text-[17px]" style={{ color: C.text, lineHeight: 1.75 }}>
            {t.solutionBody}
          </p>

          <div className="mx-auto my-7" style={{ height: 1, width: 60, backgroundColor: C.mint }} />

          <p className="text-sm" style={{ color: C.textMuted }}>
            {t.solutionHowItWorks}
          </p>

          <div
            className="mx-auto mt-6 text-left"
            style={{
              maxWidth: 480,
              backgroundColor: "#fff",
              border: "1px solid #E0E0E0",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <p className="text-base md:text-lg font-bold mb-4" style={{ ...serif, color: C.green }}>
              {t.dayCardTitle}
            </p>
            {t.dayItems.map((item, i) => (
              <div
                key={i}
                className="pl-3 py-2 mb-2 last:mb-0 text-[14px] md:text-[15px]"
                style={{ borderLeft: `3px solid ${C.green}`, color: C.text, lineHeight: 1.55 }}
              >
                {item}
              </div>
            ))}
          </div>

          <p className="mt-5 italic text-sm" style={{ color: "#888" }}>
            {t.solutionFooter}
          </p>
        </div>
      </section>

      {/* Includes */}
      <section className="px-5 pb-14 md:pb-20" data-reveal>
        <div className="mx-auto max-w-[640px]">
          <h2
            className="text-[22px] md:text-[24px] font-bold mb-6 text-center"
            style={{ ...serif, color: C.text }}
          >
            {t.includesTitle}
          </h2>
          <ul className="space-y-5">
            {t.includesItems.map((item, i) => (
              <li key={i} className="pl-4" style={{ borderLeft: `3px solid ${C.green}` }}>
                <p className="font-semibold text-[16px] md:text-[17px]" style={{ color: C.text }}>
                  {item.t}
                </p>
                <p
                  className="text-[14px] md:text-[15px] mt-1"
                  style={{ color: C.textMuted, lineHeight: 1.6 }}
                >
                  {item.d}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Value clash */}
      <section className="px-5 pb-14 md:pb-20" data-reveal>
        <div
          className="mx-auto text-center"
          style={{ backgroundColor: C.blockAlt, borderRadius: 12, padding: 28, maxWidth: 560 }}
        >
          <p className="text-[11px] font-bold tracking-widest" style={{ color: C.green }}>
            {t.valueBadge}
          </p>
          <p className="mt-4 text-[15px] md:text-[16px]" style={{ color: C.text, lineHeight: 1.7 }}>
            {t.valueBody}
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <span style={{ color: "#999", fontSize: 22, textDecoration: "line-through" }}>
              {OTO1_OLD_PRICE}
            </span>
            <span style={{ color: C.textMuted, fontSize: 22 }}>→</span>
            <span style={{ color: C.green, fontSize: 36, fontWeight: 700, lineHeight: 1 }}>
              {OTO1_PRICE}
            </span>
          </div>
          <p className="mt-2 text-sm" style={{ color: C.textMuted }}>
            {t.valueFooter}
          </p>
        </div>
      </section>

      {/* Main CTA */}
      <section className="px-5 pb-14 md:pb-20" data-reveal>
        <div className="mx-auto" style={{ maxWidth: 500 }}>
          <AutoChargeBanner text={t.autoChargeBanner} />

          <button
            type="button"
            onClick={goCheckout}
            className="oto-btn-primary w-full font-semibold"
            style={{ height: 56, fontSize: 18, borderRadius: 10, padding: "0 16px" }}
          >
            {t.ctaPrimary(OTO1_PRICE)}
          </button>
          <p className="mt-3 text-center text-[13px]" style={{ color: C.textMuted }}>
            {t.ctaPrimaryNote}
          </p>

          <div className="my-6 flex items-center gap-3">
            <span className="flex-1" style={{ height: 1, backgroundColor: "#E0E0E0" }} />
            <span className="text-sm" style={{ color: C.textMuted }}>
              {t.orDivider}
            </span>
            <span className="flex-1" style={{ height: 1, backgroundColor: "#E0E0E0" }} />
          </div>

          <button
            type="button"
            onClick={goDecline}
            className="oto-btn-secondary w-full"
            style={{ height: 56, fontSize: 15, borderRadius: 10, padding: "0 16px" }}
          >
            {t.ctaSecondary}
          </button>
          <p className="mt-2 text-center italic" style={{ color: "#AAAAAA", fontSize: 10 }}>
            {t.ctaSecondaryNote}
          </p>
        </div>
      </section>

      {/* Social proof */}
      <section className="pb-14 md:pb-20" data-reveal>
        <div
          className="oto-testi-row flex gap-4 px-5 overflow-x-auto md:justify-center"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {t.testimonials.map((c, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{
                width: 260,
                backgroundColor: "#fff",
                border: "1px solid #E0E0E0",
                borderRadius: 12,
                padding: 18,
                scrollSnapAlign: "center",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full font-bold"
                  style={{ width: 40, height: 40, backgroundColor: C.mint, color: "#fff" }}
                >
                  {c.ini}
                </div>
                <p className="text-sm font-semibold" style={{ color: C.text }}>
                  {c.name}
                </p>
              </div>
              <p className="mt-3 text-[14px]" style={{ color: C.text, lineHeight: 1.5 }}>
                “{c.text}”
              </p>
              <p className="mt-2 text-[14px] font-semibold" style={{ color: C.green }}>
                {c.result}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantee */}
      <section
        className="px-5 py-12 text-center"
        style={{ backgroundColor: C.blockAlt }}
        data-reveal
      >
        <div className="mx-auto" style={{ maxWidth: 480 }}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke={C.green}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-3"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p className="text-[15px]" style={{ color: C.textMuted, lineHeight: 1.7 }}>
            {t.guarantee}
          </p>
        </div>
      </section>

      {/* Repeat CTA */}
      <section className="px-5 py-14 md:py-20" data-reveal>
        <div className="mx-auto" style={{ maxWidth: 500 }}>
          <AutoChargeBanner text={t.autoChargeBanner} />

          <button
            type="button"
            onClick={goCheckout}
            className="oto-btn-primary w-full font-semibold"
            style={{ height: 56, fontSize: 18, borderRadius: 10, padding: "0 16px" }}
          >
            {t.ctaPrimary(OTO1_PRICE)}
          </button>
          <p className="mt-3 text-center text-[13px]" style={{ color: C.textMuted }}>
            {t.ctaPrimaryNote}
          </p>
        </div>
      </section>
    </div>
  );
}

function AutoChargeBanner({ text }: { text: string }) {
  return (
    <div
      className="mb-4 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-center"
      style={{ backgroundColor: "#FFF9E6", border: "1px solid #F0E68C" }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#B8860B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
      <span className="text-[13px] font-semibold" style={{ color: "#8B6914" }}>
        {text}
      </span>
    </div>
  );
}