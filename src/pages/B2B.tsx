import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PromoTicker } from "@/components/PromoTicker";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Building2, Truck, RefreshCw, Headset, Package, Percent, Sparkles } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

const WHATSAPP_URL = "http://wa.me/5519958714408";

const buildWaLink = (msg: string) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`;

const VOLUME_TIERS = [
  {
    name: "Starter",
    range: "10 – 49 unidades",
    description: "Ideal para estúdios e barbearias começando a oferecer skincare premium aos clientes.",
    perks: ["Mix livre entre produtos", "Frete reduzido", "Material de PDV digital"],
  },
  {
    name: "Pro",
    range: "50 – 199 unidades",
    description: "Para revendedores e lojas físicas que querem girar estoque com margem saudável.",
    perks: ["Margem ampliada", "Frete grátis para SP/RJ/MG", "Suporte comercial dedicado"],
    highlight: true,
  },
  {
    name: "Scale",
    range: "200+ unidades",
    description: "Distribuidores e redes. Condição comercial sob medida.",
    perks: ["Tabela negociada", "Prazo faturado (sujeito a análise)", "Co-marketing e ações conjuntas"],
  },
];

const BENEFITS = [
  { icon: Percent, title: "Margens reais", text: "Tabela escalonada por volume, pensada para revenda lucrativa." },
  { icon: Truck, title: "Logística rápida", text: "Despacho em até 48h úteis de SP, com rastreio completo." },
  { icon: RefreshCw, title: "Reposição rápida", text: "Estoque pronto em SP. Reposições despachadas em até 48h úteis, sem espera de produção." },
  { icon: Headset, title: "Atendimento 1:1", text: "Consultor comercial direto no WhatsApp, sem fila de SAC." },
  { icon: Package, title: "Kits prontos", text: "Combos pré-montados para revenda imediata em estúdio ou loja." },
  { icon: Sparkles, title: "Material de apoio", text: "Fotos, vídeos, banners e textos prontos para o seu canal." },
];

const CATALOG = [
  { handle: "madbucks-sabonete-liquido-tattoo", name: "Sabonete Líquido Tattoo", role: "Limpeza pós-sessão" },
  { handle: "madbucks-creme-hidratante-tattoo", name: "Creme Hidratante Tattoo", role: "Cicatrização diária" },
  { handle: "madbucks-tattoo-balm-stick", name: "Tattoo Balm Stick", role: "Reparo em bastão" },
  { handle: "madbucks-tattoo-intensify", name: "Tattoo Intensify", role: "Realce de cor e brilho" },
  { handle: "kit-tatuagem-perfeita", name: "Kit Tatuagem Perfeita", role: "Rotina completa" },
];

const FAQS = [
  { q: "Qual o pedido mínimo (MOQ)?", a: "10 unidades, podendo ser sortidas entre todos os SKUs do portfólio." },
  { q: "Posso variar os SKUs no mesmo pedido?", a: "Sim. O MOQ pode ser composto livremente entre todos os produtos do portfólio, inclusive kits." },
  { q: "Qual o prazo de entrega?", a: "Despacho em até 48h úteis após a confirmação do pagamento. Prazo de transporte varia por região." },
  { q: "Tem frete grátis?", a: "Sim, no plano Pro (50+ un) para SP, RJ e MG. Demais regiões com tabela reduzida." },
  { q: "Como funciona o pagamento?", a: "PIX e cartão até 6x sem juros para todos. Boleto faturado disponível no plano Scale, mediante análise." },
  { q: "Posso revender online?", a: "Não. A revenda B2B é exclusiva para venda presencial em estúdios, barbearias e lojas físicas. Canais online (e-commerce próprio, marketplaces) não são autorizados." },
  { q: "Tem exclusividade por região?", a: "Avaliamos exclusividade para distribuidores Scale com volume e plano de expansão definidos." },
];

export default function B2B() {
  const [count, setCount] = useState<string>("");
  const [productImages, setProductImages] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchProducts(20)
      .then((products: ShopifyProduct[]) => {
        const map: Record<string, string> = {};
        products.forEach((p) => {
          const url = p.node.images?.edges?.[0]?.node?.url;
          if (url) map[p.node.handle] = url;
        });
        setProductImages(map);
      })
      .catch(() => {});
  }, []);

  const ctaMessage = `Olá! Tenho interesse na linha B2B Madbucks.${
    count ? ` Pretendo iniciar com cerca de ${count} unidades.` : ""
  }`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Madbucks B2B — Skincare premium para estúdios, barbearias e distribuidores"
        description="Revenda Madbucks no seu estúdio, barbearia ou loja. Margens reais, reposição rápida e suporte 1:1. Fale com nosso comercial."
        canonical="/b2b"
      />
      <PromoTicker />
      <Navbar />

      <main style={{ paddingTop: "calc(56px + var(--ticker-height, 0px))" }}>
        {/* HERO */}
        <section className="relative border-b border-border">
          <div className="container mx-auto px-4 py-16 md:py-28">
            <div className="grid md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-6">
                  <Building2 className="h-3.5 w-3.5" /> Programa B2B Madbucks
                </span>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.95] tracking-tight text-foreground">
                  Skincare premium<br />
                  para quem vive<br />
                  <span className="text-muted-foreground">de tatuagem.</span>
                </h1>
                <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Estúdios, barbearias e lojas físicas. Revenda a linha completa Madbucks com margem real, suporte direto e logística que respeita o ritmo do seu negócio.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a href={buildWaLink(ctaMessage)} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full sm:w-auto group">
                      Falar com o comercial
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                  <a href="#faixas">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Ver condições
                    </Button>
                  </a>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Resposta em até 1 dia útil • Atendimento direto pelo WhatsApp
                </p>
              </div>
              <div className="md:col-span-5">
                <div className="bg-muted/40 border border-border rounded-2xl p-8">
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-4">
                    Para quem é
                  </p>
                  <ul className="space-y-4">
                    {[
                      { t: "Estúdios de tatuagem", d: "Use nos clientes e revenda no balcão." },
                      { t: "Barbearias", d: "Adicione skincare ao mix da sua marca." },
                      { t: "Distribuidores e lojas físicas", d: "Volume com margem e exclusividade regional." },
                    ].map((it) => (
                      <li key={it.t} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground flex-shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-foreground">{it.t}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{it.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                Por que revender Madbucks
              </p>
              <h2 className="font-display text-3xl md:text-5xl uppercase leading-tight text-foreground">
                Estrutura de marca,<br />operação de parceiro.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {BENEFITS.map((b) => (
                <div key={b.title} className="bg-background p-8">
                  <b.icon className="h-6 w-6 text-foreground mb-4" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VOLUME TIERS */}
        <section id="faixas" className="border-b border-border bg-muted/20">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                Condições por volume
              </p>
              <h2 className="font-display text-3xl md:text-5xl uppercase leading-tight text-foreground">
                Quanto maior o pedido,<br />melhor a condição.
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Tabela completa enviada pelo WhatsApp após o primeiro contato. Mix livre entre todos os SKUs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {VOLUME_TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-2xl p-8 border ${
                    tier.highlight
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background border-border"
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="font-display text-2xl uppercase">{tier.name}</h3>
                    {tier.highlight && (
                      <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">
                        Mais escolhido
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-sm font-semibold mb-6 ${
                      tier.highlight ? "opacity-90" : "text-muted-foreground"
                    }`}
                  >
                    {tier.range}
                  </p>
                  <p
                    className={`text-sm mb-6 leading-relaxed ${
                      tier.highlight ? "opacity-80" : "text-muted-foreground"
                    }`}
                  >
                    {tier.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {tier.perks.map((p) => (
                      <li key={p} className="flex gap-2 text-sm">
                        <span
                          className={`mt-2 h-1 w-1 rounded-full flex-shrink-0 ${
                            tier.highlight ? "bg-background" : "bg-foreground"
                          }`}
                        />
                        <span className={tier.highlight ? "" : "text-foreground"}>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={buildWaLink(`Olá! Tenho interesse no plano ${tier.name} (${tier.range}) da Madbucks.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant={tier.highlight ? "secondary" : "outline"}
                      className="w-full"
                    >
                      Solicitar tabela
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATALOG */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                Portfólio disponível
              </p>
              <h2 className="font-display text-3xl md:text-5xl uppercase leading-tight text-foreground">
                Quatro produtos.<br />Uma rotina completa.
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {CATALOG.map((p) => {
                const img = productImages[p.handle];
                return (
                  <Link
                    key={p.handle}
                    to={`/products/${p.handle}`}
                    className="group bg-muted/30 hover:bg-muted/60 transition-colors border border-border rounded-xl p-4 flex flex-col"
                  >
                    <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-background flex items-center justify-center">
                      {img ? (
                        <img
                          src={img}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted animate-pulse" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-2">
                      {p.role}
                    </span>
                    <span className="text-sm font-bold text-foreground leading-tight flex-1">
                      {p.name}
                    </span>
                    <ArrowRight className="h-4 w-4 mt-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* PARTNER VOICES (estrutura vazia, sem reviews fake) */}
        <section className="border-b border-border bg-muted/20">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                Vozes de parceiros
              </p>
              <h2 className="font-display text-3xl md:text-5xl uppercase leading-tight text-foreground">
                Em construção.<br />Seu nome pode estar aqui.
              </h2>
              <p className="mt-4 text-sm text-muted-foreground max-w-lg">
                Estamos coletando depoimentos reais dos primeiros parceiros da rede. Quer ser um deles?
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border border-dashed border-border rounded-xl p-8 bg-background/50 min-h-[180px] flex items-center justify-center text-center"
                >
                  <p className="text-xs uppercase tracking-widest text-muted-foreground/60">
                    Espaço reservado
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-12 gap-10">
              <div className="md:col-span-4">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                  Perguntas frequentes
                </p>
                <h2 className="font-display text-3xl md:text-5xl uppercase leading-tight text-foreground">
                  Tira-dúvidas<br />comercial.
                </h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Não encontrou o que procurava? Manda no WhatsApp.
                </p>
              </div>
              <div className="md:col-span-8">
                <Accordion type="single" collapsible className="w-full">
                  {FAQS.map((f, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-left text-sm font-bold uppercase tracking-wider">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-foreground text-background">
          <div className="container mx-auto px-4 py-20 md:py-28 text-center">
            <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.95] tracking-tight mb-6">
              Bora colocar Madbucks<br />no seu balcão?
            </h2>
            <p className="text-base md:text-lg opacity-80 max-w-xl mx-auto mb-8">
              Conta pra gente o tamanho do seu negócio e a gente monta a melhor condição.
            </p>
            <div className="max-w-sm mx-auto mb-6">
              <label className="block text-[10px] font-bold tracking-[0.25em] uppercase opacity-70 mb-2 text-left">
                Quantas unidades pretende iniciar?
              </label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="Ex: 50"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full bg-background/10 border border-background/30 rounded-md px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-background transition-colors"
              />
            </div>
            <a href={buildWaLink(ctaMessage)} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="group">
                Falar com o comercial agora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <p className="mt-4 text-xs opacity-60">CNPJ obrigatório • Resposta em até 1 dia útil</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
