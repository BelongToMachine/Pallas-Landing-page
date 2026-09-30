"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@asianode/ui/button";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function ThemeToggle({ locale }: { locale: "en" | "zh" }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    try {
      window.localStorage.setItem("pallas-theme", nextIsDark ? "dark" : "light");
    } catch {
      // Theme still changes for this page view when storage is unavailable.
    }
    setIsDark(nextIsDark);
  }

  const label = locale === "zh"
    ? isDark ? "切换到日间模式" : "切换到夜间模式"
    : isDark ? "Switch to day mode" : "Switch to night mode";

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

function LanguageSwitcher({ locale, menuId }: { locale: "en" | "zh"; menuId: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isChinese = locale === "zh";

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

  const label = isChinese ? "选择语言" : "Choose language";
  const optionClass = "block rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted";

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
        <Link
          href="/zh"
          hrefLang="zh-CN"
          aria-current={isChinese ? "page" : undefined}
          onClick={() => setOpen(false)}
          className={`${optionClass}${isChinese ? " bg-muted font-semibold" : ""}`}
        >
          中文
        </Link>
        <Link
          href="/"
          hrefLang="en"
          aria-current={!isChinese ? "page" : undefined}
          onClick={() => setOpen(false)}
          className={`${optionClass}${!isChinese ? " bg-muted font-semibold" : ""}`}
        >
          English
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const pathname = usePathname();
  const locale = pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
  const isChinese = locale === "zh";
  const navLinks = isChinese
    ? [
        { label: "产品", href: "#product" },
        { label: "知识库", href: "#knowledge" },
        { label: "智能体", href: "#agent" },
        { label: "安全", href: "#security" },
        { label: "方案", href: "#plans" },
        { label: "客户反馈", href: "#customer-story" },
      ]
    : [
        { label: "Product", href: "#product" },
        { label: "Knowledge", href: "#knowledge" },
        { label: "Agent", href: "#agent" },
        { label: "Security", href: "#security" },
        { label: "Plans", href: "#plans" },
        { label: "CEO feedback", href: "#customer-story" },
      ];
  const demoLabel = isChinese ? "预约演示" : "Request a demo";

  return (
    <header
      className="site-header fixed inset-x-0 top-0 z-[1200]"
      data-announcement-visible={announcementVisible}
    >
      {announcementVisible && (
        <aside
          lang={isChinese ? "zh-CN" : "en"}
          aria-label={isChinese ? "销售信息" : "Sales announcement"}
          className="bg-secondary text-secondary-foreground"
        >
          <div className="relative mx-auto flex min-h-9 w-full max-w-[1300px] flex-wrap items-center justify-center gap-x-3 gap-y-0.5 px-12 py-1.5 text-center text-xs leading-5 sm:text-sm lg:flex-nowrap lg:py-1">
            <p>
              {isChinese
                ? "Pallas 正处于 MVP 阶段，现可承接私有化部署；前几位客户可享 5 折优惠。"
                : "Pallas is in the MVP stage and open to private deployments. Early customers get a 50% discount."}
            </p>
            <a
              href="#demo"
              className="inline-flex shrink-0 items-center gap-1 font-semibold underline decoration-current/50 underline-offset-4 transition-colors hover:decoration-current"
            >
              {isChinese ? "咨询合作" : "Discuss deployment"}
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setAnnouncementVisible(false)}
              aria-label={isChinese ? "关闭销售通知" : "Dismiss sales announcement"}
              className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/10 focus-visible:outline-offset-2"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </aside>
      )}

      <nav
        lang={isChinese ? "zh-CN" : "en"}
        aria-label={isChinese ? "主导航" : "Primary navigation"}
        className="border-b border-border/65 bg-background/95 shadow-[0_8px_24px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 w-full max-w-[1300px] items-center justify-between px-5 2xl:px-8">
          {/* Brand */}
          <Link
            href={isChinese ? "/zh" : "/"}
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
                  className={`${isChinese ? "" : "font-pixel"} text-muted-foreground hover:text-foreground transition-colors duration-200`}
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
              <a href="#demo">
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
                <a href="#demo">
                  {demoLabel}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <button
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border/80 text-foreground transition-colors hover:bg-muted"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={isChinese ? "切换菜单" : "Toggle menu"}
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
                    className={`${isChinese ? "" : "font-pixel"} block border-b border-border/60 py-3 text-sm text-foreground hover:text-primary transition-colors`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3 md:hidden">
                <Button asChild className="w-full">
                  <a href="#demo" onClick={() => setMobileOpen(false)}>
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
