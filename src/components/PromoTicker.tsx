import { useState, useEffect } from "react";
import { Gift, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

const BALM_STICK_HANDLE = "madbucks-tattoo-balm-stick";
const MESSAGE = "Leve 3, Pague 2 no Tattoo Balm Stick · Adicionar 3 ao carrinho";

export const PromoTicker = () => {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    document.documentElement.style.setProperty("--ticker-height", visible ? "32px" : "0px");
    return () => {
      document.documentElement.style.removeProperty("--ticker-height");
    };
  }, [visible]);

  if (!visible) return null;

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const product = await fetchProductByHandle(BALM_STICK_HANDLE);
      const variant = product?.variants?.edges?.[0]?.node;
      if (!product || !variant) {
        toast.error("Produto indisponível no momento");
        return;
      }
      await addItem({
        product: { node: product } as ShopifyProduct,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 3,
        selectedOptions: variant.selectedOptions || [],
      });
      toast.success("3 Balm Sticks adicionados — Leve 3, Pague 2");
    } catch (e) {
      console.error(e);
      toast.error("Não foi possível adicionar ao carrinho");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-foreground text-background">
      <div className="container mx-auto px-4 flex items-center justify-center gap-2 h-8 relative">
        <button
          onClick={handleClick}
          disabled={loading}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
          aria-label="Adicionar 3 Balm Sticks ao carrinho - Leve 3 Pague 2"
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 flex-shrink-0 animate-spin" />
          ) : (
            <Gift className="h-3.5 w-3.5 flex-shrink-0 opacity-70" />
          )}
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-center">
            {MESSAGE}
          </p>
        </button>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Fechar"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
