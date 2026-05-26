import { Truck, Check } from "lucide-react";
import { formatPrice } from "@/lib/shopify";
import { Progress } from "@/components/ui/progress";

const FREE_SHIPPING_THRESHOLD = 199;

interface FreeShippingBarProps {
  totalPrice: number;
  currency?: string;
}

export const FreeShippingBar = ({ totalPrice, currency = "BRL" }: FreeShippingBarProps) => {
  const remaining = FREE_SHIPPING_THRESHOLD - totalPrice;
  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const qualified = remaining <= 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {qualified ? (
          <Check className="h-3.5 w-3.5 text-foreground flex-shrink-0" />
        ) : (
          <Truck className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
        )}
        <span className="text-xs font-bold text-foreground">
          {qualified
            ? "Parabéns! Você ganhou frete grátis 🎉"
            : `Faltam ${formatPrice(remaining.toString(), currency)} para frete grátis`}
        </span>
      </div>
      <Progress value={progress} className="h-1.5 bg-muted [&>div]:bg-foreground" />
    </div>
  );
};

export { FREE_SHIPPING_THRESHOLD };
