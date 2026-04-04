import { formatPrice } from "@/lib/shopify";

interface PriceDisplayProps {
  amount: string;
  currencyCode: string;
  compareAtAmount?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const PriceDisplay = ({
  amount,
  currencyCode,
  compareAtAmount,
  className = "",
  size = "md",
}: PriceDisplayProps) => {
  const hasDiscount =
    compareAtAmount &&
    parseFloat(compareAtAmount) > 0 &&
    parseFloat(compareAtAmount) > parseFloat(amount);

  const sizeClasses = {
    sm: { price: "text-sm font-bold", compare: "text-xs" },
    md: { price: "text-2xl font-extrabold", compare: "text-sm" },
    lg: { price: "text-3xl font-extrabold", compare: "text-base" },
  };

  const s = sizeClasses[size];

  if (!hasDiscount) {
    return (
      <span className={`${s.price} text-foreground ${className}`}>
        {formatPrice(amount, currencyCode)}
      </span>
    );
  }

  const discount = Math.round(
    ((parseFloat(compareAtAmount) - parseFloat(amount)) / parseFloat(compareAtAmount)) * 100
  );

  return (
    <div className={`flex items-baseline gap-2 flex-wrap ${className}`}>
      <span className={`${s.price} text-foreground`}>
        {formatPrice(amount, currencyCode)}
      </span>
      <span className={`${s.compare} text-muted-foreground line-through`}>
        {formatPrice(compareAtAmount, currencyCode)}
      </span>
      {discount >= 5 && (
        <span className="text-[10px] font-bold uppercase tracking-wider bg-foreground text-background px-2 py-0.5">
          -{discount}%
        </span>
      )}
    </div>
  );
};
