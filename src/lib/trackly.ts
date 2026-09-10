// Disparo de etapas do Trackly (funnel.js) com dedupe e retry
// (o script é carregado com defer, então a chamada pode acontecer antes dele).
import { getFunnelParams } from "@/lib/funnel-params";

const fired = new Set<string>();

const TRACKED_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "gclid",
  "ttclid",
  "click_id",
  "sub_id",
  "lang",
  "eng",
];

/** Parâmetros de origem da campanha (persistidos + URL atual). */
export function tracklyParams(): Record<string, string> {
  const all = getFunnelParams();
  const out: Record<string, string> = {};
  TRACKED_KEYS.forEach((k) => {
    if (all[k]) out[k] = all[k];
  });
  return out;
}

function call(step: string) {
  const trk = (window as any).trkFunnel;
  if (!trk?.step) return false;
  const params = tracklyParams();
  try {
    trk.setParams?.(params);
  } catch {}
  try {
    trk.step(step, params);
  } catch {
    try {
      trk.step(step);
    } catch {
      return false;
    }
  }
  return true;
}

/** Dispara uma etapa do funil no Trackly (uma única vez por sessão de página). */
export function trkStep(step: string) {
  if (typeof window === "undefined") return;
  if (fired.has(step)) return;
  fired.add(step);

  if (call(step)) return;
  let tries = 0;
  const id = window.setInterval(() => {
    tries += 1;
    if (call(step) || tries > 40) window.clearInterval(id);
  }, 250);
}
