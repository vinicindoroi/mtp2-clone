// Cloacker compartilhado dos upsells (/up1, /up2).
// Problema: o gateway de pagamento NÃO repassa sck/ppayId no redirect
// para o passo seguinte, então /up2 nunca via os params de compra.
// Solução: além dos params, marcamos o funil "black" no storage no /up1.

const KEY = "upsell_black_funnel";
const TTL_MS = 6 * 60 * 60 * 1000; // 6h

export function markBlackFunnel() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function hasBlackFunnel(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return false;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return false;
    if (Date.now() - ts > TTL_MS) {
      window.localStorage.removeItem(KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Versão "cinza": não tem slug própria.
 * Ativa sempre que utm_campaign contém "white" (com ou sem fbclid),
 * e tem precedência sobre a black mesmo com params de transação.
 */
export function shouldShowGray(search: Record<string, unknown>): boolean {
  const get = (k: string) => {
    const v = search?.[k];
    return (typeof v === "string" ? v : v == null ? "" : String(v)).toLowerCase();
  };
  const campaign = get("utm_campaign") || get("campaign") || get("utm_campaign_name");
  return campaign.includes("white");
}

/**
 * Campanha Spotify: utm_campaign contém "spot".
 * Tem precedência sobre a black; usada para redirecionar /up1 e /up2
 * para os upsells próprios do Spotify (/sp/up1, /sp/up2).
 */
export function isSpotifyCampaign(search: Record<string, unknown>): boolean {
  if (shouldShowGray(search)) return false;
  const get = (k: string) => {
    const v = search?.[k];
    return (typeof v === "string" ? v : v == null ? "" : String(v)).toLowerCase();
  };
  const campaign = get("utm_campaign") || get("campaign") || get("utm_campaign_name");
  return campaign.includes("spot");
}

export function shouldShowBlack(search: Record<string, unknown>): boolean {
  const get = (k: string) => {
    const v = search?.[k];
    return typeof v === "string" ? v : v == null ? "" : String(v);
  };

  // Regra obrigatória: utm_campaign deve conter "cbo"/"mtp" OU vir do TikTok (ttclid)
  const campaign = (
    get("utm_campaign") ||
    get("campaign") ||
    get("utm_campaign_name")
  ).toLowerCase();
  const isTikTok = !!get("ttclid");
  if (!isTikTok && !campaign.includes("mtp") && !campaign.includes("cbo")) return false;

  const hasPurchaseId = !!(
    get("ppayId") ||
    get("payer") ||
    get("transaction_id") ||
    get("transactionId") ||
    get("order_id") ||
    get("orderId")
  );
  const sck = get("sck") || get("src") || get("utm_content");

  // Sinal forte: qualquer ID de transação vindo do gateway já basta.
  if (hasPurchaseId) return true;
  // Fallback: dados de comprador repassados pelo checkout
  const status = get("status").toLowerCase();
  const buyer = get("e") || get("email") || get("payerName") || get("fullName");
  if (buyer && (status === "approved" || status === "paid" || !!get("planId") || !!get("productId")))
    return true;
  if (sck.length > 10) return true;
  // Marcador explícito repassado entre etapas do funil
  if (get("ur") === "1") return true;

  return false;
}
