"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isChinese = pathname === "/zh" || pathname.startsWith("/zh/");
  const productLinks = isChinese
    ? [
        { label: "AI 知识库", href: "#knowledge" },
        { label: "AI 智能体", href: "#agent" },
        { label: "权限管理", href: "#security" },
        { label: "销售方案", href: "#plans" },
        { label: "客户反馈", href: "#customer-story" },
      ]
    : [
        { label: "Knowledge Base", href: "#knowledge" },
        { label: "AI Agent", href: "#agent" },
        { label: "Permissions", href: "#security" },
        { label: "Sales plans", href: "#plans" },
        { label: "CEO feedback", href: "#customer-story" },
      ];
  const resourceLinks = isChinese
    ? [
        { label: "产品文档", href: "#docs" },
        { label: "API 参考", href: "#api" },
        { label: "更新日志", href: "#changelog" },
      ]
    : [
        { label: "Documentation", href: "#docs" },
        { label: "API Reference", href: "#api" },
        { label: "Changelog", href: "#changelog" },
      ];
  const copy = isChinese
    ? {
        description: "面向团队的 AI 知识库。导入文档、设置访问权限，让团队获得可信且可追溯的答案。",
        product: "产品",
        resources: "资源",
        copyright: "© 2026 Pallas。保留所有权利。",
        privacy: "隐私政策",
        terms: "服务条款",
      }
    : {
        description: "Enterprise knowledge base AI Agent. Import your docs, set permissions, and get traceable answers your team can trust.",
        product: "Product",
        resources: "Resources",
        copyright: "© 2026 Pallas. All rights reserved.",
        privacy: "Privacy",
        terms: "Terms",
      };

  return (
    <footer lang={isChinese ? "zh-CN" : "en"} className="relative z-40 border-t-4 border-border bg-background mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
        <div className="grid gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(11rem,0.8fr)_minmax(0,1fr)] lg:gap-x-12">
          {/* Brand column */}
          <div className="space-y-4 border-b-2 border-border/70 pb-8 md:col-span-2 lg:col-span-1 lg:border-b-0 lg:border-r-2 lg:pb-0 lg:pr-10">
            <div className="flex items-center gap-3">
              <Image src="/pallas-mark.svg" alt="" width={32} height={32} />
              <p className="font-pixel text-lg uppercase tracking-[0.14em] text-foreground sm:text-xl lg:text-2xl">
                Pallas
              </p>
            </div>
            <p className="max-w-[36rem] text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {copy.description}
            </p>
          </div>

          {/* Product links */}
          <div className="space-y-4">
            <p className={`${isChinese ? "" : "font-pixel uppercase tracking-[0.28em]"} text-[11px] text-primary sm:text-xs`}>
              {copy.product}
            </p>
            <ul className="grid gap-1.5">
              {productLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center justify-between border-b border-border/60 py-2.5 transition-colors duration-200 hover:border-primary/40"
                  >
                    <span className={`${isChinese ? "" : "font-pixel uppercase tracking-[0.14em]"} text-sm text-foreground transition-colors duration-200 group-hover:text-primary sm:text-[15px]`}>
                      {link.label}
                    </span>
                    <span className="font-pixel text-xs tracking-[0.16em] text-muted-foreground transition-colors duration-200 group-hover:text-primary sm:text-sm">
                      0{index + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <p className={`${isChinese ? "" : "font-pixel uppercase tracking-[0.28em]"} text-[11px] text-primary sm:text-xs`}>
              {copy.resources}
            </p>
            <ul className="grid gap-1.5">
              {resourceLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center justify-between border-b border-border/60 py-2.5 transition-colors duration-200 hover:border-primary/40"
                  >
                    <span className={`${isChinese ? "" : "font-pixel uppercase tracking-[0.14em]"} text-sm text-foreground transition-colors duration-200 group-hover:text-primary sm:text-[15px]`}>
                      {link.label}
                    </span>
                    <span className="font-pixel text-xs tracking-[0.16em] text-muted-foreground transition-colors duration-200 group-hover:text-primary sm:text-sm">
                      0{index + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t-2 border-border/80 pt-4 sm:mt-10 sm:pt-5 lg:mt-12">
          <div className="flex flex-col items-center gap-4 min-[560px]:flex-row min-[560px]:justify-between min-[560px]:gap-6">
            <p className={`shrink-0 whitespace-nowrap text-center text-[11px] text-muted-foreground sm:text-[15px] ${isChinese ? "" : "font-pixel tracking-[0.06em] sm:tracking-[0.08em]"}`}>
              {copy.copyright}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className={`text-[11px] text-muted-foreground hover:text-primary transition-colors sm:text-xs ${isChinese ? "" : "font-pixel uppercase tracking-[0.14em]"}`}
              >
                {copy.privacy}
              </a>
              <a
                href="#"
                className={`text-[11px] text-muted-foreground hover:text-primary transition-colors sm:text-xs ${isChinese ? "" : "font-pixel uppercase tracking-[0.14em]"}`}
              >
                {copy.terms}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
