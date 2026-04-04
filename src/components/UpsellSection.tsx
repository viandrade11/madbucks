import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { PriceDisplay } from "@/components/PriceDisplay";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/ScrollReveal";

interface UpsellSectionProps {
  excludeHandle?: string;
  title?: string;
  compact?: boolean;
}

export const UpsellSection = ({
  excludeHandle,
  title = "Você também vai gostar",
  compact = false,
}: UpsellSectionProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetchProducts(10)
      .then((data) => {
        const filtered = excludeHandle
          ? data.filter((p) => p.node.handle !== excludeHandle)
          : data;
        setProducts(filtered.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [excludeHandle]);

  const handleAdd = async (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    setAddingId(variant.id);
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho!", { position: "top-center" });
    setAddingId(null);
  };

  if (loading) return null;
  if (products.length === 0) return null;

  if (compact) {
    return (
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-foreground">
          {title}
        </p>
        <div className="space-y-2">
          {products.map((p) => {
            const variant = p.node.variants.edges[0]?.node;
            const image = p.node.images.edges[0]?.node;
            if (!variant) return null;
            return (
              <div
                key={p.node.id}
                className="flex items-center gap-3 border border-border rounded p-2 hover:border-foreground/50 transition-colors"
              >
                <Link
                  to={`/produto/${p.node.handle}`}
                  className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-muted"
                >
                  {image && (
                    <img
                      src={image.url}
                      alt={image.altText || p.node.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/produto/${p.node.handle}`}
                    className="text-xs font-bold text-foreground truncate block hover:underline"
                  >
                    {p.node.title}
                  </Link>
                  <PriceDisplay
                    amount={variant.price.amount}
                    currencyCode={variant.price.currencyCode}
                    compareAtAmount={variant.compareAtPrice?.amount}
                    size="sm"
                  />
                </div>
                <button
                  onClick={() => handleAdd(p)}
                  disabled={addingId === variant.id || !variant.availableForSale}
                  className="flex items-center gap-1 bg-foreground text-background px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider hover:bg-foreground/90 transition-colors flex-shrink-0 disabled:opacity-50"
                >
                  {addingId === variant.id ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Plus className="h-3 w-3" />
                  )}
                  Adicionar
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Recomendados
            </p>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground">
              {title}
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {products.map((p, i) => {
            const variant = p.node.variants.edges[0]?.node;
            const image = p.node.images.edges[0]?.node;
            if (!variant) return null;
            return (
              <ScrollReveal key={p.node.id} delay={i * 0.1}>
                <div className="border border-border rounded overflow-hidden hover:border-foreground transition-colors group">
                  <Link
                    to={`/produto/${p.node.handle}`}
                    className="block aspect-square bg-muted overflow-hidden"
                  >
                    {image && (
                      <img
                        src={image.url}
                        alt={image.altText || p.node.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    )}
                  </Link>
                  <div className="p-4 space-y-2">
                    <Link
                      to={`/produto/${p.node.handle}`}
                      className="text-sm font-extrabold text-foreground group-hover:underline block"
                    >
                      {p.node.title}
                    </Link>
                    <PriceDisplay
                      amount={variant.price.amount}
                      currencyCode={variant.price.currencyCode}
                      compareAtAmount={variant.compareAtPrice?.amount}
                      size="sm"
                    />
                    <button
                      onClick={() => handleAdd(p)}
                      disabled={addingId === variant.id || !variant.availableForSale}
                      className="w-full flex items-center justify-center gap-1.5 bg-foreground text-background py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-foreground/90 transition-colors mt-2 disabled:opacity-50"
                    >
                      {addingId === variant.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Plus className="h-3 w-3" />
                      )}
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
