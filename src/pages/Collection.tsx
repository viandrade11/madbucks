import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { PromoTicker } from "@/components/PromoTicker";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Footer } from "@/components/Footer";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, Shield, Droplets, Sun, Sparkles, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo-madbucks.webp";

const DIFFERENTIALS = [
  { icon: Shield, title: "Proteção Contra Desbotamento", desc: "Ingredientes ativos que formam uma barreira contra raios UV e agressores ambientais que degradam a tinta na pele." },
  { icon: Droplets, title: "Hidratação de Camada Profunda", desc: "Fórmulas que penetram além da epiderme, atingindo a camada dérmica onde a tinta está depositada." },
  { icon: Sun, title: "Intensificação de Cores", desc: "Tecnologia exclusiva que realça a vibração e o contraste das cores da sua tatuagem." },
  { icon: Sparkles, title: "Ingredientes Premium Naturais", desc: "100% natural e livre de crueldade animal. Sem parabenos, sem sulfatos, sem petrolatos. Dermatologicamente testado." },
];

const SKIN_FACTS = [
  { stat: "40%", label: "da tinta é perdida nos primeiros 2 anos sem cuidado adequado" },
  { stat: "3x", label: "mais rápido a pele tatuada desidrata vs. pele sem tatuagem" },
  { stat: "72%", label: "dos tatuados não usam produtos específicos para sua pele" },
  { stat: "100%", label: "dos nossos ingredientes são naturais e livres de crueldade animal" },
];

const FILTERS = [
  { key: "todos", label: "Todos" },
  { key: "limpeza", label: "Limpeza" },
  { key: "hidratacao", label: "Hidratação" },
  { key: "intensificacao", label: "Intensificação" },
  { key: "kit", label: "Kits" },
];

const PRODUCT_CATEGORIES: Record<string, string> = {
  "madbucks-sabonete-liquido-tattoo": "limpeza",
  "madbucks-creme-hidratante-tattoo": "hidratacao",
  "madbucks-tattoo-balm-stick": "hidratacao,intensificacao",
  "madbucks-tattoo-intensify": "intensificacao",
  "kit-tatuagem-perfeita": "kit",
};

const FAQ_ITEMS = [
  { q: "Os produtos Madbucks podem ser usados em tatuagens recém-feitas?", a: "Nossos produtos são formulados para tatuagens já cicatrizadas. Para tatuagens recém-feitas, siga as orientações do seu tatuador durante o período de cicatrização (geralmente 2-4 semanas) antes de iniciar a rotina Madbucks." },
  { q: "Qual a diferença entre o Creme Hidratante e o Balm Stick?", a: "O Creme Hidratante oferece hidratação profunda para áreas maiores com absorção rápida. O Balm Stick é mais concentrado e portátil, ideal para retoques rápidos e áreas menores ao longo do dia." },
  { q: "Os produtos funcionam em todos os tipos de pele?", a: "Sim! Nossa linha é dermatologicamente testada e formulada para todos os tipos de pele — oleosa, seca, mista ou sensível. Todos os ingredientes são naturais e livres de parabenos, sulfatos e petrolatos." },
  { q: "Com que frequência devo usar os produtos?", a: "Todos os produtos Madbucks são de uso diário. A rotina completa é simples: 1) Limpe com o Sabonete Líquido no banho, 2) Hidrate com o Creme Hidratante ou Balm Stick pela manhã e à noite, 3) Finalize com o Tattoo Balm ou Balm Stick para intensificar e proteger as cores da sua tatuagem." },
  { q: "Os produtos realmente fazem diferença na tatuagem?", a: "Sim. A pele tatuada perde até 40% da tinta nos primeiros 2 anos sem cuidado adequado. Nossos ingredientes ativos foram desenvolvidos especificamente para hidratar a camada dérmica onde a tinta está depositada, preservando cores e contraste." },
  { q: "Posso usar hidratante comum na minha tatuagem?", a: "Hidratantes genéricos oferecem apenas hidratação superficial e podem conter ingredientes como álcool e fragrâncias que aceleram o desbotamento. A Madbucks foi formulada para atingir a camada dérmica e proteger especificamente a tinta na pele." },
];

