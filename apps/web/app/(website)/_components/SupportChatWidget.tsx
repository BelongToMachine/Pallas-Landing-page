"use client";

import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Bot, MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { getSiteLocale, type SiteLocale } from "@/lib/i18n";

const PRODUCT_LINK_PATTERN =
  /(https:\/\/(?:asianodeatlas\.com\/?|github\.com\/BelongToMachine\/agent-workflow-fast-api))/g;

function renderMessageText(text: string) {
  return text.split(PRODUCT_LINK_PATTERN).map((part, index) => {
    if (!part.startsWith("https://")) return part;

    return (
      <a
        key={`${part}-${index}`}
        href={part}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
      >
        {part}
      </a>
    );
  });
}

const copy = {
  en: {
    open: "Open Pallas support chat",
    close: "Close chat",
    title: "Ask Pallas",
    subtitle: "Product questions, answered",
    greeting: "Hi! I can help you understand Pallas, its features, and deployment options. What would you like to know?",
    suggestions: ["What does Pallas do?", "Who is Pallas for?", "How can I contact the team about private deployment?"],
    placeholder: "Ask a question about Pallas…",
    send: "Send message",
    typing: "Pallas is thinking",
    error: "I couldn't answer just now. Please try again, or contact the Pallas team.",
    note: "Answers are based on public product information.",
  },
  zh: {
    open: "打开 Pallas 智能客服",
    close: "关闭聊天",
    title: "咨询 Pallas",
    subtitle: "了解产品与部署方案",
    greeting: "你好！我可以介绍 Pallas 的产品功能和部署方式。你想了解什么？",
    suggestions: ["Pallas 是做什么的？", "Pallas 适合哪些用户？", "如何联系私有化部署？"],
    placeholder: "输入你想了解的问题…",
    send: "发送消息",
    typing: "Pallas 正在思考",
    error: "暂时没能回答，请稍后重试，或联系 Pallas 团队。",
    note: "回答依据官网公开的产品信息。",
  },
  tr: {
    open: "Pallas destek sohbetini aç",
    close: "Sohbeti kapat",
    title: "Pallas'a sorun",
    subtitle: "Ürün sorularınıza yanıt",
    greeting: "Merhaba! Pallas'ı, özelliklerini ve dağıtım seçeneklerini tanımanıza yardımcı olabilirim. Ne öğrenmek istersiniz?",
    suggestions: ["Pallas ne işe yarar?", "Pallas kimler için uygundur?", "Özel dağıtım hakkında ekiple nasıl iletişime geçebilirim?"],
    placeholder: "Pallas hakkında bir soru sorun…",
    send: "Mesaj gönder",
    typing: "Pallas düşünüyor",
    error: "Şu anda yanıt veremedim. Lütfen tekrar deneyin ya da Pallas ekibiyle iletişime geçin.",
    note: "Yanıtlar, herkese açık ürün bilgilerine dayanır.",
  },
  fr: {
    open: "Ouvrir le chat d’assistance Pallas",
    close: "Fermer le chat",
    title: "Poser une question à Pallas",
    subtitle: "Réponses sur le produit",
    greeting: "Bonjour ! Je peux vous aider à découvrir Pallas, ses fonctionnalités et ses options de déploiement. Que souhaitez-vous savoir ?",
    suggestions: ["À quoi sert Pallas ?", "À qui s’adresse Pallas ?", "Comment contacter l’équipe au sujet d’un déploiement privé ?"],
    placeholder: "Posez une question sur Pallas…",
    send: "Envoyer le message",
    typing: "Pallas réfléchit",
    error: "Je n’ai pas pu répondre pour le moment. Réessayez ou contactez l’équipe Pallas.",
    note: "Les réponses s’appuient sur les informations publiques du produit.",
  },
  ja: {
    open: "Pallas サポートチャットを開く",
    close: "チャットを閉じる",
    title: "Pallas に質問する",
    subtitle: "製品についてお答えします",
    greeting: "こんにちは。Pallas の機能や導入方法についてご案内します。何を知りたいですか？",
    suggestions: ["Pallas は何をするサービスですか？", "Pallas はどのようなユーザーに向いていますか？", "プライベート導入について、どのように問い合わせればよいですか？"],
    placeholder: "Pallas について質問する…",
    send: "メッセージを送信",
    typing: "Pallas が回答を作成中",
    error: "ただいま回答できません。もう一度お試しいただくか、Pallas チームにお問い合わせください。",
    note: "回答は公開されている製品情報に基づいています。",
  },
  es: {
    open: "Abrir el chat de soporte de Pallas",
    close: "Cerrar el chat",
    title: "Pregunta a Pallas",
    subtitle: "Respuestas sobre el producto",
    greeting: "¡Hola! Puedo ayudarte a conocer Pallas, sus funciones y opciones de despliegue. ¿Qué te gustaría saber?",
    suggestions: ["¿Qué hace Pallas?", "¿Para qué tipo de usuarios es adecuado Pallas?", "¿Cómo puedo contactar con el equipo sobre un despliegue privado?"],
    placeholder: "Pregunta sobre Pallas…",
    send: "Enviar mensaje",
    typing: "Pallas está pensando",
    error: "No he podido responder ahora. Inténtalo de nuevo o contacta con el equipo de Pallas.",
    note: "Las respuestas se basan en información pública del producto.",
  },
} satisfies Record<SiteLocale, {
  open: string;
  close: string;
  title: string;
  subtitle: string;
  greeting: string;
  suggestions: string[];
  placeholder: string;
  send: string;
  typing: string;
  error: string;
  note: string;
}>;

