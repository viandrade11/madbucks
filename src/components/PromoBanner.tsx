import { Link } from "react-router-dom";
import { Gift, Percent, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const PROMOS = [
  {
    icon: Gift,
    tag: "Compre 2, Ganhe 1",
    title: "Sabonete Líquido Grátis",
    desc: "Na compra de 2 produtos, adicione o Sabonete Líquido Tattoo ao carrinho e aplique o cupom no checkout para recebê-lo gratuitamente.",
    code: "GANHE-SABONETE",
    cta: "Ver Produtos",
    href: "/collections",
  },
  {
    icon: Percent,
    tag: "Combo Especial",
    title: "15% no Hidratante",
    desc: "Adicione o Tattoo Balm e o Creme Hidratante ao carrinho e aplique o cupom para ganhar 15% no Hidratante. A dupla perfeita para sua rotina.",
    code: "COMBO15",
    cta: "Montar Combo",
    href: "/collections",
  },
];

export const PromoBanner = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
              ★ PROMOÇÕES DE MAIO ★
            </p>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground uppercase">
              Ofertas Por Tempo Limitado
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PROMOS.map((promo, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="border border-border rounded p-6 md:p-8 space-y-4 hover:border-foreground transition-colors bg-background">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                    <promo.icon className="h-5 w-5 text-background" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    {promo.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-2xl text-foreground uppercase">
                  {promo.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {promo.desc}
                </p>

                <div className="flex items-center gap-2 bg-muted/50 border border-border rounded px-3 py-2 w-fit">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cupom:</span>
                  <span className="text-sm font-extrabold text-foreground tracking-wider">{promo.code}</span>
                </div>

                <Link
                  to={promo.href}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground hover:underline"
                >
                  {promo.cta} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-center text-[10px] text-muted-foreground mt-6 uppercase tracking-wider">
            Válido até 30 de abril de 2026 · Cupons aplicados no checkout · Um uso por cliente
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
