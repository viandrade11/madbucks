import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { Loader2, Shield, Droplets, Sun, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-main.jpg";
import logoImg from "@/assets/logo-madbucks.png";
import routineImg from "@/assets/routine.jpg";
import tattooImg from "@/assets/tattoo-care.jpg";
import lifestyleImg from "@/assets/lifestyle.jpg";

const BENEFITS = [
  { icon: Shield, title: "Proteção UV", desc: "Barreira contra raios que desbotam a tinta" },
  { icon: Droplets, title: "Hidratação Profunda", desc: "Penetra nas camadas da pele tatuada" },
  { icon: Sun, title: "Cores Vivas", desc: "Intensifica e preserva a vibração das cores" },
];

const STEPS = [
  { num: "01", title: "Limpe", desc: "Use o sabonete líquido para remover impurezas sem agredir a pele tatuada. Movimentos suaves, água morna." },
  { num: "02", title: "Hidrate", desc: "Aplique o creme hidratante em toda a área tatuada. Massageie até absorção completa." },
  { num: "03", title: "Intensifique", desc: "Finalize com o Intensify para realçar as cores e criar uma camada de proteção duradoura." },
];

const FAQS = [
  { q: "A Madbucks funciona em tatuagens antigas?", a: "Sim. Nossos produtos foram desenvolvidos tanto para tatuagens recentes quanto para as mais antigas. O Tattoo Intensify, por exemplo, reativa a vivacidade das cores mesmo em tatuagens com anos." },
  { q: "Posso usar os produtos logo após tatuar?", a: "O Balm Stick e o Creme Hidratante podem ser usados na fase de cicatrização, seguindo orientação do seu tatuador. O Intensify é recomendado após a cicatrização completa." },
  { q: "Os produtos são testados em animais?", a: "Não. A Madbucks é cruelty-free. Nenhum dos nossos produtos é testado em animais." },
  { q: "Qual a diferença entre o Balm Stick e o Creme Hidratante?", a: "O Balm Stick é compacto, ideal para aplicação localizada e para levar no dia a dia. O Creme Hidratante cobre áreas maiores com hidratação prolongada." },
  { q: "Com que frequência devo usar?", a: "Recomendamos uso diário do creme hidratante e do sabonete. O Intensify pode ser usado 2-3 vezes por semana ou antes de exposição ao sol." },
];

const SKIN_FACTS = [
  { stat: "40%", label: "da tinta é perdida nos primeiros 2 anos sem cuidado adequado" },
  { stat: "3x", label: "mais rápido a pele tatuada desidrata comparado à pele comum" },
  { stat: "72%", label: "dos tatuados não usam produtos específicos para pele tatuada" },
];

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts(20).then((data) => {
      setProducts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-14">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="py-16 lg:py-0 space-y-8 max-w-lg">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Tattoo Skincare Premium
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground uppercase">
                Sua tinta merece<br />mais do que<br />um hidratante comum.
              </h1>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              A Madbucks é a primeira linha de skincare brasileira desenvolvida exclusivamente para preservar, proteger e intensificar tatuagens.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#produtos" className="inline-flex items-center justify-center bg-foreground text-background px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors">
                Ver Produtos
              </a>
              <a href="#como-funciona" className="inline-flex items-center justify-center border border-foreground text-foreground px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors">
                Como Funciona
              </a>
            </div>
          </div>
          <div className="relative h-[500px] lg:h-[600px]">
            <img src={heroImg} alt="Madbucks skincare para tatuagem" className="w-full h-full object-cover rounded" width={1920} height={1080} />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">✦ Cruelty Free</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">✦ Dermatologicamente Testado</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">✦ Feito no Brasil</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">✦ Vegano</span>
          </div>
        </div>
      </section>

      {/* Why Tattooed Skin is Different */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <img src={tattooImg} alt="Cuidado com tatuagem" loading="lazy" className="w-full h-[450px] object-cover rounded" width={800} height={1000} />
            </div>
            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Por que é diferente</p>
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-foreground uppercase">
                  Pele tatuada não é pele comum.
                </h2>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                A tinta é depositada na derme, a segunda camada da pele. Isso significa que a área tatuada tem necessidades específicas: hidratação mais profunda, proteção UV reforçada e ingredientes que não degradam os pigmentos.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Produtos convencionais não foram pensados para isso. Muitos contêm álcool, fragrâncias e químicos que aceleram o desbotamento. A Madbucks foi formulada por dermatologistas especializados em pele tatuada.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4">
                {SKIN_FACTS.map((fact, i) => (
                  <div key={i} className="text-center">
                    <p className="text-3xl font-extrabold text-foreground">{fact.stat}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug mt-1">{fact.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((b, i) => (
              <div key={i} className="text-center space-y-4 py-8">
                <b.icon className="h-8 w-8 mx-auto opacity-70" />
                <h3 className="text-lg font-extrabold uppercase tracking-wider">{b.title}</h3>
                <p className="text-sm opacity-60 max-w-xs mx-auto">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="produtos" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Shop</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Nossos Produtos
            </h2>
            <p className="text-base text-muted-foreground max-w-md mx-auto">
              Cada produto foi desenvolvido para uma etapa do cuidado com a pele tatuada.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Nenhum produto encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works / Routine */}
      <section id="como-funciona" className="section-padding bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Rotina</p>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-foreground">
                  3 passos para uma tatuagem perfeita.
                </h2>
              </div>
              <div className="space-y-8">
                {STEPS.map((step) => (
                  <div key={step.num} className="flex gap-5">
                    <span className="text-3xl font-extrabold text-muted-foreground/40 flex-shrink-0">{step.num}</span>
                    <div>
                      <h3 className="text-base font-extrabold uppercase tracking-wider text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src={routineImg} alt="Rotina Madbucks" loading="lazy" className="w-full h-[450px] object-cover rounded" width={1200} height={800} />
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img src={lifestyleImg} alt="Lifestyle Madbucks" loading="lazy" className="w-full h-[450px] object-cover rounded" width={1200} height={800} />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">Lifestyle</p>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-foreground">
                  Não é vaidade.<br />É respeito pela arte.
                </h2>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Quem tatua, escolhe. Escolhe o traço, a cor, o artista, o lugar no corpo. Cada tatuagem carrega uma história, uma decisão, um momento que ficou na pele.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Cuidar não é frescura. É manter vivo o que foi escolhido para ficar. A Madbucks existe para quem entende que tatuagem é arte — e arte se preserva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Dúvidas</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Perguntas Frequentes
            </h2>
          </div>
          <div className="space-y-0">
            {FAQS.map((faq, i) => (
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

      {/* Final CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Sua tatuagem vai agradecer.
          </h2>
          <p className="text-sm opacity-60 max-w-md mx-auto">
            Comece agora a rotina que vai manter suas tatuagens vivas por muito mais tempo.
          </p>
          <a href="#produtos" className="inline-flex items-center justify-center bg-background text-foreground px-10 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-background/90 transition-colors">
            Ver Produtos
          </a>
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

export default Index;
