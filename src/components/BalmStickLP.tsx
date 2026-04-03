import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart, Loader2, ArrowLeft, ChevronDown, Check,
  Droplets, Shield, Sun, Sparkles, Zap, Package
} from "lucide-react";
import { toast } from "sonner";

const STATS = [
  { value: "12", unit: "h", label: "De proteção contínua em uma única aplicação" },
  { value: "91", unit: "%", label: "Relataram pele mais hidratada durante o dia" },
  { value: "3", unit: "s", label: "Para aplicar — sem sujeira, sem desperdício" },
];

const TICKER_ITEMS = [
  "CABE NO BOLSO",
  "INGREDIENTES VEGANOS",
  "SEM ÁLCOOL",
  "DERMATOLOGICAMENTE TESTADO",
  "CRUELTY-FREE",
  "APLICAÇÃO LIMPA",
];

const BENEFITS_DETAILED = [
  {
    icon: Package,
    title: "Formato Portátil",
    desc: "Design stick que cabe no bolso, na mochila ou na nécessaire. Leve para o treino, para a praia ou para o trabalho sem preocupação.",
  },
  {
    icon: Droplets,
    title: "Hidratação Imediata",
    desc: "Fórmula concentrada com manteiga de karité e vitamina E que entrega hidratação instantânea na área tatuada, sem necessidade de espalhar com as mãos.",
  },
  {
    icon: Shield,
    title: "Barreira Protetora",
    desc: "Cria uma camada protetora sobre a tatuagem que defende contra agressores externos como poluição, atrito com roupas e ressecamento.",
  },
  {
    icon: Sun,
    title: "Absorção Rápida",
    desc: "Fórmula de rápida absorção que não deixa resíduos nas roupas e não mancha. Aplique e siga com seu dia normalmente.",
  },
];

const INGREDIENTS = [
  {
    name: "Manteiga de Karité",
    benefits: ["Hidratação intensa e prolongada", "Rica em vitaminas A, E e F", "Restaura a barreira cutânea"],
  },
  {
    name: "Vitamina E",
    benefits: ["Antioxidante natural", "Combate radicais livres", "Previne o envelhecimento precoce da pele"],
  },
  {
    name: "Óleo de Coco",
    benefits: ["Propriedades antimicrobianas", "Hidratação profunda sem obstruir poros", "Suaviza a textura da pele"],
  },
  {
    name: "Cera de Abelha Vegetal",
    benefits: ["Cria barreira protetora natural", "Retém umidade por mais tempo"],
  },
];

const HOW_TO_STEPS = [
  { num: "01", title: "Gire a base", desc: "Gire a base do Balm Stick para expor a quantidade desejada de produto. Pouco já é suficiente." },
  { num: "02", title: "Aplique direto na pele", desc: "Passe o stick diretamente sobre a tatuagem. O calor da pele derrete a fórmula para uma aplicação suave." },
  { num: "03", title: "Reaplique quando precisar", desc: "Leve com você e reaplique durante o dia conforme sentir necessidade. Ideal antes do treino ou exposição ao sol." },
];

const FAQS = [
  { q: "O Balm Stick substitui o Creme Hidratante?", a: "Não. O Balm Stick é um complemento para uso durante o dia, oferecendo proteção localizada e prática. O Creme Hidratante é a base da rotina, com hidratação mais profunda e prolongada. Idealmente, use os dois." },
  { q: "Posso usar no rosto?", a: "O Balm Stick foi formulado para uso corporal, especificamente sobre tatuagens. Para o rosto, recomendamos o Creme Hidratante Tattoo, que tem textura mais leve." },
  { q: "O produto mancha roupa?", a: "Não. A fórmula é de rápida absorção e não deixa resíduos nas roupas. Você pode se vestir imediatamente após a aplicação." },
  { q: "Pode ser usado durante a cicatrização?", a: "Sim, o Balm Stick pode ser usado na fase de cicatrização. Porém, consulte seu tatuador sobre o momento ideal para começar a usar produtos na tatuagem recém-feita." },
  { q: "Quanto tempo dura um Balm Stick?", a: "Com uso diário em uma área de tamanho médio, cada Balm Stick dura em média 45-60 dias." },
  { q: "Posso aplicar antes do protetor solar?", a: "Sim. Aplique o Balm Stick primeiro, aguarde a absorção e depois aplique o protetor solar por cima para proteção completa." },
  { q: "Funciona em todas as cores de tatuagem?", a: "Sim. O Balm Stick é eficaz em tatuagens coloridas, preto e cinza, e em todos os tons de pele." },
  { q: "Qual a diferença para um hidratante comum em bastão?", a: "O Balm Stick usa ingredientes específicos que não degradam pigmentos de tatuagem. Hidratantes comuns podem conter álcool, fragrâncias sintéticas e químicos que aceleram o desbotamento." },
];

