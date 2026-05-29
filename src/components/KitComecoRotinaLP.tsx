import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { PriceDisplay } from "@/components/PriceDisplay";
import { UpsellSection } from "@/components/UpsellSection";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ArrowLeft, ChevronDown, Droplets, Shield, Sparkles, Leaf, GraduationCap, Heart } from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ComparisonTable } from "@/components/ComparisonTable";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";

const STATS = [
  { value: "2", unit: "passos", label: "Os dois fundamentos: limpar e hidratar" },
  { value: "500", unit: "ml", label: "Sabonete 300ml + Creme 200ml" },
  { value: "45", unit: "dias", label: "Em média de uso diário" },
];

const TICKER_ITEMS = [
  "COMECE DO JEITO CERTO",
  "LIMPAR + HIDRATAR",
  "PARA INICIANTES",
  "100% NATURAL",
  "VEGANO E CRUELTY-FREE",
  "APROVADO PELA ANVISA",
];

const KIT_PRODUCTS = [
  {
    icon: Droplets,
    name: "Sabonete Líquido Tattoo",
    size: "300ml",
    step: "Passo 1 — Limpe",
    desc: "Remove impurezas, suor e oleosidade sem agredir a tinta nem ressecar a pele. Uso diário no banho.",
    handle: "madbucks-sabonete-liquido-tattoo",
  },
  {
    icon: Shield,
    name: "Creme Hidratante Tattoo",
    size: "200ml",
    step: "Passo 2 — Hidrate",
    desc: "Hidratação profunda pós-banho. Pele tatuada desidrata 3x mais rápido — esse é o passo que faz a diferença.",
    handle: "madbucks-creme-hidratante-tattoo",
  },
];

const COMMON_MISTAKES = [
  { mistake: "Usar sabonete comum", why: "Resseca, agride a pele tatuada e acelera o desbotamento das cores." },
  { mistake: "Pular a hidratação", why: "Pele desidratada faz a tinta perder vibração e contraste mais rápido." },
  { mistake: "Hidratante genérico", why: "Não foi formulado para preservar tinta — só hidrata a camada superficial." },
];

const BENEFITS = [
  { icon: GraduationCap, title: "O Ponto de Partida Certo", desc: "Os dois passos fundamentais de qualquer rotina de skincare para tattoo." },
  { icon: Leaf, title: "Fórmula 100% Natural", desc: "Sem álcool, sem parabenos, sem petrolatos. Vegano e cruelty-free." },
  { icon: Heart, title: "Para Quem Está Começando", desc: "Sem complicação: 2 produtos, 2 momentos do dia. Resultado real desde a primeira semana." },
  { icon: Sparkles, title: "Base Para Evoluir Depois", desc: "Quando quiser intensificar mais, adicione o Tattoo Balm. Sua rotina cresce com você." },
];

const FAQS = [
  { q: "Esse kit serve pra quem tem só uma tattoo?", a: "Sim. É o ponto de partida ideal — independente de você ter uma tattoo ou várias, limpar e hidratar é o cuidado básico que toda pele tatuada precisa." },
  { q: "Qual a diferença para o Kit Rotina Completa?", a: "O Começo de Rotina tem os 2 produtos essenciais (sabonete + creme). O Rotina Completa adiciona o Tattoo Balm 50g e o Balm Stick 12g para intensificar cores e levar pra rua." },
  { q: "Quanto tempo dura o kit?", a: "Com uso diário, em média 40-50 dias. O creme costuma acabar primeiro." },
  { q: "Posso usar em tatuagem nova?", a: "Os produtos são para tatuagens já cicatrizadas. Para tattoos novas, siga as orientações do seu tatuador no período de cicatrização (2-4 semanas)." },
  { q: "Preciso usar todo dia?", a: "Sim. O sabonete entra no banho e o creme logo depois. Leva menos de 1 minuto e faz toda a diferença a longo prazo." },
  { q: "Funciona em todos os tipos de pele?", a: "Sim. Formulado para todos os tipos — oleosa, seca, mista ou sensível. Dermatologicamente testado." },
];

const TESTIMONIALS = [
  { name: "Lucas R.", location: "Recife, PE", text: "Fiz minha primeira tattoo grande e me indicaram o kit. Em duas semanas a pele tava outra. Recomendo pra qualquer um que tá começando.", rating: 5, product: "Kit Começo de Rotina" },
  { name: "Marina P.", location: "Salvador, BA", text: "Eu usava hidratante comum e via minhas cores apagando. Troquei pelos dois produtos e a diferença foi absurda.", rating: 5, product: "Kit Começo de Rotina" },
  { name: "Pedro V.", location: "Brasília, DF", text: "Bom preço pra entrar na rotina. Quando acabar, já vou pro completo com o balm.", rating: 5, product: "Kit Começo de Rotina" },
];

interface Props { product: ShopifyProduct["node"]; }

const KitComecoRotinaLP = ({ product }: Props) => {
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
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">Madbucks · Kit de entrada</p>
                  <h1 className="font-display text-3xl md:text-4xl tracking-tight text-foreground mb-2">{product.title}</h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Os dois passos que toda pele tatuada precisa — começando pela limpeza e finalizando com hidratação profunda. O ponto de partida certo para cuidar da sua tattoo do jeito correto.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {[
                    { icon: GraduationCap, text: "Ideal para iniciantes" },
                    { icon: Leaf, text: "100% natural" },
                    { icon: Heart, text: "Rotina simples" },
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
                  <UpsellSection excludeHandle={product.handle} compact title="Quer mais? Veja os kits maiores" />
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

      {/* INTRO EDUCACIONAL */}
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <div className="text-center space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Pra começar</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Antes de qualquer rotina, dois passos.</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Você não precisa de 5 produtos pra cuidar da sua tatuagem. Mas precisa dos dois certos. Limpar sem agredir e hidratar com a fórmula certa é o que separa uma tattoo que envelhece bem de uma que perde cor em 2 anos.
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
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Dois produtos. Uma rotina sólida.</h2>
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

      {/* ERROS COMUNS */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Não Cometa Esses Erros</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">3 enganos que apagam a sua tattoo</h2>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {COMMON_MISTAKES.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border border-border rounded p-5 bg-background flex gap-4 items-start">
                  <span className="font-display text-3xl text-muted-foreground/40 flex-shrink-0">0{i + 1}</span>
                  <div>
                    <h3 className="text-sm font-extrabold text-foreground mb-1">{m.mistake}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{m.why}</p>
                  </div>
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
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Pra quem quer começar do jeito certo</h2>
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
            {["2 PRODUTOS ESSENCIAIS", "FÓRMULA NATURAL", "USO DIÁRIO SIMPLES", "PARA INICIANTES"].map((item, i) => (
              <p key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{item}</p>
            ))}
          </div>
        </div>
      </section>

      <Testimonials testimonials={TESTIMONIALS} title="Quem começou aqui, recomenda" />

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
            <h2 className="font-display text-2xl md:text-3xl tracking-tight">Comece pela base. Cresça depois.</h2>
            <p className="text-sm opacity-60 max-w-md mx-auto mt-4">Limpar e hidratar. Os dois passos que fazem qualquer tattoo durar mais.</p>
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

export default KitComecoRotinaLP;
