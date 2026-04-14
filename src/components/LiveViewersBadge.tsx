import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const LiveViewersBadge = () => {
  const [viewers, setViewers] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Generate a realistic initial count
    const base = Math.floor(Math.random() * 15) + 8;
    setViewers(base);

    // Small delay before showing
    const showTimer = setTimeout(() => setVisible(true), 2500);

    // Fluctuate viewers periodically
    const interval = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return Math.max(5, Math.min(30, next));
      });
    }, 5000 + Math.random() * 5000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-20 left-4 z-40 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <Eye className="h-3.5 w-3.5" />
        <span>{viewers} pessoas vendo agora</span>
      </div>
    </div>
  );
};

export default LiveViewersBadge;
