import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Minimize2,
  Globe2,
  TrendingUp,
  Sparkles,
  Target,
  Users,
  Package,
  CheckCircle2,
  MessageCircle,
  Quote,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import intensifyImg from "@/assets/b2b/intensify.webp";
import balmStickImg from "@/assets/b2b/balm-stick.webp";
import cremeImg from "@/assets/b2b/creme.webp";
import saboneteImg from "@/assets/b2b/sabonete.webp";
import madrabbitImg from "@/assets/b2b/madrabbit.webp";
import papatuiImg from "@/assets/b2b/papatui.webp";
import pantaImg from "@/assets/b2b/panta.webp";
import displayB2BImg from "@/assets/b2b/display-b2b.png";

const WHATSAPP =
  "https://wa.me/5519958714408?text=Ol%C3%A1!%20Vi%20a%20apresenta%C3%A7%C3%A3o%20da%20Madbucks.";

/* ---------- Slide primitives ---------- */

const Tag = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
    ■ {children}
  </p>
);

const SlideShell = ({
  children,
  dark = false,
  index,
  total,
}: {
  children: React.ReactNode;
  dark?: boolean;
  index: number;
  total: number;
}) => (
  <section
    className={`relative flex min-h-screen w-full flex-col justify-center px-6 py-20 sm:px-12 md:px-20 ${
      dark ? "bg-foreground text-background" : "bg-background text-foreground"
    }`}
  >
    <div className="mx-auto w-full max-w-6xl">{children}</div>
    <div
      className={`absolute bottom-6 left-6 font-mono text-[10px] font-bold uppercase tracking-[0.18em] sm:left-12 md:left-20 ${
        dark ? "text-background/55" : "text-[hsl(var(--foreground-muted))]"
      }`}
    >
      Madbucks · Deck 2026
    </div>
    <div
      className={`absolute bottom-6 right-6 font-mono text-[10px] font-bold uppercase tabular-nums tracking-[0.18em] sm:right-12 md:right-20 ${
        dark ? "text-background/55" : "text-[hsl(var(--foreground-muted))]"
      }`}
    >
      {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </div>
  </section>
);

/* ---------- Slides ---------- */

const SlideCover = ({ index, total }: { index: number; total: number }) => (
  <SlideShell dark index={index} total={total}>
    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-background/55">
      ■ Apresentação · Marca + Comercial · 2026
    </p>
    <h1 className="font-display mt-8 text-6xl uppercase leading-[0.9] sm:text-8xl md:text-[10rem]">
      Madbucks.
    </h1>
    <p className="mt-6 max-w-2xl text-lg text-background/70 sm:text-xl">
      Skincare de alta performance feito por quem entende de pele tatuada — e pronto para ir muito além dela.
    </p>
    <div className="mt-16 grid gap-6 border-t border-background/15 pt-8 sm:grid-cols-3">
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">Origem</p>
        <p className="mt-2 text-sm">Brasil · São Paulo</p>
      </div>
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">Categoria</p>
        <p className="mt-2 text-sm">Tattoo Care → Skincare premium</p>
      </div>
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">Para</p>
        <p className="mt-2 text-sm">Estúdios, lojistas e investidores</p>
      </div>
    </div>
  </SlideShell>
);

const SlideMercadoMundo = ({ index, total }: { index: number; total: number }) => (
  <SlideShell index={index} total={total}>
    <Tag>01 · Mercado global</Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Tatuagem virou
      <br />
      <span className="text-[hsl(var(--foreground-muted))]">mainstream global.</span>
    </h2>
    <div className="mt-14 grid gap-4 sm:grid-cols-3">
      {[
        { n: "US$ 3,55 bi", l: "Mercado global de tatuagem em 2024", s: "Fortune Business Insights" },
        { n: "+9,6%", l: "CAGR projetado até 2032", s: "Crescimento composto" },
        { n: "32%", l: "Dos adultos no ocidente já têm ao menos uma tatuagem", s: "Pew Research / Ipsos" },
      ].map((s) => (
        <div key={s.n} className="rounded-xl bg-[hsl(var(--background-alt))] p-7">
          <p className="font-display text-5xl">{s.n}</p>
          <p className="mt-3 text-sm font-semibold leading-snug">{s.l}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">{s.s}</p>
        </div>
      ))}
    </div>
    <p className="mt-10 max-w-3xl text-base text-[hsl(var(--foreground-muted))]">
      A categoria deixou de ser nicho. Tatuagem hoje é cultura, identidade e consumo recorrente — e arrasta junto uma indústria de cuidado da pele altamente especializada.
    </p>
  </SlideShell>
);

const SlideMercadoBrasil = ({ index, total }: { index: number; total: number }) => (
  <SlideShell dark index={index} total={total}>
    <Tag><span className="text-background/55">02 · Brasil</span></Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      O Brasil é o 2º país
      <br />
      <span className="text-background/55">mais tatuado do mundo.</span>
    </h2>
    <div className="mt-14 grid gap-10 md:grid-cols-2">
      <div>
        <p className="font-display text-7xl">48%</p>
        <p className="mt-3 text-base text-background/70">
          dos brasileiros possuem ao menos uma tatuagem (Ipsos, 2024) — atrás apenas da Itália.
        </p>
      </div>
      <div>
        <p className="font-display text-7xl">+15 mil</p>
        <p className="mt-3 text-base text-background/70">
          estúdios ativos espalhados pelo país, com forte concentração em SP, RJ e MG.
        </p>
      </div>
    </div>
    <div className="mt-12 rounded-xl border border-background/15 p-7">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">O paradoxo</p>
      <p className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
        Somos potência em tatuagem, mas o mercado brasileiro é{" "}
        <span className="text-[hsl(var(--gold))]">deserto</span> em marcas especializadas em cuidado pós-tattoo.
      </p>
    </div>
  </SlideShell>
);

const SlidePublico = ({ index, total }: { index: number; total: number }) => (
  <SlideShell index={index} total={total}>
    <Tag>03 · Público</Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Quem tatua
      <br />
      <span className="text-[hsl(var(--foreground-muted))]">no Brasil hoje.</span>
    </h2>

    <div className="mt-14 grid gap-3 md:grid-cols-2">
      <div className="rounded-xl bg-[hsl(var(--background-alt))] p-7">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-3xl uppercase">Mulheres</p>
          <p className="font-display text-5xl text-[hsl(var(--gold))]">52%</p>
        </div>
        <p className="font-mono mt-2 text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
          das pessoas tatuadas no Brasil são mulheres · Ipsos 2024
        </p>
        <div className="mt-6 space-y-3 text-sm">
          <p><span className="font-bold">Comportamento:</span> tatuagens menores e múltiplas, alta frequência de retoques, busca ativa por skincare de qualidade.</p>
          <p><span className="font-bold">Gasto médio:</span> 2,3x maior em cuidado da pele do que o público masculino.</p>
        </div>
        <div className="mt-6 border-t border-foreground/10 pt-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">Oportunidade</p>
          <p className="mt-2 text-base font-semibold leading-snug">
            Hidratação, clareamento, anti-idade e proteção solar para tatuagens — integrados ao ritual de skincare que ela já tem.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-foreground p-7 text-background">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-3xl uppercase">Homens</p>
          <p className="font-display text-5xl text-[hsl(var(--gold))]">48%</p>
        </div>
        <p className="font-mono mt-2 text-[10px] uppercase tracking-[0.18em] text-background/55">
          do público tatuado · maior área tatuada por pessoa
        </p>
        <div className="mt-6 space-y-3 text-sm text-background/80">
          <p><span className="font-bold text-background">Comportamento:</span> peças maiores (braço fechado, costas, perna), menor familiaridade com skincare, decisão guiada pelo tatuador.</p>
          <p><span className="font-bold text-background">Gatilho:</span> performance e praticidade — produto que "resolve", não "embeleza".</p>
        </div>
        <div className="mt-6 border-t border-background/15 pt-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">Oportunidade</p>
          <p className="mt-2 text-base font-semibold leading-snug">
            Onboarding em skincare via tatuagem: balm, hidratante e protetor solar como porta de entrada para uma rotina masculina completa.
          </p>
        </div>
      </div>
    </div>

    <div className="mt-10 grid gap-3 sm:grid-cols-3">
      {[
        { n: "18–34", l: "Faixa etária dominante (68% do público tatuado)" },
        { n: "60%", l: "Têm 2 ou mais tatuagens — consumidor recorrente" },
        { n: "R$ 380", l: "Ticket médio anual em produtos pós-tatuagem" },
      ].map((s) => (
        <div key={s.n} className="rounded-xl border border-foreground/10 p-5">
          <p className="font-display text-3xl">{s.n}</p>
          <p className="mt-2 text-xs text-[hsl(var(--foreground-muted))]">{s.l}</p>
        </div>
      ))}
    </div>
  </SlideShell>
);

const SlideGap = ({ index, total }: { index: number; total: number }) => (
  <SlideShell index={index} total={total}>
    <Tag>04 · O gap</Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      O que existe lá fora,
      <br />
      <span className="text-[hsl(var(--foreground-muted))]">aqui ainda não chegou.</span>
    </h2>

    <div className="mt-14 grid gap-3 md:grid-cols-3">
      {[
        { name: "Mad Rabbit", country: "🇺🇸 EUA", tag: "@madrabbit · DTC", desc: "US$ 10MM em receita anual, investida pelo Mark Cuban no Shark Tank. Construiu uma marca de skincare de tatuagem desejada globalmente.", img: madrabbitImg },
        { name: "Papatui", country: "🇺🇸 EUA", tag: "@papatui · The Rock", desc: "Lançada por The Rock em 2024, vende em mais de 4 mil lojas Target. Mostra o tamanho da categoria fora do nicho.", img: papatuiImg },
        { name: "Panta", country: "🇧🇷 Brasil", tag: "@pantacosmetica", desc: "Pioneira nacional, foi a primeira a posicionar skincare de tatuagem de forma profissional no Brasil. Foi olhando para ela — e comparando com o que existe lá fora — que vimos o tamanho do espaço que ainda falta ocupar aqui.", img: pantaImg },
      ].map((b) => (
        <div key={b.name} className="overflow-hidden rounded-xl bg-[hsl(var(--background-alt))]">
          <div className="aspect-square w-full overflow-hidden bg-background">
            <img src={b.img} alt={`${b.name} — referência visual`} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">{b.country}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">{b.tag}</p>
            </div>
            <p className="font-display mt-2 text-3xl uppercase">{b.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--foreground-muted))]">{b.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <p className="mt-10 max-w-3xl text-base">
      Olhando a Panta abrir caminho no Brasil e marcas como Mad Rabbit e Papatui escalarem lá fora, ficou claro: o Brasil — 2º maior público tatuado do planeta — ainda não tem nada parecido com a proposta da Madbucks. É esse o espaço que vamos ocupar.
    </p>
  </SlideShell>
);

const SlideMarca = ({ index, total }: { index: number; total: number }) => (
  <SlideShell dark index={index} total={total}>
    <Tag><span className="text-background/55">05 · A marca</span></Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Madbucks é
      <br />
      <span className="text-background/55">cuidado sem perder atitude.</span>
    </h2>
    <div className="mt-14 grid gap-10 md:grid-cols-2">
      <div>
        <p className="text-lg leading-relaxed text-background/80">
          Nasceu para preencher um vazio: skincare de altíssima performance, formulado para pele tatuada, com identidade própria e linguagem direta. Sem rótulo de farmácia, sem promessa vazia de cosmético de beleza.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-background/80">
          Inspirada na precisão da Mad Rabbit e na popularização da Papatui — duas marcas que provaram o tamanho da categoria lá fora. A Panta nos serviu de espelho do mercado brasileiro: foi vendo o que ela faz aqui, e o que ainda falta, que enxergamos o espaço da Madbucks.
        </p>
      </div>
      <div className="space-y-4">
        {[
          { k: "Precisão", v: "Formulação técnica, ativos certos, doses certas." },
          { k: "Atitude", v: "Visual e tom de voz que combinam com a cultura." },
          { k: "Acessibilidade", v: "Premium sem ser inalcançável." },
          { k: "Brasilidade", v: "Feito aqui, para pele e clima daqui." },
        ].map((p) => (
          <div key={p.k} className="flex items-start gap-4 border-t border-background/15 pt-4">
            <span className="font-display text-2xl uppercase text-[hsl(var(--gold))]">{p.k}</span>
            <span className="text-background/70">{p.v}</span>
          </div>
        ))}
      </div>
    </div>
  </SlideShell>
);

const SlideProdutos = ({ index, total }: { index: number; total: number }) => {
  const items = [
    { name: "Tattoo Balm", vol: "50g", img: intensifyImg, role: "Cicatrização e fixação de cor" },
    { name: "Tattoo Balm Stick", vol: "12g", img: balmStickImg, role: "Retoque on-the-go" },
    { name: "Creme Hidratante", vol: "200ml", img: cremeImg, role: "Hidratação diária" },
    { name: "Sabonete Líquido", vol: "300ml", img: saboneteImg, role: "Limpeza suave pós-sessão" },
  ];
  return (
    <SlideShell index={index} total={total}>
      <Tag>06 · Linha atual</Tag>
      <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
        4 SKUs.
        <br />
        <span className="text-[hsl(var(--foreground-muted))]">Ritual completo.</span>
      </h2>
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <div key={p.name} className="rounded-xl bg-[hsl(var(--background-alt))] p-6">
            <div className="flex h-40 items-center justify-center rounded-lg bg-background">
              <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-contain p-3" />
            </div>
            <p className="mt-5 font-display text-xl uppercase">{p.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">{p.vol}</p>
            <p className="mt-3 text-sm text-[hsl(var(--foreground-muted))]">{p.role}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-sm text-[hsl(var(--foreground-muted))]">
        Linha enxuta, propositalmente. Cada SKU resolve uma etapa do ritual de cuidado da pele tatuada — sem inflar catálogo nem confundir o cliente.
      </p>
    </SlideShell>
  );
};

const SlideVisao = ({ index, total }: { index: number; total: number }) => (
  <SlideShell dark index={index} total={total}>
    <Tag><span className="text-background/55">07 · Visão</span></Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Tatuagem é a porta.
      <br />
      <span className="text-[hsl(var(--gold))]">Skincare é a casa.</span>
    </h2>
    <p className="mt-10 max-w-3xl text-lg text-background/70">
      A Madbucks começa pelo público tatuado porque é onde a dor é mais óbvia e o produto é mais essencial. Mas a ambição é maior: nos tornar uma marca de skincare brasileira completa, com presença em cuidado facial, corporal, solar e masculino.
    </p>
    <div className="mt-14 grid gap-3 md:grid-cols-4">
      {[
        { y: "2025", t: "Tattoo Care", s: "Linha atual: 4 SKUs, foco em estúdios e revenda." },
        { y: "2026", t: "Body & Sun", s: "Hidratantes corporais e proteção solar para pele tatuada." },
        { y: "2027", t: "Face Care", s: "Linha facial: limpeza, hidratação, ativos." },
        { y: "2028", t: "Full Skincare", s: "Marca brasileira de skincare completa, omnichannel." },
      ].map((p) => (
        <div key={p.y} className="rounded-xl border border-background/15 p-6">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold))]">{p.y}</p>
          <p className="font-display mt-3 text-2xl uppercase">{p.t}</p>
          <p className="mt-3 text-sm text-background/70">{p.s}</p>
        </div>
      ))}
    </div>
  </SlideShell>
);

