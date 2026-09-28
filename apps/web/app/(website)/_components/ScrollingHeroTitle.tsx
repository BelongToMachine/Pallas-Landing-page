"use client";

import { useEffect } from "react";
import styles from "./ScrollingHeroTitle.module.css";

export default function ScrollingHeroTitle() {
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
      className={`${styles.mobileDrift} relative left-1/2 -ml-[50vw] mb-6 block w-screen whitespace-nowrap text-center text-[clamp(1rem,5vw,8rem)] font-black uppercase leading-none tracking-[0.02em] text-foreground`}
    >
      <span className="block">YOUR NEXT GEN</span>
      <span className="mt-[0.04em] block text-[1.15em]">
        <span className="inline-block bg-primary px-[0.12em] py-[0.04em] text-primary-foreground">
          TEAM’S AI KNOWLEDGE HUB
        </span>
      </span>
    </h1>
  );
}
