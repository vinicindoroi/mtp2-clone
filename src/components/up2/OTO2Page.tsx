import { withFunnelParams } from "@/lib/funnel-params";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/reels-i18n";
import { getUp2Copy, type Up2Copy } from "@/lib/up2-i18n";

const COMMUNITY_CHECKOUT_URL = "https://go.centerpag.com/PPU38CQDEP0";
const DECLINE_URL = "https://vitaprotocol-app.lovable.app";

const FONT_DISPLAY = "'Playfair Display', Georgia, serif";
const FONT_BODY = "'Inter', system-ui, -apple-system, sans-serif";
const GREEN = "#2D6A4F";
const MINT = "#52B788";
const SOFT = "#F0FAF5";
const TEXT = "#1A1A1A";
const MUTED = "#5A5A5A";
const URGENT = "#C1121F";

function withSearch(url: string) {
  return withFunnelParams(url);
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 700ms ease, transform 700ms ease",
    } as React.CSSProperties,
  };
}

type CtaState = "idle" | "processing" | "done";

export function OTO2Page({ lang = "en" }: { lang?: Lang }) {
  const t = getUp2Copy(lang).oto2;
  const [cta] = useState<CtaState>("idle");
  const offerRef = useRef<HTMLDivElement | null>(null);
  const [offerVisible, setOfferVisible] = useState(false);

  useEffect(() => {
    const node = offerRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setOfferVisible(e.isIntersecting)),
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const handleBuy = () => {
    window.location.href = withSearch(COMMUNITY_CHECKOUT_URL);
  };

  return (
    <div style={{ background: "#fff", color: TEXT, fontFamily: FONT_BODY }}>
      <style>{`
        @keyframes vp-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.02)} }
        @keyframes vp-spin { to { transform: rotate(360deg) } }
        .vp-pulse { animation: vp-pulse 2s ease-in-out infinite; }
        .vp-spinner { width:18px;height:18px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:vp-spin .8s linear infinite;display:inline-block;vertical-align:middle;margin-right:8px; }
        .vp-scroll-x { scrollbar-width: none; }
        .vp-scroll-x::-webkit-scrollbar { display:none; }
      `}</style>

      <div style={{ background: GREEN, padding: "12px 16px", textAlign: "center" }}>
        <span style={{ color: "#fff", fontSize: 13 }}>
          {t.topBar}
        </span>
      </div>

      <Section>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px", textAlign: "center" }}>
          <Badge>{t.badge}</Badge>
          <h1
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: "clamp(26px, 6vw, 36px)",
              lineHeight: 1.15,
              margin: "20px 0 16px",
              color: TEXT,
            }}
          >
            {t.heroTitle}
          </h1>
          <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 28px" }}>
            {t.heroBody}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {t.pills.map((p) => (
              <span
                key={p}
                style={{
                  background: SOFT,
                  color: GREEN,
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <RevealBox>
          <div style={{ background: SOFT, borderRadius: 16, padding: 28, maxWidth: 680, margin: "0 auto" }}>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 26, margin: 0, color: TEXT }}>
              {t.communityTitle}
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7, marginTop: 12 }}>
              {t.communityBody}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 14,
                marginTop: 22,
              }}
            >
              <FeatureCard icon={<IconFeed />} title={t.features[0].title} text={t.features[0].text} />
              <FeatureCard icon={<IconHeart />} title={t.features[1].title} text={t.features[1].text} />
              <FeatureCard icon={<IconTrophy />} title={t.features[2].title} text={t.features[2].text} />
              <FeatureCard icon={<IconRanking />} title={t.features[3].title} text={t.features[3].text} />
            </div>
          </div>
        </RevealBox>
      </Section>

      <Section>
        <RevealBox>
          <div style={{ borderLeft: `3px solid ${GREEN}`, padding: 20, maxWidth: 600, margin: "0 auto" }}>
            <IconLock />
            <h3 style={{ fontSize: 15, fontWeight: 500, margin: "12px 0 8px", color: TEXT }}>
              {t.oneClickTitle}
            </h3>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, margin: 0 }}>
              {t.oneClickBody}
            </p>
            <p style={{ color: GREEN, fontWeight: 500, fontSize: 14, marginTop: 14 }}>
              {t.oneClickNote}
            </p>
          </div>
        </RevealBox>
      </Section>

      <Section>
        <RevealBox>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 20px" }}>
            <h2
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 600,
                fontSize: 22,
                textAlign: "center",
                marginBottom: 24,
                color: TEXT,
              }}
            >
              {t.testimonialsTitle}
            </h2>
            <Testimonials items={t.testimonials} />
          </div>
        </RevealBox>
      </Section>

      <Section>
        <div ref={offerRef}>
          <RevealBox>
            <div
              style={{
                background: SOFT,
                borderRadius: 16,
                padding: 32,
                maxWidth: 520,
                margin: "0 auto",
                boxShadow: "0 8px 30px rgba(45,106,79,0.08)",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <span
                  style={{
                    background: URGENT,
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 1,
                    padding: "6px 12px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                  }}
                >
                  {t.offerBadge}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 600,
                  fontSize: 28,
                  textAlign: "center",
                  margin: "0 0 20px",
                  color: TEXT,
                }}
              >
                {t.offerTitle}
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", borderLeft: `3px solid ${GREEN}` }}>
                {t.offerList.map((item) => (
                  <li key={item} style={{ padding: "8px 0 8px 14px", fontSize: 14, color: TEXT, lineHeight: 1.5 }}>
                    <span style={{ color: GREEN, fontWeight: 700, marginRight: 8 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ color: "#9CA3AF", textDecoration: "line-through", fontSize: 16 }}>{t.oldPrice}</div>
                <div
                  style={{
                    color: GREEN,
                    fontSize: 42,
                    fontWeight: 500,
                    fontFamily: FONT_DISPLAY,
                    lineHeight: 1,
                    marginTop: 4,
                  }}
                >
                  {t.newPrice}
                </div>
                <div style={{ color: MUTED, fontSize: 13, marginTop: 8 }}>
                  {t.priceNote}
                </div>
              </div>
              <button
                onClick={handleBuy}
                className="vp-pulse"
                style={{
                  width: "100%",
                  height: 56,
                  borderRadius: 10,
                  border: "none",
                  background: GREEN,
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: FONT_BODY,
                  cursor: "pointer",
                }}
              >
                {t.ctaMain}
              </button>
              <p style={{ fontSize: 12, color: MUTED, textAlign: "center", marginTop: 12, lineHeight: 1.6 }}>
                {t.ctaSecurity}
              </p>
              <button
                type="button"
                onClick={() => {
                  window.location.href = withSearch(DECLINE_URL);
                }}
                style={{
                  display: "block",
                  margin: "16px auto 0",
                  background: "transparent",
                  border: "none",
                  color: MUTED,
                  fontSize: 12,
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontFamily: FONT_BODY,
                }}
              >
                {t.declineCta}
              </button>
            </div>
          </RevealBox>
        </div>
      </Section>

      <Section>
        <RevealBox>
          <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
            <IconShield />
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginTop: 16 }}>
              {t.guaranteeText}
            </p>
          </div>
        </RevealBox>
      </Section>

      <Section>
        <RevealBox>
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px" }}>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 20, marginBottom: 16, color: TEXT }}>
              {t.faqTitle}
            </h2>
            <Faq items={t.faqItems} />
          </div>
        </RevealBox>
      </Section>

      <footer style={{ padding: "32px 20px 110px", textAlign: "center", color: MUTED, fontSize: 13 }}>
        <div style={{ marginTop: 10, fontSize: 12 }}>{t.footerNote}</div>
      </footer>

      <StickyCta hidden={offerVisible} state={cta} onClick={handleBuy} label={t.stickyCta} />
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section style={{ background: "#fff", padding: "32px 0" }}>{children}</section>;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: SOFT,
        color: GREEN,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        padding: "6px 12px",
        borderRadius: 999,
      }}
    >
      {children}
    </span>
  );
}

