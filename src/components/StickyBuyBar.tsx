import { useEffect, useState } from "react";
import { ShoppingCart, Loader2, Star } from "lucide-react";
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
}

export const StickyBuyBar = ({ productTitle, price, compareAtPrice, onAddToCart, isLoading, available }: StickyBuyBarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show earlier on mobile (300px) vs desktop (600px)
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
        >
          <div className="container mx-auto px-4 py-2 md:py-0 md:h-14 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
            <div className="flex items-center gap-3 min-w-0 w-full md:w-auto justify-between md:justify-start">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider truncate hidden sm:inline">{productTitle}</span>
                <PriceDisplay
                  amount={price.amount}
                  currencyCode={price.currencyCode}
                  compareAtAmount={compareAtPrice?.amount}
                  size="sm"
                  className="[&_span]:text-background [&_span.line-through]:text-background/50"
                />
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {[1,2,3,4,5].map(s => <Star key={s} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />)}
                <span className="text-[10px] text-background/60 ml-1">127</span>
              </div>
            </div>
            <Button
              size="sm"
              className="rounded-none text-[10px] uppercase tracking-[0.2em] font-bold gap-1.5 bg-background text-foreground hover:bg-background/90 flex-shrink-0 h-10 md:h-9 px-6 md:px-5 w-full md:w-auto"
              onClick={onAddToCart}
              disabled={isLoading || !available}
            >
              {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <ShoppingCart className="h-3 w-3" />}
              Comprar Agora
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