interface BalmStickLPProps {
  product: ShopifyProduct["node"];
}

const BalmStickLP = ({ product }: BalmStickLPProps) => {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const selectedVariant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;
  const hasMultipleVariants =
    product.variants.edges.length > 1 ||
    (product.variants.edges.length === 1 && product.variants.edges[0].node.title !== "Default Title");

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
      {/* HERO / BUY BOX */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-xs font-semibold uppercase tracking-wider">
            <ArrowLeft className="h-3 w-3" /> Voltar
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
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
                    <button key={idx} onClick={() => setSelectedImage(idx)} className={`w-16 h-16 rounded overflow-hidden border-2 flex-shrink-0 transition-colors ${idx === selectedImage ? "border-foreground" : "border-border hover:border-muted-foreground"}`}>
                      <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">Madbucks</p>
                <h1 className="font-display text-3xl md:text-4xl tracking-tight text-foreground mb-2">{product.title}</h1>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Proteção compacta para levar sua rotina de cuidado a qualquer lugar. Formato stick para aplicação precisa, sem sujeira, direto na pele tatuada.
                </p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  { icon: Package, text: "Formato portátil" },
                  { icon: Zap, text: "Aplicação em 3 segundos" },
                  { icon: Shield, text: "Proteção de longa duração" },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <badge.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{badge.text}</span>
                  </div>
                ))}
              </div>
              <p className="text-2xl font-extrabold text-foreground">
                {selectedVariant ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) : ""}
              </p>
              {hasMultipleVariants && product.options.map((option) => (
                <div key={option.name} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground">{option.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((variant, idx) => {
                      const optValue = variant.node.selectedOptions.find((o) => o.name === option.name)?.value;
                      return (
                        <button key={variant.node.id} onClick={() => setSelectedVariantIdx(idx)} disabled={!variant.node.availableForSale}
                          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-all ${idx === selectedVariantIdx ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground"} ${!variant.node.availableForSale ? "opacity-30 cursor-not-allowed line-through" : ""}`}>
                          {optValue || variant.node.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <Button className="w-full rounded-none h-14 text-xs uppercase tracking-[0.2em] font-bold gap-2" onClick={handleAddToCart} disabled={isLoading || !selectedVariant?.availableForSale}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
                {selectedVariant?.availableForSale ? `Adicionar ao Carrinho — ${selectedVariant ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) : ""}` : "Indisponível"}
              </Button>
              <div className="space-y-2 pt-2">
                {["Frete grátis acima de R$ 199", "Cruelty-free e vegano", "Dermatologicamente testado"].map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST TICKER */}
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
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Por Que o Balm Stick</p>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Proteção Que Vai Com Você</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center space-y-3 py-8 border border-border rounded">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-5xl md:text-6xl text-foreground">{stat.value}</span>
                  <span className="font-display text-2xl text-foreground">{stat.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground max-w-[200px] mx-auto leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Benefícios</p>
                <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Cuidado Portátil Para Sua Tattoo</h2>
              </div>
              {BENEFITS_DETAILED.map((b, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                    <b.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-foreground mb-1">{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded bg-muted flex items-center justify-center">
              {images[1]?.node ? (
                <img src={images[1].node.url} alt="Balm Stick Madbucks" className="w-full h-full object-cover" loading="lazy" />
              ) : images[0]?.node ? (
                <img src={images[0].node.url} alt="Balm Stick Madbucks" className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <span className="text-muted-foreground text-sm">Sem imagem</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BADGES BAR */}
      <section className="bg-foreground text-background py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {["CABE NO BOLSO", "INGREDIENTES VEGANOS", "SEM RESÍDUOS", "LONGA DURAÇÃO"].map((item, i) => (
              <p key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{item}</p>
            ))}
          </div>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Composição</p>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground mb-4">O Que Tem Dentro?</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">Ingredientes limpos e veganos que protegem e hidratam sem agredir os pigmentos da tatuagem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {INGREDIENTS.map((ing, i) => (
              <div key={i} className="border border-border rounded p-6 space-y-4">
                <h3 className="text-sm font-extrabold text-foreground">{ing.name}</h3>
                <ul className="space-y-2">
                  {ing.benefits.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 aspect-[4/5] overflow-hidden rounded bg-muted flex items-center justify-center">
              {images[2]?.node ? (
                <img src={images[2].node.url} alt="Como usar o Balm Stick" className="w-full h-full object-cover" loading="lazy" />
              ) : images[0]?.node ? (
                <img src={images[0].node.url} alt="Como usar o Balm Stick" className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <span className="text-muted-foreground text-sm">Sem imagem</span>
              )}
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Modo de Uso</p>
                <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Gire, Aplique, Pronto.</h2>
                <p className="text-sm text-muted-foreground mt-3">Sem sujeira nas mãos. Sem desperdício. Proteção em segundos.</p>
              </div>
              <div className="space-y-6">
                {HOW_TO_STEPS.map((step) => (
                  <div key={step.num} className="flex gap-5 items-start">
                    <span className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-extrabold flex-shrink-0">{step.num}</span>
                    <div className="pt-1">
                      <h3 className="text-sm font-extrabold text-foreground mb-1">{step.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CROSS-SELL */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Rotina Completa</p>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Complete Sua Rotina</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { handle: "madbucks-sabonete-liquido-tattoo-69667a03eaf59", title: "Sabonete Líquido Tattoo", step: "Passo 1 — Limpe", desc: "Limpeza suave sem degradar pigmentos" },
              { handle: "madbucks-creme-hidratante-tattoo-69667a5124762", title: "Creme Hidratante Tattoo", step: "Passo 2 — Hidrate", desc: "Hidratação profunda de 24h" },
              { handle: "madbucks-tattoo-intensify", title: "Tattoo Intensify", step: "Passo 3 — Intensifique", desc: "Intensifica cores e contraste" },
            ].map((item) => (
              <Link key={item.handle} to={`/produto/${item.handle}`} className="border border-border rounded p-6 text-center space-y-3 hover:border-foreground transition-colors group">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">{item.step}</p>
                <h3 className="text-sm font-extrabold text-foreground group-hover:underline">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
                <span className="text-xs font-bold uppercase tracking-wider text-foreground inline-flex items-center gap-1">Ver produto <ArrowLeft className="h-3 w-3 rotate-180" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Dúvidas</p>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Perguntas Frequentes</h2>
          </div>
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

      {/* FINAL CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="font-display text-2xl md:text-3xl tracking-tight">Proteção Que Cabe no Bolso.</h2>
          <p className="text-sm opacity-60 max-w-md mx-auto">Formato prático. Ingredientes veganos. Proteção o dia todo.</p>
          <Button variant="secondary" className="rounded-none h-14 px-12 text-xs uppercase tracking-[0.2em] font-bold bg-background text-foreground hover:bg-background/90 gap-2" onClick={handleAddToCart} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
            Comprar Agora — {selectedVariant ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) : ""}
          </Button>
        </div>
      </section>
    </>
  );
};

export default BalmStickLP;
