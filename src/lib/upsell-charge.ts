// 1-Click upsell charge via Cloudflare Worker (Stripe saved card).

const WORKER_URL = "https://metapay-v2.vinicio-bdf.workers.dev/api/stripe-charge-upsell";

const FALLBACK_NEXT_URL: Record<1 | 2, string> = {
  1: "https://spot-pay.vita-protocol.online/up2",
  2: "https://spot-pay.vita-protocol.online/obrigado",
};

/** Atraso antes de bater na Stripe (evita velocity limit) */
export const CHARGE_DELAY_MS = 2000;

function go(upsellNumber: 1 | 2, overrideUrl?: string) {
  const urlParams = new URLSearchParams(window.location.search);
  const target = overrideUrl || FALLBACK_NEXT_URL[upsellNumber];
  const targetUrl = new URL(target, window.location.origin);
  urlParams.forEach((v, k) => targetUrl.searchParams.set(k, v));
  window.location.href = targetUrl.toString();
}

/**
 * Cobra o upsell e sempre avança o funil (nunca prende o cliente).
 * Resolve apenas se a navegação não acontecer.
 */
export async function chargeUpsell(upsellNumber: 1 | 2): Promise<{ ok: boolean }> {
  if (typeof window === "undefined") return { ok: false };

  const urlParams = new URLSearchParams(window.location.search);
  const cid = urlParams.get("cid");
  const pm = urlParams.get("pm");
  const email = urlParams.get("email") || "";

  if (!cid || !pm) {
    go(upsellNumber);
    return { ok: true };
  }

  await new Promise((r) => setTimeout(r, CHARGE_DELAY_MS));

  try {
    const response = await fetch(WORKER_URL + window.location.search, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_id: cid,
        payment_method_id: pm,
        upsell_number: upsellNumber,
        email,
        extra_params: Object.fromEntries(urlParams.entries()),
      }),
    });
    const data = (await response.json()) as {
      ok?: boolean;
      next_url?: string;
      status?: string;
      amount?: number;
    };

    if (data?.ok) {
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      if (data.status === "succeeded" && (data.amount ?? 0) > 0 && typeof w.fbq === "function") {
        w.fbq("track", "Purchase", { value: (data.amount ?? 0) / 100, currency: "USD" });
      }
      await new Promise((r) => setTimeout(r, 350));
      go(upsellNumber, data.next_url);
    } else {
      go(upsellNumber);
    }
  } catch (err) {
    console.error("Erro no upsell:", err);
    go(upsellNumber);
  }

  return { ok: true };
}
