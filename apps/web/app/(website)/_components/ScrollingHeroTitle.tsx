"use client";

import { useEffect } from "react";
import type { SiteLocale } from "@/lib/i18n";

const titles: Record<SiteLocale, [string, string]> = {
  en: ["YOUR NEXT GEN", "TEAM’S AI KNOWLEDGE HUB"],
  zh: ["新一代团队", "AI 知识中枢"],
  tr: ["EKİBİNİZİN YENİ NESLİ", "EKİBİNİZİN AI BİLGİ MERKEZİ"],
  fr: ["LA NOUVELLE GÉNÉRATION", "DE VOTRE ÉQUIPE"],
  ja: ["次世代のチーム", "AI ナレッジハブ"],
  es: ["LA NUEVA GENERACIÓN", "DE TU EQUIPO"],
};

export default function ScrollingHeroTitle({ locale }: { locale: SiteLocale }) {
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
        {titles[locale][0]}
      </span>
      <span className="mt-[0.08em] block text-balance text-[clamp(2rem,5.8vw,5.25rem)] leading-[1.02] tracking-[0.01em] text-primary">
        {titles[locale][1]}
      </span>
    </h1>
  );
}
