import { Check, ArrowRight, Star } from "lucide-react";
import { withFunnelParams } from "@/lib/funnel-params";
import type { Lang } from "@/lib/reels-i18n";
import { getGrayCopy } from "@/lib/gray-i18n";

/**
 * Versão "cinza" (whitezona intermediária) das páginas de upsell.
 * Sem slug própria — ativada por parâmetro (?v=gray) ou pelo menu dev.
 */
export function GrayPage({
  lang = "en",
  nextUrl,
  overrides,
}: {
  lang?: Lang;
  nextUrl: string;
  overrides?: Partial<{
    title1: string;
    title2: string;
    subtitle1: string;
    subtitle2: string;
    cta1: string;
    cta2: string;
  }>;
}) {
  const t = { ...getGrayCopy(lang), ...(overrides ?? {}) };

  const goNext = () => {
    window.location.href = withFunnelParams(nextUrl, { ur: "1" });
  };

  return (
    <div className="min-h-[100dvh] w-full bg-white text-neutral-900 flex flex-col items-center justify-center px-5 py-8 font-sans">
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-800/25 bg-emerald-50">
            <Check className="h-10 w-10 text-emerald-800" strokeWidth={3} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-emerald-50/70 px-6 py-7 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-800">
            {t.badge}
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-snug text-neutral-900">
            {t.title1}
            {t.title2 ? (
              <>
                <br />
                <span className="text-emerald-800">{t.title2}</span>
              </>
            ) : null}
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-emerald-800/15" />
            <Star className="h-4 w-4 text-emerald-800" />
            <span className="h-px flex-1 bg-emerald-800/15" />
          </div>

          {t.subtitle1 || t.subtitle2 ? (
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              {t.subtitle1}
              {t.subtitle2 ? (
                <>
                  <br />
                  {t.subtitle2}
                </>
              ) : null}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-800 px-5 py-4.5 text-center text-lg font-bold text-white shadow-lg transition-transform active:scale-[0.98] hover:bg-emerald-900"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
            <ArrowRight className="h-5 w-5" />
          </span>
          <span className="text-center leading-tight">
            {t.cta1}
            {t.cta2 ? (
              <>
                <br />
                {t.cta2}
              </>
            ) : null}
          </span>
        </button>
      </div>
    </div>
  );
}
