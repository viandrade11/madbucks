import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { PriceDisplay } from "@/components/PriceDisplay";
import { UpsellSection } from "@/components/UpsellSection";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ArrowLeft, ChevronDown, Check, Droplets, Shield, Sparkles, Package, Gift, Star } from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ComparisonTable } from "@/components/ComparisonTable";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { Testimonials } from "@/components/Testimonials";

const STATS = [
  { value: "4", unit: "em 1", label: "Produtos que cobrem toda a rotina" },
  { value: "20", unit: "%", label: "De economia comparado à compra individual" },
  { value: "60", unit: "dias", label: "De rotina completa em um único kit" },
];
const TICKER_ITEMS = ["ROTINA COMPLETA", "ECONOMIA REAL", "INGREDIENTES VEGANOS", "CRUELTY-FREE", "DERMATOLOGICAMENTE TESTADO", "IDEAL PARA PRESENTEAR"];
const KIT_PRODUCTS = [
  { icon: Droplets, name: "Sabonete Líquido Tattoo", step: "Passo 1 — Limpe", desc: "Limpeza suave com pH balanceado.", handle: "madbucks-sabonete-liquido-tattoo-69667a03eaf59" },
  { icon: Shield, name: "Creme Hidratante Tattoo", step: "Passo 2 — Hidrate", desc: "Hidratação de 24h com ácido hialurônico.", handle: "madbucks-creme-hidratante-tattoo-69667a5124762" },
  { icon: Package, name: "Balm Stick", step: "Passo 3 — Proteja", desc: "Proteção portátil em formato stick.", handle: "madbucks-tattoo-balm-stick-69668baa49da0" },
  { icon: Sparkles, name: "Tattoo Intensify", step: "Passo 4 — Intensifique", desc: "Sérum intensificador de cores.", handle: "madbucks-tattoo-intensify" },
];
const BENEFITS = [
  { icon: Package, title: "Rotina Completa em Uma Caixa", desc: "Os 4 produtos essenciais para o cuidado completo." },
  { icon: Star, title: "Economia Real", desc: "Preço especial comparado à compra individual." },
  { icon: Gift, title: "Presente Perfeito", desc: "Embalagem premium ideal para presentear." },
  { icon: Shield, title: "Para Iniciantes e Experientes", desc: "O ponto de partida ideal para resultados profissionais." },
];
const FAQS = [
  { q: "Quanto tempo dura o kit?", a: "Com uso diário, dura em média 45-60 dias." },
  { q: "Posso presentear alguém?", a: "Sim! Embalagem premium, ideal para presente." },
  { q: "Qual a ordem correta de uso?", a: "Sabonete → Creme Hidratante → Balm Stick (dia) → Intensify (2-3x/semana)." },
  { q: "Preciso usar todos os produtos?", a: "O ideal é a rotina completa, mas cada produto funciona independentemente." },
  { q: "Funciona em todos os estilos?", a: "Sim. Coloridas, preto e cinza, old school, realismo, fineline — todos." },
  { q: "Qual a economia?", a: "Aproximadamente 20% em relação à compra individual." },
];
const TESTIMONIALS = [
  { name: "Felipe A.", location: "Curitiba, PR", text: "Comecei com o kit completo e não largo mais. A rotina é simples e o resultado é absurdo.", rating: 5, product: "Kit Tatuagem Perfeita" },
  { name: "Amanda S.", location: "São Paulo, SP", text: "Comprei pra presentear meu namorado e ele amou. Agora ele cuida das tattoos dele direitinho.", rating: 5, product: "Kit Tatuagem Perfeita" },
  { name: "Ricardo L.", location: "Fortaleza, CE", text: "Melhor investimento que fiz. 4 produtos que realmente fazem diferença. Economia real.", rating: 5, product: "Kit Tatuagem Perfeita" },
];

interface KitLPProps { product: ShopifyProduct["node"]; }

