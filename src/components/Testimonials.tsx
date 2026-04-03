import { Star } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  product?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Lucas M.",
    location: "São Paulo, SP",
    text: "Tenho tattoo há 8 anos e nunca tinha visto ela tão viva. Depois de 2 semanas usando o Intensify, parece que acabei de sair do estúdio.",
    rating: 5,
    product: "Tattoo Intensify",
  },
  {
    name: "Camila R.",
    location: "Rio de Janeiro, RJ",
    text: "O Balm Stick é meu companheiro de academia. Aplico antes do treino e a tattoo fica protegida o dia todo. Formato prático demais.",
    rating: 5,
    product: "Balm Stick",
  },
  {
    name: "Felipe A.",
    location: "Curitiba, PR",
    text: "Comecei com o kit completo e não largo mais. A rotina é simples e o resultado é absurdo. Minhas tattoos coloridas nunca estiveram tão vibrantes.",
    rating: 5,
    product: "Kit Tatuagem Perfeita",
  },
  {
    name: "Juliana S.",
    location: "Belo Horizonte, MG",
    text: "Meu tatuador recomendou a Madbucks e eu entendi o porquê. O sabonete não resseca e o creme hidratante tem um toque seco incrível.",
    rating: 5,
    product: "Creme Hidratante",
  },
  {
    name: "Rafael T.",
    location: "Florianópolis, SC",
    text: "Tatuador há 12 anos. Recomendo Madbucks pra todos os meus clientes. A diferença na cicatrização e preservação das cores é real.",
    rating: 5,
    product: "Rotina Completa",
  },
  {
    name: "Bianca L.",
    location: "Porto Alegre, RS",
    text: "Minhas tattoos em fineline estavam ficando apagadas. Com o Intensify + creme hidratante, os traços ficaram nítidos de novo. Impressionante.",
    rating: 5,
    product: "Tattoo Intensify",
  },
];

interface TestimonialsProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
}

export const Testimonials = ({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "O Que Dizem Nossos Clientes",
  subtitle = "Depoimentos",
}: TestimonialsProps) => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">{subtitle}</p>
            <h2 className="font-display text-2xl md:text-3xl tracking-tight text-foreground uppercase">{title}</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="border border-border rounded p-6 space-y-4 h-full flex flex-col">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-foreground text-foreground" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{t.text}"</p>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs font-bold text-foreground">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.location}</p>
                  {t.product && (
                    <p className="text-[10px] text-muted-foreground mt-1">Produto: {t.product}</p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
