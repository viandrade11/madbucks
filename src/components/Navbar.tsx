import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-lg font-extrabold tracking-[0.2em] uppercase text-foreground">
          MADBUCKS
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#produtos" className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            Produtos
          </a>
          <a href="#como-funciona" className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            Como Funciona
          </a>
          <a href="#faq" className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </a>
          <CartDrawer />
        </div>
        <div className="flex md:hidden items-center gap-3">
          <CartDrawer />
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          <a href="#produtos" onClick={() => setOpen(false)} className="block text-sm font-semibold tracking-wider uppercase text-foreground">Produtos</a>
          <a href="#como-funciona" onClick={() => setOpen(false)} className="block text-sm font-semibold tracking-wider uppercase text-foreground">Como Funciona</a>
          <a href="#faq" onClick={() => setOpen(false)} className="block text-sm font-semibold tracking-wider uppercase text-foreground">FAQ</a>
        </div>
      )}
    </nav>
  );
};
