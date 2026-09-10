import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

export type Lang = "en" | "es";

const SPANISH_COUNTRIES = new Set([
  "MX", "AR", "CO", "CL", "PE", "VE", "EC", "GT", "CU", "BO",
  "DO", "HN", "PY", "SV", "NI", "CR", "PR", "PA", "UY", "ES",
]);

function parseAcceptLanguage(header: string): string | null {
  const first = header.split(",")[0]?.trim() ?? "";
  // e.g. "es-MX" → "MX"; "es" → null (no country)
  const parts = first.split("-");
  if (parts.length >= 2) return parts[1]!.toUpperCase();
  return null;
}

function langFromCountry(country: string | null): Lang {
  if (!country) return "en";
  return SPANISH_COUNTRIES.has(country.toUpperCase()) ? "es" : "en";
}

function overrideFromSearch(search: string): Lang | null {
  try {
    const p = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    const v = (p.get("lang") ?? "").toLowerCase();
    if (v === "en" || v === "es") return v;
  } catch {}
  return null;
}

export const resolveLang = createIsomorphicFn()
  .client((): Lang => {
    try {
      const override = overrideFromSearch(window.location.search);
      if (override) {
        localStorage.setItem("vp_lang", override);
        return override;
      }
      const stored = localStorage.getItem("vp_lang");
      if (stored === "en" || stored === "es") return stored;
    } catch {}
    // Best-effort browser detection fallback.
    const nav = typeof navigator !== "undefined" ? navigator.language ?? "" : "";
    return nav.toLowerCase().startsWith("es") ? "es" : "en";
  })
  .server((): Lang => {
    const req = getRequest();
    if (!req) return "en";
    const url = new URL(req.url);
    const override = overrideFromSearch(url.search);
    if (override) return override;
    const h = req.headers;
    const country =
      h.get("cf-ipcountry") ||
      h.get("x-vercel-ip-country") ||
      h.get("x-country-code") ||
      h.get("x-geo-country") ||
      null;
    if (country) return langFromCountry(country);
    const al = h.get("accept-language") ?? "";
    if (al) {
      const c = parseAcceptLanguage(al);
      if (c) return langFromCountry(c);
      if (al.toLowerCase().startsWith("es")) return "es";
    }
    return "en";
  });

export type ReelsCopy = {
  balance: string;
  welcome: {
    title: string;
    body: string;
    cta: string;
    hint: string;
    socialProof: string;
    secured: string;
    bonus: string;
  };
  header: {
    reelOf: string;
    total: string;
  };
  footer: {
    title: string;
    subtitle: string;
    nextTitle: string;
    nextSubtitle: string;
    endsIn: string;
    seconds: string;
  };
  nav: {
    wallet: string;
    home: string;
    profile: string;
  };
  wallet: {
    title: string;
    subtitle: string;
    currentBalance: string;
    availableInAccount: string;
    requestWithdrawal: string;
    payoutMethod: string;
    bankTransfer: string;
    minWithdrawal: string;
    status: string;
    active: string;
    points: string;
    lastBonus: string;
    payoutSection: string;
    transferVia: string;
    minAmountNote: string;
    addMethod: string;
    methodsTitle: string;
    expiresIn: string;
    eligibleNote: string;
    youllWithdraw: string;
    secureTitle: string;
    secureDesc: string;
  };
  withdrawBlock: {
    title: string;
    body: string;
    cta: string;
  };
  profile: {
    title: string;
    subtitle: string;
    accountInfo: string;
    sessionEmail: string;
    notProvided: string;
    currentBalance: string;
    status: string;
    active: string;
  };
  reward: {
    earned: string;
    newBalance: string;
  };
  reel: {
    follow: string;
    swipeUp: string;
  };
  exit: {
    title: string;
    body: string;
    leave: string;
    continue: string;
  };
  limit: {
    title: string;
    titleHighlight: string;
    body: string;
    detailsTitle: string;
    videosWatched: string;
    sessionTime: string;
    videosReviewed: string;
    videosLiked: string;
    readyNote: string;
    cta: string;
    disclaimer: string;
    watchedPrefix: string;
    watchedSuffix: string;
    withdrawHint: string;
    dailyLimit: string;
    videosUnit: string;
    todaysEarnings: string;
  };
  rewardPopup: {
    title: string;
    body: string;
    expiresIn: string;
    cta: string;
  };
};

