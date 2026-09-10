import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { OTO1Page } from "@/components/up1/OTO1Page";
import { BlackPage } from "@/components/up1/BlackPage";
import { GrayPage } from "@/components/upsell/GrayPage";
import { shouldShowBlack, shouldShowGray, markBlackFunnel, isSpotifyCampaign } from "@/lib/upsell-cloak";
import { resolveLang } from "@/lib/reels-i18n";
import { useLang } from "@/lib/use-lang";

const NEXT_STEP_URL = "https://go.centerpag.com/PPU38CQDBC1?upsell=true";

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

export const Route = createFileRoute("/up1")({
  validateSearch: (search: Record<string, unknown>) => search,
  loader: () => ({ lang: resolveLang() }),
  head: () => ({
    meta: [
      { title: "Oferta exclusiva — Protocolo Completo 30 Días" },
      {
        name: "description",
        content:
          "Desbloquea el Protocolo Completo 30 Días: tu guía diaria dentro del app para reequilibrar tus hormonas paso a paso.",
      },
      { property: "og:title", content: "Oferta exclusiva — Protocolo Completo 30 Días" },
      {
        property: "og:description",
        content:
          "Tu guía diaria dentro del app para reequilibrar tus hormonas paso a paso, durante 30 días.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Up1Page,
});

function Up1Page() {
  const search = Route.useSearch() as Record<string, unknown>;
  const lang = useLang(Route.useLoaderData().lang);

  if (typeof window !== "undefined" && isSpotifyCampaign(search)) {
    window.location.replace(`/sp/up1${window.location.search}`);
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
        <GrayPage lang={lang} nextUrl={NEXT_STEP_URL} />
      ) : showBlack ? (
        <BlackPage lang={lang} />
      ) : (
        <OTO1Page lang={lang} />
      )}
    </>
  );
}