import { useEffect, useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/shopify";
import { motion, AnimatePresence } from "framer-motion";

interface StickyBuyBarProps {
  productTitle: string;
  price: { amount: string; currencyCode: string };
  onAddToCart: () => void;
  isLoading: boolean;
  available: boolean;
}

export const StickyBuyBar = ({ productTitle, price, onAddToCart, isLoading, available }: StickyBuyBarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-foreground text-background border-t border-border/20 shadow-lg"
        >
          <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider truncate">{productTitle}</span>
              <span className="text-xs font-bold opacity-70 flex-shrink-0">
                {formatPrice(price.amount, price.currencyCode)}
              </span>
            </div>
            <Button
              size="sm"
              className="rounded-none text-[10px] uppercase tracking-[0.2em] font-bold gap-1.5 bg-background text-foreground hover:bg-background/90 flex-shrink-0 h-9 px-5"
              onClick={onAddToCart}
              disabled={isLoading || !available}
            >
              {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <ShoppingCart className="h-3 w-3" />}
              Comprar
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
