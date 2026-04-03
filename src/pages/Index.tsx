import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

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
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Madbucks Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="font-display text-6xl md:text-8xl tracking-[0.2em] text-foreground mb-4">
            MAD<span className="text-gradient">BUCKS</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8">
            Skincare para quem leva a tinta a sério. Proteja, hidrate e intensifique suas tatuagens.
          </p>
          <a
            href="#produtos"
            className="inline-block font-display text-sm tracking-[0.3em] border border-primary text-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            VER PRODUTOS
          </a>
        </div>
      </section>

      {/* Products */}
      <section id="produtos" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl tracking-[0.15em] text-foreground mb-3">
            NOSSOS <span className="text-gradient">PRODUTOS</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Desenvolvidos especialmente para a pele tatuada
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-display text-xl tracking-[0.15em] text-foreground mb-2">MADBUCKS</p>
          <p className="text-sm text-muted-foreground">Skincare para tatuados. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
