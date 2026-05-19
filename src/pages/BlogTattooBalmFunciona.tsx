import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PromoTicker } from "@/components/PromoTicker";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const PUBLISHED = "2026-05-19";
const TITLE = "Tattoo Balm funciona? O que esperar de um bálsamo para tatuagem";
const DESCRIPTION =
  "Tattoo Balm funciona? Entenda como o bálsamo para tatuagem hidrata, protege e realça as cores — e quando aplicar para ter resultado real.";

const TOC = [
  { id: "o-que-e", label: "O que é um Tattoo Balm" },
  { id: "como-funciona", label: "Como o bálsamo age na pele tatuada" },
  { id: "funciona-mesmo", label: "Tattoo Balm funciona mesmo?" },
  { id: "como-usar", label: "Como usar no dia a dia" },
  { id: "quando-esperar", label: "Quando esperar resultado" },
  { id: "faq", label: "Perguntas frequentes" },
];

const FAQS = [
  {
    q: "Tattoo Balm funciona em tatuagem antiga?",
    a: "Sim. A fórmula reidrata a pele que envelheceu junto da tatuagem, devolvendo contraste e profundidade às cores. Em tatuagens muito desbotadas o efeito é estético — não substitui um retoque feito pelo tatuador.",
  },
  {
    q: "Posso usar logo depois de tatuar?",
    a: "O Tattoo Balm da Madbucks é indicado para manutenção da pele tatuada já cicatrizada. Para o pós-tatuagem imediato, siga as orientações do seu tatuador e use o Sabonete Líquido para a higienização suave.",
  },
  {
    q: "Quantas vezes por dia preciso aplicar?",
    a: "Uma a duas vezes ao dia já entrega resultado consistente: pela manhã para realçar cores e à noite para reforçar a hidratação enquanto você dorme.",
  },
  {
    q: "É vegano e cruelty-free?",
    a: "Sim. Toda a linha Madbucks é vegana, livre de testes em animais e dermatologicamente testada.",
  },
  {
    q: "Funciona em pele oleosa?",
    a: "Sim. A textura é leve, absorve rápido e não deixa acabamento pegajoso. Mesmo peles oleosas se beneficiam do realce de cor sem desconforto.",
  },
];

