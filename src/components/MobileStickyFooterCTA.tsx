import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const MobileStickyFooterCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/95 backdrop-blur border-t border-border md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        to="/collections"
        className="flex items-center justify-center w-full bg-foreground text-background py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors"
      >
        Ver Produtos
      </Link>
    </div>
  );
};
