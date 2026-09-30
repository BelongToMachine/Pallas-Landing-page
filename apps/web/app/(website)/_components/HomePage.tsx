import { Button } from "@asianode/ui/button";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Database, MessageSquare, Shield, FileText, Search, Users, Lock, FileUp, Bot } from "lucide-react";
import ProductPreview from "./ProductPreview";
import ScrollingHeroTitle from "./ScrollingHeroTitle";
import type { SiteLocale } from "@/lib/i18n";

const messages = {
  en: {
    badge: "Enterprise Knowledge AI",
    tagline: "Your Docs.",
    taglineAccent: "Your Rules. AI Answers.",
    intro:
      "Pallas turns scattered product docs, wikis and FAQs into a permission-aware AI knowledge base — so your team gets traceable answers without the chaos.",
    requestDemo: "Request Demo",
    exploreFeatures: "Explore Features",
    highlights: ["Self-hosted", "Workspace isolation", "Source citations"],
    knowledgeLabel: "Knowledge Base",
    knowledgeTitleAccent: "Your docs,",
    knowledgeTitleRest: " organized",
    knowledgeTitleSecond: "and queryable",
    knowledgeDescription:
      "Upload once. Ask anything. Every answer traces back to the source.",
    knowledgeFeatures: [
      {
        icon: FileUp,
        title: "Multi-format Upload",
        description:
          "Drag-and-drop PDF, Excel (.xlsx), CSV, JSON, Markdown and plain text. Async ingestion handles parsing, chunking and status updates in the background.",
      },
      {
        icon: Search,
        title: "Semantic Search",
        description:
          "pgvector-powered embeddings retrieve the right context from your docs. Ask naturally and get precise, cited answers.",
      },
      {
        icon: FileText,
        title: "Source Citations",
        description:
          "Every answer links to the exact file and section it came from. Verify in one click.",
      },
      {
        icon: Database,
        title: "Workspace Isolation",
        description:
          "Create knowledge bases for each product, team or client, each with its own files, permissions and lifecycle.",
      },
    ],
    agentLabel: "AI Agent",
    agentTitleAccent: "Answers",
    agentTitleRest: " you can trust",
    agentDescription:
      "Streaming conversations with tool-aware retrieval, bounded agent loops and permission filtering built in.",
    agentFeatures: [
      {
        icon: MessageSquare,
        title: "Streaming Chat",
        description:
          "Real-time responses over SSE. Chat history persists across sessions, with stream recovery if a connection drops.",
      },
      {
        icon: Bot,
        title: "Controlled Agent Workflow",
        description:
          "Server-side tool allowlists, parameter validation and bounded agent loops keep answers grounded in your knowledge base.",
      },
      {
        icon: Shield,
        title: "Permission-Aware Retrieval",
        description:
          "Every search filters by the requester's grants. Access rules are enforced at the data layer.",
      },
      {
        icon: Users,
        title: "Team Ready",
        description:
          "Owner, Admin and Member roles, per-member overrides, invitations and audit logs for sensitive actions.",
      },
    ],
    securityLabel: "Security & Control",
    securityTitleAccent: "Permission-first",
    securityTitleRest: " architecture",
    securityDescription:
      "Security is enforced at the data layer, not just hidden in the UI.",
    securityFeatures: [
      {
        icon: Lock,
        title: "Workspace Isolation",
        description:
          "Every request revalidates user, workspace and resource ownership. No trust on the client side.",
      },
      {
        icon: Shield,
        title: "Role-Based Access",
        description:
          "Owner, Admin and Member roles with per-knowledge-base grants and member-level overrides.",
      },
      {
        icon: Users,
        title: "Audit Trail",
        description:
          "Every admin action is logged. Review who changed what, when and why.",
      },
    ],
    useCasesLabel: "Use Cases",
    useCasesTitlePrefix: "Built for ",
    useCasesTitleAccent: "real teams",
    useCases: [
      {
        tag: "Customer Support",
        title: "AI Support That Cites Its Sources",
        description:
          "Add your help center, SOPs and product manuals. Support teams spend less time searching and more time resolving.",
      },
      {
        tag: "Employee Onboarding",
        title: "Answer Every 'Where Do I Find…' Question",
        description:
          "New hires can ask the AI about IT policies, internal wikis and processes instead of interrupting teammates.",
      },
      {
        tag: "Technical Documentation",
        title: "Engineering Docs That Answer Themselves",
        description:
          "Upload API specs, runbooks and architecture docs. Engineers get answers with direct links to the source.",
      },
    ],
    plansLabel: "Sales Plans",
    plansTitlePrefix: "Deploy Pallas",
    plansTitleAccent: " your way.",
    plansDescription:
      "Start with the free community edition, discuss a private deployment, or follow the upcoming SaaS service.",
    plans: [
      {
        name: "Community Edition",
        status: "FREE COMMUNITY EDITION",
        offer: "Free",
        offerNote: "Community Edition",
        description:
          "Free community edition, with source and deployment docs on GitHub.",
        features: [
          "FastAPI backend with a React + Vite frontend",
          "Knowledge base, search and Agent workflow APIs",
          "Public GitHub repository with deployment docs",
        ],
        action: "View GitHub repository",
        href: "https://github.com/BelongToMachine/agent-workflow-fast-api",
        external: true,
      },
      {
        name: "Enterprise Private Deployment",
        status: "PRIVATE DEPLOYMENT",
        offer: "Talk to us",
        offerNote: "Scope and requirements",
        description:
          "Bring Pallas into your own environment, with a deployment plan shaped around your team.",
        features: [
          "Private deployment in your own environment",
          "Workspace isolation and role-based access controls",
          "Discuss deployment scope around your team",
        ],
        action: "Contact me",
        href: "#demo",
        external: false,
      },
      {
        name: "Pallas Cloud",
        status: "IN DEVELOPMENT",
        offer: "Coming soon",
        offerNote: "Launch details to follow",
        description:
          "The hosted service is being built now. Availability and service details will be shared later.",
        features: [
          "Hosted SaaS experience in development",
          "Service details are still being finalized",
          "Availability will be announced later",
        ],
        action: "Coming soon",
        href: null,
        external: false,
      },
    ],
    storyLabel: "Customer Feedback",
    storyTitlePrefix: "A ",
    storyTitleAccent: "customer",
    storyTitleSuffix: " story about Pallas",
    portraitAlt: "Portrait of an Asianode team member",
    quote:
      "Pallas makes it easier for our team to get clear answers from shared documents. We can verify each response against its source, while role-based access keeps information in the right hands.",
    quoteBy: "Asianode team",
    brandLink: "Asianode",
    finalTitle: "Stop losing knowledge.",
    finalTitleAccent: "Start answering.",
    finalDescription:
      "See how Pallas turns your scattered docs into a permission-aware AI knowledge base.",
    finalRequestDemo: "Request a Demo",
    readDocs: "Read the Docs",
  },
  zh: {
    badge: "企业知识库 AI",
    tagline: "你的文档，",
    taglineAccent: "你的规则，AI 来回答。",
    intro:
      "Pallas 将分散的产品文档、内部知识库和常见问题整合为一个按权限访问的 AI 知识库，让团队快速获得可追溯的答案。",
    requestDemo: "预约演示",
    exploreFeatures: "探索功能",
    highlights: ["支持私有化部署", "工作区隔离", "回答附带来源"],
    knowledgeLabel: "AI 知识库",
    knowledgeTitleAccent: "让文档",
    knowledgeTitleRest: "井然有序，",
    knowledgeTitleSecond: "随问随答",
    knowledgeDescription: "一次导入，随时提问。每个答案都可追溯至原始资料。",
    knowledgeFeatures: [
      {
        icon: FileUp,
        title: "多格式文档导入",
        description:
          "支持拖放 PDF、Excel（.xlsx）、CSV、JSON、Markdown 和纯文本。后台自动解析、切分内容并更新处理状态。",
      },
      {
        icon: Search,
        title: "语义搜索",
        description:
          "通过 pgvector 向量检索找到文档中的相关内容。用自然语言提问，获得精准且附有来源的回答。",
      },
      {
        icon: FileText,
        title: "答案来源引用",
        description:
          "每条回答都链接到对应文件和段落，一键核验内容出处。",
      },
      {
        icon: Database,
        title: "工作区隔离",
        description:
          "按产品、团队或客户创建独立知识库，分别管理文件、权限和生命周期。",
      },
    ],
    agentLabel: "AI 智能体",
    agentTitleAccent: "可信赖的",
    agentTitleRest: " AI 回答",
    agentDescription:
      "支持流式对话、工具检索、受限的智能体工作流和权限过滤。",
    agentFeatures: [
      {
        icon: MessageSquare,
        title: "流式对话",
        description:
          "通过 SSE 实时返回回答。聊天记录跨会话保存，连接中断后也能恢复生成。",
      },
      {
        icon: Bot,
        title: "可控的智能体工作流",
        description:
          "服务端工具白名单、参数校验和有界循环，让智能体依据知识库内容回答。",
      },
      {
        icon: Shield,
        title: "按权限检索",
        description:
          "每次搜索都会依据提问者的授权过滤结果，访问控制在数据层执行。",
      },
      {
        icon: Users,
        title: "为团队协作设计",
        description:
          "支持 Owner、Admin、Member 角色、成员级权限覆盖、邀请流程及敏感操作审计。",
      },
    ],
    securityLabel: "安全与控制",
    securityTitleAccent: "权限优先的",
    securityTitleRest: "安全架构",
    securityDescription: "安全规则在数据层执行，而不只是隐藏界面内容。",
    securityFeatures: [
      {
        icon: Lock,
        title: "工作区隔离",
        description:
          "每次请求都会重新校验用户、工作区和资源归属，不信任客户端传入的权限信息。",
      },
      {
        icon: Shield,
        title: "基于角色的访问控制",
        description:
          "支持 Owner、Admin、Member 角色，并可按知识库和成员单独设置权限。",
      },
      {
        icon: Users,
        title: "操作审计",
        description: "记录管理员操作，方便追溯谁在何时修改了什么内容。",
      },
    ],
    useCasesLabel: "应用场景",
    useCasesTitlePrefix: "为真实的",
    useCasesTitleAccent: "团队而设计",
    useCases: [
      {
        tag: "客户支持",
        title: "回答有据可查的 AI 客服",
        description:
          "导入帮助中心、SOP 和产品手册。客服团队少花时间查资料，多花时间解决问题。",
      },
      {
        tag: "员工入职",
        title: "常见问题，让 AI 随时解答",
        description:
          "新员工可以直接询问 IT 政策、内部 Wiki 和工作流程，减少反复打扰同事。",
      },
      {
        tag: "技术文档",
        title: "让工程文档自己回答问题",
        description:
          "上传 API 规范、运维手册和架构文档，工程师可直接获取答案及对应来源。",
      },
    ],
    plansLabel: "销售方案",
    plansTitlePrefix: "选择适合你的",
    plansTitleAccent: "部署方式",
    plansDescription:
      "从免费社区版开始，咨询企业私有部署，或关注即将推出的 SaaS 服务。",
    plans: [
      {
        name: "Community Edition",
        status: "免费社区版",
        offer: "免费使用",
        offerNote: "Community Edition",
        description: "免费社区版代码与部署文档可在 GitHub 查看。",
        features: [
          "FastAPI 后端与 React + Vite 前端",
          "知识库、搜索与 Agent workflow 接口",
          "公开 GitHub 仓库，附有部署文档",
        ],
        action: "前往 GitHub 仓库",
        href: "https://github.com/BelongToMachine/agent-workflow-fast-api",
        external: true,
      },
      {
        name: "企业私有部署",
        status: "私有化部署",
        offer: "联系沟通",
        offerNote: "部署范围与需求",
        description: "将 Pallas 部署在企业自己的环境中，按团队需求沟通实施方案。",
        features: [
          "部署在企业自有环境",
          "工作区隔离与基于角色的权限管理",
          "结合团队需求沟通部署范围",
        ],
        action: "联系我",
        href: "#demo",
        external: false,
      },
      {
        name: "Pallas Cloud",
        status: "正在开发",
        offer: "即将推出",
        offerNote: "开放时间后续公布",
        description: "托管版 SaaS 服务正在开发中，开放安排与服务详情将后续公布。",
        features: [
          "托管版服务正在开发中",
          "服务内容仍在完善",
          "开放时间待后续公布",
        ],
        action: "即将推出",
        href: null,
        external: false,
      },
    ],
    storyLabel: "客户反馈",
    storyTitlePrefix: "来自 ",
    storyTitleAccent: "Asianode 团队",
    storyTitleSuffix: " 的 Pallas 使用反馈",
    portraitAlt: "Asianode 团队成员肖像",
    quote:
      "Pallas 帮助团队更快地从共享文档中找到清晰答案。每条回答都可以核对来源，基于角色的访问控制也能确保信息只对合适的人开放。",
    quoteBy: "Asianode 团队",
    brandLink: "Asianode",
    finalTitle: "别再让知识流失。",
    finalTitleAccent: "现在开始解答。",
    finalDescription:
      "看看 Pallas 如何将分散的文档变成按权限访问、答案可追溯的 AI 知识库。",
    finalRequestDemo: "预约演示",
    readDocs: "阅读文档",
  },
  tr: {
    badge: "Kurumsal Bilgi Yapay Zekâsı",
    tagline: "Belgeleriniz.",
    taglineAccent: "Kurallarınız. Yanıtlayan yapay zekâ.",
    intro:
      "Pallas, dağınık ürün belgelerini, wiki'leri ve SSS'leri ekiplerin kaynaklarına kadar izlenebilen yanıtlar alabileceği, izinlere duyarlı bir yapay zekâ bilgi tabanında bir araya getirir.",
    requestDemo: "Demo isteyin",
    exploreFeatures: "Özellikleri keşfedin",
    highlights: ["Özel dağıtım", "Çalışma alanı yalıtımı", "Kaynak gösterimi"],
    knowledgeLabel: "Bilgi Tabanı",
    knowledgeTitleAccent: "Belgeleriniz",
    knowledgeTitleRest: " düzenli,",
    knowledgeTitleSecond: "aranabilir ve hazır",
    knowledgeDescription: "Bir kez yükleyin, dilediğinizi sorun. Her yanıt kaynağına kadar izlenebilir.",
    knowledgeFeatures: [
      {
        icon: FileUp,
        title: "Çoklu Biçimde Yükleme",
        description:
          "PDF, Excel (.xlsx), CSV, JSON, Markdown ve düz metin dosyalarını sürükleyip bırakın. Arka plandaki eşzamansız işlem; ayrıştırma, parçalara bölme ve durum güncellemelerini yönetir.",
      },
      {
        icon: Search,
        title: "Anlamsal Arama",
        description:
          "pgvector destekli gömmeler belgelerinizden doğru bağlamı bulur. Doğal bir dille sorun; kaynakları belirtilmiş, isabetli yanıtlar alın.",
      },
      {
        icon: FileText,
        title: "Kaynak Atıfları",
        description: "Her yanıt, alındığı dosya ve bölüme bağlantı verir. Kaynağı tek tıklamayla doğrulayın.",
      },
      {
        icon: Database,
        title: "Çalışma Alanı Yalıtımı",
        description:
          "Her birinin kendi dosyaları, izinleri ve yaşam döngüsü olan ürün, ekip veya müşteri bilgi tabanları oluşturun.",
      },
    ],
    agentLabel: "Yapay Zekâ Ajanı",
    agentTitleAccent: "Güvenebileceğiniz",
    agentTitleRest: " yanıtlar",
    agentDescription:
      "Araç destekli erişim, sınırlandırılmış ajan döngüleri ve izin filtreleriyle gerçek zamanlı sohbet.",
    agentFeatures: [
      {
        icon: MessageSquare,
        title: "Akış Sohbeti",
        description: "SSE üzerinden gerçek zamanlı yanıtlar. Sohbet geçmişi oturumlar arasında saklanır; bağlantı kesilirse akış devam edebilir.",
      },
      {
        icon: Bot,
        title: "Kontrollü Ajan İş Akışı",
        description: "Sunucu tarafındaki araç izin listeleri, parametre doğrulama ve sınırlandırılmış döngüler yanıtları bilgi tabanınıza dayandırır.",
      },
      {
        icon: Shield,
        title: "İzinlere Duyarlı Erişim",
        description: "Her arama, sonuçları istekte bulunan kişinin yetkilerine göre filtreler. Erişim kuralları veri katmanında uygulanır.",
      },
      {
        icon: Users,
        title: "Ekipler İçin Hazır",
        description: "Sahip, Yönetici ve Üye rolleri; üye bazında izinler, davetler ve hassas işlemler için denetim kayıtları.",
      },
    ],
    securityLabel: "Güvenlik ve Kontrol",
    securityTitleAccent: "İzinleri Önceleyen",
    securityTitleRest: " mimari",
    securityDescription: "Güvenlik, yalnızca arayüzde gizlenmez; veri katmanında uygulanır.",
    securityFeatures: [
      {
        icon: Lock,
        title: "Çalışma Alanı Yalıtımı",
        description: "Her istekte kullanıcı, çalışma alanı ve kaynak sahipliği yeniden doğrulanır. İstemciye güvenilmez.",
      },
      {
        icon: Shield,
        title: "Rol Tabanlı Erişim",
        description: "Bilgi tabanı izinleri ve üye bazlı istisnalarla Sahip, Yönetici ve Üye rolleri.",
      },
      {
        icon: Users,
        title: "Denetim Kaydı",
        description: "Tüm yönetici işlemleri kaydedilir. Kimin, neyi, ne zaman ve neden değiştirdiğini inceleyin.",
      },
    ],
    useCasesLabel: "Kullanım Alanları",
    useCasesTitlePrefix: "Gerçek ekipler için",
    useCasesTitleAccent: "tasarlandı",
    useCases: [
      {
        tag: "Müşteri Desteği",
        title: "Kaynak Gösteren Yapay Zekâ Desteği",
        description: "Yardım merkezinizi, SOP'lerinizi ve ürün kılavuzlarınızı ekleyin. Destek ekipleri aramaya daha az, sorun çözmeye daha çok zaman ayırsın.",
      },
      {
        tag: "Çalışan Oryantasyonu",
        title: "‘Nerede Bulabilirim?’ Sorularını Yanıtlayın",
        description: "Yeni çalışanlar, ekip arkadaşlarının işini bölmek yerine BT politikalarını, şirket wiki'sini ve süreçleri yapay zekâya sorabilir.",
      },
      {
        tag: "Teknik Belgeler",
        title: "Soruları Yanıtlayan Mühendislik Belgeleri",
        description: "API tanımlarını, operasyon kılavuzlarını ve mimari belgeleri yükleyin. Mühendisler kaynaklara doğrudan bağlantılar içeren yanıtlar alır.",
      },
    ],
    plansLabel: "Satış Seçenekleri",
    plansTitlePrefix: "Pallas'ı",
    plansTitleAccent: " ihtiyacınıza göre dağıtın.",
    plansDescription:
      "Ücretsiz Community Edition ile başlayın, özel dağıtımı görüşün veya yakında sunulacak SaaS hizmetini takip edin.",
    plans: [
      {
        name: "Community Edition",
        status: "ÜCRETSİZ COMMUNITY EDITION",
        offer: "Ücretsiz",
        offerNote: "Community Edition",
        description: "Ücretsiz Community Edition kaynak kodu ve dağıtım belgeleri GitHub'da.",
        features: [
          "FastAPI arka ucu ve React + Vite ön yüzü",
          "Bilgi tabanı, arama ve ajan iş akışı API'leri",
          "Dağıtım belgelerinin bulunduğu açık GitHub deposu",
        ],
        action: "GitHub deposunu görüntüleyin",
        href: "https://github.com/BelongToMachine/agent-workflow-fast-api",
        external: true,
      },
      {
        name: "Kurumsal Özel Dağıtım",
        status: "ÖZEL DAĞITIM",
        offer: "Görüşelim",
        offerNote: "Kapsam ve gereksinimler",
        description: "Pallas'ı kendi ortamınızda kullanın; ekibinize uygun dağıtım planını birlikte belirleyelim.",
        features: [
          "Şirketinizin kendi ortamında özel dağıtım",
          "Çalışma alanı yalıtımı ve rol tabanlı erişim denetimi",
          "Ekibinizin ihtiyaçlarına göre dağıtım kapsamı",
        ],
        action: "Bize ulaşın",
        href: "#demo",
        external: false,
      },
      {
        name: "Pallas Cloud",
        status: "GELİŞTİRİLİYOR",
        offer: "Yakında",
        offerNote: "Lansman ayrıntıları daha sonra paylaşılacak",
        description: "Barındırılan SaaS hizmeti geliştiriliyor. Kullanılabilirlik tarihi ve hizmet ayrıntıları daha sonra açıklanacak.",
        features: [
          "Barındırılan SaaS deneyimi geliştiriliyor",
          "Hizmet ayrıntıları henüz kesinleşmedi",
          "Kullanılabilirlik tarihi daha sonra duyurulacak",
        ],
        action: "Yakında",
        href: null,
        external: false,
      },
    ],
    storyLabel: "Müşteri Görüşleri",
    storyTitlePrefix: "Asianode'un Pallas hakkındaki ",
    storyTitleAccent: "deneyimi",
    storyTitleSuffix: "",
    portraitAlt: "Asianode ekip üyesinin portresi",
    quote:
      "Pallas, ekibimizin ortak belgelerden net yanıtları daha kolay bulmasını sağlıyor. Her yanıtın kaynağını doğrulayabiliyoruz; rol tabanlı erişim de bilgilerin doğru kişilerde kalmasını sağlıyor.",
    quoteBy: "Asianode ekibi",
    brandLink: "Asianode",
    finalTitle: "Bilginizin kaybolmasına son verin.",
    finalTitleAccent: "Yanıtlamaya başlayın.",
    finalDescription: "Pallas'ın dağınık belgelerinizi izinlere duyarlı, yapay zekâ destekli bir bilgi tabanına nasıl dönüştürdüğünü görün.",
    finalRequestDemo: "Demo İsteyin",
    readDocs: "Belgeleri okuyun",
  },
  fr: {
    badge: "IA de la connaissance d’entreprise",
    tagline: "Vos documents.",
    taglineAccent: "Vos règles. L’IA répond.",
    intro:
      "Pallas rassemble vos documents produit, wikis et FAQ dispersés dans une base de connaissances IA respectueuse des permissions, pour fournir à votre équipe des réponses traçables, sans désordre.",
    requestDemo: "Demander une démo",
    exploreFeatures: "Découvrir les fonctionnalités",
    highlights: ["Déploiement privé", "Espaces isolés", "Sources citées"],
    knowledgeLabel: "Base de connaissances",
    knowledgeTitleAccent: "Vos documents,",
    knowledgeTitleRest: " organisés",
    knowledgeTitleSecond: "et interrogeables",
    knowledgeDescription: "Importez une fois, posez toutes vos questions. Chaque réponse renvoie à sa source.",
    knowledgeFeatures: [
      {
        icon: FileUp,
        title: "Import de nombreux formats",
        description: "Glissez-déposez des PDF, fichiers Excel (.xlsx), CSV, JSON, Markdown et du texte brut. Le traitement asynchrone gère l’analyse, le découpage et les mises à jour d’état en arrière-plan.",
      },
      {
        icon: Search,
        title: "Recherche sémantique",
        description: "Les embeddings propulsés par pgvector retrouvent le bon contexte dans vos documents. Posez vos questions naturellement et obtenez des réponses précises avec leurs sources.",
      },
      {
        icon: FileText,
        title: "Sources citées",
        description: "Chaque réponse renvoie au fichier et à la section d’origine. Vérifiez la source en un clic.",
      },
      {
        icon: Database,
        title: "Isolation des espaces de travail",
        description: "Créez une base de connaissances par produit, équipe ou client, avec ses propres fichiers, permissions et cycle de vie.",
      },
    ],
    agentLabel: "Agent IA",
    agentTitleAccent: "Des réponses",
    agentTitleRest: " fiables",
    agentDescription: "Des conversations en continu avec recherche par outils, boucles d’agent limitées et filtrage des permissions.",
    agentFeatures: [
      {
        icon: MessageSquare,
        title: "Chat en continu",
        description: "Réponses en temps réel via SSE. L’historique est conservé entre les sessions et le flux peut reprendre après une coupure.",
      },
      {
        icon: Bot,
        title: "Flux de travail contrôlé",
        description: "Listes d’outils autorisés côté serveur, validation des paramètres et boucles limitées ancrent les réponses dans votre base de connaissances.",
      },
      {
        icon: Shield,
        title: "Recherche respectueuse des permissions",
        description: "Chaque recherche filtre les résultats selon les droits de la personne qui pose la question. Les règles sont appliquées au niveau des données.",
      },
      {
        icon: Users,
        title: "Pensé pour les équipes",
        description: "Rôles Propriétaire, Admin et Membre, permissions par membre, invitations et journaux d’audit pour les actions sensibles.",
      },
    ],
    securityLabel: "Sécurité et contrôle",
    securityTitleAccent: "Une architecture",
    securityTitleRest: " fondée sur les permissions",
    securityDescription: "La sécurité est appliquée au niveau des données, pas simplement masquée dans l’interface.",
    securityFeatures: [
      {
        icon: Lock,
        title: "Isolation des espaces de travail",
        description: "Chaque requête revérifie l’utilisateur, l’espace de travail et la propriété des ressources. Le client n’est jamais considéré comme fiable.",
      },
      {
        icon: Shield,
        title: "Accès par rôle",
        description: "Rôles Propriétaire, Admin et Membre, avec autorisations par base de connaissances et exceptions par membre.",
      },
      {
        icon: Users,
        title: "Journal d’audit",
        description: "Chaque action d’administration est enregistrée. Consultez qui a modifié quoi, quand et pourquoi.",
      },
    ],
    useCasesLabel: "Cas d’usage",
    useCasesTitlePrefix: "Conçu pour les ",
    useCasesTitleAccent: "équipes réelles",
    useCases: [
      {
        tag: "Assistance client",
        title: "Un support IA qui cite ses sources",
        description: "Ajoutez votre centre d’aide, vos procédures et vos manuels produit. Les équipes support cherchent moins et résolvent davantage.",
      },
      {
        tag: "Intégration des employés",
        title: "Répondez aux questions du quotidien",
        description: "Les nouvelles recrues peuvent interroger l’IA sur les politiques informatiques, les wikis internes et les processus, sans interrompre leurs collègues.",
      },
      {
        tag: "Documentation technique",
        title: "Des documents d’ingénierie qui répondent",
        description: "Importez spécifications API, guides d’exploitation et documents d’architecture. Les ingénieurs reçoivent des réponses avec des liens directs vers les sources.",
      },
    ],
    plansLabel: "Offres commerciales",
    plansTitlePrefix: "Déployez Pallas",
    plansTitleAccent: " à votre façon.",
    plansDescription: "Commencez avec l’édition communautaire gratuite, discutons d’un déploiement privé ou suivez l’arrivée prochaine du service SaaS.",
    plans: [
      {
        name: "Édition communautaire",
        status: "ÉDITION COMMUNAUTAIRE GRATUITE",
        offer: "Gratuit",
        offerNote: "Édition communautaire",
        description: "Le code source et la documentation de déploiement de l’édition gratuite sont disponibles sur GitHub.",
        features: [
          "Backend FastAPI et frontend React + Vite",
          "API de base de connaissances, recherche et flux d’agent",
          "Dépôt GitHub public avec documentation de déploiement",
        ],
        action: "Voir le dépôt GitHub",
        href: "https://github.com/BelongToMachine/agent-workflow-fast-api",
        external: true,
      },
      {
        name: "Déploiement privé pour entreprise",
        status: "DÉPLOIEMENT PRIVÉ",
        offer: "Parlons-en",
        offerNote: "Périmètre et besoins",
        description: "Hébergez Pallas dans votre propre environnement, avec un plan de déploiement adapté à votre équipe.",
        features: [
          "Déploiement privé dans votre environnement",
          "Espaces de travail isolés et contrôle d’accès par rôle",
          "Périmètre défini selon les besoins de l’équipe",
        ],
        action: "Nous contacter",
        href: "#demo",
        external: false,
      },
      {
        name: "Pallas Cloud",
        status: "EN DÉVELOPPEMENT",
        offer: "Bientôt",
        offerNote: "Informations de lancement à venir",
        description: "Le service SaaS hébergé est en cours de développement. Sa disponibilité et ses modalités seront annoncées ultérieurement.",
        features: [
          "Service SaaS hébergé en développement",
          "Modalités du service en cours de définition",
          "Disponibilité annoncée ultérieurement",
        ],
        action: "Bientôt disponible",
        href: null,
        external: false,
      },
    ],
    storyLabel: "Avis client",
    storyTitlePrefix: "Le retour d’",
    storyTitleAccent: "Asianode",
    storyTitleSuffix: " sur Pallas",
    portraitAlt: "Portrait d’un membre de l’équipe Asianode",
    quote: "Pallas permet à notre équipe de trouver plus facilement des réponses claires dans les documents partagés. Nous pouvons vérifier chaque réponse à sa source, tandis que les accès par rôle protègent les informations.",
    quoteBy: "Équipe Asianode",
    brandLink: "Asianode",
    finalTitle: "Ne perdez plus vos connaissances.",
    finalTitleAccent: "Commencez à répondre.",
    finalDescription: "Découvrez comment Pallas transforme vos documents dispersés en une base de connaissances IA respectueuse des permissions.",
    finalRequestDemo: "Demander une démo",
    readDocs: "Lire la documentation",
  },
  ja: {
    badge: "企業向けナレッジ AI",
    tagline: "ドキュメントを、",
    taglineAccent: "チームのルールで AI が回答。",
    intro: "Pallas は、散在する製品ドキュメント、Wiki、FAQ を権限に配慮した AI ナレッジベースにまとめ、根拠を確認できる回答をチームに届けます。",
    requestDemo: "デモを申し込む",
    exploreFeatures: "機能を見る",
    highlights: ["プライベート導入", "ワークスペース分離", "出典を表示"],
    knowledgeLabel: "ナレッジベース",
    knowledgeTitleAccent: "ドキュメントを",
    knowledgeTitleRest: "整理して、",
    knowledgeTitleSecond: "質問に答える知識へ",
    knowledgeDescription: "一度アップロードすれば、いつでも質問できます。回答はすべて元の情報源をたどれます。",
    knowledgeFeatures: [
      {
        icon: FileUp,
        title: "多形式ファイルのアップロード",
        description: "PDF、Excel（.xlsx）、CSV、JSON、Markdown、テキストをドラッグ＆ドロップ。解析、分割、状態更新はバックグラウンドで非同期に処理します。",
      },
      {
        icon: Search,
        title: "セマンティック検索",
        description: "pgvector によるベクトル検索で、ドキュメントから適切な情報を取得。自然な言葉で質問すると、出典付きの正確な回答が得られます。",
      },
      {
        icon: FileText,
        title: "出典の明示",
        description: "回答には元のファイルと該当箇所へのリンクが付きます。ワンクリックで内容を確認できます。",
      },
      {
        icon: Database,
        title: "ワークスペースの分離",
        description: "製品、チーム、顧客ごとにナレッジベースを作成し、ファイル、権限、ライフサイクルを個別に管理できます。",
      },
    ],
    agentLabel: "AI エージェント",
    agentTitleAccent: "信頼できる",
    agentTitleRest: "回答を",
    agentDescription: "ツールを活用した検索、制限付きのエージェント処理、権限フィルタリングを備えたストリーミング対話。",
    agentFeatures: [
      {
        icon: MessageSquare,
        title: "ストリーミングチャット",
        description: "SSE によるリアルタイム応答。会話履歴はセッションをまたいで保存され、切断時もストリームを復旧できます。",
      },
      {
        icon: Bot,
        title: "制御されたエージェントワークフロー",
        description: "サーバー側のツール許可リスト、パラメーター検証、回数制限により、回答をナレッジベースの内容に基づかせます。",
      },
      {
        icon: Shield,
        title: "権限に応じた検索",
        description: "検索結果は質問者の権限に応じて絞り込まれます。アクセスルールはデータ層で適用されます。",
      },
      {
        icon: Users,
        title: "チーム利用に対応",
        description: "Owner、Admin、Member のロール、メンバーごとの権限設定、招待、重要操作の監査ログに対応します。",
      },
    ],
    securityLabel: "セキュリティと管理",
    securityTitleAccent: "権限を前提とした",
    securityTitleRest: "アーキテクチャ",
    securityDescription: "セキュリティは UI 上で隠すだけでなく、データ層で適用されます。",
    securityFeatures: [
      {
        icon: Lock,
        title: "ワークスペースの分離",
        description: "すべてのリクエストでユーザー、ワークスペース、リソースの所有者を再確認し、クライアントを信用しません。",
      },
      {
        icon: Shield,
        title: "ロールベースのアクセス制御",
        description: "Owner、Admin、Member のロールに加え、ナレッジベース単位の権限とメンバーごとの例外を設定できます。",
      },
      {
        icon: Users,
        title: "監査ログ",
        description: "管理操作を記録し、誰がいつ何を変更したかを確認できます。",
      },
    ],
    useCasesLabel: "活用例",
    useCasesTitlePrefix: "現場のチームのために",
    useCasesTitleAccent: "設計",
    useCases: [
      {
        tag: "カスタマーサポート",
        title: "出典を示す AI サポート",
        description: "ヘルプセンター、手順書、製品マニュアルを追加。サポートチームは検索の時間を減らし、解決に集中できます。",
      },
      {
        tag: "社員のオンボーディング",
        title: "「どこにありますか？」にすぐ回答",
        description: "新入社員は IT ポリシー、社内 Wiki、業務手順を AI に質問でき、同僚への確認を減らせます。",
      },
      {
        tag: "技術ドキュメント",
        title: "質問に答えるエンジニアリング文書",
        description: "API 仕様、運用手順、アーキテクチャ資料をアップロード。エンジニアは出典への直接リンク付きで回答を得られます。",
      },
    ],
    plansLabel: "導入プラン",
    plansTitlePrefix: "Pallas を",
    plansTitleAccent: "最適な方法で導入",
    plansDescription: "無料の Community Edition から始める、プライベート導入を相談する、または開発中の SaaS サービスをお待ちください。",
    plans: [
      {
        name: "Community Edition",
        status: "無料コミュニティ版",
        offer: "無料",
        offerNote: "Community Edition",
        description: "無料版のソースコードと導入ドキュメントを GitHub で公開しています。",
        features: [
          "FastAPI バックエンドと React + Vite フロントエンド",
          "ナレッジベース、検索、エージェントワークフロー API",
          "導入ドキュメント付きの公開 GitHub リポジトリ",
        ],
        action: "GitHub リポジトリを見る",
        href: "https://github.com/BelongToMachine/agent-workflow-fast-api",
        external: true,
      },
      {
        name: "エンタープライズ向けプライベート導入",
        status: "プライベート導入",
        offer: "ご相談ください",
        offerNote: "導入範囲と要件",
        description: "お客様の環境に Pallas を導入し、チームに合わせた計画をご提案します。",
        features: [
          "お客様の環境へのプライベート導入",
          "ワークスペース分離とロールベースのアクセス制御",
          "チームの要件に合わせた導入範囲の相談",
        ],
        action: "お問い合わせ",
        href: "#demo",
        external: false,
      },
      {
        name: "Pallas Cloud",
        status: "開発中",
        offer: "近日公開",
        offerNote: "提供開始時期は後日お知らせします",
        description: "ホスト型 SaaS サービスを開発中です。提供時期とサービス内容は後日お知らせします。",
        features: [
          "ホスト型 SaaS を開発中",
          "サービス内容を調整中",
          "提供開始時期は後日発表",
        ],
        action: "近日公開",
        href: null,
        external: false,
      },
    ],
    storyLabel: "お客様の声",
    storyTitlePrefix: "Pallas についての",
    storyTitleAccent: "Asianode チーム",
    storyTitleSuffix: "",
    portraitAlt: "Asianode チームメンバーのポートレート",
    quote: "Pallas を使うことで、チームは共有ドキュメントから明確な回答を見つけやすくなりました。各回答の出典を確認でき、ロールベースのアクセス制御によって情報を適切な人だけに届けられます。",
    quoteBy: "Asianode チーム",
    brandLink: "Asianode",
    finalTitle: "知識を失うのはもう終わり。",
    finalTitleAccent: "答えを見つけましょう。",
    finalDescription: "Pallas が散在するドキュメントを、権限に配慮した AI ナレッジベースに変える方法をご覧ください。",
    finalRequestDemo: "デモを申し込む",
    readDocs: "ドキュメントを見る",
  },
  es: {
    badge: "IA de conocimiento empresarial",
    tagline: "Tus documentos.",
    taglineAccent: "Tus reglas. La IA responde.",
    intro: "Pallas reúne documentos de producto, wikis y preguntas frecuentes dispersos en una base de conocimiento con control de permisos, para que tu equipo obtenga respuestas trazables y sin caos.",
    requestDemo: "Solicitar una demo",
    exploreFeatures: "Explorar funciones",
    highlights: ["Despliegue privado", "Espacios aislados", "Fuentes citadas"],
    knowledgeLabel: "Base de conocimiento",
    knowledgeTitleAccent: "Tus documentos,",
    knowledgeTitleRest: " organizados",
    knowledgeTitleSecond: "y listos para consultar",
    knowledgeDescription: "Carga una vez y pregunta lo que quieras. Cada respuesta remite a su fuente.",
    knowledgeFeatures: [
      {
        icon: FileUp,
        title: "Carga en varios formatos",
        description: "Arrastra y suelta archivos PDF, Excel (.xlsx), CSV, JSON, Markdown y texto sin formato. El procesamiento asíncrono gestiona el análisis, la división en fragmentos y las actualizaciones en segundo plano.",
      },
      {
        icon: Search,
        title: "Búsqueda semántica",
        description: "Las representaciones vectoriales de pgvector encuentran el contexto adecuado en tus documentos. Pregunta con naturalidad y obtén respuestas precisas con sus fuentes.",
      },
      {
        icon: FileText,
        title: "Citas de fuentes",
        description: "Cada respuesta enlaza al archivo y a la sección de origen. Comprueba la fuente con un clic.",
      },
      {
        icon: Database,
        title: "Aislamiento de espacios de trabajo",
        description: "Crea bases de conocimiento para cada producto, equipo o cliente, con sus propios archivos, permisos y ciclo de vida.",
      },
    ],
    agentLabel: "Agente de IA",
    agentTitleAccent: "Respuestas",
    agentTitleRest: " fiables",
    agentDescription: "Conversaciones en tiempo real con recuperación mediante herramientas, ciclos de agente acotados y filtros de permisos.",
    agentFeatures: [
      {
        icon: MessageSquare,
        title: "Chat en tiempo real",
        description: "Respuestas inmediatas mediante SSE. El historial se conserva entre sesiones y el flujo puede recuperarse si se interrumpe la conexión.",
      },
      {
        icon: Bot,
        title: "Flujo de agente controlado",
        description: "Listas de herramientas permitidas en el servidor, validación de parámetros y ciclos acotados mantienen las respuestas basadas en tu conocimiento.",
      },
      {
        icon: Shield,
        title: "Recuperación según permisos",
        description: "Cada búsqueda filtra los resultados según los permisos de quien pregunta. Las reglas de acceso se aplican en la capa de datos.",
      },
      {
        icon: Users,
        title: "Preparado para equipos",
        description: "Roles de Propietario, Administrador y Miembro, permisos individuales, invitaciones y registros de auditoría para acciones sensibles.",
      },
    ],
    securityLabel: "Seguridad y control",
    securityTitleAccent: "Arquitectura basada",
    securityTitleRest: " en permisos",
    securityDescription: "La seguridad se aplica en la capa de datos, no solo se oculta en la interfaz.",
    securityFeatures: [
      {
        icon: Lock,
        title: "Aislamiento de espacios",
        description: "Cada solicitud vuelve a validar al usuario, el espacio de trabajo y la propiedad del recurso. No se confía en el cliente.",
      },
      {
        icon: Shield,
        title: "Acceso basado en roles",
        description: "Roles de Propietario, Administrador y Miembro, con permisos por base de conocimiento y excepciones por persona.",
      },
      {
        icon: Users,
        title: "Registro de auditoría",
        description: "Se registran todas las acciones administrativas. Consulta quién cambió qué, cuándo y por qué.",
      },
    ],
    useCasesLabel: "Casos de uso",
    useCasesTitlePrefix: "Diseñado para",
    useCasesTitleAccent: " equipos reales",
    useCases: [
      {
        tag: "Atención al cliente",
        title: "Soporte de IA que cita sus fuentes",
        description: "Añade tu centro de ayuda, procedimientos y manuales de producto. El equipo de soporte busca menos y resuelve más.",
      },
      {
        tag: "Incorporación de empleados",
        title: "Resuelve las dudas de cada día",
        description: "Las nuevas incorporaciones pueden preguntar a la IA sobre políticas de TI, wikis internos y procesos, sin interrumpir a sus compañeros.",
      },
      {
        tag: "Documentación técnica",
        title: "Documentos de ingeniería que responden",
        description: "Carga especificaciones de API, manuales operativos y documentos de arquitectura. Los ingenieros obtienen respuestas con enlaces directos a las fuentes.",
      },
    ],
    plansLabel: "Planes comerciales",
    plansTitlePrefix: "Despliega Pallas",
    plansTitleAccent: " a tu manera.",
    plansDescription: "Empieza con la edición comunitaria gratuita, consulta un despliegue privado o sigue el desarrollo del próximo servicio SaaS.",
    plans: [
      {
        name: "Community Edition",
        status: "EDICIÓN COMUNITARIA GRATUITA",
        offer: "Gratis",
        offerNote: "Community Edition",
        description: "El código fuente y la documentación de despliegue de la edición gratuita están en GitHub.",
        features: [
          "Backend FastAPI y frontend React + Vite",
          "API de base de conocimiento, búsqueda y flujo de agente",
          "Repositorio público en GitHub con documentación de despliegue",
        ],
        action: "Ver el repositorio en GitHub",
        href: "https://github.com/BelongToMachine/agent-workflow-fast-api",
        external: true,
      },
      {
        name: "Despliegue privado empresarial",
        status: "DESPLIEGUE PRIVADO",
        offer: "Hablemos",
        offerNote: "Alcance y requisitos",
        description: "Instala Pallas en tu propio entorno con un plan de despliegue adaptado a tu equipo.",
        features: [
          "Despliegue privado en tu entorno",
          "Aislamiento de espacios y controles de acceso por rol",
          "Alcance del despliegue según las necesidades de tu equipo",
        ],
        action: "Contactar",
        href: "#demo",
        external: false,
      },
      {
        name: "Pallas Cloud",
        status: "EN DESARROLLO",
        offer: "Próximamente",
        offerNote: "Pronto anunciaremos los detalles",
        description: "El servicio SaaS alojado está en desarrollo. Más adelante anunciaremos su disponibilidad y sus características.",
        features: [
          "Servicio SaaS alojado en desarrollo",
          "Los detalles del servicio siguen en preparación",
          "La fecha de disponibilidad se anunciará más adelante",
        ],
        action: "Próximamente",
        href: null,
        external: false,
      },
    ],
    storyLabel: "Opiniones de clientes",
    storyTitlePrefix: "La experiencia de ",
    storyTitleAccent: "Asianode",
    storyTitleSuffix: " con Pallas",
    portraitAlt: "Retrato de un miembro del equipo de Asianode",
    quote: "Pallas ayuda a nuestro equipo a encontrar respuestas claras en los documentos compartidos. Podemos verificar cada respuesta en su fuente, mientras que el acceso por roles mantiene la información en las manos adecuadas.",
    quoteBy: "Equipo de Asianode",
    brandLink: "Asianode",
    finalTitle: "Deja de perder conocimiento.",
    finalTitleAccent: "Empieza a responder.",
    finalDescription: "Descubre cómo Pallas convierte documentos dispersos en una base de conocimiento con permisos y respuestas trazables.",
    finalRequestDemo: "Solicitar una demo",
    readDocs: "Leer la documentación",
  },
} as const;

