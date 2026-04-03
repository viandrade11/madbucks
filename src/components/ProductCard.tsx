import { Link } from "react-router-dom";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { node } = product;
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const firstVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho!", { position: "top-center" });
  };

  return (
    <Link to={`/produto/${node.handle}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_30px_-10px_hsl(82,85%,50%,0.2)]">
        <div className="aspect-square overflow-hidden bg-muted">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Sem imagem
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-display text-lg tracking-wider text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {node.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{node.description}</p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariant?.availableForSale}
              className="gap-1"
            >
              {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <ShoppingCart className="h-3 w-3" />}
              <span className="text-xs">Comprar</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
