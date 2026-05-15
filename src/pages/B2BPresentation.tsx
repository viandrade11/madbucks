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
  Instagram,
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
  "https://wa.me/5519958714408?text=Hi!%20I%20just%20saw%20the%20Madbucks%20deck.";

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
      ■ Pitch · Brand + Commercial · 2026
    </p>
    <h1 className="font-display mt-8 text-6xl uppercase leading-[0.9] sm:text-8xl md:text-[10rem]">
      Madbucks.
    </h1>
    <p className="mt-6 max-w-2xl text-lg text-background/70 sm:text-xl">
      High-performance skincare built by people who know tattooed skin — and ready to go far beyond it.
    </p>
    <div className="mt-16 grid gap-6 border-t border-background/15 pt-8 sm:grid-cols-3">
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">Origin</p>
        <p className="mt-2 text-sm">Brazil · São Paulo</p>
      </div>
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">Category</p>
        <p className="mt-2 text-sm">Tattoo Care → Premium skincare</p>
      </div>
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">For</p>
        <p className="mt-2 text-sm">Studios, retailers and investors</p>
      </div>
    </div>
  </SlideShell>
);

const SlideMercadoMundo = ({ index, total }: { index: number; total: number }) => (
  <SlideShell index={index} total={total}>
    <Tag>01 · Global market</Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Tattoos went
      <br />
      <span className="text-[hsl(var(--foreground-muted))]">mainstream worldwide.</span>
    </h2>
    <div className="mt-14 grid gap-4 sm:grid-cols-3">
      {[
        { n: "US$ 3.55B", l: "Global tattoo market in 2024", s: "Fortune Business Insights" },
        { n: "+9.6%", l: "Projected CAGR through 2032", s: "Compound growth" },
        { n: "32%", l: "Of adults in the West have at least one tattoo", s: "Pew Research / Ipsos" },
      ].map((s) => (
        <div key={s.n} className="rounded-xl bg-[hsl(var(--background-alt))] p-7">
          <p className="font-display text-5xl">{s.n}</p>
          <p className="mt-3 text-sm font-semibold leading-snug">{s.l}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">{s.s}</p>
        </div>
      ))}
    </div>
    <p className="mt-10 max-w-3xl text-base text-[hsl(var(--foreground-muted))]">
      The category is no longer niche. Tattoos today mean culture, identity and recurring consumption — pulling along a highly specialized skincare industry with them.
    </p>
  </SlideShell>
);

const SlideMercadoBrasil = ({ index, total }: { index: number; total: number }) => (
  <SlideShell dark index={index} total={total}>
    <Tag><span className="text-background/55">02 · South Africa</span></Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      South Africa is the fastest-growing
      <br />
      <span className="text-background/55">tattoo market in Africa.</span>
    </h2>
    <div className="mt-14 grid gap-10 md:grid-cols-2">
      <div>
        <p className="font-display text-7xl">25%</p>
        <p className="mt-3 text-base text-background/70">
          of South African adults have at least one tattoo — adoption rising sharply among 18–34 year olds.
        </p>
      </div>
      <div>
        <p className="font-display text-7xl">+1,500</p>
        <p className="mt-3 text-base text-background/70">
          active studios across the country, concentrated in Johannesburg, Cape Town, Durban and Pretoria.
        </p>
      </div>
    </div>
    <div className="mt-12 rounded-xl border border-background/15 p-7">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">The opportunity</p>
      <p className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
        A booming tattoo culture with{" "}
        <span className="text-[hsl(var(--gold))]">no specialized local brand</span> dedicated to post-tattoo skincare — open territory for category leadership.
      </p>
    </div>
  </SlideShell>
);

