import { useEffect, useState, useCallback } from "react";
import { Eye, ShoppingBag, Flame, TrendingUp, ShoppingCart } from "lucide-react";

/* ── Data pools ── */
const NAMES = [
  "Lucas", "Mariana", "Pedro", "Camila", "Rafael", "Juliana", "Bruno",
  "Fernanda", "Gustavo", "Beatriz", "Thiago", "Amanda", "Felipe",
  "Carolina", "Diego", "Larissa", "André", "Isabela", "Rodrigo", "Letícia",
];

const CITIES = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre",
  "Brasília", "Salvador", "Fortaleza", "Recife", "Florianópolis",
  "Goiânia", "Campinas", "Santos", "Natal", "Manaus",
];

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/* ── Notification types ── */
type FomoType = "viewers" | "purchase" | "stock" | "sold" | "cart";

interface FomoData {
  type: FomoType;
  icon: React.ReactNode;
  line1: string;
  line2: string;
}

const generateNotification = (): FomoData => {
  const types: FomoType[] = ["viewers", "purchase", "stock", "sold", "cart"];
  const type = pick(types);

  switch (type) {
    case "viewers":
      return {
        type,
        icon: <Eye className="h-4 w-4" />,
        line1: `${rand(12, 28)} pessoas vendo agora`,
        line2: "Produto em alta demanda",
      };
    case "purchase": {
      const name = pick(NAMES);
      const city = pick(CITIES);
      return {
        type,
        icon: <ShoppingBag className="h-4 w-4" />,
        line1: `${name} de ${city}`,
        line2: `comprou há ${rand(2, 45)} min`,
      };
    }
    case "stock":
      return {
        type,
        icon: <Flame className="h-4 w-4" />,
        line1: `Últimas ${rand(3, 12)} unidades`,
        line2: "Estoque limitado — garanta o seu",
      };
    case "sold":
      return {
        type,
        icon: <TrendingUp className="h-4 w-4" />,
        line1: "+10 mil unidades vendidas",
        line2: "Produto mais vendido da Madbucks",
      };
    case "cart": {
      const name = pick(NAMES);
      return {
        type,
        icon: <ShoppingCart className="h-4 w-4" />,
        line1: `${name} adicionou ao carrinho`,
        line2: `há ${rand(1, 8)} min`,
      };
    }
  }
};

const FomoNotifications = () => {
  const [data, setData] = useState<FomoData | null>(null);
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setData(generateNotification());
    setVisible(true);
    setTimeout(() => setVisible(false), 4500);
  }, []);

  useEffect(() => {
    const initial = setTimeout(show, 5000);
    const interval = setInterval(show, 12000 + Math.random() * 10000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [show]);

  if (!data) return null;

  return (
    <div
      className={`fixed bottom-20 left-4 z-40 max-w-[280px] transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      style={{ bottom: "max(5rem, env(safe-area-inset-bottom, 0px) + 5rem)" }}
    >
      <div className="bg-foreground text-background rounded-lg shadow-xl px-4 py-3 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-background/15 flex items-center justify-center flex-shrink-0 mt-0.5">
          {data.icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold leading-tight">{data.line1}</p>
          <p className="text-[10px] opacity-70 mt-0.5">{data.line2}</p>
        </div>
      </div>
    </div>
  );
};

export default FomoNotifications;
