import Image from "next/image";
import type { SiteLocale } from "@/lib/i18n";

const copy = {
  en: {
    steps: ["Import", "Parse", "Retrieve", "Answer", "Trace"],
    teamAlt: "A team collaborating through an AI knowledge hub connected to PDF, XLSX, DOCX, Markdown, image, and PowerPoint files",
    you: "You",
    question: "How do I reset a user's workspace password?",
    agent: "Pallas Agent",
    answer: 'Go to “Settings → Members”, select the user, and click “Reset Password”. The user will receive an email with a reset link.',
    sources: "Sources:",
    sourceOne: "📄 admin-guide.pdf — Ch 4.2",
    sourceTwo: "📄 onboarding-sop.md — §3.1",
    placeholder: "Ask a question…",
  },
  zh: {
    steps: ["导入", "解析", "检索", "回答", "溯源"],
    teamAlt: "团队通过 AI 知识中枢协作，连接 PDF、Excel、Word、Markdown、图片和演示文稿",
    you: "你",
    question: "如何重置用户的工作区密码？",
    agent: "Pallas 智能体",
    answer: "前往“设置 → 成员”，选择用户，然后点击“重置密码”。系统会发送密码重置邮件。",
    sources: "来源：",
    sourceOne: "📄 管理员指南.pdf — 第 4.2 节",
    sourceTwo: "📄 入职流程.md — §3.1",
    placeholder: "输入问题…",
  },
  tr: {
    steps: ["Yükle", "Ayrıştır", "Getir", "Yanıtla", "Kaynağı gör"],
    teamAlt: "PDF, XLSX, DOCX, Markdown, görsel ve PowerPoint dosyalarına bağlı bir yapay zekâ bilgi merkeziyle çalışan ekip",
    you: "Siz",
    question: "Bir kullanıcının çalışma alanı parolasını nasıl sıfırlarım?",
    agent: "Pallas Ajanı",
    answer: "Ayarlar → Üyeler bölümüne gidin, kullanıcıyı seçin ve Parolayı Sıfırla'ya tıklayın. Kullanıcıya sıfırlama bağlantısı içeren bir e-posta gönderilir.",
    sources: "Kaynaklar:",
    sourceOne: "📄 yönetici-kılavuzu.pdf — Bölüm 4.2",
    sourceTwo: "📄 işe-alım-süreci.md — §3.1",
    placeholder: "Bir soru sorun…",
  },
  fr: {
    steps: ["Importer", "Analyser", "Rechercher", "Répondre", "Vérifier"],
    teamAlt: "Une équipe qui collabore avec une base de connaissances IA reliée à des fichiers PDF, XLSX, DOCX, Markdown, images et PowerPoint",
    you: "Vous",
    question: "Comment réinitialiser le mot de passe de l’espace de travail d’un utilisateur ?",
    agent: "Agent Pallas",
    answer: "Ouvrez Paramètres → Membres, choisissez l’utilisateur, puis cliquez sur « Réinitialiser le mot de passe ». Un e-mail contenant un lien de réinitialisation lui sera envoyé.",
    sources: "Sources :",
    sourceOne: "📄 guide-admin.pdf — Chap. 4.2",
    sourceTwo: "📄 procédure-intégration.md — §3.1",
    placeholder: "Posez une question…",
  },
  ja: {
    steps: ["取り込み", "解析", "検索", "回答", "出典確認"],
    teamAlt: "PDF、Excel、Word、Markdown、画像、プレゼン資料をつなぐ AI ナレッジハブで協力するチーム",
    you: "あなた",
    question: "ユーザーのワークスペースのパスワードをリセットするには？",
    agent: "Pallas エージェント",
    answer: "「設定 → メンバー」を開き、ユーザーを選択して「パスワードをリセット」をクリックします。再設定用のメールが送信されます。",
    sources: "出典：",
    sourceOne: "📄 管理者ガイド.pdf — 第 4.2 節",
    sourceTwo: "📄 入社手順.md — §3.1",
    placeholder: "質問を入力…",
  },
  es: {
    steps: ["Importar", "Analizar", "Buscar", "Responder", "Ver fuente"],
    teamAlt: "Un equipo que colabora mediante una base de conocimiento de IA conectada a archivos PDF, XLSX, DOCX, Markdown, imágenes y PowerPoint",
    you: "Tú",
    question: "¿Cómo restablezco la contraseña del espacio de trabajo de un usuario?",
    agent: "Agente de Pallas",
    answer: "Ve a Ajustes → Miembros, selecciona al usuario y haz clic en «Restablecer contraseña». El usuario recibirá un correo con un enlace para restablecerla.",
    sources: "Fuentes:",
    sourceOne: "📄 guía-admin.pdf — Cap. 4.2",
    sourceTwo: "📄 proceso-incorporación.md — §3.1",
    placeholder: "Escribe una pregunta…",
  },
} satisfies Record<SiteLocale, {
  steps: string[];
  teamAlt: string;
  you: string;
  question: string;
  agent: string;
  answer: string;
  sources: string;
  sourceOne: string;
  sourceTwo: string;
  placeholder: string;
}>;

