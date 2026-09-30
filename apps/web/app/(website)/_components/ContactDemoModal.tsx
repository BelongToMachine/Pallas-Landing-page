"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, LoaderCircle, Mail, Sparkles, X } from "lucide-react";
import { getSiteLocale, type SiteLocale } from "@/lib/i18n";

type Intent = "demo" | "private-deployment" | "other";
type Fields = {
  name: string;
  email: string;
  company: string;
  inquiry: string;
};
type Draft = { subject: string; body: string };
type FieldName = keyof Fields | "subject" | "body";
type ContactError = "required" | "email" | "tooLong" | "tooShort";

const EMPTY_FIELDS: Fields = { name: "", email: "", company: "", inquiry: "" };
const CONTACT_EMAIL = "jie.craft@outlook.com";

const copy: Record<SiteLocale, {
  eyebrow: string; title: string; intro: string; close: string; intent: string;
  demo: string; deployment: string; other: string; name: string; email: string;
  company: string; inquiry: string; inquiryHint: string; required: string;
  invalidEmail: string; tooLong: string; tooShort: string; generate: string;
  aiRequired: string;
  generating: string; manual: string; subject: string; body: string; send: string;
  sending: string; generated: string; generationError: string; sendError: string;
  rateLimit: string; emailNotConfigured: string; networkError: string;
  manualFallback: string; openMail: string; success: string; successHint: string;
  privacy: string; validationSummary: string; subjectPrefix: string; greeting: string;
  manualLead: string; manualAsk: string; signoff: string; nextStep: string;
  manualDraftLabel: string;
}> = {
  en: {
    eyebrow: "PALLAS / CONTACT", title: "Let’s talk about your team.", intro: "Share what you’re looking for. You can edit the AI-written email before it’s sent.", close: "Close contact form", intent: "I’m interested in", demo: "Request a product demo", deployment: "Private deployment", other: "Something else", name: "Name", email: "Work email", company: "Company (optional)", inquiry: "What would you like to discuss?", inquiryHint: "A few details help us prepare a useful response.", required: "This field is required.", invalidEmail: "Enter a valid email address.", tooLong: "This is longer than the allowed limit.", tooShort: "Please add a little more detail.", generate: "Draft email with AI", aiRequired: "Complete the required fields to use AI email drafting.", generating: "Writing your draft…", manual: "Start with a manual draft", subject: "Subject", body: "Email draft", send: "Send inquiry", sending: "Sending…", generated: "Email draft ready. Edit anything before sending.", generationError: "AI drafting is temporarily unavailable. You can retry or start with a manual draft.", sendError: "The email could not be sent. Your details are still here; try again or use the email link below.", rateLimit: "You’ve reached the request limit. Please wait a little and try again.", emailNotConfigured: "Email sending isn’t configured right now. Use the prefilled email link below instead.", networkError: "Couldn’t reach the server. Check your connection and try again.", manualFallback: "You can also write the email yourself, then send it directly.", openMail: "Open a prefilled email", success: "Your inquiry is on its way.", successHint: "Thanks for reaching out. You can close this window now.", privacy: "Your email is used only to respond to this inquiry.", validationSummary: "Please review the highlighted fields.", subjectPrefix: "Pallas inquiry", greeting: "Hello Pallas team,", manualLead: "I’m interested in", manualAsk: "Could we discuss the next steps?", signoff: "Best", nextStep: "Tell us a little about what you need.", manualDraftLabel: "Manual draft",
  },
  zh: {
    eyebrow: "PALLAS / 联系我们", title: "聊聊你的团队需求。", intro: "告诉我们你想了解什么。发送前可以编辑 AI 生成的邮件。", close: "关闭联系表单", intent: "我想咨询", demo: "预约产品演示", deployment: "企业私有化部署", other: "其他问题", name: "姓名", email: "工作邮箱", company: "公司（选填）", inquiry: "你希望沟通什么？", inquiryHint: "补充一些背景，方便我们更有针对性地回复。", required: "请填写此项。", invalidEmail: "请输入有效的邮箱地址。", tooLong: "内容超出长度限制。", tooShort: "请补充更多信息。", generate: "用 AI 起草邮件", aiRequired: "填写完必填项即可使用 AI 起草邮件。", generating: "正在起草…", manual: "手动填写邮件", subject: "邮件主题", body: "邮件内容", send: "发送咨询", sending: "正在发送…", generated: "邮件草稿已生成，可以按需修改后发送。", generationError: "AI 起草暂时不可用。你可以重试，或改用手动草稿。", sendError: "邮件发送失败，你填写的内容仍会保留。请重试，或使用下方邮件链接。", rateLimit: "请求次数已达上限，请稍后再试。", emailNotConfigured: "邮件发送服务暂未配置，请改用下方预填邮件链接。", networkError: "暂时无法连接服务器，请检查网络后重试。", manualFallback: "也可以自行撰写邮件并直接发送。", openMail: "打开预填邮件", success: "咨询已发送。", successHint: "感谢联系，可以关闭此窗口了。", privacy: "邮箱仅用于回复本次咨询。", validationSummary: "请检查标记出的字段。", subjectPrefix: "Pallas 咨询", greeting: "Pallas 团队，你们好：", manualLead: "我想咨询", manualAsk: "希望进一步沟通后续安排。", signoff: "此致", nextStep: "简单介绍一下你的需求。", manualDraftLabel: "手动草稿",
  },
  tr: {
    eyebrow: "PALLAS / İLETİŞİM", title: "Ekibiniz hakkında konuşalım.", intro: "Ne aradığınızı paylaşın. Göndermeden önce yapay zekânın yazdığı e-postayı düzenleyebilirsiniz.", close: "İletişim formunu kapat", intent: "İlgilendiğim konu", demo: "Ürün demosu talep et", deployment: "Özel kurumsal dağıtım", other: "Diğer", name: "Ad", email: "İş e-postası", company: "Şirket (isteğe bağlı)", inquiry: "Neyi görüşmek istersiniz?", inquiryHint: "Birkaç ayrıntı daha yararlı bir yanıt hazırlamamıza yardımcı olur.", required: "Bu alan gereklidir.", invalidEmail: "Geçerli bir e-posta adresi girin.", tooLong: "İzin verilen karakter sınırı aşıldı.", tooShort: "Lütfen biraz daha ayrıntı ekleyin.", generate: "Yapay zekâyla taslak oluştur", aiRequired: "Yapay zekâyla e-posta taslağı oluşturmak için gerekli alanları doldurun.", generating: "Taslak hazırlanıyor…", manual: "Elle taslak oluştur", subject: "Konu", body: "E-posta taslağı", send: "Talebi gönder", sending: "Gönderiliyor…", generated: "Taslak hazır. Göndermeden önce düzenleyebilirsiniz.", generationError: "Yapay zekâ taslağı şu anda kullanılamıyor. Tekrar deneyin veya elle taslak oluşturun.", sendError: "E-posta gönderilemedi. Bilgileriniz duruyor; tekrar deneyin veya aşağıdaki bağlantıyı kullanın.", rateLimit: "İstek sınırına ulaştınız. Biraz bekleyip tekrar deneyin.", emailNotConfigured: "E-posta gönderimi henüz yapılandırılmadı. Aşağıdaki hazır e-posta bağlantısını kullanın.", networkError: "Sunucuya ulaşılamadı. Bağlantınızı kontrol edip tekrar deneyin.", manualFallback: "E-postayı kendiniz yazıp doğrudan gönderebilirsiniz.", openMail: "Hazır e-postayı aç", success: "Talebiniz gönderildi.", successHint: "Bize ulaştığınız için teşekkürler. Bu pencereyi kapatabilirsiniz.", privacy: "E-posta adresiniz yalnızca bu talebe yanıt vermek için kullanılır.", validationSummary: "Lütfen vurgulanan alanları gözden geçirin.", subjectPrefix: "Pallas talebi", greeting: "Merhaba Pallas ekibi,", manualLead: "Şununla ilgileniyorum:", manualAsk: "Sonraki adımları görüşebilir miyiz?", signoff: "Saygılarımla", nextStep: "İhtiyacınızı kısaca paylaşın.", manualDraftLabel: "Elle yazılan taslak",
  },
  fr: {
    eyebrow: "PALLAS / CONTACT", title: "Parlons des besoins de votre équipe.", intro: "Expliquez-nous ce que vous recherchez. Vous pourrez modifier l’e-mail généré par l’IA avant l’envoi.", close: "Fermer le formulaire", intent: "Je souhaite", demo: "Demander une démo", deployment: "Déploiement privé en entreprise", other: "Autre demande", name: "Nom", email: "E-mail professionnel", company: "Entreprise (facultatif)", inquiry: "De quoi souhaitez-vous parler ?", inquiryHint: "Quelques détails nous aideront à préparer une réponse utile.", required: "Ce champ est obligatoire.", invalidEmail: "Saisissez une adresse e-mail valide.", tooLong: "La longueur maximale est dépassée.", tooShort: "Ajoutez quelques précisions.", generate: "Rédiger avec l’IA", aiRequired: "Renseignez les champs obligatoires pour utiliser la rédaction d’e-mail par IA.", generating: "Rédaction en cours…", manual: "Créer un brouillon manuel", subject: "Objet", body: "Brouillon d’e-mail", send: "Envoyer la demande", sending: "Envoi…", generated: "Le brouillon est prêt. Modifiez-le avant l’envoi si besoin.", generationError: "La rédaction par IA est temporairement indisponible. Réessayez ou créez un brouillon manuel.", sendError: "L’e-mail n’a pas pu être envoyé. Vos informations sont conservées ; réessayez ou utilisez le lien ci-dessous.", rateLimit: "La limite de demandes est atteinte. Réessayez dans quelques instants.", emailNotConfigured: "L’envoi d’e-mails n’est pas configuré. Utilisez le lien prérempli ci-dessous.", networkError: "Connexion au serveur impossible. Vérifiez votre réseau et réessayez.", manualFallback: "Vous pouvez aussi rédiger l’e-mail vous-même et l’envoyer directement.", openMail: "Ouvrir l’e-mail prérempli", success: "Votre demande a été envoyée.", successHint: "Merci de nous avoir contactés. Vous pouvez fermer cette fenêtre.", privacy: "Votre adresse e-mail sert uniquement à répondre à cette demande.", validationSummary: "Vérifiez les champs signalés.", subjectPrefix: "Demande Pallas", greeting: "Bonjour à l’équipe Pallas,", manualLead: "Je souhaite en savoir plus sur", manualAsk: "Pourrions-nous discuter des prochaines étapes ?", signoff: "Cordialement", nextStep: "Présentez-nous brièvement votre besoin.", manualDraftLabel: "Brouillon manuel",
  },
  ja: {
    eyebrow: "PALLAS / お問い合わせ", title: "チームのご要望をお聞かせください。", intro: "ご相談内容をお知らせください。送信前に AI が作成したメールを編集できます。", close: "フォームを閉じる", intent: "ご相談内容", demo: "製品デモを申し込む", deployment: "法人向けプライベート導入", other: "その他", name: "お名前", email: "仕事用メールアドレス", company: "会社名（任意）", inquiry: "どのようなことをご相談ですか？", inquiryHint: "背景を少し共有いただくと、より的確にご案内できます。", required: "入力してください。", invalidEmail: "有効なメールアドレスを入力してください。", tooLong: "文字数の上限を超えています。", tooShort: "もう少し詳しく入力してください。", generate: "AI でメールを作成", aiRequired: "AI でメールを作成するには、必須項目を入力してください。", generating: "下書きを作成中…", manual: "手動で下書きを作成", subject: "件名", body: "メール本文", send: "問い合わせを送信", sending: "送信中…", generated: "下書きを作成しました。送信前に編集できます。", generationError: "AI による作成は一時的に利用できません。再試行するか手動で作成してください。", sendError: "メールを送信できませんでした。入力内容は保持されています。再試行するか下のリンクをご利用ください。", rateLimit: "リクエスト上限に達しました。しばらくしてから再度お試しください。", emailNotConfigured: "メール送信が設定されていません。下のリンクからメールをお送りください。", networkError: "サーバーに接続できません。ネットワークを確認して再試行してください。", manualFallback: "メールを手動で作成し、直接送信することもできます。", openMail: "入力済みメールを開く", success: "お問い合わせを送信しました。", successHint: "ご連絡ありがとうございます。この画面を閉じてください。", privacy: "メールアドレスはこのお問い合わせへの返信にのみ使用します。", validationSummary: "入力内容をご確認ください。", subjectPrefix: "Pallas のお問い合わせ", greeting: "Pallas チームの皆さま", manualLead: "以下について相談したく、ご連絡しました：", manualAsk: "次のステップについてご相談できますでしょうか。", signoff: "よろしくお願いいたします", nextStep: "ご希望を簡単にお聞かせください。", manualDraftLabel: "手動の下書き",
  },
  es: {
    eyebrow: "PALLAS / CONTACTO", title: "Hablemos de tu equipo.", intro: "Cuéntanos qué necesitas. Puedes editar el correo redactado por la IA antes de enviarlo.", close: "Cerrar el formulario", intent: "Me interesa", demo: "Solicitar una demo", deployment: "Implementación privada empresarial", other: "Otra consulta", name: "Nombre", email: "Correo de trabajo", company: "Empresa (opcional)", inquiry: "¿De qué te gustaría hablar?", inquiryHint: "Unos detalles nos ayudarán a preparar una respuesta útil.", required: "Este campo es obligatorio.", invalidEmail: "Introduce un correo electrónico válido.", tooLong: "Se ha superado el límite de caracteres.", tooShort: "Añade un poco más de información.", generate: "Redactar correo con IA", aiRequired: "Completa los campos obligatorios para redactar el correo con IA.", generating: "Preparando el borrador…", manual: "Crear un borrador manual", subject: "Asunto", body: "Borrador del correo", send: "Enviar consulta", sending: "Enviando…", generated: "El borrador está listo. Puedes editarlo antes de enviarlo.", generationError: "La redacción con IA no está disponible temporalmente. Vuelve a intentarlo o crea un borrador manual.", sendError: "No se pudo enviar el correo. Conservamos tus datos; vuelve a intentarlo o usa el enlace de abajo.", rateLimit: "Has alcanzado el límite de solicitudes. Espera un poco y vuelve a intentarlo.", emailNotConfigured: "El envío de correo no está configurado. Usa el enlace con el correo preparado.", networkError: "No se pudo conectar con el servidor. Comprueba la conexión y vuelve a intentarlo.", manualFallback: "También puedes redactar el correo y enviarlo directamente.", openMail: "Abrir correo preparado", success: "Tu consulta se ha enviado.", successHint: "Gracias por escribirnos. Ya puedes cerrar esta ventana.", privacy: "Tu correo solo se utilizará para responder a esta consulta.", validationSummary: "Revisa los campos destacados.", subjectPrefix: "Consulta de Pallas", greeting: "Hola, equipo de Pallas:", manualLead: "Me interesa", manualAsk: "¿Podríamos hablar sobre los próximos pasos?", signoff: "Un saludo", nextStep: "Cuéntanos brevemente qué necesitas.", manualDraftLabel: "Borrador manual",
  },
};

