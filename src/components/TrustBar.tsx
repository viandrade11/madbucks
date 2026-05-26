import { Star, Truck, ShieldCheck, Award } from "lucide-react";

interface TrustBarProps {
  className?: string;
}

export const TrustBar = ({ className = "" }: TrustBarProps) => (
  <div className={`border-y border-border py-4 ${className}`}>
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`h-3 w-3 ${s <= 4 ? "fill-amber-400 text-amber-400" : "fill-amber-400/60 text-amber-400/60"}`} />
            ))}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">4.8</span>
          <span className="text-[10px] text-muted-foreground hidden sm:inline">(127+)</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <Truck className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">Frete Grátis +R$199</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">Compra Segura</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">Dermatologicamente Testado</span>
        </div>
      </div>
    </div>
  </div>
);
