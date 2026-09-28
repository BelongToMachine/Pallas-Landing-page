import { Button } from "@asianode/ui/button";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Database, MessageSquare, Shield, FileText, Search, Users, Lock, FileUp, Bot } from "lucide-react";
import ProductPreview from "./_components/ProductPreview";
import ScrollingHeroTitle from "./_components/ScrollingHeroTitle";

const knowledgeFeatures = [
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
      "pgvector-powered embeddings retrieve the right context from your docs. No keyword guessing — ask naturally and get precise, cited answers.",
  },
  {
    icon: FileText,
    title: "Source Citations",
    description:
      "Every answer links back to the exact file and section it came from. Verify in one click, no hallucination roulette.",
  },
  {
    icon: Database,
    title: "Workspace Isolation",
    description:
      "Multiple knowledge bases per workspace. Organize by product, team, or client — each with its own files, permissions and lifecycle.",
  },
];

const agentFeatures = [
  {
    icon: MessageSquare,
    title: "Streaming Chat",
    description:
      "SSE-powered real-time responses. Chat history persists across sessions, with stream recovery when connections drop.",
  },
  {
    icon: Bot,
    title: "Controlled Agent Workflow",
    description:
      "Server-side tool whitelisting, parameter validation and bounded agent loops. The agent can query your knowledge base but cannot forge answers.",
  },
  {
    icon: Shield,
    title: "Permission-Aware Retrieval",
    description:
      "Every search filters by the requesting user's grants. Employees only see what they're authorized to read — enforced at the data layer.",
  },
  {
    icon: Users,
    title: "Team Ready",
    description:
      "Owner / Admin / Member roles, per-member overrides, invitation flow and audit logs for every sensitive action.",
  },
];