function RevealBox({ children }: { children: React.ReactNode }) {
  const { ref, style } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}

function FeatureCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "0.5px solid #E5E7EB" }}>
      <div style={{ color: GREEN, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{text}</div>
    </div>
  );
}

function Testimonials({ items }: { items: Up2Copy["oto2"]["testimonials"] }) {
  return (
    <div
      className="vp-scroll-x"
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gridAutoColumns: "85%",
        gap: 14,
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        paddingBottom: 8,
      }}
      ref={(el) => {
        if (!el) return;
        if (window.matchMedia("(min-width: 768px)").matches) {
          el.style.gridAutoFlow = "";
          el.style.gridAutoColumns = "";
          el.style.gridTemplateColumns = "repeat(3, 1fr)";
          el.style.overflowX = "visible";
        }
      }}
    >
      {items.map((it) => (
        <div
          key={it.name}
          style={{
            background: "#fff",
            border: "0.5px solid #E5E7EB",
            borderRadius: 12,
            padding: 16,
            scrollSnapAlign: "start",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#E1F5EE",
                color: "#085041",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {it.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>
                {it.name} · {it.country}
              </div>
              <div style={{ color: "#F5A524", fontSize: 12 }}>★★★★★</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, margin: 0 }}>"{it.text}"</p>
          <div style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: GREEN }}>{it.result}</div>
        </div>
      ))}
    </div>
  );
}

function Faq({ items }: { items: Up2Copy["oto2"]["faqItems"] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} style={{ border: "0.5px solid #E5E7EB", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "14px 16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                color: TEXT,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: FONT_BODY,
              }}
            >
              {it.q}
              <span style={{ color: GREEN, fontSize: 18 }}>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 16px 14px", fontSize: 13, color: MUTED, lineHeight: 1.7 }}>{it.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StickyCta({ hidden, state, onClick, label }: { hidden: boolean; state: CtaState; onClick: () => void; label: string }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        borderTop: "0.5px solid #E5E7EB",
        transform: hidden ? "translateY(120%)" : "translateY(0)",
        transition: "transform 300ms ease",
        zIndex: 50,
      }}
      className="vp-sticky-mobile"
    >
      <button
        onClick={onClick}
        style={{
          width: "100%",
          height: 52,
          borderRadius: 10,
          border: "none",
          background: state === "done" ? MINT : GREEN,
          color: "#fff",
          fontSize: 16,
          fontWeight: 600,
          fontFamily: FONT_BODY,
          cursor: "pointer",
        }}
      >
        {label}
      </button>
      <style>{`@media (min-width: 768px){ .vp-sticky-mobile { display: none !important; } }`}</style>
    </div>
  );
}

const ICON_PROPS = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconFeed() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <rect x="3" y="11" width="18" height="4" rx="1" />
      <rect x="3" y="18" width="12" height="3" rx="1" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}
function IconTrophy() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M17 5h3v3a3 3 0 0 1-3 3M7 5H4v3a3 3 0 0 0 3 3" />
    </svg>
  );
}
function IconRanking() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
