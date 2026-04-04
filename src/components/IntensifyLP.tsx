import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { PriceDisplay } from "@/components/PriceDisplay";
import { UpsellSection } from "@/components/UpsellSection";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart, Loader2, ArrowLeft, ChevronDown, Check,
  Droplets, Shield, Sun, Sparkles, Leaf, Zap, Eye
} from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ComparisonTable } from "@/components/ComparisonTable";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { Testimonials } from "@/components/Testimonials";
import beforeAfterImg from "@/assets/intensify-before-after.jpg";
import { CrossSellGrid } from "@/components/CrossSellGrid";
import ingredientsImg from "@/assets/intensify-ingredients.jpg";
import howtoImg from "@/assets/intensify-howto.jpg";

const STATS = [
  { value: "94", unit: "%", label: "Relataram preservação da profundidade da tatuagem" },
  { value: "88", unit: "%", label: "Relataram contraste mais vibrante nas cores" },
  { value: "87", unit: "%", label: "Relataram que as tatuagens ficam mais intensas" },
];

const TICKER_ITEMS = [
  "RESULTADO NA PRIMEIRA APLICAÇÃO",
  "INGREDIENTES VEGANOS",
  "SEM ÁLCOOL",
  "DERMATOLOGICAMENTE TESTADO",
  "CRUELTY-FREE",
  "PROTEÇÃO UV",
];

const BENEFITS_DETAILED = [
  { icon: Shield, title: "Forma uma Barreira Protetora", desc: "Combinação de ácidos graxos, manteigas antioxidantes e óleos leves que restauram a barreira natural da pele para tatuagens mais vibrantes." },
  { icon: Droplets, title: "Hidratação Máxima", desc: "Nossa fórmula entrega hidratação profunda. Pele hidratada é pele saudável, e tatuagens hidratadas são tatuagens vibrantes." },
  { icon: Sparkles, title: "Cores Vibrantes e Saudáveis", desc: "Combinação de ingredientes que combatem estressores ambientais para tatuagens com aparência saudável e dinâmica." },
  { icon: Sun, title: "Sem Acabamento Oleoso", desc: "Feito com o equilíbrio perfeito de óleos nutritivos que não deixam sensação pegajosa ou oleosa na pele." },
];

const INGREDIENTS = [
  { name: "Manteiga de Karité", benefits: ["Acalma pele seca e rachada", "Repara a barreira cutânea", "Rica em ácidos graxos e Vitamina E"] },
  { name: "Óleo de Amêndoa Doce", benefits: ["Melhora a textura da pele", "Uniformiza o tom da pele", "Rico em Vitaminas A e E"] },
  { name: "Manteiga de Cacau", benefits: ["Rica em ácidos graxos hidratantes", "Consistência rica que protege e suaviza a pele seca"] },
  { name: "Óleo de Calêndula", benefits: ["Conhecido por propriedades calmantes", "Auxilia na regeneração da pele"] },
];

const HOW_TO_STEPS = [
  { num: "01", title: "Retire a quantidade ideal", desc: "Abra o Tattoo Intensify e retire a quantidade desejada com as pontas dos dedos." },
  { num: "02", title: "Aqueça e aplique", desc: "Aqueça a fórmula entre os dedos e massageie sobre a tatuagem em movimentos circulares." },
  { num: "03", title: "Resultado instantâneo", desc: "Veja tatuagens instantaneamente mais vibrantes, sem acabamento oleoso. Use diariamente para melhores resultados." },
];

