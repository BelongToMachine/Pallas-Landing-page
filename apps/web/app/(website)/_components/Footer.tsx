"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { getSiteLocale, type SiteLocale } from "@/lib/i18n";

const productLabels: Record<SiteLocale, string[]> = {
  en: ["Knowledge Base", "AI Agent", "Permissions", "Sales plans", "Customer stories"],
  zh: ["AI 知识库", "AI 智能体", "权限管理", "销售方案", "客户反馈"],
  tr: ["Bilgi Tabanı", "Yapay Zekâ Ajanı", "İzinler", "Satış planları", "Müşteri hikâyeleri"],
  fr: ["Base de connaissances", "Agent IA", "Permissions", "Offres", "Témoignages clients"],
  ja: ["ナレッジベース", "AI エージェント", "アクセス権限", "導入プラン", "お客様の声"],
  es: ["Base de conocimiento", "Agente de IA", "Permisos", "Planes comerciales", "Opiniones de clientes"],
};

const resourceLabels: Record<SiteLocale, string[]> = {
  en: ["Documentation", "API Reference", "Changelog"],
  zh: ["产品文档", "API 参考", "更新日志"],
  tr: ["Belgeler", "API başvurusu", "Değişiklik günlüğü"],
  fr: ["Documentation", "Référence API", "Journal des modifications"],
  ja: ["ドキュメント", "API リファレンス", "変更履歴"],
  es: ["Documentación", "Referencia de API", "Registro de cambios"],
};

const copy: Record<SiteLocale, {
  description: string;
  product: string;
  resources: string;
  copyright: string;
  privacy: string;
  terms: string;
  contact: string;
  website: string;
}> = {
  en: {
    description: "Enterprise knowledge base AI Agent. Import your docs, set permissions, and get traceable answers your team can trust.",
    product: "Product", resources: "Resources", copyright: "© 2026 Pallas. All rights reserved.", privacy: "Privacy", terms: "Terms", contact: "Contact", website: "Jie’s website",
  },
  zh: {
    description: "面向团队的 AI 知识库。导入文档、设置访问权限，让团队获得可信且可追溯的答案。",
    product: "产品", resources: "资源", copyright: "© 2026 Pallas。保留所有权利。", privacy: "隐私政策", terms: "服务条款", contact: "联系我", website: "我的个人网站",
  },
  tr: {
    description: "Ekipler için kurumsal bilgi tabanı yapay zekâsı. Belgelerinizi içe aktarın, izinleri belirleyin ve kaynaklarına kadar izlenebilen yanıtlar alın.",
    product: "Ürün", resources: "Kaynaklar", copyright: "© 2026 Pallas. Tüm hakları saklıdır.", privacy: "Gizlilik", terms: "Kullanım koşulları", contact: "İletişim", website: "Jie’nin sitesi",
  },
  fr: {
    description: "Une base de connaissances IA pour les équipes. Importez vos documents, définissez les accès et obtenez des réponses vérifiables à la source.",
    product: "Produit", resources: "Ressources", copyright: "© 2026 Pallas. Tous droits réservés.", privacy: "Confidentialité", terms: "Conditions", contact: "Me contacter", website: "Site de Jie",
  },
  ja: {
    description: "チーム向け AI ナレッジベース。ドキュメントを取り込み、アクセス権限を設定して、根拠を確認できる回答を得られます。",
    product: "製品", resources: "リソース", copyright: "© 2026 Pallas. 無断転載を禁じます。", privacy: "プライバシー", terms: "利用規約", contact: "お問い合わせ", website: "Jie のウェブサイト",
  },
  es: {
    description: "Una base de conocimiento con IA para equipos. Importa tus documentos, configura los permisos y obtén respuestas trazables y fiables.",
    product: "Producto", resources: "Recursos", copyright: "© 2026 Pallas. Todos los derechos reservados.", privacy: "Privacidad", terms: "Condiciones", contact: "Contacto", website: "Sitio web de Jie",
  },
};

export default function Footer() {
  const pathname = usePathname();
  const locale = getSiteLocale(pathname);
  const isCjkLocale = locale === "zh" || locale === "ja";
  const t = copy[locale];
  const productLinks = ["#knowledge", "#agent", "#security", "#plans", "#customer-story"].map((href, index) => ({
    href,
    label: productLabels[locale][index],
  }));
  const resourceLinks = ["#docs", "#api", "#changelog"].map((href, index) => ({
    href,
    label: resourceLabels[locale][index],
  }));

  return (
    <footer lang={locale === "zh" ? "zh-CN" : locale} className="relative z-40 border-t-4 border-border bg-background mt-auto">
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
              {t.description}
            </p>
          </div>

          {/* Product links */}
          <div className="space-y-4">
            <p className={`${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.28em]"} text-[11px] text-primary sm:text-xs`}>
              {t.product}
            </p>
            <ul className="grid gap-1.5">
              {productLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center justify-between border-b border-border/60 py-2.5 transition-colors duration-200 hover:border-primary/40"
                  >
                    <span className={`${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.14em]"} text-sm text-foreground transition-colors duration-200 group-hover:text-primary sm:text-[15px]`}>
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
            <p className={`${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.28em]"} text-[11px] text-primary sm:text-xs`}>
              {t.resources}
            </p>
            <ul className="grid gap-1.5">
              {resourceLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center justify-between border-b border-border/60 py-2.5 transition-colors duration-200 hover:border-primary/40"
                  >
                    <span className={`${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.14em]"} text-sm text-foreground transition-colors duration-200 group-hover:text-primary sm:text-[15px]`}>
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
            <p className={`shrink-0 whitespace-nowrap text-center text-[11px] text-muted-foreground sm:text-[15px] ${isCjkLocale ? "" : "font-pixel tracking-[0.06em] sm:tracking-[0.08em]"}`}>
              {t.copyright}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <a
                href="#"
                className={`text-[11px] text-muted-foreground hover:text-primary transition-colors sm:text-xs ${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.14em]"}`}
              >
                {t.privacy}
              </a>
              <a
                href="#"
                className={`text-[11px] text-muted-foreground hover:text-primary transition-colors sm:text-xs ${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.14em]"}`}
              >
                {t.terms}
              </a>
              <a
                href="#demo"
                data-contact-intent="other"
                className={`text-[11px] text-muted-foreground hover:text-primary transition-colors sm:text-xs ${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.14em]"}`}
              >
                {t.contact}
              </a>
              <a
                href="https://www.jie-craft.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[11px] text-muted-foreground hover:text-primary transition-colors sm:text-xs ${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.14em]"}`}
              >
                {t.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
