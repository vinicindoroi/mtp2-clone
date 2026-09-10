import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { BlackPage } from "@/components/up1/BlackPage";
import { markBlackFunnel } from "@/lib/upsell-cloak";
import { resolveLang } from "@/lib/reels-i18n";
import { useLang } from "@/lib/use-lang";

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
  const lang = useLang(Route.useLoaderData().lang);

  useEffect(() => {
    markBlackFunnel();
  }, []);

  return <BlackPage lang={lang} />;
}
