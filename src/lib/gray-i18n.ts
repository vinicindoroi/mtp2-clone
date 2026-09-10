import type { Lang } from "@/lib/reels-i18n";

export type GrayCopy = {
  badge: string;
  title1: string;
  title2: string;
  subtitle1: string;
  subtitle2: string;
  secure1: string;
  secure2: string;
  cta1: string;
  cta2: string;
  trust1: string;
  trust2: string;
  trust3: string;
};

const COPY: Record<Lang, GrayCopy> = {
  es: {
    badge: "¡TODO LISTO!",
    title1: "Agradecemos las informaciones,",
    title2: "tu acceso fue liberado.",
    subtitle1: "Haz clic abajo para",
    subtitle2: "continuar con el protocolo.",
    secure1: "Acceso 100% seguro y verificado.",
    secure2: "Sin formularios. Sin complicaciones.",
    cta1: "Haz clic para continuar",
    cta2: "con el protocolo",
    trust1: "Acceso Garantizado",
    trust2: "Acceso Instantáneo",
    trust3: "Garantía de 7 días",
  },
  en: {
    badge: "ALL SET!",
    title1: "Thank you for the information,",
    title2: "your access has been released.",
    subtitle1: "Click below to",
    subtitle2: "continue with the protocol.",
    secure1: "100% secure and verified access.",
    secure2: "No forms. No complications.",
    cta1: "Click to continue",
    cta2: "with the protocol",
    trust1: "Guaranteed Access",
    trust2: "Instant Access",
    trust3: "7-day Guarantee",
  },
};

export function getGrayCopy(lang: Lang): GrayCopy {
  return COPY[lang] ?? COPY.en;
}
