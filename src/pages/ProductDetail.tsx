import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, formatPrice, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ArrowLeft, ChevronDown, Check, Droplets, Shield, Sun, Sparkles } from "lucide-react";
import { toast } from "sonner";

const PRODUCT_INFO: Record<string, {
  tagline: string;
  whatIs: string;
  howToUse: string[];
  benefits: { icon: typeof Shield; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}> = {
  "madbucks-tattoo-intensify": {
    tagline: "Realce e proteção para tatuagens que merecem brilhar.",
    whatIs: "O Tattoo Intensify é um sérum concentrado que penetra nas camadas da pele para reativar a vivacidade dos pigmentos da tatuagem. Formulado com ativos que criam uma barreira protetora contra raios UV e poluição, enquanto nutre a pele de dentro para fora. Resultado: cores mais vivas, contornos mais definidos e pele saudável.",
    howToUse: [
      "Aplique uma pequena quantidade na pele limpa e seca",
      "Espalhe com movimentos circulares sobre a tatuagem",
      "Aguarde absorção completa antes de vestir roupas",
      "Use 2-3 vezes por semana ou antes de exposição ao sol",
    ],
    benefits: [
      { icon: Sparkles, title: "Intensifica Cores", desc: "Reativa os pigmentos e devolve a vibração original" },
      { icon: Shield, title: "Proteção UV", desc: "Barreira contra raios que desbotam a tinta" },
      { icon: Droplets, title: "Hidratação Profunda", desc: "Nutre as camadas mais profundas da pele" },
    ],
    faqs: [
      { q: "Em quanto tempo vejo resultados?", a: "Os primeiros resultados são visíveis já na primeira aplicação, com as cores aparecendo mais vivas. Resultados duradouros com uso contínuo por 2-3 semanas." },
      { q: "Funciona em tatuagens coloridas e preto/cinza?", a: "Sim. A fórmula foi desenvolvida para todos os tipos de tatuagem, intensificando tanto cores vibrantes quanto contrastes em preto e cinza." },
      { q: "Posso usar junto com protetor solar?", a: "Sim. Aplique o Intensify primeiro, aguarde a absorção e depois o protetor solar por cima." },
    ],
  },
  "default": {
    tagline: "Desenvolvido especialmente para a pele tatuada.",
    whatIs: "Produto da linha Madbucks, formulado por dermatologistas especializados em pele tatuada. Com ingredientes selecionados que respeitam os pigmentos enquanto cuidam da saúde da sua pele. Sem álcool, sem fragrâncias artificiais, sem ingredientes que agridam a tinta.",
    howToUse: [
      "Aplique na pele limpa e seca",
      "Espalhe suavemente sobre a área tatuada",
      "Massageie até completa absorção",
      "Use diariamente para melhores resultados",
    ],
    benefits: [
      { icon: Droplets, title: "Hidratação", desc: "Penetra profundamente para hidratar a pele tatuada" },
      { icon: Shield, title: "Proteção", desc: "Cria uma barreira protetora para os pigmentos" },
      { icon: Sun, title: "Preservação", desc: "Mantém as cores vivas por mais tempo" },
    ],
    faqs: [
      { q: "Posso usar em qualquer tatuagem?", a: "Sim. Nossos produtos são seguros para todos os tipos de tatuagem, em qualquer parte do corpo." },
      { q: "Os produtos são veganos?", a: "Sim. Todos os produtos Madbucks são veganos e cruelty-free." },
      { q: "Quanto tempo dura cada produto?", a: "Com uso diário, cada produto dura em média 45-60 dias." },
    ],
  },
};

PRODUCT_INFO["madbucks-tattoo-balm-stick-69668baa49da0"] = {
  tagline: "Proteção compacta para levar sua rotina a qualquer lugar.",
  whatIs: "O Balm Stick é a solução portátil para manter sua tatuagem hidratada e protegida o dia todo. Formato stick para aplicação precisa, sem sujeira, direto na pele. Ideal para retoque rápido durante o dia, antes do treino ou exposição ao sol. Fórmula com manteiga de karité e vitamina E.",
  howToUse: [
    "Gire a base para expor o produto",
    "Aplique diretamente sobre a tatuagem",
    "Espalhe com os dedos se necessário",
    "Reaplique durante o dia conforme necessário",
  ],
  benefits: [
    { icon: Shield, title: "Portátil", desc: "Leve no bolso, na mochila, para o treino" },
    { icon: Droplets, title: "Hidratação Express", desc: "Hidratação imediata em formato prático" },
    { icon: Sun, title: "Proteção Diária", desc: "Barreira protetora ao longo do dia" },
  ],
  faqs: [
    { q: "Posso usar no rosto?", a: "O Balm Stick é formulado para uso corporal, especificamente sobre tatuagens. Para o rosto, recomendamos o Creme Hidratante." },
    { q: "O produto mancha roupa?", a: "Não. A fórmula é de rápida absorção e não deixa resíduos nas roupas." },
    { q: "Pode ser usado durante a cicatrização?", a: "Sim, o Balm Stick pode ser usado na fase de cicatrização, mas consulte seu tatuador sobre o momento ideal." },
  ],
};

PRODUCT_INFO["madbucks-creme-hidratante-tattoo-69667a5124762"] = {
  tagline: "Hidratação profunda que sua pele tatuada precisa todos os dias.",
  whatIs: "O Creme Hidratante Tattoo é a base da sua rotina de cuidado. Fórmula rica em ácido hialurônico e ceramidas que penetra nas camadas mais profundas da pele, onde a tinta está depositada. Hidrata por até 24 horas sem deixar sensação oleosa. Sem álcool, sem fragrâncias que degradam pigmentos.",
  howToUse: [
    "Após o banho, seque a pele suavemente",
    "Aplique uma quantidade generosa sobre a tatuagem",
    "Massageie em movimentos circulares até absorção",
    "Use manhã e noite para resultados ideais",
  ],
  benefits: [
    { icon: Droplets, title: "24h de Hidratação", desc: "Fórmula de longa duração que não resseca" },
    { icon: Shield, title: "Sem Álcool", desc: "Não degrada pigmentos e não irrita" },
    { icon: Sparkles, title: "Toque Seco", desc: "Absorção rápida, sem oleosidade" },
  ],
  faqs: [
    { q: "Posso usar em pele sensível?", a: "Sim. O creme é hipoalergênico e dermatologicamente testado, seguro para todos os tipos de pele." },
    { q: "Substitui o hidratante corporal?", a: "Pode ser usado como hidratante principal nas áreas tatuadas. Para o restante do corpo, use seu hidratante habitual." },
    { q: "É indicado para pós-tattoo?", a: "Sim. Pode ser utilizado após o período inicial de cicatrização (consulte seu tatuador)." },
  ],
};

PRODUCT_INFO["madbucks-sabonete-liquido-tattoo-69667a03eaf59"] = {
  tagline: "Limpeza suave que respeita a tinta e cuida da pele.",
  whatIs: "O Sabonete Líquido Tattoo é o primeiro passo da rotina Madbucks. Limpeza eficiente sem agredir a barreira cutânea e sem degradar os pigmentos da tatuagem. pH balanceado, livre de sulfatos agressivos, com extratos naturais que acalmam e preparam a pele para os próximos cuidados.",
  howToUse: [
    "Molhe a área tatuada com água morna",
    "Aplique uma pequena quantidade e faça espuma",
    "Massageie suavemente, sem esfregar",
    "Enxague bem e seque com toques leves",
  ],
  benefits: [
    { icon: Droplets, title: "pH Balanceado", desc: "Respeita o equilíbrio natural da pele" },
    { icon: Shield, title: "Sem Sulfatos", desc: "Limpeza suave que não agride os pigmentos" },
    { icon: Sparkles, title: "Prepara a Pele", desc: "Deixa a pele pronta para absorver hidratantes" },
  ],
  faqs: [
    { q: "Pode usar todos os dias?", a: "Sim, o sabonete foi formulado para uso diário, sem ressecar ou irritar." },
    { q: "Faz espuma?", a: "Sim, faz uma espuma suave e cremosa. A fórmula sem sulfatos produz menos espuma que sabonetes comuns, mas limpa igualmente." },
    { q: "Tem fragrância?", a: "Fragrância leve e natural, sem componentes sintéticos que possam irritar a pele ou degradar a tinta." },
  ],
};

PRODUCT_INFO["kit-tatuagem-perfeita"] = {
  tagline: "Tudo o que você precisa em um só kit. A rotina completa.",
  whatIs: "O Kit Tatuagem Perfeita reúne toda a linha Madbucks em um conjunto pensado para quem quer começar a rotina completa de cuidados. Inclui sabonete líquido, creme hidratante, balm stick e Intensify. Economia real comparado à compra individual, e a certeza de que sua tattoo terá o cuidado que merece.",
  howToUse: [
    "Passo 1: Limpe com o Sabonete Líquido",
    "Passo 2: Hidrate com o Creme Hidratante",
    "Passo 3: Proteja com o Balm Stick durante o dia",
    "Passo 4: Intensifique com o Tattoo Intensify 2-3x por semana",
  ],
  benefits: [
    { icon: Shield, title: "Rotina Completa", desc: "4 produtos que cobrem todas as necessidades" },
    { icon: Sparkles, title: "Economia", desc: "Preço especial comparado à compra individual" },
    { icon: Droplets, title: "Para Iniciantes", desc: "Ideal para quem está começando a cuidar" },
  ],
  faqs: [
    { q: "Quanto tempo dura o kit?", a: "Com uso diário, o kit dura em média 45-60 dias." },
    { q: "Posso presentear alguém?", a: "Sim! O kit vem em embalagem premium, ideal para presentear quem tem tatuagens." },
    { q: "Qual a ordem de uso?", a: "Sabonete → Creme Hidratante → Balm Stick (dia) → Intensify (2-3x semana)." },
  ],
};

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    setSelectedImage(0);
    setSelectedVariantIdx(0);
    fetchProductByHandle(handle).then((data) => {
      setProduct(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [handle]);

  const info = PRODUCT_INFO[handle || ""] || PRODUCT_INFO["default"];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
          <p className="text-muted-foreground">Produto não encontrado</p>
          <Link to="/" className="text-foreground font-bold text-sm mt-4 inline-block hover:underline">Voltar</Link>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;
  const hasMultipleVariants = product.variants.edges.length > 1 ||
    (product.variants.edges.length === 1 && product.variants.edges[0].node.title !== 'Default Title');

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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Product Hero */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-xs font-semibold uppercase tracking-wider">
            <ArrowLeft className="h-3 w-3" />
            Voltar
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Images */}
            <div className="space-y-3">
              <div className="aspect-square overflow-hidden bg-muted rounded">
                {images[selectedImage]?.node ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Sem imagem</div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded overflow-hidden border-2 flex-shrink-0 transition-colors ${
                        idx === selectedImage ? 'border-foreground' : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">Madbucks</p>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-2">
                  {product.title}
                </h1>
                <p className="text-sm text-muted-foreground">{info.tagline}</p>
              </div>

              <p className="text-2xl font-extrabold text-foreground">
                {selectedVariant ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) : ''}
              </p>

              {/* Variants */}
              {hasMultipleVariants && product.options.map((option) => (
                <div key={option.name} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground">{option.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((variant, idx) => {
                      const optValue = variant.node.selectedOptions.find(o => o.name === option.name)?.value;
                      return (
                        <button
                          key={variant.node.id}
                          onClick={() => setSelectedVariantIdx(idx)}
                          disabled={!variant.node.availableForSale}
                          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-all ${
                            idx === selectedVariantIdx
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border text-muted-foreground hover:border-foreground'
                          } ${!variant.node.availableForSale ? 'opacity-30 cursor-not-allowed line-through' : ''}`}
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
                {selectedVariant?.availableForSale ? 'Adicionar ao Carrinho' : 'Indisponível'}
              </Button>

              {/* Quick benefits */}
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

      {/* What Is This Product */}
      <section className="section-padding border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">O Produto</p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              O que é o {product.title}?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {info.whatIs}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {info.benefits.map((b, i) => (
              <div key={i} className="text-center space-y-3 py-6">
                <b.icon className="h-7 w-7 mx-auto opacity-70" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider">{b.title}</h3>
                <p className="text-xs opacity-60 max-w-xs mx-auto">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Modo de Uso</p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              Como Usar
            </h2>
          </div>
          <div className="space-y-6">
            {info.howToUse.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed pt-1.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Dúvidas</p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              Perguntas Frequentes
            </h2>
          </div>
          <div className="space-y-0">
            {info.faqs.map((faq, i) => (
              <div key={i} className="border-b border-border">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="text-sm font-bold text-foreground pr-4">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Pronto para cuidar da sua tattoo?
          </h2>
          <Button
            variant="secondary"
            className="rounded-none h-12 px-10 text-xs uppercase tracking-[0.2em] font-bold bg-background text-foreground hover:bg-background/90 gap-2"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
            Comprar Agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-extrabold uppercase tracking-[0.15em]">MADBUCKS</p>
            <p className="text-xs text-muted-foreground">Skincare para tatuados. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
