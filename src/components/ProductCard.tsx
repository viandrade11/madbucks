import { Link } from "react-router-dom";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/PriceDisplay";
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
    <Link to={`/products/${node.handle}`} className="group block">
      <div className="overflow-hidden">
        <div className="aspect-square overflow-hidden bg-muted rounded">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              Sem imagem
            </div>
          )}
        </div>
        <div className="pt-4 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground group-hover:text-muted-foreground transition-colors">
            {node.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{node.description}</p>
          <div className="flex items-center justify-between pt-1">
            <PriceDisplay
              amount={firstVariant?.price.amount || "0"}
              currencyCode={firstVariant?.price.currencyCode || "BRL"}
              compareAtAmount={firstVariant?.compareAtPrice?.amount}
              size="sm"
            />
            <Button
              size="sm"
              variant="default"
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariant?.availableForSale}
              className="gap-1.5 rounded-none text-xs tracking-wider uppercase font-semibold h-8 px-4"
            >
              {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <ShoppingCart className="h-3 w-3" />}
              Comprar
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