const Collection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("todos");

  useEffect(() => {
    fetchProducts(20)
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = activeFilter === "todos"
    ? products
    : products.filter((p) => {
        const categories = PRODUCT_CATEGORIES[p.node.handle]?.split(",") ?? [];
        // Fallback: detecta kits automaticamente por handle/título quando não mapeados
        if (activeFilter === "kit") {
          const handle = p.node.handle.toLowerCase();
          const title = p.node.title.toLowerCase();
          if (handle.includes("kit") || title.includes("kit") || categories.includes("kit")) return true;
          return false;
        }
        return categories.includes(activeFilter);
      });

  const kitProduct = products.find((p) => p.node.handle === "kit-tatuagem-perfeita");

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Coleção Completa de Skincare para Tatuagens"
        description="Linha completa Madbucks: sabonete, hidratante, balm stick, intensificador e kit. Skincare natural para cuidar da sua tatuagem."
        canonical="/collections"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Coleção Madbucks — Skincare para Tatuagens",
            "description": "Linha completa de skincare para preservar, proteger e intensificar tatuagens. Produtos naturais, livres de crueldade animal e dermatologicamente testados.",
            "url": "https://madbucks.lovable.app/collections",
            "publisher": { "@type": "Organization", "name": "Madbucks" },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": filteredProducts.length,
              "itemListElement": filteredProducts.map((p, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": p.node.title,
                "url": `https://madbucks.lovable.app/products/${p.node.handle}`
              }))
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://madbucks.lovable.app/" },
              { "@type": "ListItem", "position": 2, "name": "Coleção", "item": "https://madbucks.lovable.app/collections" }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQ_ITEMS.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": { "@type": "Answer", "text": faq.a }
            }))
          }
        ]}
      />
      <PromoTicker />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative" style={{ paddingTop: "calc(56px + var(--ticker-height, 0px))" }}>
        <div className="bg-foreground text-background py-16 md:py-24">
          <div className="container mx-auto px-4 text-center space-y-4">
            <ScrollReveal>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Tattoo Skincare Premium</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight">Todos os Produtos</h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-sm md:text-base opacity-70 max-w-xl mx-auto leading-relaxed">
                A primeira linha de skincare brasileira desenvolvida exclusivamente para preservar, proteger e intensificar tatuagens.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-border py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">✦ Cruelty Free</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">✦ Dermatologicamente Testado</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">✦ Feito no Brasil</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">✦ Ingredientes Naturais</span>
          </div>
        </div>
      </section>

      {/* Kit Highlight Banner */}
      {kitProduct && (
        <section className="py-10">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <Link
                to={`/products/${kitProduct.node.handle}`}
                className="block border border-border hover:border-foreground transition-colors group"
              >
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-6 p-6 md:p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0">
                      <Gift className="h-6 w-6" />
                    </div>
                    {kitProduct.node.images?.edges?.[0]?.node && (
                      <img
                        src={kitProduct.node.images.edges[0].node.url}
                        alt={kitProduct.node.title}
                        className="w-20 h-20 object-cover rounded hidden md:block"
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">★ Destaque</p>
                    <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight text-foreground group-hover:underline">
                      {kitProduct.node.title}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-lg">
                      A rotina completa em um só kit. 4 produtos essenciais com economia de ~20% vs. compra individual.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center justify-center bg-foreground text-background px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] group-hover:bg-foreground/90 transition-colors">
                      Ver Kit
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Product Grid with Filters */}
      <section className="section-padding" id="grid">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Coleção Completa</p>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-foreground">
                Escolha o produto ideal para sua rotina
              </h2>
            </div>
          </ScrollReveal>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] border transition-colors ${
                  activeFilter === filter.key
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-foreground border-border hover:border-foreground"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">Nenhum produto encontrado nesta categoria.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.node.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Madbucks — Stats */}
      <section className="section-padding bg-foreground text-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">Por que skincare para tatuagem?</p>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight">A pele tatuada precisa de cuidados específicos</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {SKIN_FACTS.map((fact, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center space-y-2">
                  <p className="font-display text-4xl md:text-5xl">{fact.stat}</p>
                  <p className="text-sm opacity-60 max-w-[200px] mx-auto">{fact.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Diferenciais</p>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-foreground">O que torna a Madbucks diferente</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {DIFFERENTIALS.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="border border-border p-6 space-y-3">
                  <item.icon className="h-6 w-6 text-foreground" />
                  <h3 className="font-display text-lg uppercase tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparative Table */}
      <ComparisonTable />

      {/* How to Build Your Routine */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Rotina</p>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-foreground">Monte sua rotina em 3 passos</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { num: "01", title: "Limpe", desc: "Use o Sabonete Líquido Tattoo para remover impurezas sem agredir a pele. Movimentos suaves, água morna.", handle: "madbucks-sabonete-liquido-tattoo" },
              { num: "02", title: "Hidrate", desc: "Aplique o Creme Hidratante ou o Balm Stick na área tatuada. Massageie até a completa absorção.", handle: "madbucks-creme-hidratante-tattoo" },
              { num: "03", title: "Intensifique", desc: "Finalize com o Tattoo Intensify para realçar as cores e criar uma camada protetora duradoura.", handle: "madbucks-tattoo-intensify" },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <a href={`/products/${step.handle}`} className="block text-center space-y-3 group">
                  <span className="font-display text-5xl text-muted-foreground/30">{step.num}</span>
                  <h3 className="font-display text-xl uppercase tracking-tight text-foreground group-hover:underline">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Dúvidas Frequentes</p>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-foreground">Perguntas & Respostas</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {FAQ_ITEMS.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                    <AccordionTrigger className="text-sm font-bold text-foreground text-left hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container mx-auto px-4 text-center space-y-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight">Sua tatuagem merece o melhor cuidado</h2>
            <p className="text-sm opacity-60 max-w-md mx-auto">Produtos desenvolvidos por especialistas, testados por tatuados.</p>
            <a href="#grid" className="inline-flex items-center justify-center bg-background text-foreground px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-background/90 transition-colors mt-2">
              Comprar Agora
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collection;
