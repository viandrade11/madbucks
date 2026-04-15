import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, X, Loader2, TrendingUp } from "lucide-react";
import { fetchProducts, ShopifyProduct, formatPrice } from "@/lib/shopify";
import { PriceDisplay } from "@/components/PriceDisplay";

const POPULAR_SEARCHES = [
  { label: "Tattoo Balm - 50g", handle: "madbucks-tattoo-intensify" },
  { label: "Tattoo Balm Stick - 12g", handle: "madbucks-tattoo-balm-stick" },
  { label: "Creme Hidratante Tattoo - 200ml", handle: "madbucks-creme-hidratante-tattoo" },
  { label: "Sabonete Líquido Tattoo - 300ml", handle: "madbucks-sabonete-liquido-tattoo" },
  { label: "Kit Tatuagem Perfeita", handle: "kit-tatuagem-perfeita" },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Debounced search
  const search = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await fetchProducts(10, q.trim());
        setResults(data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    search(val);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-[calc(100%-2rem)] sm:w-full max-w-lg mt-16 sm:mt-24 mx-auto bg-background border border-border rounded shadow-2xl max-h-[70vh] flex flex-col animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Buscar produtos..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground flex-shrink-0" />}
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {query.trim().length < 2 ? (
            /* Popular searches */
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
                <TrendingUp className="h-3 w-3" /> Buscas populares
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((s) => (
                  <Link
                    key={s.handle}
                    to={`/products/${s.handle}`}
                    onClick={onClose}
                    className="px-3 py-1.5 border border-border text-xs font-semibold text-foreground hover:bg-muted transition-colors rounded-full"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">Nenhum resultado para "{query}"</p>
              <Link
                to="/collections"
                onClick={onClose}
                className="text-xs font-bold uppercase tracking-wider text-foreground hover:underline mt-2 inline-block"
              >
                Ver todos os produtos →
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((p) => {
                const image = p.node.images.edges[0]?.node;
                const variant = p.node.variants.edges[0]?.node;
                return (
                  <Link
                    key={p.node.id}
                    to={`/products/${p.node.handle}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 rounded hover:bg-muted transition-colors"
                  >
                    <div className="w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                      {image && (
                        <img src={image.url} alt={image.altText || p.node.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{p.node.title}</p>
                      {variant && (
                        <PriceDisplay
                          amount={variant.price.amount}
                          currencyCode={variant.price.currencyCode}
                          compareAtAmount={variant.compareAtPrice?.amount}
                          size="sm"
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
              <Link
                to="/collections"
                onClick={onClose}
                className="block text-center py-2 mt-2 border-t border-border text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Ver todos os produtos →
              </Link>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-border flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">ESC para fechar</span>
          <span className="text-[10px] text-muted-foreground">⌘K para buscar</span>
        </div>
      </div>
    </div>
  );
};
