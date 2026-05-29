import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { PriceDisplay } from "@/components/PriceDisplay";
import { UpsellSection } from "@/components/UpsellSection";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ArrowLeft, ChevronDown, Droplets, Shield, Sparkles, Package, Star, Sun, Moon, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ComparisonTable } from "@/components/ComparisonTable";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";

const STATS = [
  { value: "4", unit: "produtos", label: "Rotina completa do banho à rua" },
  { value: "~25", unit: "%", label: "De economia vs. compra individual" },
  { value: "60", unit: "dias", label: "De uso diário com o kit completo" },
];

const TICKER_ITEMS = [
  "ROTINA COMPLETA",
  "LIMPA · HIDRATA · INTENSIFICA",
  "CASA + RUA",
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
    desc: "Limpeza suave que remove impurezas sem agredir a tinta. Uso no banho.",
    handle: "madbucks-sabonete-liquido-tattoo",
  },
  {
    icon: Shield,
    name: "Creme Hidratante Tattoo",
    size: "200ml",
    step: "Passo 2 — Hidrate",
    desc: "Hidratação profunda pós-banho. Preserva cores e elasticidade da pele.",
    handle: "madbucks-creme-hidratante-tattoo",
  },
  {
    icon: Sparkles,
    name: "Tattoo Balm",
    size: "50g",
    step: "Passo 3 — Intensifique (casa)",
    desc: "Realça cores e contraste. Camada protetora duradoura para uso em casa.",
    handle: "madbucks-tattoo-intensify",
  },
  {
    icon: Package,
    name: "Tattoo Balm Stick",
    size: "12g",
    step: "Passo 4 — Mantenha (rua)",
    desc: "Formato bastão para o bolso. O mesmo cuidado a qualquer hora, em qualquer lugar.",
    handle: "madbucks-tattoo-balm-stick",
  },
];

const ROUTINE_DAYPARTS = [
  { icon: Sun, time: "Manhã", steps: "Banho com Sabonete → Creme Hidratante." },
  { icon: Briefcase, time: "Durante o dia", steps: "Retoque com o Balm Stick sempre que precisar." },
  { icon: Moon, time: "Noite", steps: "Reaplique o Balm 50g para intensificar enquanto dorme." },
];

const BENEFITS = [
  { icon: Package, title: "Cobertura Total da Rotina", desc: "Os 4 passos essenciais — limpar, hidratar, intensificar e manter — em um único kit." },
  { icon: Star, title: "Economia de ~25%", desc: "Comprar o kit sai bem mais barato do que adquirir cada produto separadamente." },
  { icon: Briefcase, title: "Casa + Rua", desc: "Formato 50g para a rotina em casa e Stick 12g para levar onde quiser." },
  { icon: Shield, title: "Pensado Para Quem Já Cuida", desc: "O kit definitivo para quem leva o cuidado com a tattoo a sério." },
];

const FAQS = [
  { q: "Qual a diferença para o Kit Tatuagem Perfeita?", a: "O Rotina Completa inclui o Tattoo Balm 50g (formato pote) — versão concentrada para uso em casa — além do Stick. É a versão mais robusta da linha." },
  { q: "Quanto tempo dura o kit?", a: "Com uso diário, em média 50-60 dias de rotina completa." },
  { q: "Qual a ordem correta de uso?", a: "Sabonete (banho) → Creme Hidratante (pós-banho) → Balm 50g (em casa, manhã/noite) → Balm Stick (retoques durante o dia)." },
  { q: "Preciso usar os 4 todo dia?", a: "Não. O ideal é sabonete + creme diários. Balm 50g e Stick conforme a necessidade da sua pele e rotina." },
  { q: "Posso usar em tatuagem nova?", a: "Os produtos são para tatuagens já cicatrizadas. Para tattoos novas, siga as orientações do seu tatuador no período de cicatrização." },
  { q: "Funciona em todos os estilos?", a: "Sim. Coloridas, blackwork, fineline, realismo, old school — a fórmula atua na hidratação da camada onde a tinta está depositada." },
];

const TESTIMONIALS = [
  { name: "Bruno M.", location: "São Paulo, SP", text: "Tenho braço fechado e o Rotina Completa virou meu padrão. Banho, pós-banho e o stick comigo o dia todo.", rating: 5, product: "Kit Rotina Completa" },
  { name: "Carla T.", location: "Belo Horizonte, MG", text: "Já usava o balm avulso. Quando vi que o kit completo saía mais barato, troquei. Vale demais.", rating: 5, product: "Kit Rotina Completa" },
  { name: "Diego F.", location: "Porto Alegre, RS", text: "Casa + rua resolvido. Não tem mais desculpa pra deixar a tattoo desbotar.", rating: 5, product: "Kit Rotina Completa" },
];

interface Props { product: ShopifyProduct["node"]; }

const KitRotinaCompletaLP = ({ product }: Props) => {
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
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">Madbucks · Top de linha</p>
                  <h1 className="font-display text-3xl md:text-4xl tracking-tight text-foreground mb-2">{product.title}</h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Do banho à rua. Os 4 produtos da linha Madbucks reunidos para uma rotina diária completa — limpe, hidrate, intensifique em casa e mantenha as cores vivas onde estiver.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {[
                    { icon: Package, text: "4 produtos full size" },
                    { icon: Star, text: "~25% mais barato" },
                    { icon: Briefcase, text: "Casa + bolso" },
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
                  <UpsellSection excludeHandle={product.handle} compact title="Você também vai gostar" />
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

      {/* STATS */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">O Kit Definitivo</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">A rotina mais completa da Madbucks</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="text-center space-y-3 py-8 border border-border rounded">
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
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">O Que Vem no Kit</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Os 4 essenciais, em tamanhos full</h2>
              <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">Cada produto cobre uma etapa específica da rotina. Juntos, formam o cuidado completo.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

      {/* ROTINA DO DIA */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Como Usar</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Sua rotina, do amanhecer ao fim do dia</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {ROUTINE_DAYPARTS.map((part, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border border-border rounded p-6 space-y-3 h-full">
                  <part.icon className="h-6 w-6 text-foreground" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">{part.time}</p>
                  <p className="text-sm text-foreground leading-relaxed">{part.steps}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Por Que o Rotina Completa</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">O kit pensado para quem leva a sério</h2>
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
            {["4 PRODUTOS FULL", "~25% DE ECONOMIA", "CASA + RUA", "ROTINA COMPLETA"].map((item, i) => (
              <p key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{item}</p>
            ))}
          </div>
        </div>
      </section>

      <Testimonials testimonials={TESTIMONIALS} title="Quem usa o kit completo, aprova" />

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
            <h2 className="font-display text-2xl md:text-3xl tracking-tight">A rotina completa. Em um só kit.</h2>
            <p className="text-sm opacity-60 max-w-md mx-auto mt-4">4 produtos. Casa e rua. ~25% de economia vs. comprar avulso.</p>
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

export default KitRotinaCompletaLP;
