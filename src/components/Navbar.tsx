import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { SearchModal } from "./SearchModal";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown, User, Search } from "lucide-react";
import logoImg from "@/assets/logo-madbucks.webp";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Hardcoded Kit entry as fallback since it may not be published to Storefront API
  const KIT_FALLBACK: ShopifyProduct = {
    node: {
      id: "kit-tatuagem-perfeita",
      title: "Kit Tatuagem Perfeita",
      description: "A rotina completa em um só kit.",
      handle: "kit-tatuagem-perfeita",
      priceRange: { minVariantPrice: { amount: "0", currencyCode: "BRL" } },
      compareAtPriceRange: { minVariantPrice: { amount: "0", currencyCode: "BRL" } },
      images: { edges: [] },
      variants: { edges: [] },
      options: [],
    },
  };

  useEffect(() => {
    fetchProducts(10).then((fetched) => {
      const hasKit = fetched.some((p) => p.node.handle === "kit-tatuagem-perfeita");
      setProducts(hasKit ? fetched : [...fetched, KIT_FALLBACK]);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border" style={{ top: "var(--ticker-height, 0px)" }}>
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/">
          <img src={logoImg} alt="Madbucks - skincare premium para tatuagens" className="h-6 md:h-7" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              Produtos
              <ChevronDown className={`h-3 w-3 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
            </button>
            {productsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-background border border-border rounded shadow-lg py-2 z-50">
                {products.map((p) => (
                  <Link
                    key={p.node.id}
                    to={`/products/${p.node.handle}`}
                    onClick={() => setProductsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                  >
                    {p.node.images?.edges?.[0]?.node?.url && (
                      <img
                        src={p.node.images.edges[0].node.url}
                        alt={p.node.title}
                        className="w-8 h-8 rounded object-cover flex-shrink-0"
                      />
                    )}
                    <span className="text-xs font-semibold text-foreground">{p.node.title}</span>
                  </Link>
                ))}
                <div className="border-t border-border mt-1 pt-1">
                  <Link
                    to="/collections"
                    onClick={() => setProductsOpen(false)}
                    className="block px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Ver todos →
                  </Link>
                </div>
              </div>
            )}
          </div>
          <a href="/#como-funciona" className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            Como Funciona
          </a>
          <a href="/#faq" className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </a>
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
          <a
            href="https://madbucks-loja.myshopify.com/account"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Minha Conta"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="h-5 w-5" />
          </a>
          <CartDrawer />
        </div>
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
          <a
            href="https://madbucks-loja.myshopify.com/account"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Minha Conta"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="h-5 w-5" />
          </a>
          <CartDrawer />
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          <div>
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="flex items-center justify-between w-full text-sm font-semibold tracking-wider uppercase text-foreground"
            >
              Produtos
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileProductsOpen && (
              <div className="mt-2 ml-3 space-y-1 border-l border-border pl-3">
                {products.map((p) => (
                  <Link
                    key={p.node.id}
                    to={`/products/${p.node.handle}`}
                    onClick={() => { setOpen(false); setMobileProductsOpen(false); }}
                    className="flex items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {p.node.images?.edges?.[0]?.node?.url && (
                      <img src={p.node.images.edges[0].node.url} alt={p.node.title} className="w-6 h-6 rounded object-cover" />
                    )}
                    {p.node.title}
                  </Link>
                ))}
                <Link
                  to="/collections"
                  onClick={() => { setOpen(false); setMobileProductsOpen(false); }}
                  className="block py-2 mt-1 border-t border-border text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Ver Todos os Produtos →
                </Link>
              </div>
            )}
          </div>
          <a href="/#como-funciona" onClick={() => setOpen(false)} className="block text-sm font-semibold tracking-wider uppercase text-foreground">Como Funciona</a>
          <a href="/#faq" onClick={() => setOpen(false)} className="block text-sm font-semibold tracking-wider uppercase text-foreground">FAQ</a>
        </div>
      )}
    </nav>
  );
};
