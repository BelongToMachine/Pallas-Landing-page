"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@asianode/ui/button";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { getLocaleLabel, getSiteLocale, localeNames, siteLocales, type SiteLocale } from "@/lib/i18n";

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener("pallas-theme-change", onStoreChange);
  return () => window.removeEventListener("pallas-theme-change", onStoreChange);
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerThemeSnapshot() {
  return true;
}

function ThemeToggle({ locale }: { locale: SiteLocale }) {
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    try {
      window.localStorage.setItem("pallas-theme", nextIsDark ? "dark" : "light");
    } catch {
      // Theme still changes for this page view when storage is unavailable.
    }
    window.dispatchEvent(new Event("pallas-theme-change"));
  }

  const label = getLocaleLabel(locale, isDark ? "themeDay" : "themeNight");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-background/70 text-foreground transition-colors hover:bg-muted"
    >
      {isDark ? <Sun aria-hidden="true" className="h-4 w-4" /> : <Moon aria-hidden="true" className="h-4 w-4" />}
    </button>
  );
}

function LanguageSwitcher({ locale, menuId }: { locale: SiteLocale; menuId: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const label = getLocaleLabel(locale, "chooseLanguage");
  const optionClass = "block rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted";

  function selectLocale() {
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={label}
        aria-expanded={open}
        aria-controls={menuId}
        title={label}
        className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-background/70 text-foreground transition-colors hover:bg-muted"
      >
        <Globe aria-hidden="true" className="h-4 w-4" />
      </button>
      <div
        id={menuId}
        role="group"
        aria-label={label}
        hidden={!open}
        className="absolute right-0 top-full z-50 mt-2 min-w-32 rounded-xl border border-border bg-background p-1.5 shadow-lg"
      >
        {siteLocales.map((nextLocale) => (
          <Link
            key={nextLocale}
            href={`/?lang=${nextLocale}`}
            hrefLang={nextLocale === "zh" ? "zh-CN" : nextLocale}
            aria-current={locale === nextLocale ? "page" : undefined}
            prefetch={false}
            onClick={selectLocale}
            className={`${optionClass}${locale === nextLocale ? " bg-muted font-semibold" : ""}`}
          >
            {localeNames[nextLocale]}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const pathname = usePathname();
  const locale = getSiteLocale(pathname);
  const isCjkLocale = locale === "zh" || locale === "ja";
  const copy = {
    en: {
      links: ["Product", "Knowledge", "Agent", "Security", "Plans", "Customer stories"],
      announcement: "Pallas is in the MVP stage and open to private deployments. Early customers get a 50% discount.",
    },
    zh: {
      links: ["产品", "知识库", "智能体", "安全", "方案", "客户反馈"],
      announcement: "Pallas 正处于 MVP 阶段，现可承接私有化部署；前几位客户可享 5 折优惠。",
    },
    tr: {
      links: ["Ürün", "Bilgi Tabanı", "Ajan", "Güvenlik", "Planlar", "Müşteri hikâyeleri"],
      announcement: "Pallas şu anda MVP aşamasında ve özel dağıtıma hazır. İlk müşteriler %50 indirimden yararlanabilir.",
    },
    fr: {
      links: ["Produit", "Base de connaissances", "Agent", "Sécurité", "Offres", "Témoignages"],
      announcement: "Pallas est actuellement en phase MVP et disponible en déploiement privé. Les premiers clients bénéficient de 50 % de remise.",
    },
    ja: {
      links: ["製品", "ナレッジベース", "AI エージェント", "セキュリティ", "プラン", "お客様の声"],
      announcement: "Pallas は現在 MVP 段階で、プライベート導入に対応しています。先着のお客様は 50% 割引でご利用いただけます。",
    },
    es: {
      links: ["Producto", "Base de conocimiento", "Agente", "Seguridad", "Planes", "Casos de clientes"],
      announcement: "Pallas está en fase MVP y ya admite implementaciones privadas. Los primeros clientes obtienen un 50 % de descuento.",
    },
  }[locale];
  const navLinks = copy.links.map((label, index) => ({
    label,
    href: ["#product", "#knowledge", "#agent", "#security", "#plans", "#customer-story"][index],
  }));
  const demoLabel = getLocaleLabel(locale, "demo");

  return (
    <header
      className="site-header fixed inset-x-0 top-0 z-[1200]"
      data-announcement-visible={announcementVisible}
    >
      {announcementVisible && (
        <aside
          lang={locale === "zh" ? "zh-CN" : locale}
          aria-label={getLocaleLabel(locale, "salesAnnouncement")}
          className="bg-secondary text-secondary-foreground"
        >
          <div className="relative mx-auto flex min-h-9 w-full max-w-[1300px] flex-wrap items-center justify-center gap-x-3 gap-y-0.5 px-12 py-1.5 text-center text-xs leading-5 sm:text-sm lg:flex-nowrap lg:py-1">
            <p>
              {copy.announcement}
            </p>
            <a
              href="#demo"
              data-contact-intent="private-deployment"
              className="inline-flex shrink-0 items-center gap-1 font-semibold underline decoration-current/50 underline-offset-4 transition-colors hover:decoration-current"
            >
              {getLocaleLabel(locale, "discussDeployment")}
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setAnnouncementVisible(false)}
              aria-label={getLocaleLabel(locale, "closeAnnouncement")}
              className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/10 focus-visible:outline-offset-2"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </aside>
      )}

      <nav
        lang={locale === "zh" ? "zh-CN" : locale}
        aria-label={getLocaleLabel(locale, "primaryNavigation")}
        className="border-b border-border/65 bg-background/95 shadow-[0_8px_24px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 w-full max-w-[1300px] items-center justify-between px-5 2xl:px-8">
          {/* Brand */}
          <Link
            href={locale === "en" ? "/" : `/${locale}`}
            className="inline-flex h-12 shrink-0 items-center gap-2 text-[1.65rem] font-bold lowercase leading-none tracking-[-0.055em] text-foreground"
          >
            <Image src="/pallas-mark.svg" alt="" width={36} height={36} className="shrink-0" />
            pallas
          </Link>

          {/* Desktop nav */}
          <ul className="hidden shrink-0 items-center gap-4 relative top-1 xl:flex xl:flex-nowrap xl:whitespace-nowrap">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${isCjkLocale ? "" : "font-pixel"} text-muted-foreground hover:text-foreground transition-colors duration-200`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            <LanguageSwitcher locale={locale} menuId="desktop-language-menu" />
            <ThemeToggle locale={locale} />
            <Button asChild size="sm">
              <a href="#demo" data-contact-intent="demo">
                {demoLabel}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <LanguageSwitcher locale={locale} menuId="mobile-language-menu" />
            <ThemeToggle locale={locale} />
            <div className="hidden items-center md:flex xl:hidden">
              <Button asChild size="sm">
                <a href="#demo" data-contact-intent="demo">
                  {demoLabel}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <button
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border/80 text-foreground transition-colors hover:bg-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={getLocaleLabel(locale, "toggleMenu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div id="mobile-navigation" className="border-t border-border/65 bg-background xl:hidden">
            <ul className="px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`${isCjkLocale ? "" : "font-pixel"} block border-b border-border/60 py-3 text-sm text-foreground hover:text-primary transition-colors`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 md:hidden">
                <Button asChild className="w-full">
                  <a href="#demo" data-contact-intent="demo" onClick={() => setMobileOpen(false)}>
                    {demoLabel}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