const COPY: Record<Lang, ReelsCopy> = {
  en: {
    balance: "Balance",
    welcome: {
      title: "Earn cash by watching short Reels",
      body: "Watch each Reel to the end — your reward is added to your balance instantly.",
      cta: "Start earning now →",
      hint: "Takes ~2 minutes · Short reels",
      socialProof: "12,847 users paid this week",
      secured: "Secured by Meta Rewards",
      bonus: "$0.50 welcome bonus already in your balance",
    },
    header: { reelOf: "Reel", total: "total" },
    footer: {
      title: "Watch to earn your reward",
      subtitle: "Keep watching until the end to receive it",
      nextTitle: "Next reel unlocked",
      nextSubtitle: "Swipe up to continue",
      endsIn: "Ends in",
      seconds: "s",
    },
    nav: { wallet: "Wallet", home: "Home", profile: "Profile" },
    wallet: {
      title: "Redeem rewards",
      subtitle: "Your balance expires in",
      currentBalance: "Your balance",
      availableInAccount: "Available in your account",
      requestWithdrawal: "Withdraw money",
      payoutMethod: "Payout method",
      bankTransfer: "Bank transfer",
      minWithdrawal: "Minimum withdrawal",
      status: "Status",
      active: "ACTIVE",
      points: "points",
      lastBonus: "Last bonus",
      payoutSection: "Withdraw money",
      transferVia: "Transfer via",
      minAmountNote: "To withdraw money, a minimum balance of $ 1.50 is required. Withdrawal limits per transaction and per month may vary depending on country or region.",
      addMethod: "Add a payment method",
      methodsTitle: "Add a payment method",
      expiresIn: "YOUR BALANCE EXPIRES IN",
      eligibleNote: "Great job! You're eligible to redeem.",
      youllWithdraw: "You'll withdraw",
      secureTitle: "Secure & protected",
      secureDesc: "Your data and earnings are 100% safe with Meta Rewards.",
    },
    withdrawBlock: {
      title: "Withdrawal not available yet",
      body: "You can't request a withdrawal right now. Please continue watching videos to unlock your payout.",
      cta: "Keep watching",
    },
    profile: {
      title: "My Account",
      subtitle: "Manage your profile and track your earnings",
      accountInfo: "Account information",
      sessionEmail: "Session email",
      notProvided: "Not provided",
      currentBalance: "Current balance:",
      status: "Status:",
      active: "ACTIVE",
    },
    reward: { earned: "earned!", newBalance: "New balance:" },
    reel: { follow: "Follow", swipeUp: "Swipe up for the next reward" },
    exit: {
      title: "Keep watching",
      body: "If you leave you'll lose your progress. Do you want to leave or continue?",
      leave: "Leave",
      continue: "Continue",
    },
    limit: {
      title: "You've reached all the",
      titleHighlight: "activity criteria.",
      body: "We confirmed that your account has met the minimum usage requirements. Check the summary below and tap to release your progress.",
      detailsTitle: "Your activity details",
      videosWatched: "Videos watched",
      sessionTime: "Time on platform",
      videosReviewed: "Videos reviewed",
      videosLiked: "Videos liked",
      readyNote: "All set! Your activity is validated. Tap to release your progress.",
      cta: "Release my progress",
      disclaimer: "The data above is generated automatically based on your recent activity on the platform.",
      watchedPrefix: "You've watched ",
      watchedSuffix: " videos today",
      withdrawHint: "Withdraw your balance to keep earning rewards",
      dailyLimit: "Daily limit",
      videosUnit: "videos",
      todaysEarnings: "Today's earnings",
    },
    rewardPopup: {
      title: "Meta Rewards",
      body: "Congrats! This is part of an exclusive rewards campaign.",
      expiresIn: "Expires in",
      cta: "Claim now",
    },
  },
  es: {
    balance: "Saldo",
    welcome: {
      title: "Gana dinero viendo Reels cortos",
      body: "Mira cada Reel hasta el final — tu recompensa se suma a tu saldo al instante.",
      cta: "Empezar a ganar →",
      hint: "Toma ~2 minutos · Reels cortos",
      socialProof: "12.847 usuarios pagados esta semana",
      secured: "Protegido por Meta Rewards",
      bonus: "$0.50 de bono de bienvenida ya en tu saldo",
    },
    header: { reelOf: "Reel", total: "total" },
    footer: {
      title: "Mira para ganar tu recompensa",
      subtitle: "Sigue mirando hasta el final para recibirla",
      nextTitle: "Siguiente reel desbloqueado",
      nextSubtitle: "Desliza hacia arriba para continuar",
      endsIn: "Termina en",
      seconds: "s",
    },
    nav: { wallet: "Billetera", home: "Inicio", profile: "Perfil" },
    wallet: {
      title: "Canjear recompensas",
      subtitle: "Tu saldo expira en",
      currentBalance: "Tu saldo",
      availableInAccount: "Disponible en tu cuenta",
      requestWithdrawal: "Retirar dinero",
      payoutMethod: "Método de pago",
      bankTransfer: "Transferencia bancaria",
      minWithdrawal: "Retiro mínimo",
      status: "Estado",
      active: "ACTIVO",
      points: "puntos",
      lastBonus: "Último bono",
      payoutSection: "Retirar dinero",
      transferVia: "Transferencia vía",
      minAmountNote: "Para retirar dinero se requiere un saldo mínimo de $ 1,50. Los límites de retiro por transacción y por mes pueden variar según el país o la región.",
      addMethod: "Añadir un método de pago",
      methodsTitle: "Añadir un método de pago",
      expiresIn: "TU SALDO EXPIRA EN",
      eligibleNote: "¡Buen trabajo! Ya puedes canjear.",
      youllWithdraw: "Vas a retirar",
      secureTitle: "Seguro y protegido",
      secureDesc: "Tus datos y ganancias están 100% seguros con Meta Rewards.",
    },
    withdrawBlock: {
      title: "Retiro aún no disponible",
      body: "No puedes solicitar un retiro en este momento. Por favor, continúa viendo videos para desbloquear tu pago.",
      cta: "Seguir mirando",
    },
    profile: {
      title: "Mi Cuenta",
      subtitle: "Administra tu perfil y rastrea tus ganancias",
      accountInfo: "Información de la cuenta",
      sessionEmail: "Correo de sesión",
      notProvided: "No proporcionado",
      currentBalance: "Saldo actual:",
      status: "Estado:",
      active: "ACTIVO",
    },
    reward: { earned: "¡ganados!", newBalance: "Nuevo saldo:" },
    reel: { follow: "Seguir", swipeUp: "Desliza hacia arriba para la próxima recompensa" },
    exit: {
      title: "Sigue mirando",
      body: "Si sales perderás tu progreso. ¿Quieres salir o continuar?",
      leave: "Salir",
      continue: "Continuar",
    },
    limit: {
      title: "Has alcanzado todos los",
      titleHighlight: "criterios de actividad.",
      body: "Confirmamos que tu cuenta cumplió con los requisitos mínimos de uso. Revisa el resumen a continuación y toca para liberar tu progreso.",
      detailsTitle: "Detalles de tu actividad",
      videosWatched: "Videos vistos",
      sessionTime: "Tiempo en la plataforma",
      videosReviewed: "Videos evaluados",
      videosLiked: "Videos con me gusta",
      readyNote: "¡Listo! Tu uso fue validado. Toca para liberar tu progreso.",
      cta: "Liberar mi progreso",
      disclaimer: "Los datos anteriores se generan automáticamente en base a tu interacción reciente en la plataforma.",
      watchedPrefix: "Has visto ",
      watchedSuffix: " videos hoy",
      withdrawHint: "Retira tu saldo para seguir ganando recompensas",
      dailyLimit: "Límite diario",
      videosUnit: "videos",
      todaysEarnings: "Ganancias de hoy",
    },
    rewardPopup: {
      title: "Recompensas de Meta Rewards",
      body: "¡Felicidades! Esto forma parte de una campaña de recompensas exclusiva.",
      expiresIn: "Expira en",
      cta: "Reclamar ahora",
    },
  },
};

export function getReelsCopy(lang: Lang): ReelsCopy {
  return COPY[lang] ?? COPY.en;
}
