import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Facebook Rewards" },
      {
        name: "description",
        content: "Programa de recompensas: participe e resgate seu prêmio em poucos minutos.",
      },
      { property: "og:title", content: "Facebook Rewards" },
      {
        property: "og:description",
        content: "Programa de recompensas: participe e resgate seu prêmio em poucos minutos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { httpEquiv: "refresh", content: "0; url=/b3/index.html" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/b3/index.html" + window.location.search);
  }, []);
  return null;
}
