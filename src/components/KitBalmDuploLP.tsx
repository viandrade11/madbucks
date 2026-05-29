import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { PriceDisplay } from "@/components/PriceDisplay";
import { UpsellSection } from "@/components/UpsellSection";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ArrowLeft, ChevronDown, Sparkles, Package, Repeat, ShieldCheck, Layers, PiggyBank } from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ComparisonTable } from "@/components/ComparisonTable";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";

const STATS = [
  { value: "2x", unit: "potes", label: "Tattoo Balm 50g — o produto mais amado da Madbucks" },
  { value: "100", unit: "g", label: "De fórmula intensificadora pra não acabar nunca" },
  { value: "~3", unit: "meses", label: "De rotina diária com cor viva e hidratação contínua" },
];

const TICKER_ITEMS = [
  "ESTOQUE GARANTIDO",
  "DOIS POTES · UM RITUAL",
  "NUNCA FIQUE SEM",
  "100% NATURAL",
  "VEGANO E CRUELTY-FREE",
  "APROVADO PELA ANVISA",
];

const KIT_PRODUCTS = [
  {
    icon: Package,
    name: "Tattoo Balm",
    size: "50g",
    step: "Pote 1 — em uso",
    desc: "O balm que intensifica cor, hidrata profundamente e cria camada protetora. Use manhã e noite na sua rotina.",
    handle: "madbucks-tattoo-intensify",
  },
  {
    icon: Package,
    name: "Tattoo Balm",
    size: "50g",
    step: "Pote 2 — reserva",
    desc: "Seu backup garantido. Quando o primeiro acabar, o segundo já está esperando. Sem pausa, sem desculpa, sem tatuagem apagada.",
    handle: "madbucks-tattoo-intensify",
  },
];

const REASONS = [
  { icon: ShieldCheck, title: "Nunca Fique Sem", desc: "Esgotar o balm no meio da rotina é a forma mais rápida de ver a cor da sua tattoo apagar. Com dois potes, isso não acontece." },
  { icon: PiggyBank, title: "Economia Real", desc: "Comprar em dupla sai mais em conta do que repor um por vez. Mais produto, menos frete, menos checkout." },
  { icon: Repeat, title: "Rotina Sem Pausa", desc: "Sem janela entre um pote e outro. A continuidade é o que mantém a cor vibrante mês após mês." },
  { icon: Layers, title: "Pra Mais de Uma Tatuagem", desc: "Tem várias tattoos? Deixe um pote em cada lugar — casa, trabalho, viagem. O balm fica perto onde você precisar." },
];

const BENEFITS = [
  { icon: Sparkles, title: "Cor Sempre no Ponto", desc: "Aplicação diária mantém preto, contraste e cores vivas como recém-feitas." },
  { icon: ShieldCheck, title: "Proteção Contínua", desc: "Camada protetora que defende a pele tatuada de ressecamento, atrito e sol." },
  { icon: Package, title: "Fórmula Concentrada", desc: "100g totais de produto que rendem semanas, mesmo com aplicação generosa." },
  { icon: PiggyBank, title: "Mais Vantajoso Que Avulso", desc: "Levar dois custa menos do que comprar um, acabar, e voltar pra comprar outro." },
];

const FAQS = [
  { q: "Por que comprar dois potes do mesmo Tattoo Balm?", a: "Porque o balm é o produto que mais rende resultado visível na cor da tatuagem — e também o que mais acaba rápido em quem tem rotina firme. Com dois, você nunca interrompe o ciclo e ainda economiza vs comprar avulso." },
  { q: "É o mesmo Tattoo Balm vendido individualmente?", a: "Exatamente o mesmo. Mesma fórmula, mesma embalagem 50g, mesma performance. Só que em dupla, com preço melhor." },
  { q: "Quanto tempo dura cada pote?", a: "Em média 30-45 dias com uso diário em uma tatuagem média. Com dois potes você cobre cerca de 2-3 meses de rotina sem pausa." },
  { q: "Posso dividir os potes com alguém?", a: "Sim — muita gente compra pra dividir com parceiro(a) ou amigo tatuado. Cada pote é independente e lacrado." },
  { q: "Qual a diferença entre esse kit e o Kit Intensidade Diária?", a: "O Intensidade Diária vem com 1 pote 50g + 1 stick 12g (formatos diferentes, mesmo ativo). Esse aqui são 2 potes 50g — pra quem já sabe que ama o balm e quer estoque pra rotina longa." },
  { q: "Vale a pena se eu já uso sabonete e creme?", a: "Sim. O balm é o passo de intensificação que finaliza a rotina. Os dois potes garantem que esse passo nunca fique de fora." },
];