const previewCopy: Record<SiteLocale, { title: string; live: string; recipient: string; hint: string; instruction: string }> = {
  en: { title: "EMAIL PREVIEW", live: "Live draft", recipient: "To Pallas", hint: "This draft updates as you enter details.", instruction: "Fill in your information on the left, then click “Draft email with AI” to create a draft." },
  zh: { title: "邮件预览", live: "实时草稿", recipient: "收件人：Pallas", hint: "草稿会根据你填写的信息实时更新。", instruction: "在左侧填写你的信息，然后点击“用 AI 生成邮件”来创建草稿。" },
  tr: { title: "E-POSTA ÖNİZLEMESİ", live: "Canlı taslak", recipient: "Alıcı: Pallas", hint: "Bu taslak, bilgileri girdikçe güncellenir.", instruction: "Soldaki bilgileri doldurun, ardından taslak oluşturmak için “Yapay zekâyla taslak oluştur” düğmesine tıklayın." },
  fr: { title: "APERÇU DE L’E-MAIL", live: "Brouillon en direct", recipient: "À : Pallas", hint: "Le brouillon se met à jour pendant la saisie.", instruction: "Renseignez vos informations à gauche, puis cliquez sur « Rédiger avec l’IA » pour créer un brouillon." },
  ja: { title: "メールプレビュー", live: "リアルタイムの下書き", recipient: "宛先：Pallas", hint: "入力内容に合わせて下書きが更新されます。", instruction: "左側に情報を入力し、「AI でメールを作成」をクリックして下書きを作成してください。" },
  es: { title: "VISTA PREVIA DEL CORREO", live: "Borrador en directo", recipient: "Para: Pallas", hint: "El borrador se actualiza mientras escribes.", instruction: "Completa tus datos a la izquierda y haz clic en «Redactar correo con IA» para crear un borrador." },
};

