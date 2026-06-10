import { useState, useEffect } from "react";
import { Tag, X, Loader2, Check } from "lucide-react";
import { toast } from "sonner";


const MESSAGE = "USE O CUPOM NAMORADOS5 PARA 5% DE DESCONTO";
const COUPON_CODE = "NAMORADOS5";

export const PromoTicker = () => {
  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--ticker-height", visible ? "32px" : "0px");
    return () => {
      document.documentElement.style.removeProperty("--ticker-height");
    };
  }, [visible]);

  if (!visible) return null;

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      toast.success("Cupom copiado: " + COUPON_CODE);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
      toast.error("Não foi possível copiar o cupom");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-foreground text-background">
      <div className="container mx-auto px-4 flex items-center justify-center gap-2 h-8 relative">
        <button
          onClick={handleClick}
          disabled={loading}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
          aria-label="Copiar cupom ARRAIA5"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 flex-shrink-0 text-green-500" />
          ) : (
            <Tag className="h-3.5 w-3.5 flex-shrink-0 opacity-70" />
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