const FAQS = [
  { q: "O que o Tattoo Intensify faz exatamente?", a: "Ingredientes veganos como manteiga de cacau, manteiga de karité e óleos essenciais nutrem e hidratam sua pele, ajudando a reduzir a aparência de linhas finas. Você verá resultados imediatamente: sem descoloração, uma tatuagem mais vibrante e protegida, e pele tonificada para cores mais fortes." },
  { q: "Quando devo usar o Tattoo Intensify?", a: "Espere até que sua tatuagem esteja cicatrizada antes de usar o Tattoo Intensify. Uma vez que esteja totalmente cicatrizada, você pode começar a aplicar e ver os benefícios!" },
  { q: "Funciona em tatuagens coloridas e preto/cinza?", a: "Sim. O Tattoo Intensify funciona em todos os tipos de tatuagem e em todos os tons de pele." },
  { q: "Posso aplicar logo após a sessão de tatuagem?", a: "Não. Espere até que sua tatuagem esteja completamente cicatrizada. Para o período de cicatrização, use nosso Creme Hidratante Tattoo." },
  { q: "Qual a diferença do Intensify para outros produtos?", a: "O Madbucks Tattoo Intensify usa ingredientes veganos, orgânicos e não-tóxicos seguros para a pele. Sem parabenos, sem álcool, sem ingredientes artificiais que degradem a tinta." },
  { q: "Posso usar junto com protetor solar?", a: "Sim. Aplique o Intensify primeiro, aguarde a absorção completa e depois aplique o protetor solar por cima para proteção máxima." },
  { q: "O produto pode derreter ou mudar de textura?", a: "O Intensify é feito com ingredientes naturais e é um produto anidro (sem água). Pode apresentar variações de cor ou textura quando exposto a temperaturas diferentes durante o transporte. Isso não afeta a eficácia." },
  { q: "Quanto produto vou precisar?", a: "Uma pequena quantidade é suficiente. A fórmula concentrada rende bastante e cada unidade dura em média 45-60 dias com uso regular." },
  { q: "Por que devo cuidar da tatuagem a longo prazo?", a: "Com o tempo, a pele se renova naturalmente e camadas de pigmento podem se perder, causando desbotamento. A exposição solar também acelera esse processo. O Tattoo Intensify ajuda a combater isso." },
];

const TESTIMONIALS = [
  { name: "Lucas M.", location: "São Paulo, SP", text: "Tenho tattoo há 8 anos e nunca tinha visto ela tão viva. Depois de 2 semanas usando o Intensify, parece que acabei de sair do estúdio.", rating: 5, product: "Tattoo Intensify" },
  { name: "Bianca L.", location: "Porto Alegre, RS", text: "Minhas tattoos em fineline estavam ficando apagadas. Com o Intensify, os traços ficaram nítidos de novo. Impressionante.", rating: 5, product: "Tattoo Intensify" },
  { name: "Rafael T.", location: "Florianópolis, SC", text: "Tatuador há 12 anos. Recomendo pra todos os meus clientes. A diferença na preservação das cores é real.", rating: 5, product: "Tattoo Intensify" },
];

interface IntensifyLPProps {
  product: ShopifyProduct["node"];
}