export default function HomePage({ locale }: { locale: SiteLocale }) {
  const t = messages[locale];
  const isCjkLocale = locale === "zh" || locale === "ja";
  const kickerTypography = isCjkLocale ? "" : "font-pixel uppercase tracking-[0.28em]";
  return (
    <div lang={locale === "zh" ? "zh-CN" : locale} className="flex flex-col">
      {/* ============ HERO ============ */}
      <section id="product" data-pallas-hero className="relative overflow-hidden px-5 sm:px-8 md:px-6 lg:px-14 pt-8 pb-12 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16 lg:pt-14 lg:pb-20">
        <ScrollingHeroTitle locale={locale} />
        <ProductPreview locale={locale} />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.06] px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className={`text-[10px] text-primary ${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.22em]"}`}>
              {t.badge}
            </span>
          </div>

          {/* Headline */}
          <h2 className={`mb-4 text-[clamp(0.85rem,2.7vw,2rem)] font-black uppercase leading-none tracking-[0.02em] text-foreground ${isCjkLocale ? "whitespace-normal break-keep" : "whitespace-normal"}`}>
            {t.tagline}{isCjkLocale ? "" : " "}<span className="text-primary">{t.taglineAccent}</span>
          </h2>

          {/* Subheadline */}
          <p className="mx-auto max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground mb-10">
            {t.intro}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <a href="#demo" data-contact-intent="demo">
                {t.requestDemo}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#knowledge">{t.exploreFeatures}</a>
            </Button>
          </div>

          {/* Meta row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {t.highlights.map((highlight, index) => (
              <span key={highlight} className="inline-flex items-center gap-6">
                {index > 0 && <span aria-hidden="true" className="h-1 w-1 bg-muted-foreground/40" />}
                <span className={`text-[10px] ${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.18em]"}`}>
                  {highlight}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ KNOWLEDGE BASE FEATURES ============ */}
      <section id="knowledge" className="px-5 sm:px-8 md:px-6 lg:px-14 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-5xl">
            <p className={`text-[11px] text-primary mb-4 ${kickerTypography}`}>
              {t.knowledgeLabel}
            </p>
            <h2 className="mb-6 max-w-5xl text-[clamp(2.25rem,5vw,4.25rem)] font-black uppercase leading-[1.08] tracking-[0.01em] text-foreground">
              <span className="block">
                <span className="text-primary">{t.knowledgeTitleAccent}</span>{t.knowledgeTitleRest}
              </span>
              <span className="block">{t.knowledgeTitleSecond}</span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              {t.knowledgeDescription}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {t.knowledgeFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group cursor-pointer rounded-2xl border border-border/70 bg-card/65 p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary/35 hover:bg-card/90 hover:shadow-[0_18px_42px_-34px_hsl(var(--primary)/0.7)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border/70 bg-background/70 text-primary transition-colors group-hover:border-primary/35 group-hover:bg-primary/10">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AGENT FEATURES ============ */}
      <section id="agent" className="px-5 sm:px-8 md:px-6 lg:px-14 py-14 md:py-20 border-t border-border/40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className={`text-[11px] text-primary mb-4 ${kickerTypography}`}>
              {t.agentLabel}
            </p>
            <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-black uppercase leading-[1] tracking-[0.02em] text-foreground mb-4">
              <span className="text-primary">{t.agentTitleAccent}</span>{t.agentTitleRest}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t.agentDescription}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {t.agentFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group cursor-pointer rounded-2xl border border-border/70 bg-card/65 p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary/35 hover:bg-card/90 hover:shadow-[0_18px_42px_-34px_hsl(var(--primary)/0.7)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border/70 bg-background/70 text-primary transition-colors group-hover:border-primary/35 group-hover:bg-primary/10">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECURITY ============ */}
      <section id="security" className="px-5 sm:px-8 md:px-6 lg:px-14 py-14 md:py-20 border-t border-border/40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className={`text-[11px] text-primary mb-4 ${kickerTypography}`}>
              {t.securityLabel}
            </p>
            <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-black uppercase leading-[1] tracking-[0.02em] text-foreground mb-4">
              <span className="text-primary">{t.securityTitleAccent}</span>{t.securityTitleRest}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t.securityDescription}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.securityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="cursor-pointer rounded-2xl border border-border/70 bg-card/65 p-6 transition-colors duration-300 hover:border-primary/35 hover:bg-card/90"
              >
                <feature.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ USE CASES ============ */}
      <section className="px-5 sm:px-8 md:px-6 lg:px-14 py-14 md:py-20 border-t border-border/40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className={`text-[11px] text-primary mb-4 ${kickerTypography}`}>
              {t.useCasesLabel}
            </p>
            <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-black uppercase leading-[1] tracking-[0.02em] text-foreground">
              {t.useCasesTitlePrefix}<span className="text-primary">{t.useCasesTitleAccent}</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.useCases.map((uc) => (
              <div
                key={uc.tag}
                className="flex cursor-pointer flex-col rounded-2xl border border-border/70 bg-card/65 p-6 transition-[border-color,background-color] duration-300 hover:border-primary/35 hover:bg-card/90"
              >
                <span className={`mb-4 inline-block self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[9px] text-primary ${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.14em]"}`}>
                  {uc.tag}
                </span>
                <h3 className="mb-3 text-lg font-semibold leading-snug tracking-tight text-foreground">
                  {uc.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {uc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SALES PLANS ============ */}
      <section
        id="plans"
        className="border-t border-border/40 px-5 py-14 sm:px-8 md:px-6 md:py-20 lg:px-14"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-2xl">
            <p className={`mb-4 text-[11px] text-primary ${kickerTypography}`}>
              {t.plansLabel}
            </p>
            <h2 className="mb-4 text-[clamp(2rem,6vw,3.5rem)] font-black uppercase leading-[1] tracking-[0.02em] text-foreground">
              {t.plansTitlePrefix}<span className="text-primary">{t.plansTitleAccent}</span>
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t.plansDescription}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.plans.map((plan, index) => (
              <article
                key={plan.name}
                className="group flex flex-col rounded-2xl border border-border/70 bg-card/65 p-8 transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary/35 hover:bg-card/90 hover:shadow-[0_18px_42px_-34px_hsl(var(--primary)/0.7)] md:min-h-[31rem] lg:p-9"
              >
                <span className={`mb-4 inline-block self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[9px] text-primary ${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.14em]"}`}>
                  {plan.status}
                </span>

                <h3 className="mb-3 text-lg font-semibold leading-snug tracking-tight text-foreground">
                  {plan.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>

                <div className="my-7">
                  <p className="text-3xl font-semibold tracking-tight text-foreground">
                    {plan.offer}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {plan.offerNote}
                  </p>
                </div>

                <ul className="mb-8 flex flex-1 flex-col gap-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-sm leading-relaxed text-foreground/90"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  {plan.href ? (
                    <Button
                      asChild
                      className="w-full"
                      variant={index === 1 ? "default" : "outline"}
                    >
                      <a
                        href={plan.href}
                        data-contact-intent={plan.href === "#demo" ? "private-deployment" : undefined}
                        target={plan.external ? "_blank" : undefined}
                        rel={plan.external ? "noopener noreferrer" : undefined}
                      >
                        {plan.action}
                        {plan.external ? (
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        ) : (
                          <ArrowRight aria-hidden="true" className="h-4 w-4" />
                        )}
                      </a>
                    </Button>
                  ) : (
                    <Button type="button" disabled className="w-full" variant="outline">
                      {plan.action}
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CUSTOMER STORY ============ */}
      <section
        id="customer-story"
        className="border-t border-border/40 px-5 py-14 sm:px-8 md:px-6 md:py-20 lg:px-14"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-5 max-w-2xl">
            <p className={`mb-2 text-[10px] text-primary ${isCjkLocale ? "" : "font-pixel uppercase tracking-[0.24em]"}`}>
              {t.storyLabel}
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {t.storyTitlePrefix}<span className="text-primary">{t.storyTitleAccent}</span>{t.storyTitleSuffix}
            </h2>
          </div>

          <figure className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6">
            <Image
              src="/images/asianode-ceo.png"
              alt={t.portraitAlt}
              width={96}
              height={96}
              sizes="96px"
              className="h-24 w-24 shrink-0 rounded-full border border-border/70 object-cover object-[center_38%]"
            />

            <figcaption className="min-w-0 flex-1">
              <blockquote className="text-base leading-relaxed text-foreground sm:text-lg">
                “{t.quote}”
              </blockquote>
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{t.quoteBy}</span>
                <a
                  href="https://asianodeatlas.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-primary transition-colors hover:text-primary/75"
                >
                  {t.brandLink}
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section id="demo" className="px-5 sm:px-8 md:px-6 lg:px-14 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-primary/[0.045] p-10 text-center shadow-[inset_0_1px_0_hsl(var(--primary)/0.08)] md:p-16">
            <h2 className="text-[clamp(1.8rem,5vw,3rem)] font-black uppercase leading-[1.05] tracking-[0.02em] text-foreground mb-4">
              {t.finalTitle}
              <br />
              <span className="text-primary">{t.finalTitleAccent}</span>
            </h2>
            <p className="mx-auto max-w-md text-base text-muted-foreground mb-8">
              {t.finalDescription}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="#demo" data-contact-intent="demo">
                  {t.finalRequestDemo}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href="#docs">{t.readDocs}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
