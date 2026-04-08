import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-madbucks.webp";

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/madbucks.br", icon: InstagramIcon },
  { name: "TikTok", href: "https://www.tiktok.com/@madbucks.br", icon: TikTokIcon },
];

const FOOTER_LINKS = [
  { label: "Todos os Produtos", href: "/collections" },
  { label: "Sabonete Líquido", href: "/products/madbucks-sabonete-liquido-tattoo" },
  { label: "Creme Hidratante", href: "/products/madbucks-creme-hidratante-tattoo" },
  { label: "Balm Stick", href: "/products/madbucks-tattoo-balm-stick" },
  { label: "Tattoo Intensify", href: "/products/madbucks-tattoo-intensify" },
  { label: "Kit Completo", href: "/products/kit-tatuagem-perfeita" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.27 8.27 0 0 0 4.76 1.5v-3.5a4.84 4.84 0 0 1-1-.01z" />
    </svg>
  );
}

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/">
              <img src={logoImg} alt="Madbucks" className="h-5" />
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              A primeira linha brasileira de skincare desenvolvida exclusivamente para preservar, proteger e intensificar tatuagens.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">Produtos</p>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">Informações</p>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground">✦ Ingredientes Naturais</span>
              <span className="text-xs text-muted-foreground">✦ Livre de Crueldade Animal</span>
              <span className="text-xs text-muted-foreground">✦ Dermatologicamente Testado</span>
              <span className="text-xs text-muted-foreground">✦ Feito no Brasil</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} Madbucks. Todos os direitos reservados.
          </p>
          <p className="text-[10px] text-muted-foreground">
            Skincare para tatuados.
          </p>
        </div>
      </div>
    </footer>
  );
};
