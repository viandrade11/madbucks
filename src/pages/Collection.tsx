import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Loader2, Shield, Droplets, Sun, Sparkles, Check, X } from "lucide-react";
import logoImg from "@/assets/logo-madbucks.png";

const DIFFERENTIALS = [
  {
    icon: Shield,
    title: "Proteção Contra Desbotamento",
    desc: "Ingredientes ativos que formam uma barreira contra raios UV e agressores ambientais que degradam a tinta na pele.",
  },
  {
    icon: Droplets,
    title: "Hidratação de Camada Profunda",
    desc: "Fórmulas que penetram além da epiderme, atingindo a camada dérmica onde a tinta está depositada.",
  },
  {
    icon: Sun,
    title: "Intensificação de Cores",
    desc: "Tecnologia exclusiva que realça a vibração e o contraste das cores da sua tatuagem.",
  },
  {
    icon: Sparkles,
    title: "Ingredientes Premium Veganos",
    desc: "100% vegano e cruelty-free. Sem parabenos, sem sulfatos, sem petrolatos. Dermatologicamente testado.",
  },
];

const COMPARISON = [
  { feature: "Formulado para pele tatuada", madbucks: true, generic: false },
  { feature: "Hidratação na camada dérmica", madbucks: true, generic: false },
  { feature: "Proteção contra desbotamento", madbucks: true, generic: false },
  { feature: "Intensifica cores da tatuagem", madbucks: true, generic: false },
  { feature: "Ingredientes veganos", madbucks: true, generic: false },
  { feature: "Sem parabenos e sulfatos", madbucks: true, generic: false },
  { feature: "Rotina completa de cuidados", madbucks: true, generic: false },
  { feature: "Hidratação básica", madbucks: true, generic: true },
];

const SKIN_FACTS = [
  { stat: "40%", label: "da tinta é perdida nos primeiros 2 anos sem cuidado adequado" },
  { stat: "3x", label: "mais rápido a pele tatuada desidrata vs. pele sem tatuagem" },
  { stat: "72%", label: "dos tatuados não usam produtos específicos para sua pele" },
  { stat: "100%", label: "dos nossos ingredientes são veganos e cruelty-free" },
];

const Collection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(20)
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-14">
        <div className="bg-foreground text-background py-16 md:py-24">
          <div className="container mx-auto px-4 text-center space-y-4">
            <ScrollReveal>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
                Tattoo Skincare Premium
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight">
                Todos os Produtos
              </h1>
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
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">✦ Vegano</span>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding" id="grid">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Coleção Completa</p>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-foreground">
                Escolha o produto ideal para sua rotina
              </h2>
            </div>
          </ScrollReveal>
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {products.map((product, i) => (
                <ScrollReveal key={product.node.id} delay={i * 0.05}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Madbucks — Stats */}
      <section className="section-padding bg-foreground text-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">Por que skincare para tatuagem?</p>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight">
                A pele tatuada precisa de cuidados específicos
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {SKIN_FACTS.map((fact, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center space-y-2">
                  <p className="font-display text-4xl md:text-5xl">{fact.stat}</p>
                  <p className="text-sm opacity-60 max-w-[180px] mx-auto">{fact.label}</p>
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
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-foreground">
                O que torna a Madbucks diferente
              </h2>
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
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Comparativo</p>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-foreground">
                Madbucks vs. Hidratantes Genéricos
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                Entenda por que produtos comuns não são suficientes para quem tem tatuagem.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="max-w-2xl mx-auto border border-border overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-foreground text-background">
                <div className="p-4 text-xs font-bold uppercase tracking-wider">Característica</div>
                <div className="p-4 text-xs font-bold uppercase tracking-wider text-center">Madbucks</div>
                <div className="p-4 text-xs font-bold uppercase tracking-wider text-center">Genérico</div>
              </div>
              {/* Rows */}
              {COMPARISON.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 border-t border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>
                  <div className="p-4 text-sm text-foreground font-medium">{row.feature}</div>
                  <div className="p-4 flex justify-center">
                    {row.madbucks ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="p-4 flex justify-center">
                    {row.generic ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How to Build Your Routine */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Rotina</p>
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-foreground">
                Monte sua rotina em 3 passos
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { num: "01", title: "Limpe", desc: "Use o Sabonete Líquido Tattoo para remover impurezas sem agredir a pele. Movimentos suaves, água morna.", handle: "madbucks-sabonete-liquido-tattoo-69667a03eaf59" },
              { num: "02", title: "Hidrate", desc: "Aplique o Creme Hidratante ou o Balm Stick na área tatuada. Massageie até a completa absorção.", handle: "madbucks-creme-hidratante-tattoo-69667a5124762" },
              { num: "03", title: "Intensifique", desc: "Finalize com o Tattoo Intensify para realçar as cores e criar uma camada protetora duradoura.", handle: "madbucks-tattoo-intensify" },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <a href={`/produto/${step.handle}`} className="block text-center space-y-3 group">
                  <span className="font-display text-5xl text-muted-foreground/30">{step.num}</span>
                  <h3 className="font-display text-xl uppercase tracking-tight text-foreground group-hover:underline">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container mx-auto px-4 text-center space-y-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight">
              Sua tatuagem merece o melhor cuidado
            </h2>
            <p className="text-sm opacity-60 max-w-md mx-auto">
              Produtos desenvolvidos por especialistas, testados por tatuados.
            </p>
            <a
              href="#grid"
              className="inline-flex items-center justify-center bg-background text-foreground px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-background/90 transition-colors"
            >
              Comprar Agora
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <img src={logoImg} alt="Madbucks" className="h-5" />
            <p className="text-xs text-muted-foreground">Skincare para tatuados. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Collection;