const IntensifyLP = ({ product }: IntensifyLPProps) => {
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
      <StickyBuyBar
        productTitle={product.title}
        price={selectedVariant?.price || { amount: "0", currencyCode: "BRL" }}
        compareAtPrice={selectedVariant?.compareAtPrice}
        onAddToCart={handleAddToCart}
        isLoading={isLoading}
        available={selectedVariant?.availableForSale ?? false}
      />

      {/* HERO / BUY BOX */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-xs font-semibold uppercase tracking-wider">
            <ArrowLeft className="h-3 w-3" /> Voltar
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
                      <button key={idx} onClick={() => setSelectedImage(idx)} className={`w-16 h-16 rounded overflow-hidden border-2 flex-shrink-0 transition-colors ${idx === selectedImage ? "border-foreground" : "border-border hover:border-muted-foreground"}`}>
                        <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">Madbucks</p>
                  <h1 className="font-display text-2xl md:text-3xl tracking-tight text-foreground uppercase mb-2">{product.title}</h1>
                  <p className="text-sm text-muted-foreground leading-relaxed">Revitalize, restaure e preserve sua tatuagem com o sérum intensificador mais completo do mercado.</p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {[{ icon: Eye, text: "Para tattoos coloridas, P&B e cinza" }, { icon: Leaf, text: "Vegano e natural" }, { icon: Zap, text: "Sem acabamento oleoso" }].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2"><badge.icon className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs text-muted-foreground">{badge.text}</span></div>
                  ))}
                </div>
                {selectedVariant && <PriceDisplay amount={selectedVariant.price.amount} currencyCode={selectedVariant.price.currencyCode} compareAtAmount={selectedVariant.compareAtPrice?.amount} />}
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
                    <div key={i} className="flex items-center gap-2"><Check className="h-3 w-3 text-muted-foreground" /><span className="text-xs text-muted-foreground">{b}</span></div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
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
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Resultados Reais</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground uppercase">O Intensificador de Tattoo Mais Eficaz</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="text-center space-y-3 py-8 border border-border rounded">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display text-5xl md:text-6xl text-foreground">{stat.value}</span>
                    <span className="font-display text-2xl text-foreground">{stat.unit}</span>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-[220px] mx-auto leading-relaxed">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <ScrollReveal>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Benefícios</p>
                  <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground uppercase">Seu Intensificador de Tattoo — Resultado na Primeira Aplicação</h2>
                </div>
              </ScrollReveal>
              {BENEFITS_DETAILED.map((b, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0"><b.icon className="h-5 w-5 text-foreground" /></div>
                    <div>
                      <h3 className="text-sm font-extrabold text-foreground mb-1">{b.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal direction="right">
              <div className="aspect-[4/5] overflow-hidden rounded bg-muted">
                <img src={beforeAfterImg} alt="Resultado do Tattoo Intensify" className="w-full h-full object-cover" loading="lazy" width={1200} height={800} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* BADGES BAR */}
      <section className="bg-foreground text-background py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {["RESULTADO NA 1ª APLICAÇÃO", "INGREDIENTES VEGANOS", "SEM ACABAMENTO OLEOSO", "MAIS VENDIDO"].map((item, i) => (
              <p key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{item}</p>
            ))}
          </div>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Composição</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground uppercase mb-4">O Que Tem Dentro?</h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">Ingredientes veganos e limpos que intensificam instantaneamente a vivacidade da tinta.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {INGREDIENTS.map((ing, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border border-border rounded p-6 space-y-4 h-full">
                  <h3 className="text-sm font-extrabold text-foreground">{ing.name}</h3>
                  <ul className="space-y-2">
                    {ing.benefits.map((b, j) => (
                      <li key={j} className="flex items-start gap-2"><Check className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" /><span className="text-xs text-muted-foreground leading-relaxed">{b}</span></li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="aspect-[4/5] overflow-hidden rounded bg-muted">
                <img src={howtoImg} alt="Como usar o Tattoo Intensify" className="w-full h-full object-cover" loading="lazy" width={800} height={1000} />
              </div>
            </ScrollReveal>
            <div className="space-y-8">
              <ScrollReveal>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Modo de Uso</p>
                  <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground uppercase">Simples: Retire, Massageie, Intensifique.</h2>
                  <p className="text-sm text-muted-foreground mt-3">Aplique diariamente para melhores resultados, mas veja a diferença já na primeira aplicação.</p>
                </div>
              </ScrollReveal>
              <div className="space-y-6">
                {HOW_TO_STEPS.map((step, i) => (
                  <ScrollReveal key={step.num} delay={i * 0.15}>
                    <div className="flex gap-5 items-start">
                      <span className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-extrabold flex-shrink-0">{step.num}</span>
                      <div className="pt-1">
                        <h3 className="text-sm font-extrabold text-foreground mb-1">{step.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials testimonials={TESTIMONIALS} title="Resultados Reais de Quem Usa" />

      {/* CROSS-SELL */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Rotina Completa</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground uppercase">Complete Sua Rotina</h2>
            </div>
          </ScrollReveal>
          <CrossSellGrid items={[
            { handle: "madbucks-sabonete-liquido-tattoo-69667a03eaf59", title: "Sabonete Líquido Tattoo", step: "Passo 1 — Limpe", desc: "Limpeza suave sem degradar pigmentos" },
            { handle: "madbucks-creme-hidratante-tattoo-69667a5124762", title: "Creme Hidratante Tattoo", step: "Passo 2 — Hidrate", desc: "Hidratação profunda de 24h" },
            { handle: "madbucks-tattoo-balm-stick-69668baa49da0", title: "Balm Stick", step: "Passo 3 — Proteja", desc: "Proteção portátil durante o dia" },
          ]} />
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <ComparisonTable />

      {/* FAQ */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Dúvidas</p>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground uppercase">Perguntas Frequentes</h2>
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

      {/* FINAL CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight uppercase">Pronto para intensificar sua tattoo?</h2>
            <p className="text-sm opacity-60 max-w-md mx-auto mt-4">Resultado visível na primeira aplicação. Ingredientes veganos. Sem acabamento oleoso.</p>
            <Button variant="secondary" className="rounded-none h-14 px-12 text-xs uppercase tracking-[0.2em] font-bold bg-background text-foreground hover:bg-background/90 gap-2 mt-6" onClick={handleAddToCart} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
              Comprar Agora — {selectedVariant ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) : ""}
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default IntensifyLP;