const SlideOportunidade = ({ index, total }: { index: number; total: number }) => (
  <SlideShell index={index} total={total}>
    <Tag>08 · Oportunidade</Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Por que agora,
      <br />
      <span className="text-[hsl(var(--foreground-muted))]">por que Madbucks.</span>
    </h2>
    <div className="mt-14 grid gap-3 md:grid-cols-2">
      {[
        { icon: Globe2, t: "Categoria validada lá fora", s: "Mad Rabbit, Papatui e outras já provaram que skincare de tatuagem é negócio bilionário, não nicho." },
        { icon: TrendingUp, t: "Demanda local reprimida", s: "Brasil tem 48% de adultos tatuados e quase nenhuma marca especializada. O mercado pede oferta." },
        { icon: Target, t: "Posicionamento livre", s: "Espaço entre o cosmético genérico e o pós-tatuagem clínico. Madbucks ocupa o premium acessível." },
        { icon: Sparkles, t: "Plataforma para skincare", s: "A marca tem voz, estética e canal de venda — pode escalar para skincare geral sem refundar nada." },
      ].map((p) => (
        <div key={p.t} className="flex gap-5 rounded-xl bg-[hsl(var(--background-alt))] p-7">
          <div className="rounded-lg bg-foreground p-3 text-background h-fit">
            <p.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold">{p.t}</p>
            <p className="mt-2 text-sm text-[hsl(var(--foreground-muted))]">{p.s}</p>
          </div>
        </div>
      ))}
    </div>
  </SlideShell>
);

