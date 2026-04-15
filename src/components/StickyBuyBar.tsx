import { useEffect, useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/PriceDisplay";
import { motion, AnimatePresence } from "framer-motion";

interface StickyBuyBarProps {
  productTitle: string;
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string } | null;
  onAddToCart: () => void;
  isLoading: boolean;
  available: boolean;
  productImage?: string;
}

export const StickyBuyBar = ({ productTitle, price, compareAtPrice, onAddToCart, isLoading, available, productImage }: StickyBuyBarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerWidth < 768 ? 300 : 600;
      setVisible(window.scrollY > threshold);
    };
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
          className="fixed bottom-0 left-0 right-0 z-50 bg-foreground text-background border-t border-border/20 shadow-2xl"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="container mx-auto px-3 md:px-4 h-16 md:h-14 flex items-center justify-between gap-3">
            {/* Product info with thumbnail */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {productImage && (
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 border border-background/20">
                  <img src={productImage} alt={productTitle} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider truncate">{productTitle}</p>
                <PriceDisplay
                  amount={price.amount}
                  currencyCode={price.currencyCode}
                  compareAtAmount={compareAtPrice?.amount}
                  size="sm"
                  className="[&_span]:text-background [&_span.line-through]:text-background/50"
                />
              </div>
            </div>

            {/* CTA */}
            <Button
              size="sm"
              className="rounded-none text-[10px] uppercase tracking-[0.15em] font-bold gap-1.5 bg-background text-foreground hover:bg-background/90 flex-shrink-0 h-10 px-4 md:px-5"
              onClick={onAddToCart}
              disabled={isLoading || !available}
            >
              {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <ShoppingCart className="h-3 w-3" />}
              <span className="hidden sm:inline">Comprar Agora</span>
              <span className="sm:hidden">Comprar</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
