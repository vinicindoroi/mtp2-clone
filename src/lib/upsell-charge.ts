// 1-Click upsell charge via Cloudflare Worker (Stripe saved card).

const WORKER_URL = "https://metapay-v2.vinicio-bdf.workers.dev";

export type ChargeResult = { ok: true } | { ok: false; error: string };

export async function chargeUpsell(upsellNumber: 1 | 2): Promise<ChargeResult> {
  if (typeof window === "undefined") return { ok: false, error: "no window" };

  const urlParams = new URLSearchParams(window.location.search);
  const cid = urlParams.get("cid");
  const pm = urlParams.get("pm");

  if (!cid || !pm) {
    return { ok: false, error: "missing_payment_data" };
  }

  try {
    const response = await fetch(`${WORKER_URL}/api/stripe-charge-upsell`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_id: cid,
        payment_method_id: pm,
        upsell_number: upsellNumber,
        extra_params: Object.fromEntries(urlParams.entries()),
      }),
    });
    const data = (await response.json()) as { ok?: boolean; next_url?: string; error?: string };

    if (data.ok && data.next_url) {
      window.location.href = data.next_url;
      return { ok: true };
    }
    return { ok: false, error: data.error || "declined" };
  } catch {
    return { ok: false, error: "network" };
  }
}
