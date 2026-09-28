export default function ProductPreview() {
  return (
    <div className="mx-auto mb-14 w-full max-w-4xl">
      {/* Workflow strip */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {["Import", "Parse", "Retrieve", "Answer", "Trace"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className="font-pixel rounded-full border border-border/70 bg-card/70 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-foreground">
              {step}
            </div>
            {i < 4 && <span className="text-primary text-xs">→</span>}
          </div>
        ))}
      </div>

      {/* Chat UI mockup */}
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-[var(--shadow-elevated)]">
        {/* Title bar */}
        <div className="flex h-11 items-center border-b border-border/70 bg-muted/80 px-4 dark:bg-[#232937]">
          <div className="flex items-center gap-1.5">
            <span className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="block h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="block h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            pallas — knowledge chat
          </span>
        </div>
        {/* Chat body */}
        <div className="bg-card p-4 font-mono text-[12px] leading-6 md:p-6 dark:bg-[#0d1118]">
          {/* User message */}
          <div className="mb-4 flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-md border border-primary/20 bg-primary/5 px-4 py-3 dark:border-primary/25 dark:bg-primary/10">
              <span className="text-blue-700 dark:text-[#89b4fa]">You</span>
              <p className="mt-1 text-foreground dark:text-[#d8e1f0]">
                How do I reset a user's workspace password?
              </p>
            </div>
          </div>
          {/* Agent response */}
          <div className="mb-4">
            <div className="max-w-[85%] rounded-2xl border border-border bg-muted/65 px-4 py-3 dark:border-white/10 dark:bg-white/[0.045]">
              <span className="text-emerald-700 dark:text-[#a6e3a1]">Pallas Agent</span>
              <p className="mt-1 leading-relaxed text-foreground dark:text-[#d8e1f0]">
                Go to <span className="text-amber-700 dark:text-[#f9c97c]">Settings → Members</span>, select
                the user, and click <span className="text-amber-700 dark:text-[#f9c97c]">"Reset Password"</span>.
                The user will receive an email with a reset link.
              </p>
              {/* Citations */}
              <div className="mt-3 border-t border-border/70 pt-2 dark:border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground dark:text-[#5c677d]">Sources:</span>
                <div className="mt-1 space-y-1">
                  <div className="text-[11px] text-teal-700 dark:text-[#94e2d5]">
                    📄 admin-guide.pdf — Ch 4.2
                  </div>
                  <div className="text-[11px] text-teal-700 dark:text-[#94e2d5]">
                    📄 onboarding-sop.md — §3.1
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Input */}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
            <span className="text-muted-foreground dark:text-[#5c677d]">Ask a question…</span>
            <span className="ml-auto text-primary text-xs">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
