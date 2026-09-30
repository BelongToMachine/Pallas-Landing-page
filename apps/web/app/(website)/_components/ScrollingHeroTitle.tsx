"use client";

import { useEffect } from "react";

export default function ScrollingHeroTitle({ locale }: { locale: "en" | "zh" }) {
  useEffect(() => {
    const title = document.querySelector<HTMLElement>("[data-pallas-hero-title]");
    const hero = title?.closest<HTMLElement>("[data-pallas-hero]");

    if (!title || !hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frameId = 0;

    const syncTitlePosition = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;

        const bounds = hero.getBoundingClientRect();
        const progress = Math.min(Math.max(-bounds.top / (bounds.height || 1), 0), 1);
        title.style.transform = `translate3d(0, ${-120 * progress}px, 0)`;
      });
    };

    syncTitlePosition();
    window.addEventListener("scroll", syncTitlePosition, { passive: true });
    window.addEventListener("resize", syncTitlePosition);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", syncTitlePosition);
      window.removeEventListener("resize", syncTitlePosition);
      title.style.transform = "";
    };
  }, []);

  return (
    <h1
      data-pallas-hero-title
      className="relative z-10 mx-auto mb-8 block w-full max-w-7xl px-2 text-center font-black uppercase leading-none tracking-[0.015em] text-foreground sm:mb-10"
    >
      <span className="block text-[clamp(2.25rem,5.3vw,4.75rem)]">
        {locale === "zh" ? "新一代团队" : "YOUR NEXT GEN"}
      </span>
      <span className="mt-[0.08em] block text-balance text-[clamp(2rem,5.8vw,5.25rem)] leading-[1.02] tracking-[0.01em] text-primary">
        {locale === "zh" ? "AI 知识中枢" : "TEAM’S AI KNOWLEDGE HUB"}
      </span>
    </h1>
  );
}
