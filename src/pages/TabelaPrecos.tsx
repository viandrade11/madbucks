import { ArrowRight, Check, Truck, CreditCard, Package, MessageCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import intensifyImg from "@/assets/b2b/intensify.webp";
import balmStickImg from "@/assets/b2b/balm-stick.webp";
import cremeImg from "@/assets/b2b/creme.webp";
import saboneteImg from "@/assets/b2b/sabonete.webp";

const products = [
  { name: "Tattoo Balm", vol: "50g", starter: 49.94, pro: 44.95, scale: 42.81, msrp: 89.9, img: intensifyImg },
  { name: "Tattoo Balm Stick", vol: "12g", starter: 33.28, pro: 29.95, scale: 28.52, msrp: 59.9, img: balmStickImg },
  { name: "Creme Hidratante Tattoo", vol: "200ml", starter: 66.61, pro: 59.95, scale: 57.1, msrp: 119.9, img: cremeImg },
  { name: "Sabonete Líquido Tattoo", vol: "300ml", starter: 22.17, pro: 19.95, scale: 19.0, msrp: 39.9, img: saboneteImg },
];

const tiers = [
  {
    name: "STARTER",
    range: "10 – 49 unidades",
    markup: "1.8x",
    tagline: "Começa o catálogo, testa o giro.",
    payment: "Pix à vista ou cartão em até 3x com juros",
    paymentBadge: "COM JUROS",
    paymentBadgeVariant: "destructive" as const,
    shipping: "Frete por conta do cliente",
    shippingBadge: "POR CONTA",
    shippingBadgeVariant: "destructive" as const,
    dark: false,
  },
  {
    name: "PRO",
    range: "50 – 199 unidades",
    markup: "2.0x",
    tagline: "Margem cheia, reposição constante.",
    payment: "Pix ou cartão em até 3x sem juros",
    paymentBadge: "SEM JUROS",
    paymentBadgeVariant: "success" as const,
    shipping: "Frete grátis para SP, RJ e MG",
    shippingBadge: "GRÁTIS",
    shippingBadgeVariant: "success" as const,
    dark: true,
  },
  {
    name: "SCALE",
    range: "200+ unidades",
    markup: "2.1x",
    tagline: "Volume com exclusividade regional.",
    payment: "Pix, cartão em até 5x sem juros ou prazo faturado*",
    paymentBadge: "SEM JUROS",
    paymentBadgeVariant: "success" as const,
    shipping: "Frete grátis para todo o Brasil",
    shippingBadge: "GRÁTIS",
    shippingBadgeVariant: "success" as const,
    dark: false,
  },
];

const benefits = [
  { icon: Truck, title: "Despacho em até 48h úteis", desc: "Saída de SP com rastreio completo." },
  { icon: MessageCircle, title: "Atendimento 1:1 no WhatsApp", desc: "Consultor comercial direto, sem fila de SAC." },
  { icon: Package, title: "Material de apoio", desc: "Fotos, vídeos, banners e textos prontos." },
  { icon: Check, title: "Mix livre entre SKUs", desc: "Combine produtos para atingir a faixa de volume." },
];

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

const Badge = ({ variant, children }: { variant: "destructive" | "success"; children: React.ReactNode }) => (
  <span
    className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
      variant === "destructive"
        ? "bg-destructive text-destructive-foreground"
        : "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]"
    }`}
  >
    {children}
  </span>
);

const WHATSAPP =
  "https://wa.me/5519958714408?text=Ol%C3%A1!%20Tenho%20interesse%20na%20tabela%20B2B%20Madbucks.";

const TabelaPrecos = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEO
        title="Tabela de Preços B2B · Madbucks"
        description="Tabela escalonada de revenda Madbucks: Starter, Pro e Scale. Margem real, suporte direto e logística simples."
        noindex
      />

      {/* Top bar */}
      <header className="bg-foreground text-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
            Madbucks · Programa B2B
          </span>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] hover:opacity-70 sm:inline-flex"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Falar no WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-14 sm:pt-20">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
          ■ Tabela de Preços · Revenda
        </p>
        <h1 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl md:text-8xl">
          Skincare
          <br />
          premium
          <br />
          <span className="text-[hsl(var(--foreground-muted))]">para revenda.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base text-[hsl(var(--foreground-muted))] sm:text-lg">
          Tabela escalonada por volume com margem real, suporte direto e logística que respeita o
          ritmo do seu negócio.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3.5 text-sm font-bold text-background transition hover:opacity-90"
          >
            Falar com o comercial <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#tabela"
            className="inline-flex items-center gap-2 rounded-lg border border-foreground/15 bg-[hsl(var(--background-alt))] px-6 py-3.5 text-sm font-bold text-foreground transition hover:border-foreground/40"
          >
            Ver condições
          </a>
        </div>
      </section>

      {/* Tier summary cards */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-3 sm:grid-cols-3">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={`relative rounded-xl p-6 ${
                t.dark
                  ? "bg-foreground text-background"
                  : "bg-[hsl(var(--background-alt))] text-foreground"
              }`}
            >
              <p
                className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${
                  t.dark ? "text-background/55" : "text-[hsl(var(--foreground-muted))]"
                }`}
              >
                Faixa 0{i + 1}
              </p>
              <p className="font-display mt-3 text-3xl uppercase">{t.name}</p>
              <p className={`mt-1 text-sm ${t.dark ? "text-background/70" : "text-[hsl(var(--foreground-muted))]"}`}>
                {t.range}
              </p>
              <div className="mt-8">
                <p
                  className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${
                    t.dark ? "text-background/55" : "text-[hsl(var(--foreground-muted))]"
                  }`}
                >
                  Markup esperado
                </p>
                <p className="font-display mt-1 text-3xl">{t.markup}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabela */}
      <section id="tabela" className="mx-auto max-w-6xl px-6 pb-16">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
          ■ Preços por faixa de volume
        </p>
        <h2 className="font-display mt-4 text-4xl uppercase leading-[0.95] sm:text-5xl">
          Quanto maior o pedido,
          <br />
          <span className="text-[hsl(var(--foreground-muted))]">melhor a condição.</span>
        </h2>

        <div className="mt-10 overflow-hidden rounded-xl border border-foreground/10">
          {/* Header */}
          <div className="hidden grid-cols-12 gap-2 bg-foreground px-4 py-4 text-background sm:grid">
            <div className="col-span-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">Produto</div>
            <div className="col-span-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
              Starter <span className="text-background/55">· 1.8x</span>
            </div>
            <div className="col-span-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
              Pro <span className="text-background/55">· 2.0x</span>
            </div>
            <div className="col-span-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
              Scale <span className="text-background/55">· 2.1x</span>
            </div>
            <div className="col-span-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold))]">
              Consumidor
            </div>
          </div>

          {/* Rows */}
          {products.map((p, i) => (
            <div
              key={p.name}
              className={`grid grid-cols-2 gap-3 px-4 py-5 sm:grid-cols-12 sm:gap-2 sm:py-6 ${
                i % 2 === 0 ? "bg-[hsl(var(--background-alt))]" : "bg-background"
              }`}
            >
              <div className="col-span-2 flex items-center gap-3 sm:col-span-4 sm:gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background sm:h-16 sm:w-16">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold sm:text-lg">{p.name}</p>
                  <p className="text-sm text-[hsl(var(--foreground-muted))]">{p.vol}</p>
                </div>
              </div>

              <div className="sm:col-span-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))] sm:hidden">
                  Starter
                </p>
                <p className="text-base font-bold tabular-nums">{brl(p.starter)}</p>
                <p className="text-[11px] text-[hsl(var(--foreground-muted))]">por unidade</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))] sm:hidden">
                  Pro
                </p>
                <p className="text-base font-bold tabular-nums">{brl(p.pro)}</p>
                <p className="text-[11px] text-[hsl(var(--foreground-muted))]">por unidade</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))] sm:hidden">
                  Scale
                </p>
                <p className="text-base font-bold tabular-nums">{brl(p.scale)}</p>
                <p className="text-[11px] text-[hsl(var(--foreground-muted))]">por unidade</p>
              </div>
              <div className="col-span-2 border-t border-foreground/10 pt-3 sm:col-span-2 sm:border-0 sm:pt-0">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold))] sm:hidden">
                  Consumidor
                </p>
                <p className="text-base font-bold tabular-nums text-[hsl(var(--gold))]">
                  {brl(p.msrp)}
                </p>
                <p className="text-[11px] text-[hsl(var(--foreground-muted))]">preço sugerido</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 max-w-3xl text-xs text-[hsl(var(--foreground-muted))]">
          Markup = preço de venda ao consumidor ÷ preço de revenda. Mix livre entre todos os SKUs
          para atingir a faixa. Valores em Reais (BRL), por unidade. Frete não incluso no Starter —
          calculado por CEP no fechamento do pedido.
        </p>
      </section>

      {/* Condições */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
          ■ Condições de pagamento e logística
        </p>
        <h2 className="font-display mt-4 text-4xl uppercase leading-[0.95] sm:text-5xl">
          Fechar pedido
          <br />
          <span className="text-[hsl(var(--foreground-muted))]">tem que ser simples.</span>
        </h2>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col rounded-xl p-6 ${
                t.dark
                  ? "bg-foreground text-background"
                  : "bg-[hsl(var(--background-alt))] text-foreground"
              }`}
            >
              <p
                className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${
                  t.dark ? "text-background/55" : "text-[hsl(var(--foreground-muted))]"
                }`}
              >
                {t.range}
              </p>
              <p className="font-display mt-3 text-3xl uppercase">{t.name}</p>
              <p className={`mt-2 text-sm ${t.dark ? "text-background/70" : "text-[hsl(var(--foreground-muted))]"}`}>
                {t.tagline}
              </p>

              <div className={`mt-6 border-t pt-5 ${t.dark ? "border-background/15" : "border-foreground/10"}`}>
                <div className="flex items-center gap-2">
                  <CreditCard className={`h-3.5 w-3.5 ${t.dark ? "text-background/55" : "text-[hsl(var(--foreground-muted))]"}`} />
                  <span
                    className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${
                      t.dark ? "text-background/55" : "text-[hsl(var(--foreground-muted))]"
                    }`}
                  >
                    Pagamento
                  </span>
                  <Badge variant={t.paymentBadgeVariant}>{t.paymentBadge}</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold leading-snug">{t.payment}</p>
              </div>

              <div className={`mt-5 border-t pt-5 ${t.dark ? "border-background/15" : "border-foreground/10"}`}>
                <div className="flex items-center gap-2">
                  <Truck className={`h-3.5 w-3.5 ${t.dark ? "text-background/55" : "text-[hsl(var(--foreground-muted))]"}`} />
                  <span
                    className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${
                      t.dark ? "text-background/55" : "text-[hsl(var(--foreground-muted))]"
                    }`}
                  >
                    Frete
                  </span>
                  <Badge variant={t.shippingBadgeVariant}>{t.shippingBadge}</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold leading-snug">{t.shipping}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[hsl(var(--foreground-muted))]">* Prazo faturado sujeito a análise de crédito.</p>
      </section>

      {/* Benefícios */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
          ■ Incluso em todas as faixas
        </p>
        <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-3">
              <div className="mt-0.5 rounded-md bg-foreground p-1.5 text-background">
                <b.icon className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="font-bold">{b.title}</p>
                <p className="text-sm text-[hsl(var(--foreground-muted))]">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl bg-foreground p-8 text-background sm:p-12">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">
            Próximo passo
          </p>
          <h3 className="font-display mt-3 text-4xl uppercase leading-[0.95] sm:text-5xl">
            Falar com o comercial agora.
          </h3>
          <p className="mt-3 text-background/70">
            WhatsApp (19) 95871-4408 · Resposta em até 1 dia útil.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3.5 text-sm font-bold text-foreground transition hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> Abrir WhatsApp
            </a>
            <a
              href="/b2b/apresentacao"
              className="inline-flex items-center gap-2 rounded-lg border border-background/25 px-6 py-3.5 text-sm font-bold text-background transition hover:border-background/60"
            >
              Ver apresentação
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-[hsl(var(--foreground-muted))] sm:flex-row sm:items-center sm:justify-between">
          <span>madbucks.com.br/b2b · WhatsApp comercial: (19) 95871-4408</span>
          <span className="font-bold text-foreground">
            Tabela válida para pedidos confirmados em até 30 dias.
          </span>
        </div>
      </footer>
    </main>
  );
};

export default TabelaPrecos;