const SlidePublico = ({ index, total }: { index: number; total: number }) => (
  <SlideShell index={index} total={total}>
    <Tag>03 · Audience</Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Who gets tattooed
      <br />
      <span className="text-[hsl(var(--foreground-muted))]">in Brazil today.</span>
    </h2>

    <div className="mt-14 grid gap-3 md:grid-cols-2">
      <div className="rounded-xl bg-[hsl(var(--background-alt))] p-7">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-3xl uppercase">Women</p>
          <p className="font-display text-5xl text-[hsl(var(--gold))]">52%</p>
        </div>
        <p className="font-mono mt-2 text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
          of tattooed people in Brazil are women · Ipsos 2024
        </p>
        <div className="mt-6 space-y-3 text-sm">
          <p><span className="font-bold">Behavior:</span> smaller, multiple tattoos, frequent touch-ups, active demand for quality skincare.</p>
          <p><span className="font-bold">Average spend:</span> 2.3x higher on skincare than the male audience.</p>
        </div>
        <div className="mt-6 border-t border-foreground/10 pt-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">Opportunity</p>
          <p className="mt-2 text-base font-semibold leading-snug">
            Hydration, brightening, anti-aging and SPF for tattoos — integrated into the skincare ritual she already has.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-foreground p-7 text-background">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-3xl uppercase">Men</p>
          <p className="font-display text-5xl text-[hsl(var(--gold))]">48%</p>
        </div>
        <p className="font-mono mt-2 text-[10px] uppercase tracking-[0.18em] text-background/55">
          of the tattooed audience · larger tattooed area per person
        </p>
        <div className="mt-6 space-y-3 text-sm text-background/80">
          <p><span className="font-bold text-background">Behavior:</span> bigger pieces (full sleeve, back, leg), low skincare familiarity, decision driven by the tattoo artist.</p>
          <p><span className="font-bold text-background">Trigger:</span> performance and convenience — a product that "solves", not "beautifies".</p>
        </div>
        <div className="mt-6 border-t border-background/15 pt-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">Opportunity</p>
          <p className="mt-2 text-base font-semibold leading-snug">
            Skincare onboarding through tattoos: balm, moisturizer and SPF as the gateway to a complete male routine.
          </p>
        </div>
      </div>
    </div>

    <div className="mt-10 grid gap-3 sm:grid-cols-3">
      {[
        { n: "18–34", l: "Dominant age range (68% of the tattooed audience)" },
        { n: "60%", l: "Have 2+ tattoos — recurring consumer" },
        { n: "R$ 380", l: "Average annual ticket on post-tattoo products" },
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
    <Tag>04 · The gap</Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      What exists out there
      <br />
      <span className="text-[hsl(var(--foreground-muted))]">hasn't landed here yet.</span>
    </h2>

    <div className="mt-14 grid gap-3 md:grid-cols-3">
      {[
        { name: "Mad Rabbit", country: "🇺🇸 USA", tag: "@madrabbit · DTC", desc: "US$ 10MM in annual revenue, backed by Mark Cuban on Shark Tank. Built a globally desired tattoo skincare brand.", img: madrabbitImg },
        { name: "Papatui", country: "🇺🇸 USA", tag: "@papatui · The Rock", desc: "Launched by The Rock in 2024, sold in 4,000+ Target stores. Proves how big the category gets outside the niche.", img: papatuiImg },
        { name: "Panta", country: "🇧🇷 Brazil", tag: "@pantacosmetica", desc: "National pioneer, the first brand to position tattoo skincare professionally in Brazil. Looking at Panta — and comparing it with what exists abroad — showed us how much space is still open here.", img: pantaImg },
      ].map((b) => (
        <div key={b.name} className="overflow-hidden rounded-xl bg-[hsl(var(--background-alt))]">
          <div className="aspect-square w-full overflow-hidden bg-background">
            <img src={b.img} alt={`${b.name} — visual reference`} loading="lazy" className="h-full w-full object-cover" />
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
      Watching Panta open the path in Brazil and brands like Mad Rabbit and Papatui scale abroad made it clear: Brazil — the planet's 2nd largest tattooed audience — still has nothing like Madbucks. That's the space we're going to occupy.
    </p>
  </SlideShell>
);

const SlideMarca = ({ index, total }: { index: number; total: number }) => (
  <SlideShell dark index={index} total={total}>
    <Tag><span className="text-background/55">05 · The brand</span></Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Madbucks is
      <br />
      <span className="text-background/55">care without losing edge.</span>
    </h2>
    <div className="mt-14 grid gap-10 md:grid-cols-2">
      <div>
        <p className="text-lg leading-relaxed text-background/80">
          Born to fill a gap: ultra-high performance skincare formulated for tattooed skin, with its own identity and a direct voice. No pharmacy label, no empty beauty-cosmetic promise.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-background/80">
          Inspired by Mad Rabbit's precision and Papatui's mass adoption — two brands that proved the category's size abroad. Panta served as our mirror of the Brazilian market: looking at what they do here, and what's still missing, is how we found Madbucks' space.
        </p>
      </div>
      <div className="space-y-4">
        {[
          { k: "Precision", v: "Technical formulation, the right actives at the right doses." },
          { k: "Edge", v: "Visual and tone of voice that fit the culture." },
          { k: "Accessible", v: "Premium without being out of reach." },
          { k: "Brazilian", v: "Made here, for skin and weather from here." },
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
    { name: "Tattoo Balm", vol: "50g", img: intensifyImg, role: "Healing and color fixation" },
    { name: "Tattoo Balm Stick", vol: "12g", img: balmStickImg, role: "On-the-go touch-up" },
    { name: "Moisturizer", vol: "200ml", img: cremeImg, role: "Daily hydration" },
    { name: "Liquid Soap", vol: "300ml", img: saboneteImg, role: "Gentle post-session cleansing" },
  ];
  return (
    <SlideShell index={index} total={total}>
      <Tag>06 · Current line</Tag>
      <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
        4 SKUs.
        <br />
        <span className="text-[hsl(var(--foreground-muted))]">Complete ritual.</span>
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
        A lean line, on purpose. Each SKU solves one step of the tattooed-skin care ritual — without bloating the catalog or confusing the customer.
      </p>
    </SlideShell>
  );
};

const SlideVisao = ({ index, total }: { index: number; total: number }) => (
  <SlideShell dark index={index} total={total}>
    <Tag><span className="text-background/55">07 · Vision</span></Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Tattoos are the door.
      <br />
      <span className="text-[hsl(var(--gold))]">Skincare is the house.</span>
    </h2>
    <p className="mt-10 max-w-3xl text-lg text-background/70">
      Madbucks starts with the tattooed audience because that's where the pain is most obvious and the product is most essential. But the ambition is bigger: become a complete Brazilian skincare brand, with presence in face, body, sun and men's care.
    </p>
    <div className="mt-14 grid gap-3 md:grid-cols-4">
      {[
        { y: "2025", t: "Tattoo Care", s: "Current line: 4 SKUs, focused on studios and resale." },
        { y: "2026", t: "Body & Sun", s: "Body moisturizers and SPF for tattooed skin." },
        { y: "2027", t: "Face Care", s: "Facial line: cleansing, hydration, actives." },
        { y: "2028", t: "Full Skincare", s: "A complete Brazilian skincare brand, omnichannel." },
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
    <Tag>08 · Opportunity</Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Why now,
      <br />
      <span className="text-[hsl(var(--foreground-muted))]">why Madbucks.</span>
    </h2>
    <div className="mt-14 grid gap-3 md:grid-cols-2">
      {[
        { icon: Globe2, t: "Category validated abroad", s: "Mad Rabbit, Papatui and others have already proven tattoo skincare is a billion-dollar business, not a niche." },
        { icon: TrendingUp, t: "Local pent-up demand", s: "Brazil has 48% of adults tattooed and almost no specialized brands. The market is asking for supply." },
        { icon: Target, t: "Open positioning", s: "Space between generic cosmetics and clinical post-tattoo. Madbucks owns accessible premium." },
        { icon: Sparkles, t: "Skincare platform", s: "The brand has voice, aesthetic and sales channels — it can scale into general skincare without rebuilding anything." },
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
    <Tag>09 · B2B Program</Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      3 tiers.
      <br />
      <span className="text-[hsl(var(--foreground-muted))]">Real margin.</span>
    </h2>
    <div className="mt-12 grid gap-3 md:grid-cols-3">
      {[
        { n: "STARTER", r: "10 – 49 units", m: "1.8x", d: "To start the catalog and test sell-through.", dark: false },
        { n: "PRO", r: "50 – 199 units", m: "2.0x", d: "Steady restocking, free shipping in SP/RJ/MG.", dark: true },
        { n: "SCALE", r: "200+ units", m: "2.1x", d: "Volume with regional exclusivity.", dark: false },
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
        href="/b2b/tabela-precos"
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-background transition-colors hover:bg-foreground/85"
      >
        See full price list →
      </a>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
        Pricing per SKU, kits and commercial terms
      </span>
    </div>
  </SlideShell>
);

const SlideDisplay = ({ index, total }: { index: number; total: number }) => (
  <SlideShell dark index={index} total={total}>
    <Tag><span className="text-background/55">10 · B2B Display</span></Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Brand presence
      <br />
      <span className="text-background/55">at the counter.</span>
    </h2>
    <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
      <div className="relative overflow-hidden rounded-xl border border-background/15 bg-[hsl(var(--background-alt))]">
        <img src={displayB2BImg} alt="Madbucks display for studios and retailers" className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute bottom-3 left-3 rounded bg-foreground/80 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background">
          Image for illustration only
        </span>
      </div>
      <div>
        <p className="text-lg text-background/70">
          A Madbucks-only display for partner studios and retailers: brand identity, benefit communication, tester area and suggested pricing. Turns the artist's recommendation into an immediate sale at the counter.
        </p>
        <ul className="mt-8 space-y-4">
          {[
            { t: "Visual identity", s: "Owl, matte black and brand typography front and center." },
            { t: "Before & after", s: "Communicates the result: tattoo enhanced and hydrated." },
            { t: "Trust seals", s: "100% Natural + QR to Instagram." },
            { t: "Tester area", s: "Customers try the Tattoo Balm before buying." },
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
          Available to PRO and SCALE partners.
        </p>
      </div>
    </div>
  </SlideShell>
);

const SlideExportPricing = ({ index, total }: { index: number; total: number }) => {
  const items = [
    { name: "Tattoo Balm", vol: "50g", img: intensifyImg, fob: 8.9, msrp: 17.9 },
    { name: "Tattoo Balm Stick", vol: "12g", img: balmStickImg, fob: 5.9, msrp: 11.9 },
    { name: "Moisturizer", vol: "200ml", img: cremeImg, fob: 11.9, msrp: 23.9 },
    { name: "Liquid Soap", vol: "300ml", img: saboneteImg, fob: 3.9, msrp: 7.9 },
  ];
  const usd = (v: number) =>
    v.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  return (
    <SlideShell index={index} total={total}>
      <Tag>12 · Export pricing</Tag>
      <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
        Wholesale in USD.
        <br />
        <span className="text-[hsl(var(--foreground-muted))]">Ready to ship worldwide.</span>
      </h2>

      <div className="mt-12 overflow-hidden rounded-xl border border-foreground/10">
        <div className="hidden grid-cols-12 gap-2 bg-foreground px-4 py-4 text-background sm:grid">
          <div className="col-span-6 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">Product</div>
          <div className="col-span-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
            FOB Brazil <span className="text-background/55">· per unit</span>
          </div>
          <div className="col-span-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold))]">
            Suggested MSRP
          </div>
        </div>
        {items.map((p, i) => (
          <div
            key={p.name}
            className={`grid grid-cols-2 gap-3 px-4 py-5 sm:grid-cols-12 sm:gap-2 sm:py-6 ${
              i % 2 === 0 ? "bg-[hsl(var(--background-alt))]" : "bg-background"
            }`}
          >
            <div className="col-span-2 flex items-center gap-3 sm:col-span-6 sm:gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background sm:h-16 sm:w-16">
                <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-contain p-1" />
              </div>
              <div className="min-w-0">
                <p className="text-base font-bold sm:text-lg">{p.name}</p>
                <p className="text-sm text-[hsl(var(--foreground-muted))]">{p.vol}</p>
              </div>
            </div>
            <div className="sm:col-span-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))] sm:hidden">
                FOB Brazil
              </p>
              <p className="text-base font-bold tabular-nums">{usd(p.fob)}</p>
              <p className="text-[11px] text-[hsl(var(--foreground-muted))]">per unit</p>
            </div>
            <div className="col-span-2 border-t border-foreground/10 pt-3 sm:col-span-3 sm:border-0 sm:pt-0">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold))] sm:hidden">
                MSRP
              </p>
              <p className="text-base font-bold tabular-nums text-[hsl(var(--gold))]">{usd(p.msrp)}</p>
              <p className="text-[11px] text-[hsl(var(--foreground-muted))]">retail reference</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top stats row */}
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { k: "Market", v: "South Africa" },
          { k: "Currency", v: "USD" },
          { k: "SKUs", v: "4" },
          { k: "Lines", v: "1" },
        ].map((s) => (
          <div key={s.k} className="rounded-xl border border-foreground/10 bg-[hsl(var(--background-alt))] p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
              {s.k}
            </p>
            <p className="mt-2 text-2xl font-bold">{s.v}</p>
          </div>
        ))}
      </div>

      {/* Commercial terms card */}
      <div className="mt-6 rounded-2xl border border-foreground/10 bg-background p-6 sm:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold))]">
              Conditions
            </p>
            <h3 className="mt-3 text-3xl font-bold leading-tight">Commercial terms</h3>
            <p className="mt-3 text-sm text-[hsl(var(--foreground-muted))]">
              Terms valid for official Madbucks distributors, 2026 fiscal year.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:col-span-2">
            {[
              { k: "Minimum order", v: "USD 5,000" },
              { k: "Payment", v: "50% upon order + 50% before shipment" },
              { k: "Freight", v: "FOB — buyer's responsibility" },
              { k: "Credit card", v: "Card payments: 5% surcharge" },
            ].map((c) => (
              <div key={c.k} className="rounded-xl bg-[hsl(var(--background-alt))] p-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
                  {c.k}
                </p>
                <p className="mt-2 text-base font-bold leading-snug">{c.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-8 h-px bg-foreground/10" />

        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h4 className="text-lg font-bold">Volume bonuses</h4>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold))]">
              Note: bonus granted in product.
            </p>
          </div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
            Applied on total order value
          </p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { v: "USD 20,000", p: "1.5%" },
            { v: "USD 10,000", p: "2%" },
            { v: "USD 20,000", p: "3%" },
          ].map((b) => (
            <div key={b.v} className="flex items-center justify-between rounded-xl bg-[hsl(var(--background-alt))] p-5">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--foreground-muted))]">
                  Above
                </p>
                <p className="mt-1 text-base font-bold">{b.v}</p>
              </div>
              <p className="text-3xl font-bold text-[hsl(var(--gold))]">{b.p}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-xs text-[hsl(var(--foreground-muted))]">
        Prices in USD, per unit, valid for international wholesale orders. Final pricing confirmed per quote based on volume, destination and incoterm. ANVISA registered formulas, INCI in English available.
      </p>
    </SlideShell>
  );
};

const SlideCanais = ({ index, total }: { index: number; total: number }) => (
  <SlideShell index={index} total={total}>
    <Tag>11 · Go-to-market</Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl">
      Where Madbucks
      <br />
      <span className="text-[hsl(var(--foreground-muted))]">will be.</span>
    </h2>
    <div className="mt-14 grid gap-3 md:grid-cols-3">
      {[
        { icon: Users, t: "Tattoo studios", s: "Prescription channel. Artist recommends, customer buys." },
        { icon: Package, t: "Retailers and resellers", s: "Beauty stores, premium pharmacies, niche e-commerces." },
        { icon: Globe2, t: "Owned DTC", s: "madbucks.com.br — community, content, launches." },
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
      Tattoos are art
      <br />
      <span className="text-background/55">on the skin.</span>
      <br />
      Skincare is what keeps
      <br />
      <span className="text-background/55">the art alive.</span>
    </p>
    <p className="mt-10 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-background/55">
      — Madbucks
    </p>
  </SlideShell>
);

const SlideCTA = ({ index, total }: { index: number; total: number }) => (
  <SlideShell dark index={index} total={total}>
    <Tag><span className="text-background/55">13 · Next step</span></Tag>
    <h2 className="font-display mt-6 text-5xl uppercase leading-[0.95] sm:text-7xl md:text-8xl">
      Let's talk.
    </h2>
    <p className="mt-8 max-w-2xl text-lg text-background/70">
      Whether you're a studio, retailer, distributor or investor — we have a format for you. Reply within 1 business day, straight from the commercial team.
    </p>

    <div className="mt-12 grid gap-6 border-y border-background/15 py-8 sm:grid-cols-3">
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">Site</p>
        <p className="mt-2 text-lg font-bold">madbucks.com.br</p>
      </div>
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">Instagram</p>
        <p className="mt-2 text-lg font-bold">@madbucks.oficial</p>
      </div>
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">Email</p>
        <p className="mt-2 text-lg font-bold">contato@madbucks.com.br</p>
      </div>
    </div>

    <div className="mt-12 flex flex-wrap gap-3">
      <a
        href="https://instagram.com/madbucks.oficial"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-4 text-sm font-bold text-foreground transition hover:opacity-90"
      >
        <Instagram className="h-4 w-4" /> Follow on Instagram
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
  SlideDisplay,
  SlideCanais,
  SlideExportPricing,
  SlideQuote,
  SlideCTA,
];

const B2BPresentation = () => {
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
        title="Madbucks · Commercial Pitch Deck"
        description="Madbucks commercial deck: market, brand, products, B2B program and opportunity."
        canonical="/b2b/presentation"
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
          aria-label="Previous slide"
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
          aria-label="Next slide"
          className="rounded-full p-2 transition hover:bg-background/10 disabled:opacity-30"
          disabled={current === total - 1}
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-background/20" />
        <button
          onClick={toggleFs}
          aria-label="Presentation mode"
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

export default B2BPresentation;
