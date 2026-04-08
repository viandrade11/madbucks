import { Check, X } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const COMPARISON = [
  { feature: "Formulado para pele tatuada", madbucks: true, generic: false },
  { feature: "Hidratação na camada dérmica", madbucks: true, generic: false },
  { feature: "Proteção contra desbotamento", madbucks: true, generic: false },
  { feature: "Intensifica cores da tatuagem", madbucks: true, generic: false },
  { feature: "Ingredientes naturais", madbucks: true, generic: false },
  { feature: "Sem parabenos e sulfatos", madbucks: true, generic: false },
  { feature: "Rotina completa de cuidados", madbucks: true, generic: false },
  { feature: "Hidratação básica", madbucks: true, generic: true },
];

export const ComparisonTable = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Comparativo</p>
            <h2 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-foreground">
              Madbucks vs. Hidratantes Genéricos
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Entenda por que produtos comuns não são suficientes para quem tem tatuagem.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="max-w-2xl mx-auto border border-border overflow-hidden">
            <div className="grid grid-cols-3 bg-foreground text-background">
              <div className="p-4 text-xs font-bold uppercase tracking-wider">Característica</div>
              <div className="p-4 text-xs font-bold uppercase tracking-wider text-center">Madbucks</div>
              <div className="p-4 text-xs font-bold uppercase tracking-wider text-center">Genérico</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 border-t border-border ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>
                <div className="p-4 text-sm text-foreground font-medium">{row.feature}</div>
                <div className="p-4 flex justify-center">
                  {row.madbucks ? <Check className="h-5 w-5 text-foreground" /> : <X className="h-5 w-5 text-muted-foreground" />}
                </div>
                <div className="p-4 flex justify-center">
                  {row.generic ? <Check className="h-5 w-5 text-foreground" /> : <X className="h-5 w-5 text-muted-foreground" />}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
