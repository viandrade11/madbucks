import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ArrowLeft, ChevronDown, Check, Droplets, Shield, Sparkles, Moon, Clock } from "lucide-react";
import { PriceDisplay } from "@/components/PriceDisplay";
import { UpsellSection } from "@/components/UpsellSection";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ComparisonTable } from "@/components/ComparisonTable";
import { CrossSellGrid } from "@/components/CrossSellGrid";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { Testimonials } from "@/components/Testimonials";

const STATS = [
  { value: "24", unit: "h", label: "De hidratação contínua com uma única aplicação" },
  { value: "96", unit: "%", label: "Relataram melhora visível na textura da pele" },
  { value: "0", unit: "%", label: "De álcool, parabenos e fragrâncias sintéticas" },
];
const TICKER_ITEMS = ["HIDRATAÇÃO 24H", "SEM ÁLCOOL", "HIPOALERGÊNICO", "DERMATOLOGICAMENTE TESTADO", "CRUELTY-FREE", "VEGANO"];
const BENEFITS_DETAILED = [
  { icon: Clock, title: "Hidratação de 24 Horas", desc: "Fórmula com ácido hialurônico que mantém a pele tatuada hidratada o dia todo." },
  { icon: Shield, title: "Sem Ingredientes Agressivos", desc: "Zero álcool, zero parabenos, zero fragrâncias sintéticas." },
  { icon: Sparkles, title: "Toque Seco e Leve", desc: "Absorção rápida que não deixa sensação oleosa ou pegajosa." },
  { icon: Moon, title: "Rotina Dia e Noite", desc: "Formulado para uso contínuo, manhã e noite." },
];
const INGREDIENTS = [
  { name: "Ácido Hialurônico", benefits: ["Hidratação profunda", "Retém até 1000x seu peso em água", "Melhora a elasticidade"] },
  { name: "Ceramidas", benefits: ["Restaura a barreira cutânea", "Previne perda de umidade", "Fortalece a camada protetora"] },
  { name: "Aloe Vera", benefits: ["Propriedades calmantes", "Auxilia na regeneração celular", "Refresca e suaviza"] },
  { name: "Vitamina B5", benefits: ["Acelera a recuperação", "Melhora a retenção de umidade"] },
];
const HOW_TO_STEPS = [
  { num: "01", title: "Limpe a pele", desc: "Após o banho, seque a pele tatuada suavemente com uma toalha macia." },
  { num: "02", title: "Aplique generosamente", desc: "Retire uma quantidade generosa e aplique sobre toda a área tatuada." },
  { num: "03", title: "Massageie até absorção", desc: "Massageie em movimentos circulares suaves até a completa absorção." },
];
const FAQS = [
  { q: "O Creme Hidratante é a base da rotina?", a: "Sim. É o produto fundamental da rotina Madbucks com hidratação profunda e prolongada." },
  { q: "Posso usar em pele sensível?", a: "Sim. É hipoalergênico e dermatologicamente testado." },
  { q: "Deixa a pele oleosa?", a: "Não. A fórmula tem toque seco e absorção rápida." },
  { q: "Com que frequência devo usar?", a: "Duas vezes ao dia: manhã e noite." },
  { q: "Posso usar junto com o Intensify?", a: "Sim! A sequência ideal é: Sabonete → Creme Hidratante → Intensify." },
  { q: "Quanto tempo dura um pote?", a: "Com uso diário, cada pote dura em média 45-60 dias." },
];
const TESTIMONIALS = [
  { name: "Juliana S.", location: "Belo Horizonte, MG", text: "Meu tatuador recomendou a Madbucks e eu entendi o porquê. O creme hidratante tem um toque seco incrível.", rating: 5, product: "Creme Hidratante" },
  { name: "André P.", location: "Recife, PE", text: "Uso manhã e noite. Minhas tattoos nunca ficaram tão hidratadas sem aquela sensação pegajosa.", rating: 5, product: "Creme Hidratante" },
  { name: "Tatiana M.", location: "Goiânia, GO", text: "A textura da minha pele melhorou demais. As cores da tattoo ficaram mais vivas desde que comecei a usar.", rating: 5, product: "Creme Hidratante" },
];

interface CremeHidratanteLPProps { product: ShopifyProduct["node"]; }

