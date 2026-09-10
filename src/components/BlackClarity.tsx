import { useEffect } from "react";

const CLARITY_ID = "xmzevmpqwb";

export function BlackClarity() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as any;
    if (w.clarity && w.clarity._initialized) return;

    const c = (w.clarity =
      w.clarity ||
      function () {
        (w.clarity.q = w.clarity.q || []).push(arguments);
      });
    c._initialized = true;

    const load = () => {
      const t = document.createElement("script");
      t.type = "text/javascript";
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
      const y = document.getElementsByTagName("script")[0];
      y?.parentNode?.insertBefore(t, y);
    };
    // Defer so it never competes with first paint / interactivity
    if ("requestIdleCallback" in w) w.requestIdleCallback(load, { timeout: 4000 });
    else setTimeout(load, 3000);
  }, []);

  return null;
}
