import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart, Loader2, ArrowLeft, ChevronDown, Check,
  Droplets, Shield, Sparkles, Package, Gift, Star
} from "lucide-react";
import { toast } from "sonner";

const STATS = [
  { value: "4", unit: "em 1", label: "Produtos que cobrem toda a rotina de cuidado" },
  { value: "20", unit: "%", label: "De economia comparado à compra individual" },
  { value: "60", unit: "dias", label: "De rotina completa em um único kit" },
];

const TICKER_ITEMS = [
  "ROTINA COMPLETA",
  "ECONOMIA REAL",
  "INGREDIENTES VEGANOS",
  "CRUELTY-FREE",
  "DERMATOLOGICAMENTE TESTADO",
  "IDEAL PARA PRESENTEAR",
];

const KIT_PRODUCTS = [
  {
    icon: Droplets,
    name: "Sabonete Líquido Tattoo",
    step: "Passo 1 — Limpe",
    desc: "Limpeza suave com pH balanceado. Remove impurezas sem degradar pigmentos. Fórmula sem sulfatos agressivos.",
    handle: "madbucks-sabonete-liquido-tattoo-69667a03eaf59",
  },
  {
    icon: Shield,
    name: "Creme Hidratante Tattoo",
    step: "Passo 2 — Hidrate",
    desc: "Hidratação de 24h com ácido hialurônico e ceramidas. Toque seco, sem álcool, sem fragrâncias sintéticas.",
    handle: "madbucks-creme-hidratante-tattoo-69667a5124762",
  },
  {
    icon: Package,
    name: "Balm Stick",
    step: "Passo 3 — Proteja",
    desc: "Proteção portátil em formato stick. Cabe no bolso, aplicação em 3 segundos, sem sujeira nas mãos.",
    handle: "madbucks-tattoo-balm-stick-69668baa49da0",
  },
  {
    icon: Sparkles,
    name: "Tattoo Intensify",
    step: "Passo 4 — Intensifique",
    desc: "Sérum intensificador que realça cores e contraste. Resultado visível na primeira aplicação.",
    handle: "madbucks-tattoo-intensify",
  },
];

const BENEFITS = [
  {
    icon: Package,
    title: "Rotina Completa em Uma Caixa",
    desc: "Chega de montar sua rotina peça por peça. O kit traz os 4 produtos essenciais para o cuidado completo da pele tatuada.",
  },
  {
    icon: Star,
    title: "Economia Real",
    desc: "Preço especial comparado à compra individual. Cuide da sua tattoo investindo menos.",
  },
  {
    icon: Gift,
    title: "Presente Perfeito",
    desc: "Embalagem premium ideal para presentear quem tem tatuagens. Surpreenda com o gift que todo tatuado precisa.",
  },
  {
    icon: Shield,
    title: "Para Iniciantes e Experientes",
    desc: "Se você nunca cuidou da sua tattoo ou já tem uma rotina, o kit é o ponto de partida ideal para resultados profissionais.",
  },
];

const FAQS = [
  { q: "Quanto tempo dura o kit?", a: "Com uso diário seguindo a rotina recomendada, o kit dura em média 45-60 dias. A duração pode variar conforme a quantidade de tatuagens e a área coberta." },
  { q: "Posso presentear alguém?", a: "Sim! O Kit Tatuagem Perfeita vem em embalagem premium, ideal para presentear quem tem tatuagens. É o presente que todo tatuado gostaria de receber." },
  { q: "Qual a ordem correta de uso?", a: "Sabonete Líquido → Creme Hidratante → Balm Stick (durante o dia) → Intensify (2-3x por semana). Essa sequência garante limpeza, hidratação, proteção e intensificação." },
  { q: "Preciso usar todos os produtos?", a: "O ideal é usar a rotina completa para melhores resultados. Mas cada produto funciona de forma independente também — você pode começar aos poucos e incorporar outros produtos com o tempo." },
  { q: "Os produtos são indicados para tatuagens recém-feitas?", a: "O Sabonete e o Creme Hidratante podem ser usados durante a cicatrização (consulte seu tatuador). O Balm Stick e o Intensify são recomendados após a cicatrização completa." },
  { q: "Funciona em todos os estilos de tatuagem?", a: "Sim. A rotina completa é eficaz em tatuagens coloridas, preto e cinza, old school, realismo, fineline — todos os estilos e em todos os tons de pele." },
  { q: "Qual a economia em relação à compra separada?", a: "O kit oferece aproximadamente 20% de economia em relação à compra individual dos 4 produtos." },
  { q: "Posso montar meu próprio kit?", a: "Atualmente oferecemos o kit com os 4 produtos essenciais. Se precisar de produtos específicos, eles estão disponíveis individualmente também." },
];

interface KitLPProps {
  product: ShopifyProduct["node"];
}

const KitLP = ({ product }: KitLPProps) => {
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
                  Tudo o que você precisa em um só kit. A rotina completa de cuidados para tatuagem: limpeza, hidratação, proteção e intensificação. Economia real comparado à compra individual.
                </p>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  { icon: Package, text: "4 produtos completos" },
                  { icon: Gift, text: "Embalagem premium" },
                  { icon: Star, text: "Melhor custo-benefício" },
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
                {["Frete grátis acima de R$ 199", "Cruelty-free e vegano", "Economia de ~20% vs. compra individual"].map((b, i) => (
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
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">O Kit</p>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Tudo Que Sua Tattoo Precisa</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center space-y-3 py-8 border border-border rounded">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-5xl md:text-6xl text-foreground">{stat.value}</span>
                  <span className="text-lg font-extrabold text-foreground">{stat.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground max-w-[200px] mx-auto leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S IN THE KIT */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">O Que Vem no Kit</p>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Sua Rotina Completa, Passo a Passo</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">Cada produto cuida de uma etapa essencial. Juntos, formam a rotina definitiva para manter sua tatuagem viva.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {KIT_PRODUCTS.map((item, i) => (
              <Link key={i} to={`/produto/${item.handle}`} className="border border-border rounded p-6 space-y-3 hover:border-foreground transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">{item.step}</p>
                    <h3 className="text-sm font-extrabold text-foreground group-hover:underline">{item.name}</h3>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                <span className="text-xs font-bold uppercase tracking-wider text-foreground inline-flex items-center gap-1">Ver produto <ArrowLeft className="h-3 w-3 rotate-180" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Por Que o Kit</p>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Vantagens do Kit Completo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {BENEFITS.map((b, i) => (
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
        </div>
      </section>

      {/* BADGES BAR */}
      <section className="bg-foreground text-background py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {["4 PRODUTOS", "ECONOMIA DE 20%", "EMBALAGEM PREMIUM", "ROTINA COMPLETA"].map((item, i) => (
              <p key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{item}</p>
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
          <h2 className="font-display text-2xl md:text-3xl tracking-tight">A Rotina Completa. Em Um Só Kit.</h2>
          <p className="text-sm opacity-60 max-w-md mx-auto">4 produtos essenciais. Economia real. O presente perfeito para quem tem tatuagem.</p>
          <Button variant="secondary" className="rounded-none h-14 px-12 text-xs uppercase tracking-[0.2em] font-bold bg-background text-foreground hover:bg-background/90 gap-2" onClick={handleAddToCart} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
            Comprar Kit — {selectedVariant ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) : ""}
          </Button>
        </div>
      </section>
    </>
  );
};

export default KitLP;
