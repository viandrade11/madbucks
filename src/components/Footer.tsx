import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-madbucks.webp";

const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/madbucks.br", icon: InstagramIcon },
  { name: "TikTok", href: "https://www.tiktok.com/@madbucks.br", icon: TikTokIcon },
  { name: "WhatsApp", href: "http://wa.me/5511952133018", icon: WhatsAppIcon },
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}


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