const BlogTattooBalmFunciona = () => {
  const url = "/blog/tattoo-balm-funciona";
  const fullUrl = `https://madbucks.com.br${url}`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        canonical={url}
        type="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: TITLE,
            description: DESCRIPTION,
            author: { "@type": "Organization", name: "Madbucks" },
            publisher: {
              "@type": "Organization",
              name: "Madbucks",
              logo: {
                "@type": "ImageObject",
                url: "https://madbucks.com.br/favicon.ico",
              },
            },
            datePublished: PUBLISHED,
            dateModified: PUBLISHED,
            mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
            inLanguage: "pt-BR",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://madbucks.com.br/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://madbucks.com.br/blog" },
              { "@type": "ListItem", position: 3, name: TITLE, item: fullUrl },
            ],
          },
        ]}
      />
      <PromoTicker />
      <Navbar />

      <article
        className="container mx-auto max-w-3xl px-4 pb-20"
        style={{ paddingTop: "calc(96px + var(--ticker-height, 0px))" }}
      >
        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span>Blog</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">Tattoo Balm funciona?</span>
        </nav>

        <header className="mb-10">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Cuidados com a pele tatuada · 5 min de leitura
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4 text-foreground">
            Tattoo Balm funciona? O que esperar de um bálsamo para tatuagem
          </h1>
          <p className="text-lg text-muted-foreground">
            Se você tatuou recentemente — ou tem tatuagens antigas que perderam o brilho — provavelmente já se perguntou
            se vale a pena usar um bálsamo específico. Vamos direto ao ponto.
          </p>
        </header>

        <aside className="border border-border rounded-lg p-5 mb-10 bg-muted/30">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Neste artigo</p>
          <ul className="space-y-1.5 text-sm">
            {TOC.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="text-foreground hover:underline">
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <section id="o-que-e" className="mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
            O que é um Tattoo Balm
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Tattoo Balm é um bálsamo formulado para a pele tatuada. Diferente de um hidratante comum, ele combina
            manteigas vegetais, óleos leves e ativos antioxidantes em uma textura mais densa, pensada para selar a
            hidratação e proteger a barreira da pele onde a tinta está depositada.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Na prática, é o produto que entra na rotina depois que a tatuagem cicatrizou — quando o objetivo deixa de
            ser cicatrização e passa a ser <strong>preservar cor, contraste e definição</strong> ao longo dos anos.
          </p>
        </section>

        <section id="como-funciona" className="mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Como o bálsamo age na pele tatuada
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Tatuagem desbota por três motivos: pele seca, exposição UV e perda da barreira lipídica. O bálsamo ataca os
            três frentes ao mesmo tempo:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              "Hidrata em profundidade com manteiga de karité e manteiga de cacau, devolvendo elasticidade à pele.",
              "Forma um filme protetor que reduz a perda de água transepidérmica — pele hidratada reflete melhor a luz e mostra cores mais vivas.",
              "Entrega antioxidantes (vitamina E, óleo de calêndula) que neutralizam radicais livres do sol e da poluição.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-foreground/90">
                <Check className="w-5 h-5 mt-0.5 shrink-0 text-foreground" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="funciona-mesmo" className="mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Tattoo Balm funciona mesmo?
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Funciona — desde que você entenda o que ele faz e o que <em>não</em> faz.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>O que esperar:</strong> realce imediato de cor e contraste já na primeira aplicação (a hidratação
            muda como a luz incide sobre a tinta), pele mais macia e definição preservada ao longo do tempo com uso
            contínuo.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            <strong>O que não esperar:</strong> o bálsamo não “devolve” pigmento que já saiu da pele. Para tatuagens
            muito antigas e apagadas, ele melhora o aspecto estético, mas a recuperação real exige retoque com seu
            tatuador.
          </p>
        </section>

        <div className="border-l-4 border-foreground bg-muted/40 p-6 my-10 rounded-r-lg">
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Dica Madbucks</p>
          <p className="text-foreground/90 leading-relaxed">
            Aplique o bálsamo depois do banho, com a pele ainda levemente úmida. A absorção é melhor e o realce de cor
            fica visivelmente mais intenso.
          </p>
        </div>

        <section id="como-usar" className="mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Como usar no dia a dia
          </h2>
          <ol className="space-y-4">
            {[
              { t: "Higienize a região", d: "Lave com sabonete suave (de preferência o Sabonete Líquido Madbucks) e seque sem esfregar." },
              { t: "Retire a quantidade ideal", d: "Uma pequena porção com as pontas dos dedos já cobre uma tatuagem média." },
              { t: "Aqueça e massageie", d: "Aqueça entre os dedos e aplique em movimentos circulares até absorver." },
              { t: "Repita 1–2x ao dia", d: "Manhã para realce e noite para reforço da hidratação." },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="font-display text-2xl font-bold text-muted-foreground shrink-0 w-10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-semibold text-foreground mb-1">{s.t}</p>
                  <p className="text-foreground/80 text-sm leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="quando-esperar" className="mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Quando esperar resultado
          </h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            O realce visual é <strong>imediato</strong> — você vê a cor ganhar profundidade no espelho na hora. Já o
            efeito de preservação (pele mais elástica, contornos mantidos, menos perda de pigmento ao longo do tempo)
            aparece com <strong>uso contínuo por 3 a 4 semanas</strong>.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            É como qualquer rotina de skincare: quem usa esporadicamente sente só o realce; quem incorpora ao dia a dia
            mantém a tatuagem com aparência de recente por anos.
          </p>
        </section>

        <div className="border border-border rounded-xl p-6 md:p-8 my-12 bg-muted/20">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Produto recomendado</p>
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-foreground">
            Madbucks Tattoo Balm
          </h3>
          <p className="text-foreground/90 mb-6 leading-relaxed">
            Bálsamo desenvolvido para realçar cor e contraste das tatuagens cicatrizadas. Vegano, dermatologicamente
            testado, com manteiga de karité, cacau e óleo de calêndula.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link to="/products/madbucks-tattoo-intensify" className="inline-flex items-center gap-2">
              Ver Tattoo Balm
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <section id="faq" className="mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">
            Perguntas frequentes
          </h2>
          <div className="space-y-6">
            {FAQS.map((f) => (
              <div key={f.q} className="border-b border-border pb-6 last:border-0">
                <h3 className="font-semibold text-foreground mb-2">{f.q}</h3>
                <p className="text-foreground/80 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center pt-6">
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link to="/collections">Ver a linha completa Madbucks</Link>
          </Button>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogTattooBalmFunciona;