function getMessageText(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((part) => part.type === "text" && typeof part.text === "string")
    .map((part) => part.text)
    .join("");
}

export default function SupportChatWidget() {
  const pathname = usePathname();
  const locale = getSiteLocale(pathname);
  const t = copy[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const conversationRef = useRef<HTMLDivElement>(null);
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/ai/support",
        prepareSendMessagesRequest: ({ messages }) => ({
          body: { messages: messages.slice(-12), locale },
        }),
      }),
    [locale],
  );
  const { messages, sendMessage, status, error, clearError } = useChat({ transport });
  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  function submitMessage(value: string) {
    const text = value.trim();
    if (!text || isBusy) return;

    clearError();
    sendMessage({ text });
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage(input);
    }
  }

  return (
    <div lang={locale === "zh" ? "zh-CN" : locale} className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          id="pallas-support-chat-panel"
          aria-label={t.title}
          className="absolute bottom-[4.5rem] right-0 flex h-[min(38rem,calc(100dvh-6rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-border/80 bg-card text-card-foreground shadow-[var(--shadow-overlay)] sm:bottom-[4.75rem] sm:w-[min(24rem,calc(100vw-3rem))]"
        >
          <header className="flex items-center gap-3 border-b border-border/70 bg-background/80 px-4 py-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Bot aria-hidden="true" className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold tracking-tight text-foreground">{t.title}</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">{t.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t.close}
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </header>

          <div
            ref={conversationRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
          >
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="max-w-[92%] rounded-2xl rounded-tl-md border border-border/70 bg-background px-3.5 py-3 text-sm leading-relaxed text-foreground">
                  {t.greeting}
                </div>
                <div className="space-y-2 pl-1">
                  {t.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={isBusy}
                      onClick={() => submitMessage(suggestion)}
                      className="block max-w-full cursor-pointer rounded-full border border-primary/25 bg-primary/[0.045] px-3 py-2 text-left text-xs leading-relaxed text-foreground transition-colors hover:border-primary/45 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => {
              const text = getMessageText(message.parts);
              if (!text) return null;

              const isUser = message.role === "user";
              return (
                <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={
                      isUser
                        ? "max-w-[88%] rounded-2xl rounded-br-md bg-primary px-3.5 py-3 text-sm leading-relaxed text-primary-foreground"
                        : "max-w-[92%] rounded-2xl rounded-tl-md border border-border/70 bg-background px-3.5 py-3 text-sm leading-relaxed text-foreground"
                    }
                  >
                    <p className="whitespace-pre-wrap break-words">{renderMessageText(text)}</p>
                  </div>
                </div>
              );
            })}

            {isBusy && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-md border border-border/70 bg-background px-3.5 py-3 text-xs text-muted-foreground">
                  <span className="flex gap-1" aria-hidden="true">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:240ms]" />
                  </span>
                  {t.typing}
                </div>
              </div>
            )}

            {error && (
              <p role="alert" className="rounded-xl border border-destructive/25 bg-destructive/5 px-3 py-2.5 text-xs leading-relaxed text-destructive">
                {t.error}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-border/70 bg-background/65 p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-input bg-card px-3 py-2 transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15">
              <textarea
                value={input}
                onChange={(event) => setInput(event.currentTarget.value)}
                onKeyDown={handleKeyDown}
                maxLength={4_000}
                rows={1}
                disabled={isBusy}
                aria-label={t.placeholder}
                placeholder={t.placeholder}
                className="support-chat-input max-h-28 min-h-8 flex-1 resize-none bg-transparent py-1.5 text-sm leading-5 text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isBusy || !input.trim()}
                aria-label={t.send}
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-primary text-primary-foreground transition-[transform,background-color] hover:bg-primary/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowUp aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 px-1 text-[10px] leading-4 text-muted-foreground">{t.note}</p>
          </form>
        </section>
      )}

      <button
        type="button"
        aria-label={isOpen ? t.close : t.open}
        aria-expanded={isOpen}
        aria-controls="pallas-support-chat-panel"
        title={isOpen ? t.close : t.open}
        onClick={() => setIsOpen((open) => !open)}
        className="group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_14px_32px_-14px_hsl(var(--primary)/0.7)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_18px_38px_-14px_hsl(var(--primary)/0.72)] active:translate-y-0"
      >
        <span className="absolute inset-0 rounded-full border border-primary-foreground/15" aria-hidden="true" />
        {isOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <MessageCircle aria-hidden="true" className="h-5 w-5" />}
        <span className="sr-only">{isOpen ? t.close : t.open}</span>
      </button>
    </div>
  );
}
