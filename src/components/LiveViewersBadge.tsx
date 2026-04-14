import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

const LiveViewersBadge = () => {
  const [purchases, setPurchases] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const base = Math.floor(Math.random() * 12) + 8;
    const mins = Math.floor(Math.random() * 20) + 10;
    setPurchases(base);
    setMinutes(mins);

    const showTimer = setTimeout(() => setVisible(true), 2500);

    const interval = setInterval(() => {
      setPurchases((prev) => {
        const delta = Math.random() > 0.4 ? 1 : -1;
        return Math.max(5, Math.min(25, prev + delta));
      });
      setMinutes((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(10, Math.min(30, prev + delta));
      });
    }, 8000 + Math.random() * 7000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 md:bottom-6 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom, 0px) + 4.5rem)" }}
    >
      <div className="flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <ShoppingBag className="h-3.5 w-3.5" />
        <span>{purchases} compras nos últimos {minutes} min</span>
      </div>
    </div>
  );
};

export default LiveViewersBadge;
