// Persistência e propagação de parâmetros de tracking/compra em todo o funil.
// Alguns gateways não repassam os params entre etapas, então guardamos tudo
// no storage e reinjetamos em qualquer link de saída ou navegação interna.

const KEY = "funnel_params";
const TTL_MS = 6 * 60 * 60 * 1000; // 6h

type Stored = { t: number; p: Record<string, string> };

function read(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Stored;
    if (!parsed?.t || Date.now() - parsed.t > TTL_MS) {
      window.localStorage.removeItem(KEY);
      return {};
    }
    return parsed.p ?? {};
  } catch {
    return {};
  }
}

function write(p: Record<string, string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), p } satisfies Stored));
  } catch {
    /* ignore */
  }
}

/** Guarda os params da URL atual (chamado no boot da app). */
export function captureFunnelParams(search?: string) {
  if (typeof window === "undefined") return;
  const s = search ?? window.location.search;
  if (!s || s === "?") return;
  const incoming = new URLSearchParams(s.startsWith("?") ? s.slice(1) : s);
  const merged = read();
  incoming.forEach((v, k) => {
    if (v) merged[k] = v;
  });
  write(merged);
}

/** Todos os params conhecidos: persistidos + os da URL atual (URL tem prioridade). */
export function getFunnelParams(): Record<string, string> {
  const merged = read();
  if (typeof window !== "undefined" && window.location.search) {
    new URLSearchParams(window.location.search).forEach((v, k) => {
      if (v) merged[k] = v;
    });
  }
  return merged;
}

/**
 * Anexa todos os params do funil a uma URL (interna ou externa).
 * Params já presentes na URL base são preservados.
 */
export function isRotaA(search: string): boolean {
  try {
    const s = search.startsWith("?") ? search.slice(1) : search;
    return (new URLSearchParams(s).get("utm_campaign") || "").toLowerCase().includes("rota a");
  } catch {
    return false;
  }
}

export function withFunnelParams(url: string, extra?: Record<string, string>): string {
  if (typeof window === "undefined") return url;
  const params = { ...getFunnelParams(), ...(extra ?? {}) };
  const [pathPart = "", hashPart = ""] = url.split("#");
  const [path, existingQuery = ""] = pathPart.split("?");
  const qs = new URLSearchParams(existingQuery);
  Object.entries(params).forEach(([k, v]) => {
    if (!qs.has(k)) qs.set(k, v);
  });
  const q = qs.toString();
  return `${path}${q ? `?${q}` : ""}${hashPart ? `#${hashPart}` : ""}`;
}

