import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { ArrowLeft } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface CrossSellItem {
  handle: string;
  title: string;
  step: string;
  desc: string;
}

interface CrossSellGridProps {
  items: CrossSellItem[];
}

export const CrossSellGrid = ({ items }: CrossSellGridProps) => {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    items.forEach((item) => {
      fetchProductByHandle(item.handle)
        .then((p) => {
          if (p?.images?.edges?.[0]?.node?.url) {
            setImages((prev) => ({ ...prev, [item.handle]: p.images.edges[0].node.url }));
          }
        })
        .catch(() => {});
    });
  }, [items]);

  return (
    <div className={`grid grid-cols-1 ${items.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} gap-6 max-w-5xl mx-auto`}>
      {items.map((item, i) => (
        <ScrollReveal key={item.handle} delay={i * 0.1}>
          <Link
            to={`/produto/${item.handle}`}
            className="border border-border rounded overflow-hidden hover:border-foreground transition-colors group block"
          >
            <div className="aspect-square bg-muted overflow-hidden">
              {images[item.handle] ? (
                <img
                  src={images[item.handle]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                  Carregando...
                </div>
              )}
            </div>
            <div className="p-4 text-center space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">{item.step}</p>
              <h3 className="text-sm font-extrabold text-foreground group-hover:underline">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
              <span className="text-xs font-bold uppercase tracking-wider text-foreground inline-flex items-center gap-1 pt-1">
                Ver produto <ArrowLeft className="h-3 w-3 rotate-180" />
              </span>
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
};
