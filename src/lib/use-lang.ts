import { useEffect, useState } from "react";
import { resolveLang, type Lang } from "@/lib/reels-i18n";

export type { Lang };

/**
 * Idioma da página. `initial` vem do loader (SSR, via headers/geo/?lang=),
 * e no cliente é reconciliado com URL + localStorage.
 */
export function useLang(initial: Lang = "en"): Lang {
  const [lang, setLang] = useState<Lang>(initial);
  useEffect(() => {
    const next = resolveLang();
    setLang((prev) => (prev === next ? prev : next));
  }, []);
  return lang;
}