const useCases = [
  {
    tag: "Customer Support",
    title: "AI Support That Cites Its Sources",
    description:
      "Feed your help center, SOPs and product manuals. Agents answer with traceable references, so support teams spend less time searching and more time resolving.",
  },
  {
    tag: "Employee Onboarding",
    title: "Answer Every 'Where Do I Find…' Question",
    description:
      "New hires ask the AI instead of pinging teammates. IT policies, internal wiki, process docs — all in one permission-aware knowledge base.",
  },
  {
    tag: "Technical Documentation",
    title: "Engineering Docs That Answer Themselves",
    description:
      "Upload API specs, runbooks and architecture docs. Engineers get instant answers with direct links to the source material.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ============ HERO ============ */}
      <section id="product" data-pallas-hero className="relative overflow-hidden px-5 sm:px-8 md:px-6 lg:px-14 pt-8 pb-20 sm:pt-10 sm:pb-24 md:pt-12 lg:pt-14 lg:pb-28">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <ScrollingHeroTitle />
          <ProductPreview />

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.06] px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="font-pixel text-[10px] uppercase tracking-[0.22em] text-primary">
              Enterprise Knowledge AI
            </span>
          </div>

          {/* Headline */}
          <h2 className="mb-4 whitespace-nowrap text-[clamp(0.85rem,2.7vw,2rem)] font-black uppercase leading-none tracking-[0.02em] text-foreground">
            {"Your Docs. "}
            <span className="text-primary">Your Rules. AI Answers.</span>
          </h2>

          {/* Subheadline */}
          <p className="mx-auto max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground mb-10">
            Pallas turns scattered product docs, wikis and FAQs into a
            permission-aware AI knowledge base — so your team gets traceable
            answers without the chaos.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <a href="#demo">
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#knowledge">Explore Features</a>
            </Button>
          </div>

          {/* Meta row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="font-pixel text-[10px] uppercase tracking-[0.18em]">
              Self-hosted
            </span>
            <span className="w-1 h-1 bg-muted-foreground/40" />
            <span className="font-pixel text-[10px] uppercase tracking-[0.18em]">
              Workspace isolation
            </span>
            <span className="w-1 h-1 bg-muted-foreground/40" />
            <span className="font-pixel text-[10px] uppercase tracking-[0.18em]">
              Source citations
            </span>
          </div>
        </div>
      </section>

      {/* ============ KNOWLEDGE BASE FEATURES ============ */}
      <section id="knowledge" className="px-5 sm:px-8 md:px-6 lg:px-14 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className="font-pixel text-[11px] uppercase tracking-[0.28em] text-primary mb-4">
              Knowledge Base
            </p>
            <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-black uppercase leading-[1] tracking-[0.02em] text-foreground mb-4">
              Your docs, organized and queryable
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Upload once. Ask anything. Every answer traces back to the source.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {knowledgeFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border/70 bg-card/65 p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary/35 hover:bg-card/90 hover:shadow-[0_18px_42px_-34px_hsl(var(--primary)/0.7)]"
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
      <section id="agent" className="px-5 sm:px-8 md:px-6 lg:px-14 py-20 md:py-28 border-t border-border/40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className="font-pixel text-[11px] uppercase tracking-[0.28em] text-primary mb-4">
              AI Agent
            </p>
            <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-black uppercase leading-[1] tracking-[0.02em] text-foreground mb-4">
              Answers you can trust
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Streaming conversations with tool-aware retrieval, bounded agent
              loops, and permission filtering baked in.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {agentFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border/70 bg-card/65 p-6 transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary/35 hover:bg-card/90 hover:shadow-[0_18px_42px_-34px_hsl(var(--primary)/0.7)]"
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
      <section id="security" className="px-5 sm:px-8 md:px-6 lg:px-14 py-20 md:py-28 border-t border-border/40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className="font-pixel text-[11px] uppercase tracking-[0.28em] text-primary mb-4">
              Security & Control
            </p>
            <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-black uppercase leading-[1] tracking-[0.02em] text-foreground mb-4">
              Permission-first architecture
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Security is enforced at the data layer, not just hidden in the UI.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-card/65 p-6 transition-colors duration-300 hover:border-primary/35 hover:bg-card/90">
              <Lock className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground">
                Workspace Isolation
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Every request revalidates user → workspace → resource ownership.
                No trust on the client side.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/65 p-6 transition-colors duration-300 hover:border-primary/35 hover:bg-card/90">
              <Shield className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground">
                Role-Based Access
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Owner, Admin, Member roles with per-knowledge-base grants and
                member-level overrides.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/65 p-6 transition-colors duration-300 hover:border-primary/35 hover:bg-card/90">
              <Users className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground">
                Audit Trail
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Every admin action is logged. Review who changed what, when,
                and why.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ USE CASES ============ */}
      <section className="px-5 sm:px-8 md:px-6 lg:px-14 py-20 md:py-28 border-t border-border/40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className="font-pixel text-[11px] uppercase tracking-[0.28em] text-primary mb-4">
              Use Cases
            </p>
            <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-black uppercase leading-[1] tracking-[0.02em] text-foreground">
              Built for real teams
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {useCases.map((uc) => (
              <div
                key={uc.tag}
                className="flex flex-col rounded-2xl border border-border/70 bg-card/65 p-6 transition-[border-color,background-color] duration-300 hover:border-primary/35 hover:bg-card/90"
              >
                <span className="font-pixel mb-4 inline-block self-start rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[9px] uppercase tracking-[0.14em] text-primary">
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

      {/* ============ CUSTOMER STORY ============ */}
      <section
        id="customer-story"
        className="border-t border-border/40 px-5 py-14 sm:px-8 md:px-6 md:py-20 lg:px-14"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-5 max-w-2xl">
            <p className="font-pixel mb-2 text-[10px] uppercase tracking-[0.24em] text-primary">
              Customer feedback
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              A CEO&apos;s perspective on Pallas
            </h2>
          </div>

          <figure className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6">
            <Image
              src="/images/asianode-ceo.png"
              alt="Portrait of the Asianode CEO"
              width={96}
              height={96}
              sizes="96px"
              className="h-24 w-24 shrink-0 rounded-full border border-border/70 object-cover object-[center_38%]"
            />

            <figcaption className="min-w-0 flex-1">
              <blockquote className="text-base leading-relaxed text-foreground sm:text-lg">
                “Pallas makes it easier for our team to get clear answers from shared documents. We can verify each response against its source, while role-based access keeps information in the right hands.”
              </blockquote>
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">CEO, Asianode</span>
                <span aria-hidden="true">·</span>
                <span>Suggested quote · pending approval</span>
                <a
                  href="https://asianodeatlas.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-primary transition-colors hover:text-primary/75"
                >
                  Asianode
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
              Stop losing knowledge.
              <br />
              <span className="text-primary">Start answering.</span>
            </h2>
            <p className="mx-auto max-w-md text-base text-muted-foreground mb-8">
              See how Pallas turns your scattered docs into a
              permission-aware AI knowledge base.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="#">
                  Request a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href="#docs">Read the Docs</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
