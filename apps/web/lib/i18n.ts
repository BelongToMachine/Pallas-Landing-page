export const siteLocales = ["en", "zh", "tr", "fr", "ja", "es"] as const;

export type SiteLocale = (typeof siteLocales)[number];

export const localeNames: Record<SiteLocale, string> = {
  en: "English",
  zh: "中文",
  tr: "Türkçe",
  fr: "Français",
  ja: "日本語",
  es: "Español",
};

export function isSiteLocale(value: string | undefined): value is SiteLocale {
  return value !== undefined && (siteLocales as readonly string[]).includes(value);
}

export function getSiteLocale(pathname: string): SiteLocale {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return isSiteLocale(firstSegment) ? firstSegment : "en";
}

export function getLocaleLabel(locale: SiteLocale, key: string): string {
  const labels: Record<SiteLocale, Record<string, string>> = {
    en: {
      chooseLanguage: "Choose language",
      themeDay: "Switch to day mode",
      themeNight: "Switch to night mode",
      closeAnnouncement: "Dismiss sales announcement",
      salesAnnouncement: "Sales announcement",
      primaryNavigation: "Primary navigation",
      toggleMenu: "Toggle menu",
      demo: "Request a demo",
      discussDeployment: "Discuss deployment",
    },
    zh: {
      chooseLanguage: "选择语言",
      themeDay: "切换到日间模式",
      themeNight: "切换到夜间模式",
      closeAnnouncement: "关闭销售通知",
      salesAnnouncement: "销售信息",
      primaryNavigation: "主导航",
      toggleMenu: "切换菜单",
      demo: "预约演示",
      discussDeployment: "咨询部署",
    },
    tr: {
      chooseLanguage: "Dil seçin",
      themeDay: "Gündüz moduna geç",
      themeNight: "Gece moduna geç",
      closeAnnouncement: "Satış duyurusunu kapat",
      salesAnnouncement: "Satış duyurusu",
      primaryNavigation: "Ana gezinme",
      toggleMenu: "Menüyü aç veya kapat",
      demo: "Demo isteyin",
      discussDeployment: "Dağıtımı görüşün",
    },
    fr: {
      chooseLanguage: "Choisir la langue",
      themeDay: "Passer au thème clair",
      themeNight: "Passer au thème sombre",
      closeAnnouncement: "Fermer l’annonce commerciale",
      salesAnnouncement: "Annonce commerciale",
      primaryNavigation: "Navigation principale",
      toggleMenu: "Ouvrir ou fermer le menu",
      demo: "Demander une démo",
      discussDeployment: "Parler du déploiement",
    },
    ja: {
      chooseLanguage: "言語を選択",
      themeDay: "ライトモードに切り替え",
      themeNight: "ダークモードに切り替え",
      closeAnnouncement: "営業のお知らせを閉じる",
      salesAnnouncement: "営業のお知らせ",
      primaryNavigation: "メインナビゲーション",
      toggleMenu: "メニューを開閉",
      demo: "デモを申し込む",
      discussDeployment: "導入について相談",
    },
    es: {
      chooseLanguage: "Elegir idioma",
      themeDay: "Cambiar al modo claro",
      themeNight: "Cambiar al modo oscuro",
      closeAnnouncement: "Cerrar aviso comercial",
      salesAnnouncement: "Aviso comercial",
      primaryNavigation: "Navegación principal",
      toggleMenu: "Abrir o cerrar el menú",
      demo: "Solicitar una demo",
      discussDeployment: "Consultar el despliegue",
    },
  };

  return labels[locale][key] ?? labels.en[key] ?? key;
}

export function negotiateLocale(acceptLanguage: string | null): SiteLocale {
  if (!acceptLanguage) return "en";

  const preferences = acceptLanguage
    .split(",")
    .map((entry, index) => {
      const [tag = "", ...parameters] = entry.trim().split(";");
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const quality = qualityParameter ? Number(qualityParameter.trim().slice(2)) : 1;

      return { tag: tag.toLowerCase(), quality, index };
    })
    .filter(({ tag, quality }) => tag && tag !== "*" && Number.isFinite(quality) && quality > 0)
    .sort((left, right) => right.quality - left.quality || left.index - right.index);

  for (const { tag } of preferences) {
    const language = tag.split("-")[0];
    if (isSiteLocale(language)) return language;
  }

  return "en";
}
