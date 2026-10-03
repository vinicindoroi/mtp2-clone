import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { BlackPage } from "@/components/up2/BlackPage";
import { markBlackFunnel } from "@/lib/upsell-cloak";
import { resolveLang } from "@/lib/reels-i18n";
import { useLang } from "@/lib/use-lang";

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
  const lang = useLang(Route.useLoaderData().lang);

  useEffect(() => {
    markBlackFunnel();
    if (typeof window !== "undefined") {
      window.location.replace("/b3/up2/index.html" + window.location.search);
    }
  }, []);

  return <BlackPage lang={lang} />;
}

