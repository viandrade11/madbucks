import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { PriceDisplay } from "@/components/PriceDisplay";
import { UpsellSection } from "@/components/UpsellSection";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ArrowLeft, ChevronDown, Sparkles, Package, Home, Briefcase, Zap, Repeat } from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ComparisonTable } from "@/components/ComparisonTable";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";

const STATS = [
  { value: "2", unit: "formatos", label: "Mesmo ativo. Pote em casa, stick na rua." },
  { value: "62", unit: "g", label: "50g + 12g de fórmula intensificadora" },
  { value: "24", unit: "h", label: "De cor e proteção em camada contínua" },
];

const TICKER_ITEMS = [
  "MESMA FÓRMULA · DOIS FORMATOS",
  "CASA + BOLSO",
  "COR VIVA O DIA TODO",
  "100% NATURAL",
  "VEGANO E CRUELTY-FREE",
  "APROVADO PELA ANVISA",
];

const KIT_PRODUCTS = [
  {
    icon: Home,
    name: "Tattoo Balm",
    size: "50g",
    step: "Em casa",
    desc: "Pote concentrado para a rotina manhã e noite. Intensifica cores, hidrata em profundidade e cria camada protetora duradoura.",
    handle: "madbucks-tattoo-intensify",
  },
  {
    icon: Briefcase,
    name: "Tattoo Balm Stick",
    size: "12g",
    step: "Na rua",
    desc: "Formato bastão prático para o bolso ou bolsa. Retoque rápido sem sujar a mão, em qualquer hora do dia.",
    handle: "madbucks-tattoo-balm-stick",
  },
];

const USE_CASES = [
  { icon: Zap, title: "Antes de sair", desc: "Passe o stick rapidinho para realçar cor e contraste na hora." },
  { icon: Repeat, title: "Durante o dia", desc: "Reaplique sempre que sentir a pele pedir — sol, suor ou ressecamento." },
  { icon: Home, title: "Em casa, sem pressa", desc: "Use o pote 50g manhã e noite para hidratação intensa e cor duradoura." },
];

const BENEFITS = [
  { icon: Sparkles, title: "Cor Sempre no Ponto", desc: "Realça preto, contraste e cores em segundos. Sua tattoo nunca parece apagada." },
  { icon: Briefcase, title: "Sem Desculpa Pra Não Cuidar", desc: "O stick cabe em qualquer bolso. Reaplicar virou hábito, não esforço." },
  { icon: Package, title: "Rende Mais do Que Parece", desc: "62g de produto concentrado. O kit dura semanas mesmo com uso frequente." },
  { icon: Zap, title: "Ideal Para Quem Já Tem Rotina", desc: "Pra quem já lava e hidrata e quer o próximo nível: cor viva todos os dias." },
];

const FAQS = [
  { q: "Qual a diferença entre o pote 50g e o stick 12g?", a: "A fórmula é a mesma. Muda só o formato: o pote 50g é para uso em casa com aplicação generosa; o stick 12g é compacto, prático e não suja a mão — perfeito pra levar pra rua." },
  { q: "Pra quem é esse kit?", a: "Pra quem já tem o básico (limpeza e hidratação) e quer manter a cor da tatuagem sempre vibrante, em casa e fora dela. Não substitui sabonete e creme — complementa." },
  { q: "Preciso usar os dois todo dia?", a: "Não. Use o pote 50g manhã e noite e o stick conforme a necessidade durante o dia. Em dias mais intensos (sol, praia, treino), reaplique o stick mais vezes." },
  { q: "Quanto tempo dura o kit?", a: "Com uso diário em uma tatuagem média, em média 40-60 dias. Depende do tamanho da área tatuada e da frequência de reaplicação." },
  { q: "Posso comprar só um dos dois depois?", a: "Sim. O kit dá ~15% de economia versus comprar separado, mas você pode repor o item que acabar primeiro avulso." },
  { q: "Funciona em tatuagens antigas?", a: "Sim. Especialmente nelas. O ativo intensificador devolve vibração mesmo em tatuagens com anos de pele." },
];

const TESTIMONIALS = [
  { name: "Thiago C.", location: "São Paulo, SP", text: "O stick mora no meu bolso. Antes de qualquer rolê eu passo e a tattoo fica brilhando. Combinado com o pote em casa é absurdo.", rating: 5, product: "Kit Intensidade Diária" },
  { name: "Renan B.", location: "Rio de Janeiro, RJ", text: "Tenho tatuagem antiga que tava apagada. Em 3 semanas usando os dois, a diferença é visível.", rating: 5, product: "Kit Intensidade Diária" },
  { name: "Gabriel M.", location: "Florianópolis, SC", text: "Já usava o balm avulso. Quando vi o kit com o stick incluso, troquei. Praticidade que não tem preço.", rating: 5, product: "Kit Intensidade Diária" },
];

interface Props { product: ShopifyProduct["node"]; }

const KitIntensidadeDiariaLP = ({ product }: Props) => {
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
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">Madbucks · Kit intensificador</p>
                  <h1 className="font-display text-3xl md:text-4xl tracking-tight text-foreground mb-2">{product.title}</h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A mesma fórmula intensificadora em dois formatos. Pote 50g para a rotina em casa, stick 12g para a bolsa. Cor viva e contraste no ponto — onde você estiver.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {[
                    { icon: Home, text: "Pote 50g em casa" },
                    { icon: Briefcase, text: "Stick 12g no bolso" },
                    { icon: Sparkles, text: "Cor sempre no ponto" },
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
                  <UpsellSection excludeHandle={product.handle} compact title="Combine com limpeza e hidratação" />
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
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">A Ideia É Simples</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Sua tattoo não fica em casa. Seu cuidado também não.</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                O pote 50g entrega a aplicação generosa que sua rotina em casa pede. O stick 12g vai pra qualquer lugar e resolve o retoque na hora — sem sujar a mão, sem furar a bolsa. Mesma fórmula, dois jeitos de usar.
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
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Mesma fórmula. Dois formatos.</h2>
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

      {/* USE CASES */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Quando Usar</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">3 momentos pra manter a cor viva</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {USE_CASES.map((u, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border border-border rounded p-6 space-y-3 bg-background h-full">
                  <u.icon className="h-6 w-6 text-foreground" />
                  <h3 className="text-sm font-extrabold text-foreground">{u.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{u.desc}</p>
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
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Por Que Esse Kit</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Pra quem leva intensidade pra sério</h2>
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
            {["MESMA FÓRMULA", "DOIS FORMATOS", "CASA + RUA", "COR NO PONTO"].map((item, i) => (
              <p key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{item}</p>
            ))}
          </div>
        </div>
      </section>

      <Testimonials testimonials={TESTIMONIALS} title="Cor viva, todos os dias" />

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
            <h2 className="font-display text-2xl md:text-3xl tracking-tight">Cor viva em casa. Cor viva na rua.</h2>
            <p className="text-sm opacity-60 max-w-md mx-auto mt-4">Pote 50g + Stick 12g. Mesmo ativo, dois formatos. Pra qualquer hora do dia.</p>
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

export default KitIntensidadeDiariaLP;