const CremeHidratanteLP = ({ product }: CremeHidratanteLPProps) => {
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
    await addItem({ product: { node: product }, variantId: selectedVariant.id, variantTitle: selectedVariant.title, price: selectedVariant.price, quantity: 1, selectedOptions: selectedVariant.selectedOptions || [] });
    toast.success("Adicionado ao carrinho!", { position: "top-center" });
  };

  return (
    <>
      <StickyBuyBar productTitle={product.title} price={selectedVariant?.price || { amount: "0", currencyCode: "BRL" }} compareAtPrice={selectedVariant?.compareAtPrice} onAddToCart={handleAddToCart} isLoading={isLoading} available={selectedVariant?.availableForSale ?? false} />

      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-xs font-semibold uppercase tracking-wider"><ArrowLeft className="h-3 w-3" /> Voltar</Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <ScrollReveal direction="left">
              <div className="space-y-3">
                <div className="aspect-square overflow-hidden bg-muted rounded">{images[selectedImage]?.node ? <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Sem imagem</div>}</div>
                {images.length > 1 && <div className="flex gap-2 overflow-x-auto pb-1">{images.map((img, idx) => (<button key={idx} onClick={() => setSelectedImage(idx)} className={`w-16 h-16 rounded overflow-hidden border-2 flex-shrink-0 transition-colors ${idx === selectedImage ? "border-foreground" : "border-border hover:border-muted-foreground"}`}><img src={img.node.url} alt="" className="w-full h-full object-cover" /></button>))}</div>}
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">Madbucks</p><h1 className="font-display text-3xl md:text-4xl tracking-tight text-foreground mb-2">{product.title}</h1><p className="text-sm text-muted-foreground leading-relaxed">Hidratação profunda de 24 horas que sua pele tatuada precisa todos os dias.</p></div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">{[{ icon: Clock, text: "Hidratação 24h" }, { icon: Droplets, text: "Toque seco" }, { icon: Shield, text: "Sem álcool" }].map((badge, i) => (<div key={i} className="flex items-center gap-2"><badge.icon className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs text-muted-foreground">{badge.text}</span></div>))}</div>
                {selectedVariant && <PriceDisplay amount={selectedVariant.price.amount} currencyCode={selectedVariant.price.currencyCode} compareAtAmount={selectedVariant.compareAtPrice?.amount} />}
                {hasMultipleVariants && product.options.map((option) => (<div key={option.name} className="space-y-2"><label className="text-xs font-bold uppercase tracking-wider text-foreground">{option.name}</label><div className="flex flex-wrap gap-2">{product.variants.edges.map((variant, idx) => { const optValue = variant.node.selectedOptions.find((o) => o.name === option.name)?.value; return (<button key={variant.node.id} onClick={() => setSelectedVariantIdx(idx)} disabled={!variant.node.availableForSale} className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-all ${idx === selectedVariantIdx ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground"} ${!variant.node.availableForSale ? "opacity-30 cursor-not-allowed line-through" : ""}`}>{optValue || variant.node.title}</button>); })}</div></div>))}
                <Button className="w-full rounded-none h-14 text-xs uppercase tracking-[0.2em] font-bold gap-2" onClick={handleAddToCart} disabled={isLoading || !selectedVariant?.availableForSale}>{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}{selectedVariant?.availableForSale ? `Adicionar ao Carrinho — ${formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}` : "Indisponível"}</Button>
                <div className="flex flex-wrap gap-2 pt-2">{["Frete grátis acima de R$ 199", "Cruelty-free e vegano", "Dermatologicamente testado"].map((b, i) => (<span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"><Check className="h-3 w-3" />{b}</span>))}</div>
                <div className="pt-4 border-t border-border"><UpsellSection excludeHandle={product.handle} compact title="Você também vai gostar" /></div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background py-3 overflow-hidden"><div className="flex animate-ticker whitespace-nowrap">{[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (<span key={i} className="mx-8 text-[10px] font-bold uppercase tracking-[0.3em] opacity-80 flex-shrink-0">★ {item}</span>))}</div></section>

      <section className="section-padding"><div className="container mx-auto px-4"><ScrollReveal><div className="text-center mb-12"><p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Resultados</p><h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">A Base da Sua Rotina</h2></div></ScrollReveal><div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">{STATS.map((stat, i) => (<ScrollReveal key={i} delay={i * 0.15}><div className="text-center space-y-3 py-8 border border-border rounded"><div className="flex items-baseline justify-center gap-1"><span className="font-display text-5xl md:text-6xl text-foreground">{stat.value}</span><span className="font-display text-2xl text-foreground">{stat.unit}</span></div><p className="text-sm text-muted-foreground max-w-[220px] mx-auto leading-relaxed">{stat.label}</p></div></ScrollReveal>))}</div></div></section>

      <section className="section-padding bg-muted/30"><div className="container mx-auto px-4"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"><div className="space-y-8"><ScrollReveal><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Benefícios</p><h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Hidratação Que Sua Tattoo Precisa</h2></div></ScrollReveal>{BENEFITS_DETAILED.map((b, i) => (<ScrollReveal key={i} delay={i * 0.1}><div className="flex gap-4"><div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0"><b.icon className="h-5 w-5 text-foreground" /></div><div><h3 className="text-sm font-extrabold text-foreground mb-1">{b.title}</h3><p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p></div></div></ScrollReveal>))}</div><ScrollReveal direction="right"><div className="aspect-[4/5] overflow-hidden rounded bg-muted flex items-center justify-center">{images[1]?.node ? <img src={images[1].node.url} alt="Creme Hidratante" className="w-full h-full object-cover" loading="lazy" /> : images[0]?.node ? <img src={images[0].node.url} alt="Creme Hidratante" className="w-full h-full object-cover" loading="lazy" /> : <span className="text-muted-foreground text-sm">Sem imagem</span>}</div></ScrollReveal></div></div></section>

      <section className="bg-foreground text-background py-5"><div className="container mx-auto px-4"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">{["HIDRATAÇÃO 24H", "SEM ÁLCOOL", "TOQUE SECO", "HIPOALERGÊNICO"].map((item, i) => (<p key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{item}</p>))}</div></div></section>

      <section className="section-padding"><div className="container mx-auto px-4"><ScrollReveal><div className="text-center mb-12"><p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Composição</p><h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground mb-4">O Que Tem Dentro?</h2><p className="text-sm text-muted-foreground max-w-xl mx-auto">Ingredientes dermatologicamente selecionados para hidratar profundamente sem degradar os pigmentos.</p></div></ScrollReveal><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">{INGREDIENTS.map((ing, i) => (<ScrollReveal key={i} delay={i * 0.1}><div className="border border-border rounded p-6 space-y-4 h-full"><h3 className="text-sm font-extrabold text-foreground">{ing.name}</h3><ul className="space-y-2">{ing.benefits.map((b, j) => (<li key={j} className="flex items-start gap-2"><Check className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" /><span className="text-xs text-muted-foreground leading-relaxed">{b}</span></li>))}</ul></div></ScrollReveal>))}</div></div></section>

      <section className="section-padding bg-muted/30"><div className="container mx-auto px-4"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"><ScrollReveal direction="left"><div className="aspect-[4/5] overflow-hidden rounded bg-muted flex items-center justify-center">{images[2]?.node ? <img src={images[2].node.url} alt="Como usar" className="w-full h-full object-cover" loading="lazy" /> : images[0]?.node ? <img src={images[0].node.url} alt="Como usar" className="w-full h-full object-cover" loading="lazy" /> : <span className="text-muted-foreground text-sm">Sem imagem</span>}</div></ScrollReveal><div className="space-y-8"><ScrollReveal><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Modo de Uso</p><h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Limpe, Aplique, Massageie.</h2><p className="text-sm text-muted-foreground mt-3">A base da rotina Madbucks. Use manhã e noite.</p></div></ScrollReveal><div className="space-y-6">{HOW_TO_STEPS.map((step, i) => (<ScrollReveal key={step.num} delay={i * 0.15}><div className="flex gap-5 items-start"><span className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-extrabold flex-shrink-0">{step.num}</span><div className="pt-1"><h3 className="text-sm font-extrabold text-foreground mb-1">{step.title}</h3><p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p></div></div></ScrollReveal>))}</div></div></div></div></section>

      <Testimonials testimonials={TESTIMONIALS} title="Quem Usa, Aprova" />

      <section className="section-padding bg-muted/30"><div className="container mx-auto px-4"><ScrollReveal><div className="text-center mb-12"><p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Rotina Completa</p><h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Complete Sua Rotina</h2></div></ScrollReveal><CrossSellGrid items={[{ handle: "madbucks-sabonete-liquido-tattoo-69667a03eaf59", title: "Sabonete Líquido Tattoo", step: "Passo 1 — Limpe", desc: "Limpeza suave sem degradar pigmentos" }, { handle: "madbucks-tattoo-balm-stick-69668baa49da0", title: "Balm Stick", step: "Passo 2 — Proteja", desc: "Proteção portátil durante o dia" }, { handle: "madbucks-tattoo-intensify", title: "Tattoo Intensify", step: "Passo 3 — Intensifique", desc: "Intensifica cores e contraste" }]} /></div></section>

      <ComparisonTable />

      <section className="section-padding bg-muted/50"><div className="container mx-auto px-4 max-w-2xl"><ScrollReveal><div className="text-center mb-12"><p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Dúvidas</p><h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Perguntas Frequentes</h2></div></ScrollReveal><div className="space-y-0">{FAQS.map((faq, i) => (<div key={i} className="border-b border-border"><button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left"><span className="text-sm font-bold text-foreground pr-4">{faq.q}</span><ChevronDown className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} /></button>{openFaq === i && <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>}</div>))}</div></div></section>

      <UpsellSection excludeHandle="madbucks-creme-hidratante-tattoo-69667a5124762" />

      <section className="py-20 bg-foreground text-background"><div className="container mx-auto px-4 text-center"><ScrollReveal><h2 className="font-display text-2xl md:text-3xl tracking-tight">Hidratação Que Sua Tattoo Merece.</h2><p className="text-sm opacity-60 max-w-md mx-auto mt-4">Toque seco. 24h de hidratação. Sem álcool.</p><Button variant="secondary" className="rounded-none h-14 px-12 text-xs uppercase tracking-[0.2em] font-bold bg-background text-foreground hover:bg-background/90 gap-2 mt-6" onClick={handleAddToCart} disabled={isLoading}>{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}Comprar Agora — {selectedVariant ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) : ""}</Button></ScrollReveal></div></section>
    </>
  );
};

export default CremeHidratanteLP;
