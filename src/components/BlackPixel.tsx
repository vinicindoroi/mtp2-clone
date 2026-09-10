import { useEffect } from "react";

const PIXEL_ID = "1749503493002116";

export function BlackPixel() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as any;
    if (w.fbq && w.fbq.loaded) return;

    const injectScript = () => {
      const f = window as any;
      const b = document;
      const e = "script";
      const v = "https://connect.facebook.net/en_US/fbevents.js";
      let n = f.fbq;
      if (n) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
      n("init", PIXEL_ID);
      n("track", "PageView");
    };

    injectScript();
  }, []);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