const SlideB2B = ({ index, total }: { index: number; total: number }) => (
  <SlideShell index={index} total={total}>
    <Tag>09 · Programa B2B</Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      3 faixas.
      <br />
      <span className="text-[hsl(var(--foreground-muted))]">Margem real.</span>
    </h2>
    <div className="mt-12 grid gap-3 md:grid-cols-3">
      {[
        { n: "STARTER", r: "10 – 49 un.", m: "1.8x", d: "Para começar o catálogo e testar giro.", dark: false },
        { n: "PRO", r: "50 – 199 un.", m: "2.0x", d: "Reposição constante, frete grátis SP/RJ/MG.", dark: true },
        { n: "SCALE", r: "200+ un.", m: "2.1x", d: "Volume com exclusividade regional.", dark: false },
      ].map((t) => (
        <div key={t.n} className={`rounded-xl p-7 ${t.dark ? "bg-foreground text-background" : "bg-[hsl(var(--background-alt))]"}`}>
          <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${t.dark ? "text-background/55" : "text-[hsl(var(--foreground-muted))]"}`}>{t.r}</p>
          <p className="font-display mt-3 text-3xl uppercase">{t.n}</p>
          <p className={`font-mono mt-6 text-[10px] uppercase tracking-[0.18em] ${t.dark ? "text-background/55" : "text-[hsl(var(--foreground-muted))]"}`}>Markup</p>
          <p className="font-display text-4xl">{t.m}</p>
          <p className={`mt-4 text-sm ${t.dark ? "text-background/70" : "text-[hsl(var(--foreground-muted))]"}`}>{t.d}</p>
        </div>
      ))}
    </div>
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <a
        href="https://tabelab2b.lovable.app/tabela-precos"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-background transition-colors hover:bg-foreground/85"
      >
        Ver tabela de preços completa →
      </a>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
        Valores por SKU, kits e condições comerciais
      </span>
    </div>
  </SlideShell>
);

const SlideDisplay = ({ index, total }: { index: number; total: number }) => (
  <SlideShell dark index={index} total={total}>
    <Tag><span className="text-background/55">10 · Display B2B</span></Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Marca presente
      <br />
      <span className="text-background/55">no balcão.</span>
    </h2>
    <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
      <div className="relative overflow-hidden rounded-xl border border-background/15 bg-[hsl(var(--background-alt))]">
        <img src={displayB2BImg} alt="Display Madbucks para estúdios e lojistas" className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute bottom-3 left-3 rounded bg-foreground/80 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background">
          Imagem meramente ilustrativa
        </span>
      </div>
      <div>
        <p className="text-lg text-background/70">
          Um expositor exclusivo Madbucks para estúdios parceiros e lojistas: identidade da marca, comunicação de benefícios, área de tester e preços sugeridos. Transforma a recomendação do tatuador em venda imediata no balcão.
        </p>
        <ul className="mt-8 space-y-4">
          {[
            { t: "Identidade visual", s: "Coruja, preto fosco e tipografia da marca em destaque." },
            { t: "Antes & depois", s: "Comunica o resultado: tatuagem realçada e hidratada." },
            { t: "Selos de confiança", s: "100% Natural + QR para Instagram." },
            { t: "Área de tester", s: "Cliente experimenta o Tattoo Balm antes de comprar." },
          ].map((p) => (
            <li key={p.t} className="flex gap-3">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />
              <div>
                <p className="font-display text-lg uppercase">{p.t}</p>
                <p className="text-sm text-background/70">{p.s}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">
          Disponibilizado para parceiros PRO e SCALE.
        </p>
      </div>
    </div>
  </SlideShell>
);

const SlideCanais = ({ index, total }: { index: number; total: number }) => (
  <SlideShell index={index} total={total}>
    <Tag>11 · Go-to-market</Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Onde a Madbucks
      <br />
      <span className="text-[hsl(var(--foreground-muted))]">vai estar.</span>
    </h2>
    <div className="mt-14 grid gap-3 md:grid-cols-3">
      {[
        { icon: Users, t: "Estúdios de tatuagem", s: "Canal de prescrição. Tatuador indica, cliente compra." },
        { icon: Package, t: "Lojistas e revendedores", s: "Beauty stores, farmácias premium, e-commerces de nicho." },
        { icon: Globe2, t: "DTC próprio", s: "madbucks.com.br — comunidade, conteúdo, lançamentos." },
      ].map((p) => (
        <div key={p.t} className="rounded-xl border border-foreground/15 p-7">
          <div className="inline-flex rounded-lg bg-[hsl(var(--gold))] p-3 text-foreground">
            <p.icon className="h-5 w-5" />
          </div>
          <p className="mt-5 font-display text-2xl uppercase">{p.t}</p>
          <p className="mt-3 text-sm text-[hsl(var(--foreground-muted))]">{p.s}</p>
        </div>
      ))}
    </div>
  </SlideShell>
);

const SlideQuote = ({ index, total }: { index: number; total: number }) => (
  <SlideShell dark index={index} total={total}>
    <Tag><span className="text-background/55">12 · Manifesto</span></Tag>
    <Quote className="mt-10 h-12 w-12 text-[hsl(var(--gold))]" strokeWidth={1.5} />
    <p className="font-display mt-8 text-4xl uppercase leading-[0.95] sm:text-6xl md:text-7xl">
      Tatuagem é arte
      <br />
      <span className="text-background/55">na pele.</span>
      <br />
      Skincare é o que mantém
      <br />
      <span className="text-background/55">a arte viva.</span>
    </p>
    <p className="mt-10 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-background/55">
      — Madbucks
    </p>
  </SlideShell>
);

const SlideCTA = ({ index, total }: { index: number; total: number }) => (
  <SlideShell dark index={index} total={total}>
    <Tag><span className="text-background/55">13 · Próximo passo</span></Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl md:text-8xl">
      Vamos conversar.
    </h2>
    <p className="mt-8 max-w-2xl text-lg text-background/70">
      Seja você um estúdio, lojista, distribuidor ou investidor — temos um formato pra você. Resposta em até 1 dia útil, direto com o time comercial.
    </p>

    <div className="mt-12 grid gap-6 border-y border-background/15 py-8 sm:grid-cols-3">
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">WhatsApp</p>
        <p className="mt-2 text-lg font-bold">(19) 95871-4408</p>
      </div>
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">Site</p>
        <p className="mt-2 text-lg font-bold">madbucks.com.br</p>
      </div>
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">Programa B2B</p>
        <p className="mt-2 text-lg font-bold">madbucks.com.br/b2b</p>
      </div>
    </div>

    <div className="mt-12 flex flex-wrap gap-3">
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-4 text-sm font-bold text-foreground transition hover:opacity-90"
      >
        <MessageCircle className="h-4 w-4" /> Abrir WhatsApp
      </a>
      <a
        href="/b2b"
        className="inline-flex items-center gap-2 rounded-lg border border-background/25 px-6 py-4 text-sm font-bold transition hover:border-background/60"
      >
        <CheckCircle2 className="h-4 w-4" /> Ver programa B2B
      </a>
    </div>
  </SlideShell>
);

/* ---------- Page ---------- */

const slideBuilders = [
  SlideCover,
  SlideMercadoMundo,
  SlideMercadoBrasil,
  SlidePublico,
  SlideGap,
  SlideMarca,
  SlideProdutos,
  SlideVisao,
  SlideOportunidade,
  SlideB2B,
  SlideDisplay,
  SlideCanais,
  SlideQuote,
  SlideCTA,
];

const B2BApresentacao = () => {
  const total = slideBuilders.length;
  const [current, setCurrent] = useState(0);
  const [isFs, setIsFs] = useState(false);

  const go = useCallback(
    (dir: number) => {
      setCurrent((c) => {
        const next = Math.min(Math.max(c + dir, 0), total - 1);
        if (next !== c) {
          requestAnimationFrame(() => {
            const el = document.getElementById(`slide-${next}`);
            if (el) {
              window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
            }
          });
        }
        return next;
      });
    },
    [total]
  );

  const toggleFs = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFs(true);
    } else {
      await document.exitFullscreen();
      setIsFs(false);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFs();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, toggleFs]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight / 2;
      for (let i = 0; i < total; i++) {
        const el = document.getElementById(`slide-${i}`);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (y >= top && y < bottom) {
          setCurrent(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [total]);

  useEffect(() => {
    const onChange = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  return (
    <main className="bg-background">
      <SEO
        title="Madbucks · Apresentação Comercial B2B"
        description="Apresentação comercial Madbucks: mercado, marca, produtos, programa B2B e oportunidade."
        canonical="/b2b/apresentacao"
        noindex
      />
      {slideBuilders.map((S, i) => (
        <div key={i} id={`slide-${i}`}>
          <S index={i + 1} total={total} />
        </div>
      ))}

      {/* Floating controls */}
      <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground/95 px-3 py-2 text-background shadow-2xl backdrop-blur">
        <button
          onClick={() => go(-1)}
          aria-label="Slide anterior"
          className="rounded-full p-2 transition hover:bg-background/10 disabled:opacity-30"
          disabled={current === 0}
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="font-mono px-2 text-[11px] font-bold uppercase tabular-nums tracking-[0.18em]">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          onClick={() => go(1)}
          aria-label="Próximo slide"
          className="rounded-full p-2 transition hover:bg-background/10 disabled:opacity-30"
          disabled={current === total - 1}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-background/20" />
        <button
          onClick={toggleFs}
          aria-label="Modo apresentação"
          className="rounded-full p-2 transition hover:bg-background/10"
        >
          {isFs ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>

      {/* Progress bar */}
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-foreground/10">
        <div
          className="h-full bg-foreground transition-all duration-300"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
    </main>
  );
};

export default B2BApresentacao;