const TESTIMONIALS = [
  { name: "Lucas R.", location: "São Paulo, SP", text: "Comprei o duplo porque já tava no segundo pedido em 2 meses. Agora não passo mais raiva de abrir o pote e ver que tá no fim.", rating: 5, product: "Kit Balm Duplo" },
  { name: "André M.", location: "Belo Horizonte, MG", text: "Divido um pote com minha esposa, ela também tem tattoo. Sai muito mais barato do que comprar um pra cada.", rating: 5, product: "Kit Balm Duplo" },
  { name: "Felipe S.", location: "Curitiba, PR", text: "Tenho braço fechado, gasto balm rápido. Os dois potes me cobrem uns 2 meses tranquilo. Recomendo demais.", rating: 5, product: "Kit Balm Duplo" },
];

interface Props { product: ShopifyProduct["node"]; }

const KitBalmDuploLP = ({ product }: Props) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const selectedVariant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;
  const hasMultipleVariants = product.variants.edges.length > 1 || (product.variants.edges.length === 1 && product.variants.edges[0].node.title !== "Default Title");

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho!", { position: "top-center" });
  };

  return (
    <>
      <StickyBuyBar
        productTitle={product.title}
        price={selectedVariant?.price || { amount: "0", currencyCode: "BRL" }}
        compareAtPrice={selectedVariant?.compareAtPrice}
        onAddToCart={handleAddToCart}
        isLoading={isLoading}
        available={selectedVariant?.availableForSale ?? false}
        productImage={images[0]?.node?.url}
      />

      {/* HERO */}
      <section className="pb-16" style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + var(--ticker-height, 0px) + 56px + 1.5rem)" }}>
        <div className="container mx-auto px-4">
          <Link to="/collections?filter=kit" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-xs font-semibold uppercase tracking-wider">
            <ArrowLeft className="h-3 w-3" /> Ver todos os kits
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <ScrollReveal direction="left">
              <div className="space-y-3">
                <div className="aspect-square overflow-hidden bg-muted rounded">
                  {images[selectedImage]?.node ? (
                    <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Sem imagem</div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-16 h-16 rounded overflow-hidden border-2 flex-shrink-0 transition-colors ${idx === selectedImage ? "border-foreground" : "border-border hover:border-muted-foreground"}`}
                      >
                        <img src={img.node.url} alt={`${product.title} - miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">Madbucks · Estoque garantido</p>
                  <h1 className="font-display text-3xl md:text-4xl tracking-tight text-foreground mb-2">{product.title}</h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    O Tattoo Balm é o produto mais amado da Madbucks — e o que acaba mais rápido em quem tem rotina firme. Leve dois e nunca fique sem hidratação para sua tattoo.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {[
                    { icon: Package, text: "2× Tattoo Balm 50g" },
                    { icon: ShieldCheck, text: "Estoque pra ~3 meses" },
                    { icon: PiggyBank, text: "Mais barato que avulso" },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <badge.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{badge.text}</span>
                    </div>
                  ))}
                </div>

                {selectedVariant && (
                  <PriceDisplay
                    amount={selectedVariant.price.amount}
                    currencyCode={selectedVariant.price.currencyCode}
                    compareAtAmount={selectedVariant.compareAtPrice?.amount}
                  />
                )}

                {hasMultipleVariants && product.options.map((option) => (
                  <div key={option.name} className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.edges.map((variant, idx) => {
                        const optValue = variant.node.selectedOptions.find((o) => o.name === option.name)?.value;
                        return (
                          <button
                            key={variant.node.id}
                            onClick={() => setSelectedVariantIdx(idx)}
                            disabled={!variant.node.availableForSale}
                            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-all ${idx === selectedVariantIdx ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground"} ${!variant.node.availableForSale ? "opacity-30 cursor-not-allowed line-through" : ""}`}
                          >
                            {optValue || variant.node.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <Button
                  className="w-full rounded-none h-14 text-xs uppercase tracking-[0.2em] font-bold gap-2"
                  onClick={handleAddToCart}
                  disabled={isLoading || !selectedVariant?.availableForSale}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
                  {selectedVariant?.availableForSale ? `Adicionar ao Carrinho — ${formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}` : "Indisponível"}
                </Button>

                <div className="pt-4 border-t border-border">
                  <UpsellSection excludeHandle={product.handle} compact title="Combine com limpeza e proteção" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* TICKER */}
      <section className="bg-foreground text-background py-3 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 text-[10px] font-bold uppercase tracking-[0.3em] opacity-80 flex-shrink-0">★ {item}</span>
          ))}
        </div>
      </section>

      {/* HOOK */}
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <div className="text-center space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">A Lógica Do Duplo</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Quem ama o Tattoo Balm sabe: ele acaba rápido.</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Quem usa todo dia descobre rápido: o pote 50g rende, mas também acaba. E entre o último gramo e o próximo pedido, a cor da tatuagem começa a apagar. O Kit Balm Duplo existe pra esse vácuo nunca acontecer.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STATS */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="text-center space-y-3 py-8 border border-border rounded bg-background">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display text-5xl md:text-6xl text-foreground">{stat.value}</span>
                    <span className="text-lg font-extrabold text-foreground">{stat.unit}</span>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-[200px] mx-auto leading-relaxed">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE VEM NO KIT */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">O Que Vem no Kit</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Dois potes. Um ritual sem pausa.</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {KIT_PRODUCTS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <Link to={`/products/${item.handle}`} className="border border-border rounded p-6 space-y-3 hover:border-foreground transition-colors group block h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">{item.step}</p>
                      <h3 className="text-sm font-extrabold text-foreground group-hover:underline">
                        {item.name} <span className="text-muted-foreground font-normal">· {item.size}</span>
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground inline-flex items-center gap-1">
                    Ver produto <ArrowLeft className="h-3 w-3 rotate-180" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* REASONS */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Por Que Levar Dois</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">4 razões pra não ficar no avulso</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {REASONS.map((r, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border border-border rounded p-6 space-y-3 bg-background h-full">
                  <r.icon className="h-6 w-6 text-foreground" />
                  <h3 className="text-sm font-extrabold text-foreground">{r.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">O Que Você Ganha</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Cor viva sem interrupção</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {BENEFITS.map((b, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                    <b.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-foreground mb-1">{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="bg-foreground text-background py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {["DOIS POTES", "100G TOTAL", "~3 MESES DE USO", "ECONOMIA REAL"].map((item, i) => (
              <p key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{item}</p>
            ))}
          </div>
        </div>
      </section>

      <Testimonials testimonials={TESTIMONIALS} title="Quem nunca mais ficou sem" />

      <ComparisonTable />

      {/* FAQ */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Dúvidas</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Perguntas Frequentes</h2>
            </div>
          </ScrollReveal>
          <div className="space-y-0">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left">
                  <span className="text-sm font-bold text-foreground pr-4">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <UpsellSection excludeHandle={product.handle} />

      {/* FINAL CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight">Estoque garantido. Cor garantida.</h2>
            <p className="text-sm opacity-60 max-w-md mx-auto mt-4">2× Tattoo Balm 50g. Pra quem já sabe que ama — e não quer mais ficar sem.</p>
            <Button
              variant="secondary"
              className="rounded-none h-14 px-12 text-xs uppercase tracking-[0.2em] font-bold bg-background text-foreground hover:bg-background/90 gap-2 mt-6"
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
              Comprar Kit — {selectedVariant ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) : ""}
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default KitBalmDuploLP;
