import Image from "next/image";

export default function ProductPreview({ locale }: { locale: "en" | "zh" }) {
  const isChinese = locale === "zh";
  const steps = isChinese
    ? ["导入", "解析", "检索", "回答", "溯源"]
    : ["Import", "Parse", "Retrieve", "Answer", "Trace"];

  return (
    <div className="relative z-10 mx-auto mb-14 w-full max-w-7xl">
      {/* Workflow strip */}
      <div className="mb-7 flex flex-wrap items-center justify-center gap-2 sm:mb-8">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`${isChinese ? "" : "font-pixel uppercase tracking-[0.16em]"} rounded-full border border-border/70 bg-card/70 px-4 py-2 text-[10px] text-foreground`}>
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
              alt={isChinese
                ? "团队通过 AI 知识中枢协作，连接 PDF、Excel、Word、Markdown、图片和演示文稿"
                : "A team collaborating through an AI knowledge hub connected to PDF, XLSX, DOCX, Markdown, image, and PowerPoint files"}
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
                <span className="text-blue-700 dark:text-[#89b4fa]">{isChinese ? "你" : "You"}</span>
                <p className="mt-1 text-foreground dark:text-[#d8e1f0]">
                  {isChinese ? "如何重置用户的工作区密码？" : "How do I reset a user's workspace password?"}
                </p>
              </div>
            </div>
            {/* Agent response */}
            <div className="mb-4">
              <div className="max-w-[85%] rounded-2xl border border-border bg-muted/65 px-4 py-3 dark:border-white/10 dark:bg-white/[0.045]">
                <span className="text-emerald-700 dark:text-[#a6e3a1]">{isChinese ? "Pallas 智能体" : "Pallas Agent"}</span>
                <p className="mt-1 leading-relaxed text-foreground dark:text-[#d8e1f0]">
                  {isChinese ? (
                    <>
                      前往 <span className="text-amber-700 dark:text-[#f9c97c]">设置 → 成员</span>，选择用户，然后点击
                      <span className="text-amber-700 dark:text-[#f9c97c]">“重置密码”</span>。系统会发送密码重置邮件。
                    </>
                  ) : (
                    <>
                      Go to <span className="text-amber-700 dark:text-[#f9c97c]">Settings → Members</span>, select
                      the user, and click <span className="text-amber-700 dark:text-[#f9c97c]">"Reset Password"</span>.
                      The user will receive an email with a reset link.
                    </>
                  )}
                </p>
                {/* Citations */}
                <div className="mt-3 border-t border-border/70 pt-2 dark:border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground dark:text-[#5c677d]">
                    {isChinese ? "来源：" : "Sources:"}
                  </span>
                  <div className="mt-1 space-y-1">
                    <div className="text-[11px] text-teal-700 dark:text-[#94e2d5]">
                      {isChinese ? "📄 管理员指南.pdf — 第 4.2 节" : "📄 admin-guide.pdf — Ch 4.2"}
                    </div>
                    <div className="text-[11px] text-teal-700 dark:text-[#94e2d5]">
                      {isChinese ? "📄 入职流程.md — §3.1" : "📄 onboarding-sop.md — §3.1"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Input */}
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
              <span className="text-muted-foreground dark:text-[#5c677d]">
                {isChinese ? "输入问题…" : "Ask a question…"}
              </span>
              <span className="ml-auto text-primary text-xs">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
