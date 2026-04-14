import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

const FIRST_NAMES = [
  "Lucas", "Mariana", "Pedro", "Camila", "Rafael", "Juliana", "Bruno",
  "Fernanda", "Gustavo", "Beatriz", "Thiago", "Amanda", "Felipe",
  "Carolina", "Diego", "Larissa", "André", "Isabela", "Rodrigo", "Letícia",
];

const CITIES = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre",
  "Brasília", "Salvador", "Fortaleza", "Recife", "Florianópolis",
  "Goiânia", "Campinas", "Santos", "Natal", "Manaus",
];

const RecentPurchasePopup = () => {
  const [notification, setNotification] = useState<{ name: string; city: string; time: string } | null>(null);
  const [visible, setVisible] = useState(false);

  const generateNotification = () => {
    const name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const minutes = Math.floor(Math.random() * 55) + 5;
    return { name, city, time: `${minutes} min atrás` };
  };

  useEffect(() => {
    const show = () => {
      setNotification(generateNotification());
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    // First show after 6s
    const initial = setTimeout(show, 6000);

    // Then every 15–30s
    const interval = setInterval(show, 15000 + Math.random() * 15000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  if (!notification) return null;

  return (
    <div
      className={`fixed bottom-24 left-4 z-40 max-w-[280px] transition-all duration-500 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 pointer-events-none"
      }`}
    >
      <div className="bg-background border border-border rounded-lg shadow-xl p-3 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
          <ShoppingBag className="h-4 w-4 text-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-foreground leading-tight">
            {notification.name} de {notification.city}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            comprou há {notification.time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentPurchasePopup;
