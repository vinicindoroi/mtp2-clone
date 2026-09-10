import type { Lang } from "@/lib/reels-i18n";

export type Up1Copy = {
  oto: {
    accessConfirmed: string;
    heroTitle: string;
    heroBody: string;
    heroQuote: string;
    agitation1: string;
    agitation2: string;
    agitation3: string;
    solutionBadge: string;
    solutionTitle: string;
    solutionBody: string;
    solutionHowItWorks: string;
    dayCardTitle: string;
    dayItems: string[];
    solutionFooter: string;
    includesTitle: string;
    includesItems: { t: string; d: string }[];
    valueBadge: string;
    valueBody: string;
    valueFooter: string;
    autoChargeBanner: string;
    ctaPrimary: (price: string) => string;
    ctaPrimaryNote: string;
    orDivider: string;
    ctaSecondary: string;
    ctaSecondaryNote: string;
    testimonials: { ini: string; name: string; text: string; result: string }[];
    guarantee: string;
  };
  black: {
    step: string;
    congrats: string;
    body1: string;
    body2: string;
    cta: string;
    secure: string;
    rights: string;
  };
};

const COPY: Record<Lang, Up1Copy> = {
  es: {
    oto: {
      accessConfirmed: "TU ACCESO ESTÁ CONFIRMADO ✓",
      heroTitle: "Antes de ir a tu app... hay algo importante que necesitas saber.",
      heroBody:
        "El protocolo que acabas de desbloquear te muestra QUÉ está pasando con tus hormonas. Pero hay una pregunta que el 94% de las mujeres nos hace justo después de entrar:",
      heroQuote: "“¿Y ahora... por dónde empiezo?”",
      agitation1:
        "Tener la información es el primer paso. Pero la mayoría de las mujeres que solo tienen el diagnóstico hormonal hacen lo mismo: leen todo, se emocionan, intentan aplicar todo a la vez...",
      agitation2:
        "...y en dos semanas vuelven a los viejos hábitos porque no tenían un camino claro día a día.",
      agitation3:
        "No porque sean débiles. Sino porque saber lo que hay que hacer es muy diferente a saber exactamente qué hacer HOY. Mañana. Y pasado mañana.",
      solutionBadge: "COMPLEMENTO OFICIAL DEL PROTOCOLO",
      solutionTitle: "Protocolo Completo 30 Días — tu guía diaria dentro del app",
      solutionBody:
        "Es la extensión natural de lo que acabas de comprar. Cada día, cuando abras el app, vas a encontrar exactamente lo que tienes que hacer ese día — sin adivinar, sin improvisar.",
      solutionHowItWorks: "Así funciona cada día del protocolo:",
      dayCardTitle: "📅 Día 7 — Semana 1",
      dayItems: [
        "🍽 Alimentación: Agrega esta combinación al desayuno para reducir el pico de insulina de la mañana",
        "⏰ Horario: El momento exacto para comer la primera comida según tu perfil hormonal",
        "🌿 Hábito del día: Un ajuste de 5 minutos que reduce el cortisol antes de dormir",
      ],
      solutionFooter: "Así de simple. Así de específico. Sin adivinar.",
      includesTitle: "Todo lo que desbloqueas hoy:",
      includesItems: [
        {
          t: "30 días de orientación diaria paso a paso",
          d: "Qué comer, en qué horario y qué hábito incluir — cada día, sin ambigüedad.",
        },
        {
          t: "Secuencia correcta de los 5 hormonas",
          d: "El orden importa. El protocolo respeta la jerarquía hormonal para que cada semana potencie la anterior.",
        },
        {
          t: "Plan de alimentación sin restricciones extremas",
          d: "Sin contar calorías. Sin eliminar grupos de alimentos. Solo reorganizar lo que ya comes.",
        },
        {
          t: "Lista de compras semanal",
          d: "Lo que necesitas comprar cada semana, sin productos difíciles de encontrar ni importados.",
        },
        {
          t: "Guía de síntomas semana a semana",
          d: "Sabrás exactamente qué síntomas esperar que mejoren en cada semana — para que no desistas cuando el cuerpo está cambiando.",
        },
        {
          t: "Acceso vitalicio dentro del app",
          d: "Lo desbloqueas hoy, lo tienes para siempre. Puedes repetir el protocolo cuando quieras.",
        },
      ],
      valueBadge: "¿POR QUÉ $27 Y NO $97?",
      valueBody:
        "Porque acabas de confiar en nosotras con $5. Y queremos que llegues hasta el día 30. Este precio es exclusivo para los primeros minutos después de tu compra — no va a estar disponible en ningún otro lugar.",
      valueFooter: "Pago único — acceso vitalicio",
      autoChargeBanner: "Cobro automático en tu tarjeta guardada. Un solo click. Sin formularios.",
      ctaPrimary: (price) => `✓ Sí, agregar el Protocolo Completo — ${price}`,
      ctaPrimaryNote:
        "Se carga automáticamente a tu método de pago guardado • Acceso inmediato en tu app • Garantía 7 días",
      orDivider: "— o —",
      ctaSecondary: "No gracias, continuar solo con el diagnóstico",
      ctaSecondaryNote: "Podrás acceder a esta oferta más tarde, pero a un precio diferente.",
      testimonials: [
        {
          ini: "V",
          name: "V.R., Colombia",
          text: "El día a día fue lo que me faltaba.",
          result: "En 30 días bajé 6kg.",
        },
        {
          ini: "M",
          name: "M.T., México",
          text: "Nunca había tenido un plan tan claro.",
          result: "Sin adivinar qué comer.",
        },
        {
          ini: "P",
          name: "P.L., Argentina",
          text: "La guía de síntomas me salvó —",
          result: "pensé en abandonar en la semana 2.",
        },
      ],
      guarantee:
        "Si en 7 días sientes que el Protocolo Completo no era lo que necesitabas, te devolvemos los $27 sin preguntas. Los $5 del acceso inicial también están cubiertos por la misma garantía.",
    },
    black: {
      step: "Paso 1 de 3 — no cierres",
      congrats: "¡Felicidades!",
      body1: "Tu acceso ha sido confirmado.",
      body2: "Haz clic abajo para continuar accediendo al programa:",
      cta: "Siguiente paso",
      secure: "Conexión segura · Meta Rewards",
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    oto: {
      accessConfirmed: "YOUR ACCESS IS CONFIRMED ✓",
      heroTitle: "Before you head to your app... there's something important you need to know.",
      heroBody:
        "The protocol you just unlocked shows you WHAT is happening with your hormones. But there's one question 94% of women ask us right after getting in:",
      heroQuote: "“So... where do I even start?”",
      agitation1:
        "Having the information is the first step. But most women who only have the hormonal diagnosis do the same thing: they read everything, get excited, try to apply it all at once...",
      agitation2:
        "...and within two weeks they're back to old habits because they never had a clear day-by-day path.",
      agitation3:
        "Not because they're weak. But because knowing what to do is very different from knowing exactly what to do TODAY. Tomorrow. And the day after.",
      solutionBadge: "OFFICIAL PROTOCOL COMPANION",
      solutionTitle: "Full 30-Day Protocol — your daily guide inside the app",
      solutionBody:
        "It's the natural extension of what you just bought. Every day, when you open the app, you'll find exactly what you need to do that day — no guessing, no improvising.",
      solutionHowItWorks: "Here's how each day of the protocol works:",
      dayCardTitle: "📅 Day 7 — Week 1",
      dayItems: [
        "🍽 Nutrition: Add this combination to breakfast to reduce your morning insulin spike",
        "⏰ Timing: The exact moment to eat your first meal based on your hormonal profile",
        "🌿 Habit of the day: A 5-minute adjustment that lowers cortisol before bed",
      ],
      solutionFooter: "That simple. That specific. No guessing.",
      includesTitle: "Everything you unlock today:",
      includesItems: [
        {
          t: "30 days of step-by-step daily guidance",
          d: "What to eat, when, and which habit to include — every day, with zero ambiguity.",
        },
        {
          t: "The correct sequence of the 5 hormones",
          d: "Order matters. The protocol respects the hormonal hierarchy so each week builds on the last.",
        },
        {
          t: "A meal plan with no extreme restrictions",
          d: "No calorie counting. No eliminating food groups. Just reorganizing what you already eat.",
        },
        {
          t: "Weekly shopping list",
          d: "Exactly what to buy each week — no hard-to-find or imported products.",
        },
        {
          t: "Week-by-week symptom guide",
          d: "You'll know exactly which symptoms to expect to improve each week — so you don't quit while your body is changing.",
        },
        {
          t: "Lifetime access inside the app",
          d: "Unlock it today, keep it forever. Repeat the protocol whenever you want.",
        },
      ],
      valueBadge: "WHY $27 AND NOT $97?",
      valueBody:
        "Because you just trusted us with $5. And we want you to make it all the way to day 30. This price is exclusive to the first few minutes after your purchase — it won't be available anywhere else.",
      valueFooter: "One-time payment — lifetime access",
      autoChargeBanner: "Automatic charge to your saved card. One click. No forms.",
      ctaPrimary: (price) => `✓ Yes, add the Full Protocol — ${price}`,
      ctaPrimaryNote:
        "Automatically charged to your saved payment method • Instant access in your app • 7-day guarantee",
      orDivider: "— or —",
      ctaSecondary: "No thanks, continue with just the diagnosis",
      ctaSecondaryNote: "You can access this offer later, but at a different price.",
      testimonials: [
        {
          ini: "V",
          name: "V.R., Colombia",
          text: "The day-by-day plan was exactly what I was missing.",
          result: "Lost 13lbs in 30 days.",
        },
        {
          ini: "M",
          name: "M.T., Mexico",
          text: "I'd never had such a clear plan before.",
          result: "No more guessing what to eat.",
        },
        {
          ini: "P",
          name: "P.L., Argentina",
          text: "The symptom guide saved me —",
          result: "I almost quit in week 2.",
        },
      ],
      guarantee:
        "If within 7 days you feel the Full Protocol wasn't what you needed, we'll refund the $27, no questions asked. The $5 from your initial access is also covered by the same guarantee.",
    },
    black: {
      step: "Step 1 of 3 — don't close",
      congrats: "Congratulations!",
      body1: "Your access has been confirmed.",
      body2: "Click below to continue accessing the program:",
      cta: "Next step",
      secure: "Secure connection · Meta Rewards",
      rights: "All rights reserved.",
    },
  },
};

export function getUp1Copy(lang: Lang): Up1Copy {
  return COPY[lang] ?? COPY.en;
}
