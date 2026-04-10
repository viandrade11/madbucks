import { Star } from "lucide-react";

interface SocialProofBadgeProps {
  rating?: number;
  reviewCount?: number;
  className?: string;
}

export const SocialProofBadge = ({ rating = 4.8, reviewCount = 127, className = "" }: SocialProofBadgeProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${star <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : star - rating < 1 ? "fill-amber-400/50 text-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
    <span className="text-xs font-bold text-foreground">{rating}</span>
    <span className="text-xs text-muted-foreground">({reviewCount} avaliações)</span>
  </div>
);
