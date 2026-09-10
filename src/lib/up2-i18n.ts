import type { Lang } from "@/lib/reels-i18n";

export type Up2Copy = {
  oto2: {
    topBar: string;
    badge: string;
    heroTitle: string;
    heroBody: string;
    pills: string[];
    communityTitle: string;
    communityBody: string;
    features: { title: string; text: string }[];
    oneClickTitle: string;
    oneClickBody: string;
    oneClickNote: string;
    testimonialsTitle: string;
    testimonials: { name: string; country: string; text: string; result: string }[];
    offerBadge: string;
    offerTitle: string;
    offerList: string[];
    oldPrice: string;
    newPrice: string;
    priceNote: string;
    ctaMain: string;
    ctaSecurity: string;
    declineCta: string;
    guaranteeText: string;
    faqTitle: string;
    faqItems: { q: string; a: string }[];
    footerNote: string;
    stickyCta: string;
  };
  black: {
    step: string;
    title: string;
    body1: string;
    body2: string;
    cta: string;
    secure: string;
    rights: string;
  };
};

const COPY: Record<Lang, Up2Copy> = {
  en: {
    oto2: {
      topBar: "🔒 Special access for VitaProtocol members — one-click offer",
      badge: "NEW — VITAPROTOCOL COMMUNITY",
      heroTitle: "You're not alone on this journey.",
      heroBody:
        "Join the private social network of women who are transforming their hormonal balance — together they move faster, stay more motivated, and never feel alone in the process.",
      pills: ["👥 +3,400 active members", "🏆 Weekly challenges", "⭐ Exclusive content"],
      communityTitle: "Your own social network — right inside the app you already use",
      communityBody:
        "The VitaProtocol Community is a private social network built directly into your app. No chaotic WhatsApp groups, no Facebook, no getting lost among thousands of messages. Everything organized, everything hormonal, everything yours.",
      features: [
        {
          title: "Post feed",
          text: "Share your progress, your doubts and your wins with women who truly understand what you're going through.",
        },
        {
          title: "Reactions and comments",
          text: "Cheer others on, get support when you need it. Collective motivation means nobody gives up.",
        },
        {
          title: "Weekly challenges",
          text: "A new hormonal challenge every week. Those who complete it climb the ranking and earn recognition from the community.",
        },
        {
          title: "Progress ranking",
          text: "See your position among this week's challenge participants. Healthy competition speeds up results.",
        },
      ],
      oneClickTitle: "One-click access — no need to re-enter your card",
      oneClickBody:
        "Since you're already a VitaProtocol member, your payment method is securely saved. Clicking the button below activates your Community access instantly — no forms, no redirects, no hassle.",
      oneClickNote: "✓ One click. Instant access. No surprises.",
      testimonialsTitle: "What members already inside are saying",
      testimonials: [
        {
          name: "Andrea M.",
          country: "Mexico",
          text: "The challenge ranking hooked me from day one. Watching my name climb the list motivates me more than any diet ever did.",
          result: "Completed 4 challenges in a row",
        },
        {
          name: "Carolina V.",
          country: "Colombia",
          text: "Finally a place to talk about hormones without being told I'm exaggerating. The women here truly get it.",
          result: "Active every day for 3 weeks",
        },
        {
          name: "Renata S.",
          country: "Argentina",
          text: "I thought it was just another WhatsApp group. Nothing like it. It's organized, motivating, and addictive in the best way.",
          result: "Top 10 in this week's ranking",
        },
      ],
      offerBadge: "⚡ Exclusive offer for members",
      offerTitle: "Join now for just $19",
      offerList: [
        "Full access to the community feed",
        "Participation in all weekly challenges",
        "Your spot in the overall ranking",
        "Unlimited reactions and comments",
        "Lifetime access — pay once, it's yours forever",
      ],
      oldPrice: "$47",
      newPrice: "$19",
      priceNote: "One-time payment • Lifetime access • One click",
      ctaMain: "✓ Yes, I want to join for $19 — one click →",
      ctaSecurity:
        "🔒 Secure $19 USD charge to the payment method already on file. No redirects. Instant access.",
      declineCta: "No, thanks — decline the offer",
      guaranteeText:
        "If in 7 days you feel the VitaProtocol Community wasn't what you expected, we'll refund your $19, no questions asked. The same guarantee as always — no red tape.",
      faqTitle: "Frequently asked questions",
      faqItems: [
        {
          q: "Is it different from a WhatsApp group?",
          a: "Completely. It's a social network inside your VitaProtocol app — organized, private, and designed for hormonal progress. No chaotic notifications, no spam.",
        },
        {
          q: "Do I need to pay every month?",
          a: "No. It's a one-time payment of $19 with lifetime access. Challenges and the ranking refresh every week at no extra cost.",
        },
        {
          q: "When do I get access after clicking?",
          a: "Immediately. In under 10 seconds your profile appears in the community and you can post your first update.",
        },
      ],
      footerNote: "Payment processed securely",
      stickyCta: "Join for $19 — one click →",
    },
    black: {
      step: "Step 2 of 3 — don't close",
      title: "Congratulations!",
      body1: "Your access has been confirmed.",
      body2: "Click below to continue accessing the program:",
      cta: "Next step",
      secure: "Secure connection · Meta Rewards",
      rights: "All rights reserved.",
    },
  },
  es: {
    oto2: {
      topBar: "🔒 Acceso especial para miembros VitaProtocol — oferta de un solo clic",
      badge: "NUEVO — COMUNIDAD VITAPROTOCOL",
      heroTitle: "No estás sola en este camino.",
      heroBody:
        "Únete a la red social privada de mujeres que están transformando su equilibrio hormonal — juntas avanzan más rápido, con más motivación y sin sentirse solas en el proceso.",
      pills: ["👥 +3.400 miembros activas", "🏆 Desafíos semanales", "⭐ Contenido exclusivo"],
      communityTitle: "Tu propia red social — dentro del app que ya usas",
      communityBody:
        "La Comunidad VitaProtocol es una red social privada integrada directamente en tu app. Sin grupos de WhatsApp caóticos, sin Facebook, sin perderte entre miles de mensajes. Todo organizado, todo hormonal, todo tuyo.",
      features: [
        {
          title: "Feed de publicaciones",
          text: "Comparte tu progreso, tus dudas y tus victorias con mujeres que entienden exactamente lo que estás viviendo.",
        },
        {
          title: "Reacciones y comentarios",
          text: "Dale ánimo a otras, recibe apoyo cuando lo necesitas. La motivación colectiva hace que nadie abandone.",
        },
        {
          title: "Desafíos semanales",
          text: "Cada semana un reto hormonal nuevo. Las que completan suben en el ranking y ganan reconocimiento de la comunidad.",
        },
        {
          title: "Ranking de progreso",
          text: "Ve tu posición entre las participantes del desafío de la semana. La competencia sana acelera los resultados.",
        },
      ],
      oneClickTitle: "Acceso con un solo clic — sin volver a ingresar tu tarjeta",
      oneClickBody:
        "Como ya eres miembra VitaProtocol, tu método de pago está guardado de forma segura. Al hacer clic en el botón de abajo, el acceso a la Comunidad se activa instantáneamente — sin formularios, sin redirecciones, sin complicaciones.",
      oneClickNote: "✓ Un clic. Acceso inmediato. Sin sorpresas.",
      testimonialsTitle: "Lo que dicen las que ya están adentro",
      testimonials: [
        {
          name: "Andrea M.",
          country: "México",
          text: "El ranking de desafíos me enganchó desde el primer día. Ver mi nombre subir en la lista me da más motivación que cualquier dieta que haya hecho.",
          result: "Completó 4 desafíos seguidos",
        },
        {
          name: "Carolina V.",
          country: "Colombia",
          text: "Por fin un lugar donde hablar de hormonas sin que te digan que estás exagerando. Las chicas aquí te entienden de verdad.",
          result: "Activa todos los días por 3 semanas",
        },
        {
          name: "Renata S.",
          country: "Argentina",
          text: "Pensé que era otro grupo de WhatsApp. No tiene nada que ver. Es ordenado, motivador y adictivo en el buen sentido.",
          result: "Top 10 del ranking esta semana",
        },
      ],
      offerBadge: "⚡ Oferta exclusiva para miembros",
      offerTitle: "Únete ahora por solo $19",
      offerList: [
        "Acceso completo al feed de la comunidad",
        "Participación en todos los desafíos semanales",
        "Tu posición en el ranking general",
        "Reacciones y comentarios ilimitados",
        "Acceso vitalicio — pagas una vez, es tuyo para siempre",
      ],
      oldPrice: "$47",
      newPrice: "$19",
      priceNote: "Pago único • Acceso vitalicio • Un solo clic",
      ctaMain: "✓ Sí, quiero unirme por $19 — un solo clic →",
      ctaSecurity:
        "🔒 Cargo seguro de $19 USD en el método de pago que ya tienes registrado. Sin redirecciones. Acceso inmediato.",
      declineCta: "No, gracias — rechazar la oferta",
      guaranteeText:
        "Si en 7 días sientes que la Comunidad VitaProtocol no era lo que esperabas, te devolvemos los $19 sin preguntas. La misma garantía de siempre — sin burocracia.",
      faqTitle: "Preguntas frecuentes",
      faqItems: [
        {
          q: "¿Es diferente a un grupo de WhatsApp?",
          a: "Completamente. Es una red social dentro de tu app VitaProtocol — organizada, privada y diseñada para el progreso hormonal. Sin notificaciones caóticas, sin spam.",
        },
        {
          q: "¿Necesito pagar todos los meses?",
          a: "No. Es un pago único de $19 y el acceso es vitalicio. Los desafíos y el ranking se renuevan cada semana sin costo adicional.",
        },
        {
          q: "¿Cuándo tengo acceso después de hacer clic?",
          a: "Inmediatamente. En menos de 10 segundos tu perfil aparece en la comunidad y puedes publicar tu primera actualización.",
        },
      ],
      footerNote: "Cargo procesado de forma segura",
      stickyCta: "Unirme por $19 — un clic →",
    },
    black: {
      step: "Paso 2 de 3 — no cierres",
      title: "¡Felicidades!",
      body1: "Tu acceso ha sido confirmado.",
      body2: "Haz clic abajo para seguir accediendo al programa:",
      cta: "Siguiente paso",
      secure: "Conexión segura · Meta Rewards",
      rights: "Todos los derechos reservados.",
    },
  },
};

export function getUp2Copy(lang: Lang): Up2Copy {
  return COPY[lang] ?? COPY.en;
}
