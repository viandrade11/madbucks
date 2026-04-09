import { Gift, Percent } from "lucide-react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const MESSAGES = [
  { icon: Gift, text: "Compre 2 produtos e ganhe o Sabonete Líquido · Cupom GANHE-SABONETE" },
  { icon: Percent, text: "Leve o Balm + Hidratante e ganhe 15% no Hidratante · Cupom COMBO15" },
];

export const PromoTicker = () => {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((c) => (c + 1) % MESSAGES.length), 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (visible) {
      document.documentElement.style.setProperty("--ticker-height", "32px");
    } else {
      document.documentElement.style.setProperty("--ticker-height", "0px");
    }
    return () => document.documentElement.style.removeProperty("--ticker-height");
  }, [visible]);

  if (!visible) return null;

  const msg = MESSAGES[current];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-foreground text-background">
      <div className="container mx-auto px-4 flex items-center justify-center gap-2 h-8 relative">
        <msg.icon className="h-3.5 w-3.5 flex-shrink-0 opacity-70" />
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-center">
          {msg.text}
        </p>
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