const KitLP = ({ product }: KitLPProps) => {
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

      <section className="pt-20 pb-16"><div className="container mx-auto px-4"><Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-xs font-semibold uppercase tracking-wider"><ArrowLeft className="h-3 w-3" /> Voltar</Link><div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"><ScrollReveal direction="left"><div className="space-y-3"><div className="aspect-square overflow-hidden bg-muted rounded">{images[selectedImage]?.node ? <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Sem imagem</div>}</div>{images.length > 1 && <div className="flex gap-2 overflow-x-auto pb-1">{images.map((img, idx) => (<button key={idx} onClick={() => setSelectedImage(idx)} className={`w-16 h-16 rounded overflow-hidden border-2 flex-shrink-0 transition-colors ${idx === selectedImage ? "border-foreground" : "border-border hover:border-muted-foreground"}`}><img src={img.node.url} alt="" className="w-full h-full object-cover" /></button>))}</div>}</div></ScrollReveal>
      <ScrollReveal direction="right"><div className="space-y-6"><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">Madbucks</p><h1 className="font-display text-3xl md:text-4xl tracking-tight text-foreground mb-2">{product.title}</h1><p className="text-sm text-muted-foreground leading-relaxed">Tudo o que você precisa em um só kit. Rotina completa com economia real.</p></div><div className="flex flex-wrap gap-x-6 gap-y-2">{[{ icon: Package, text: "4 produtos completos" }, { icon: Gift, text: "Embalagem premium" }, { icon: Star, text: "Melhor custo-benefício" }].map((badge, i) => (<div key={i} className="flex items-center gap-2"><badge.icon className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs text-muted-foreground">{badge.text}</span></div>))}</div>{selectedVariant && <PriceDisplay amount={selectedVariant.price.amount} currencyCode={selectedVariant.price.currencyCode} compareAtAmount={selectedVariant.compareAtPrice?.amount} />}
      {hasMultipleVariants && product.options.map((option) => (<div key={option.name} className="space-y-2"><label className="text-xs font-bold uppercase tracking-wider text-foreground">{option.name}</label><div className="flex flex-wrap gap-2">{product.variants.edges.map((variant, idx) => { const optValue = variant.node.selectedOptions.find((o) => o.name === option.name)?.value; return (<button key={variant.node.id} onClick={() => setSelectedVariantIdx(idx)} disabled={!variant.node.availableForSale} className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-all ${idx === selectedVariantIdx ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground"} ${!variant.node.availableForSale ? "opacity-30 cursor-not-allowed line-through" : ""}`}>{optValue || variant.node.title}</button>); })}</div></div>))}
      <Button className="w-full rounded-none h-14 text-xs uppercase tracking-[0.2em] font-bold gap-2" onClick={handleAddToCart} disabled={isLoading || !selectedVariant?.availableForSale}>{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}{selectedVariant?.availableForSale ? `Adicionar ao Carrinho — ${formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}` : "Indisponível"}</Button>
      <div className="flex flex-wrap gap-2 pt-2">{["Frete grátis acima de R$ 199", "Cruelty-free e vegano", "Economia de ~20% vs. compra individual"].map((b, i) => (<span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"><Check className="h-3 w-3" />{b}</span>))}</div>
      <div className="pt-4 border-t border-border"><UpsellSection excludeHandle={product.handle} compact title="Você também vai gostar" /></div></div></ScrollReveal></div></div></section>

      <section className="bg-foreground text-background py-3 overflow-hidden"><div className="flex animate-ticker whitespace-nowrap">{[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (<span key={i} className="mx-8 text-[10px] font-bold uppercase tracking-[0.3em] opacity-80 flex-shrink-0">★ {item}</span>))}</div></section>

      <section className="section-padding"><div className="container mx-auto px-4"><ScrollReveal><div className="text-center mb-12"><p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">O Kit</p><h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Tudo Que Sua Tattoo Precisa</h2></div></ScrollReveal><div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">{STATS.map((stat, i) => (<ScrollReveal key={i} delay={i * 0.15}><div className="text-center space-y-3 py-8 border border-border rounded"><div className="flex items-baseline justify-center gap-1"><span className="font-display text-5xl md:text-6xl text-foreground">{stat.value}</span><span className="text-lg font-extrabold text-foreground">{stat.unit}</span></div><p className="text-xs text-muted-foreground max-w-[200px] mx-auto leading-relaxed">{stat.label}</p></div></ScrollReveal>))}</div></div></section>

      <section className="section-padding bg-muted/30"><div className="container mx-auto px-4"><ScrollReveal><div className="text-center mb-12"><p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">O Que Vem no Kit</p><h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Sua Rotina Completa, Passo a Passo</h2><p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">Cada produto cuida de uma etapa essencial.</p></div></ScrollReveal><div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">{KIT_PRODUCTS.map((item, i) => (<ScrollReveal key={i} delay={i * 0.1}><Link to={`/produto/${item.handle}`} className="border border-border rounded p-6 space-y-3 hover:border-foreground transition-colors group block"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0"><item.icon className="h-5 w-5 text-foreground" /></div><div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">{item.step}</p><h3 className="text-sm font-extrabold text-foreground group-hover:underline">{item.name}</h3></div></div><p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p><span className="text-xs font-bold uppercase tracking-wider text-foreground inline-flex items-center gap-1">Ver produto <ArrowLeft className="h-3 w-3 rotate-180" /></span></Link></ScrollReveal>))}</div></div></section>

      <section className="section-padding"><div className="container mx-auto px-4"><ScrollReveal><div className="text-center mb-12"><p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Por Que o Kit</p><h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Vantagens do Kit Completo</h2></div></ScrollReveal><div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">{BENEFITS.map((b, i) => (<ScrollReveal key={i} delay={i * 0.1}><div className="flex gap-4"><div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0"><b.icon className="h-5 w-5 text-foreground" /></div><div><h3 className="text-sm font-extrabold text-foreground mb-1">{b.title}</h3><p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p></div></div></ScrollReveal>))}</div></div></section>

      <section className="bg-foreground text-background py-5"><div className="container mx-auto px-4"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">{["4 PRODUTOS", "ECONOMIA DE 20%", "EMBALAGEM PREMIUM", "ROTINA COMPLETA"].map((item, i) => (<p key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{item}</p>))}</div></div></section>

      <Testimonials testimonials={TESTIMONIALS} title="Quem Usa, Aprova" />

      <ComparisonTable />

      <section className="section-padding bg-muted/50"><div className="container mx-auto px-4 max-w-2xl"><ScrollReveal><div className="text-center mb-12"><p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Dúvidas</p><h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">Perguntas Frequentes</h2></div></ScrollReveal><div className="space-y-0">{FAQS.map((faq, i) => (<div key={i} className="border-b border-border"><button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left"><span className="text-sm font-bold text-foreground pr-4">{faq.q}</span><ChevronDown className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} /></button>{openFaq === i && <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>}</div>))}</div></div></section>

      <UpsellSection excludeHandle="kit-tatuagem-perfeita" />

      <section className="py-20 bg-foreground text-background"><div className="container mx-auto px-4 text-center"><ScrollReveal><h2 className="font-display text-2xl md:text-3xl tracking-tight">A Rotina Completa. Em Um Só Kit.</h2><p className="text-sm opacity-60 max-w-md mx-auto mt-4">4 produtos essenciais. Economia real. O presente perfeito.</p><Button variant="secondary" className="rounded-none h-14 px-12 text-xs uppercase tracking-[0.2em] font-bold bg-background text-foreground hover:bg-background/90 gap-2 mt-6" onClick={handleAddToCart} disabled={isLoading}>{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}Comprar Kit — {selectedVariant ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) : ""}</Button></ScrollReveal></div></section>
    </>
  );
};

export default KitLP;
