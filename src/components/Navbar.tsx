import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-[0.15em] text-foreground hover:text-primary transition-colors">
          MADBUCKS
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
            Produtos
          </Link>
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};