export default function ProductPreview({ locale }: { locale: SiteLocale }) {
  const t = copy[locale];
  const isCjkLocale = locale === "zh" || locale === "ja";

  return (
    <div lang={locale === "zh" ? "zh-CN" : locale} className="relative z-10 mx-auto mb-14 w-full max-w-7xl">
      {/* Workflow strip */}
      <div className="mb-7 flex flex-wrap items-center justify-center gap-2 sm:mb-8">
        {t.steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.16em]"} rounded-full border border-border/70 bg-card/70 px-4 py-2 text-[10px] text-foreground`}>
              {step}
            </div>
            {i < 4 && <span className="text-primary text-xs">→</span>}
          </div>
        ))}
      </div>

      <div className="grid items-stretch gap-4 lg:grid-cols-2 xl:gap-6">
        {/* Team knowledge illustration */}
        <figure className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-[var(--shadow-elevated)]">
          <div className="flex flex-1 items-center justify-center bg-primary/[0.035] p-3 sm:p-5">
            <Image
              src="/images/pallas-team-knowledge-v2.png"
              alt={t.teamAlt}
              loading="eager"
              width={1536}
              height={1024}
              sizes="(min-width: 1536px) 600px, (min-width: 1024px) 45vw, 90vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </figure>

        {/* Chat UI mockup */}
        <div className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-[var(--shadow-elevated)]">
          <div className="flex flex-1 flex-col justify-center bg-card p-4 font-mono text-[12px] leading-6 md:p-6 dark:bg-[#0d1118]">
            {/* User message */}
            <div className="mb-4 flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-md border border-primary/20 bg-primary/5 px-4 py-3 dark:border-primary/25 dark:bg-primary/10">
                <span className="text-blue-700 dark:text-[#89b4fa]">{t.you}</span>
                <p className="mt-1 text-foreground dark:text-[#d8e1f0]">
                  {t.question}
                </p>
              </div>
            </div>
            {/* Agent response */}
            <div className="mb-4">
              <div className="max-w-[85%] rounded-2xl border border-border bg-muted/65 px-4 py-3 dark:border-white/10 dark:bg-white/[0.045]">
                <span className="text-emerald-700 dark:text-[#a6e3a1]">{t.agent}</span>
                <p className="mt-1 leading-relaxed text-foreground dark:text-[#d8e1f0]">
                  {t.answer}
                </p>
                {/* Citations */}
                <div className="mt-3 border-t border-border/70 pt-2 dark:border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground dark:text-[#5c677d]">
                    {t.sources}
                  </span>
                  <div className="mt-1 space-y-1">
                    <div className="text-[11px] text-teal-700 dark:text-[#94e2d5]">
                      {t.sourceOne}
                    </div>
                    <div className="text-[11px] text-teal-700 dark:text-[#94e2d5]">
                      {t.sourceTwo}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Input */}
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
              <span className="text-muted-foreground dark:text-[#5c677d]">
                {t.placeholder}
              </span>
              <span className="ml-auto text-primary text-xs">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
