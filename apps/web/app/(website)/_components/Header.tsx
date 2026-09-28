"use client";

import Link from "next/link";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@asianode/ui/button";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Knowledge", href: "#knowledge" },
  { label: "Agent", href: "#agent" },
  { label: "Security", href: "#security" },
  { label: "CEO feedback", href: "#customer-story" },
];

function ThemeToggle() {
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

  const label = isDark ? "Switch to day mode" : "Switch to night mode";

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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 top-0 z-[1200] border-b border-border/65 bg-background/95 shadow-[0_8px_24px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1300px] items-center justify-between px-5 2xl:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="inline-flex h-12 shrink-0 items-center text-[1.65rem] font-bold lowercase leading-none tracking-[-0.055em] text-foreground"
        >
          pallas
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex flex-wrap items-center gap-4 relative top-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-pixel text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button asChild size="sm">
            <a href="#demo">
              Request a demo
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border/80 text-foreground transition-colors hover:bg-muted"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-navigation" className="border-t border-border/65 bg-background md:hidden">
          <ul className="px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-pixel block border-b border-border/60 py-3 text-sm uppercase tracking-[0.14em] text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <Button asChild className="w-full">
                <a href="#demo" onClick={() => setMobileOpen(false)}>
                  Request a demo
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