function createRequestId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function errorMessage(localeCopy: (typeof copy)[SiteLocale], status: number, code?: string) {
  if (status === 429 || code === "rate_limited") return localeCopy.rateLimit;
  if (code === "email_not_configured") return localeCopy.emailNotConfigured;
  return status === 0 ? localeCopy.networkError : localeCopy.sendError;
}

export default function ContactDemoModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const idempotencyKeyRef = useRef<string | null>(null);
  const [locale, setLocale] = useState<SiteLocale>("en");
  const [intent, setIntent] = useState<Intent>("demo");
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [draftSource, setDraftSource] = useState<"live" | "ai" | "manual">("live");
  const [errors, setErrors] = useState<Partial<Record<FieldName, ContactError>>>({});
  const [notice, setNotice] = useState("");
  const [noticeKind, setNoticeKind] = useState<"error" | "success">("error");
  const [generationError, setGenerationError] = useState(false);
  const [fallbackAvailable, setFallbackAvailable] = useState(false);
  const [pending, setPending] = useState<"generate" | "send" | null>(null);
  const [sent, setSent] = useState(false);
  const t = copy[locale];
  const preview = previewCopy[locale];
  const intentLabel = intent === "demo" ? t.demo : intent === "private-deployment" ? t.deployment : t.other;
  const liveDraft: Draft = {
    subject: `${t.subjectPrefix}: ${intentLabel}`.slice(0, 180),
    body: `${t.greeting}\n\n${t.manualLead} ${intentLabel}.\n\n${fields.inquiry.trim() || t.inquiryHint}\n\n${t.manualAsk}\n\n${t.signoff},\n${fields.name.trim() || "—"}`,
  };
  const currentDraft = draft ?? liveDraft;
  const canSend = Boolean(
    draft &&
    fields.name.trim() &&
      fields.email.trim() &&
      fields.inquiry.trim() &&
      currentDraft.subject.trim() &&
      currentDraft.body.trim(),
  );

  const close = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
  }, []);

  const open = useCallback((trigger: HTMLElement, selectedIntent: Intent) => {
    returnFocusRef.current = trigger;
    setLocale(getSiteLocale(window.location.pathname));
    setIntent(selectedIntent);
    setFields(EMPTY_FIELDS);
    setDraft(null);
    setDraftSource("live");
    setErrors({});
    setNotice("");
    setGenerationError(false);
    setFallbackAvailable(false);
    setPending(null);
    setSent(false);
    idempotencyKeyRef.current = null;
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
    window.requestAnimationFrame(() => firstFieldRef.current?.focus());
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest<HTMLElement>("[data-contact-intent]");
      if (!trigger) return;
      event.preventDefault();
      const requestedIntent = trigger.dataset.contactIntent;
      open(
        trigger,
        requestedIntent === "private-deployment" || requestedIntent === "other"
          ? requestedIntent
          : "demo",
      );
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  const onClose = () => {
    const trigger = returnFocusRef.current;
    window.setTimeout(() => trigger?.focus(), 0);
  };

  const getValidationError = (key: FieldName): ContactError | undefined => {
    switch (key) {
      case "name":
        if (!fields.name.trim()) return "required";
        if (fields.name.trim().length > 100) return "tooLong";
        return undefined;
      case "email":
        if (!fields.email.trim()) return "required";
        if (fields.email.trim().length > 200) return "tooLong";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) return "email";
        return undefined;
      case "company":
        return fields.company.trim().length > 100 ? "tooLong" : undefined;
      case "inquiry":
        if (!fields.inquiry.trim()) return "required";
        return fields.inquiry.trim().length > 2_000 ? "tooLong" : undefined;
      case "subject":
        if (!currentDraft.subject.trim()) return "required";
        return currentDraft.subject.trim().length > 180 ? "tooLong" : undefined;
      case "body":
        if (!currentDraft.body.trim()) return "required";
        if (currentDraft.body.trim().length < 20) return "tooShort";
        return currentDraft.body.trim().length > 5_000 ? "tooLong" : undefined;
    }
  };

  const validateFieldOnBlur = (key: FieldName) => {
    const error = getValidationError(key);
    setErrors((current) => ({ ...current, [key]: error }));
  };

  const validateBasics = (includeDraft = false) => {
    const checkedFields: FieldName[] = includeDraft
      ? ["name", "email", "company", "inquiry", "subject", "body"]
      : ["name", "email", "company", "inquiry"];
    const nextErrors: Partial<Record<FieldName, ContactError>> = {};
    for (const key of checkedFields) {
      const error = getValidationError(key);
      if (error) nextErrors[key] = error;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setNotice(t.validationSummary);
      setNoticeKind("error");
      setFallbackAvailable(false);
      const firstInvalid = Object.keys(nextErrors)[0];
      window.setTimeout(() => {
        document.getElementById(`contact-${firstInvalid}`)?.focus();
      }, 0);
      return false;
    }
    setNotice("");
    return true;
  };

  const updateField = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    idempotencyKeyRef.current = null;
    setNotice("");
    setFallbackAvailable(false);
  };

  const updateDraft = (key: keyof Draft, value: string) => {
    setDraft({ ...currentDraft, [key]: value });
    setDraftSource("manual");
    setErrors((current) => ({ ...current, [key]: undefined }));
    idempotencyKeyRef.current = null;
    setNotice("");
    setFallbackAvailable(false);
  };

  const generateDraft = async () => {
    if (pending) return;
    if (!validateBasics()) {
      const hasMissingRequired = !fields.name.trim() || !fields.email.trim() || !fields.inquiry.trim();
      if (hasMissingRequired) {
        setNotice(t.aiRequired);
        setNoticeKind("error");
      }
      return;
    }
    setPending("generate");
    setGenerationError(false);
    setFallbackAvailable(false);
    setNotice("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25_000);
    try {
      const response = await fetch("/api/contact/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, intent, locale, website: websiteRef.current?.value ?? "" }),
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => null) as
        | { subject?: string; body?: string; error?: string }
        | null;
      if (!response.ok || !payload?.subject || !payload.body) {
        if (response.status === 429 || payload?.error === "rate_limited") {
          setNotice(t.rateLimit);
          setFallbackAvailable(true);
        } else {
          setNotice(response.status === 0 ? t.networkError : t.generationError);
          setGenerationError(true);
          setFallbackAvailable(true);
        }
        setNoticeKind("error");
        return;
      }
      setDraft({ subject: payload.subject, body: payload.body });
      setDraftSource("ai");
      setNotice(t.generated);
      setNoticeKind("success");
    } catch {
      setNotice(t.generationError);
      setNoticeKind("error");
      setGenerationError(true);
      setFallbackAvailable(true);
    } finally {
      window.clearTimeout(timeout);
      setPending(null);
    }
  };

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(currentDraft.subject)}&body=${encodeURIComponent(`${currentDraft.body}\n\nName: ${fields.name}\nEmail: ${fields.email}${fields.company ? `\nCompany: ${fields.company}` : ""}\n\n---\n${t.inquiry}:\n${fields.inquiry}`)}`;

  const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending || !validateBasics(true)) return;
    setPending("send");
    setNotice("");
    setFallbackAvailable(false);
    idempotencyKeyRef.current ??= createRequestId();
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25_000);
    try {
      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKeyRef.current ?? "",
        },
        body: JSON.stringify({
          ...fields,
          intent,
          locale,
          subject: currentDraft.subject,
          message: currentDraft.body,
          website: websiteRef.current?.value ?? "",
        }),
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => null) as
        | { success?: boolean; error?: string }
        | null;
      if (!response.ok || !payload?.success) {
        setNotice(errorMessage(t, response.status, payload?.error));
        setNoticeKind("error");
        setFallbackAvailable(true);
        return;
      }
      setSent(true);
      setNotice(t.success);
      setNoticeKind("success");
      idempotencyKeyRef.current = null;
    } catch {
      setNotice(errorMessage(t, 0));
      setNoticeKind("error");
      setFallbackAvailable(true);
    } finally {
      window.clearTimeout(timeout);
      setPending(null);
    }
  };

  const fieldError = (key: FieldName) => {
    const value = errors[key];
    if (!value) return "";
    return value === "email" ? t.invalidEmail : value === "tooLong" ? t.tooLong : value === "tooShort" ? t.tooShort : t.required;
  };
  const errorClass = (key: FieldName) => errors[key]
    ? "border-destructive focus-visible:ring-destructive"
    : "border-input focus-visible:ring-ring";
  const inputClass = (key: FieldName) => `min-h-11 w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus-visible:ring-2 ${errorClass(key)}`;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
      aria-labelledby="contact-modal-title"
      aria-describedby="contact-modal-description"
      className="m-auto max-h-[min(92dvh,56rem)] w-[min(68rem,calc(100%-1.25rem))] max-w-none overflow-y-auto border border-border bg-background p-0 text-foreground shadow-[var(--shadow-overlay)] backdrop:bg-slate-950/60 backdrop:backdrop-blur-[2px]"
    >
      <div className="sticky top-0 z-20 flex items-start justify-between gap-5 border-b border-border bg-background px-5 py-5 sm:px-7 sm:py-6">
        <div className="min-w-0">
          <p className="font-pixel text-[10px] uppercase tracking-[0.18em] text-primary">{t.eyebrow}</p>
          <h2 id="contact-modal-title" className="mt-2 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{sent ? t.success : t.title}</h2>
          <p id="contact-modal-description" className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{sent ? t.successHint : t.intro}</p>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label={t.close}
          className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      {sent ? (
        <div className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-success/30 bg-success/10 text-success">
            <Check aria-hidden="true" className="h-6 w-6" />
          </span>
          <p className="text-sm leading-6 text-muted-foreground">{t.successHint}</p>
          <button type="button" onClick={close} className="mt-7 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            {t.close}
          </button>
        </div>
      ) : (
        <form onSubmit={sendEmail} noValidate className="grid sm:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.95fr)]">
          <div className="min-w-0 space-y-5 px-5 py-5 sm:px-6 sm:py-6">
            <label className="block min-w-0 text-sm font-medium" htmlFor="contact-intent">
              {t.intent}
              <select id="contact-intent" value={intent} onChange={(event) => { setIntent(event.target.value as Intent); setDraft(null); setDraftSource("live"); setGenerationError(false); setFallbackAvailable(false); idempotencyKeyRef.current = null; setNotice(""); }} className="mt-2 min-h-11 w-full cursor-pointer rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring">
                <option value="demo">{t.demo}</option>
                <option value="private-deployment">{t.deployment}</option>
                <option value="other">{t.other}</option>
              </select>
            </label>

            <label className="block min-w-0 text-sm font-medium" htmlFor="contact-name">
              {t.name}<span aria-hidden="true" className="text-danger"> *</span>
              <input ref={firstFieldRef} id="contact-name" name="name" autoComplete="name" required maxLength={100} value={fields.name} onChange={(event) => updateField("name", event.target.value)} onBlur={() => validateFieldOnBlur("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} className={`${inputClass("name")} mt-2`} />
              {errors.name && <span id="contact-name-error" className="mt-1 block text-xs text-danger">{fieldError("name")}</span>}
            </label>

            <label className="block min-w-0 text-sm font-medium" htmlFor="contact-email">
              {t.email}<span aria-hidden="true" className="text-danger"> *</span>
              <input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={200} value={fields.email} onChange={(event) => updateField("email", event.target.value)} onBlur={() => validateFieldOnBlur("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} className={`${inputClass("email")} mt-2`} />
              {errors.email && <span id="contact-email-error" className="mt-1 block text-xs text-danger">{fieldError("email")}</span>}
            </label>

            <label className="block min-w-0 text-sm font-medium" htmlFor="contact-company">
              {t.company}
              <input id="contact-company" name="company" autoComplete="organization" maxLength={100} value={fields.company} onChange={(event) => updateField("company", event.target.value)} onBlur={() => validateFieldOnBlur("company")} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "contact-company-error" : undefined} className={`${inputClass("company")} mt-2`} />
              {errors.company && <span id="contact-company-error" className="mt-1 block text-xs text-danger">{fieldError("company")}</span>}
            </label>

            <label className="block text-sm font-medium" htmlFor="contact-inquiry">
              {t.inquiry}<span aria-hidden="true" className="text-danger"> *</span>
              <textarea id="contact-inquiry" name="inquiry" rows={4} required maxLength={2_000} value={fields.inquiry} onChange={(event) => updateField("inquiry", event.target.value)} onBlur={() => validateFieldOnBlur("inquiry")} aria-invalid={Boolean(errors.inquiry)} aria-describedby={`contact-inquiry-hint${errors.inquiry ? " contact-inquiry-error" : ""}`} className={`${inputClass("inquiry")} mt-2 min-h-28 resize-y`} />
              <span id="contact-inquiry-hint" className="mt-1 flex flex-wrap justify-between gap-x-3 gap-y-1 text-xs font-normal text-muted-foreground">
                <span>{errors.inquiry ? <span id="contact-inquiry-error" className="text-danger">{fieldError("inquiry")}</span> : t.inquiryHint}</span>
                <span>{fields.inquiry.length}/2000</span>
              </span>
            </label>

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-border pt-4">
              <button type="button" onClick={generateDraft} disabled={pending !== null} className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60">
                {pending === "generate" ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : <Sparkles aria-hidden="true" className="h-4 w-4" />}
                {pending === "generate" ? t.generating : t.generate}
              </button>
              <div className="min-w-[140px] flex-1 space-y-1 text-right">
                <p className="text-xs leading-5 text-muted-foreground">{t.privacy}</p>
                <p className="text-xs leading-5 text-muted-foreground">{t.nextStep}</p>
              </div>
            </div>

            {generationError && fallbackAvailable && (
              <p className="-mt-2 text-sm leading-6 text-muted-foreground">{t.manualFallback}</p>
            )}

            {notice && !sent && (
              <div role={noticeKind === "error" ? "alert" : "status"} aria-live={noticeKind === "error" ? "assertive" : "polite"} className={`rounded-md border px-3.5 py-3 text-sm leading-6 ${noticeKind === "error" ? "border-danger/30 bg-danger/5 text-danger" : "border-success/30 bg-success/5 text-success"}`}>
                <p>{notice}</p>
                {noticeKind === "error" && fallbackAvailable && (
                  <a href={mailtoHref} className="mt-1 inline-flex cursor-pointer items-center gap-1 font-semibold underline underline-offset-4">
                    {t.openMail}<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            )}

            <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
              <label htmlFor="contact-website">Website</label>
              <input ref={websiteRef} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
          </div>

          <aside className="min-w-0 border-t border-border bg-muted/20 px-5 py-5 sm:border-l sm:border-t-0 sm:px-5 sm:py-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-pixel text-[10px] uppercase tracking-[0.16em] text-primary">{preview.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{preview.recipient} · {CONTACT_EMAIL}</p>
              </div>
              {draft && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
                  {draftSource === "ai" ? <Sparkles aria-hidden="true" className="h-3.5 w-3.5" /> : <Mail aria-hidden="true" className="h-3.5 w-3.5" />}
                  {draftSource === "ai" ? "AI" : t.manualDraftLabel}
                </span>
              )}
            </div>

            {draft ? (
              <>
                <div className="space-y-4 rounded-lg border border-border bg-card p-4 sm:p-5">
                  <label className="block text-sm font-medium" htmlFor="contact-subject">
                    {t.subject}<span aria-hidden="true" className="text-danger"> *</span>
                    <input id="contact-subject" name="subject" required maxLength={180} value={currentDraft.subject} onChange={(event) => updateDraft("subject", event.target.value)} onBlur={() => validateFieldOnBlur("subject")} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined} className={`${inputClass("subject")} mt-2`} />
                    {errors.subject && <span id="contact-subject-error" className="mt-1 block text-xs text-danger">{fieldError("subject")}</span>}
                  </label>
                  <label className="block text-sm font-medium" htmlFor="contact-body">
                    {t.body}<span aria-hidden="true" className="text-danger"> *</span>
                    <textarea id="contact-body" name="body" rows={12} required maxLength={5_000} value={currentDraft.body} onChange={(event) => updateDraft("body", event.target.value)} onBlur={() => validateFieldOnBlur("body")} aria-invalid={Boolean(errors.body)} aria-describedby={errors.body ? "contact-body-error" : undefined} className={`${inputClass("body")} mt-2 min-h-64 resize-y`} />
                    {errors.body && <span id="contact-body-error" className="mt-1 block text-xs text-danger">{fieldError("body")}</span>}
                  </label>
                </div>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">{t.generated}</p>
              </>
            ) : (
              <div className="flex min-h-[22rem] items-center justify-center rounded-lg border border-border bg-card px-6 py-8">
                <div className="max-w-sm text-center">
                  <Sparkles aria-hidden="true" className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{preview.instruction}</p>
                </div>
              </div>
            )}
            <button type="submit" disabled={pending !== null || !canSend} className={`mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors ${pending !== null ? "cursor-wait bg-primary text-primary-foreground opacity-50" : canSend ? "cursor-pointer bg-primary text-primary-foreground hover:opacity-90" : "cursor-not-allowed bg-muted text-muted-foreground"}`}>
              {pending === "send" ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : <Mail aria-hidden="true" className="h-4 w-4" />}
              {pending === "send" ? t.sending : t.send}
            </button>
          </aside>
        </form>
      )}
    </dialog>
  );
}
