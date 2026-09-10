import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OTO2Page } from "@/components/up2/OTO2Page";
import { BlackPage } from "@/components/up2/BlackPage";
import { GrayPage } from "@/components/upsell/GrayPage";
import { shouldShowBlack, shouldShowGray, markBlackFunnel, isSpotifyCampaign } from "@/lib/upsell-cloak";
import { resolveLang } from "@/lib/reels-i18n";
import { useLang } from "@/lib/use-lang";

const NEXT_STEP_URL = "https://go.centerpag.com/PPU38CQDEP0?upsell=true";

const GRAY_OVERRIDES = {
  en: {
    title1: "Are you ready to transform your life",
    title2: "and get amazing results?",
    subtitle1: "",
    subtitle2: "",
    cta1: "Start now",
    cta2: "",
  },
  es: {
    title1: "¿Estás lista para transformar tu vida",
    title2: "y tener resultados maravillosos?",
    subtitle1: "",
    subtitle2: "",
    cta1: "Comenzar ahora",
    cta2: "",
  },
} as const;

function isDevHost(host: string) {
  if (!host) return false;
  if (host === "localhost" || host === "127.0.0.1") return true;
  if (host.includes("id-preview--")) return true;
  if (host.includes("-dev.lovable.app")) return true;
  if (host.endsWith(".lovable.dev")) return true;
  if (host.endsWith(".lovableproject.com")) return true;
  if (host.endsWith(".lovable.host")) return true;
  return false;
}

export const Route = createFileRoute("/up2")({
  validateSearch: (search: Record<string, unknown>) => search,
  loader: () => ({ lang: resolveLang() }),
  head: () => ({
    meta: [
      { title: "Comunidad VitaProtocol — Únete por $19" },
      {
        name: "description",
        content:
          "Acceso exclusivo a la red social privada de mujeres VitaProtocol. Pago único de $19 con un solo clic.",
      },
      { property: "og:title", content: "Comunidad VitaProtocol — Únete por $19" },
      {
        property: "og:description",
        content:
          "Únete a la red social privada de mujeres que están transformando su equilibrio hormonal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Up2Page,
});

function Up2Page() {
  const search = Route.useSearch() as Record<string, unknown>;
  const lang = useLang(Route.useLoaderData().lang);

  if (typeof window !== "undefined" && isSpotifyCampaign(search)) {
    window.location.replace(`/sp/up2${window.location.search}`);
    return null;
  }

  const [devOverride, setDevOverride] = useState<"black" | "white" | "gray" | null>(null);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsDev(isDevHost(window.location.hostname));
    if (shouldShowBlack(search)) markBlackFunnel();
    const stored = window.localStorage.getItem("dev_page_override");
    if (stored === "black" || stored === "white" || stored === "gray") setDevOverride(stored);

    const onStorage = () => {
      const v = window.localStorage.getItem("dev_page_override");
      setDevOverride(v === "black" || v === "white" || v === "gray" ? v : null);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("dev-page-override-change", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("dev-page-override-change", onStorage);
    };
  }, []);

  const showBlack =
    isDev && devOverride ? devOverride === "black" : shouldShowBlack(search);

  const showGray =
    isDev && devOverride ? devOverride === "gray" : shouldShowGray(search);

  return (
    <>
      {showGray ? (
        <GrayPage lang={lang} nextUrl={NEXT_STEP_URL} overrides={GRAY_OVERRIDES[lang] ?? GRAY_OVERRIDES.en} />
      ) : showBlack ? (
        <BlackPage lang={lang} />
      ) : (
        <OTO2Page lang={lang} />
      )}
    </>
  );
}
