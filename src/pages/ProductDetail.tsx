import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { trackViewContent } from "@/lib/meta-pixel";
import { Navbar } from "@/components/Navbar";
import { PromoTicker } from "@/components/PromoTicker";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";

import { ProductSkeleton } from "@/components/ProductSkeleton";
import IntensifyLP from "@/components/IntensifyLP";
import BalmStickLP from "@/components/BalmStickLP";
import CremeHidratanteLP from "@/components/CremeHidratanteLP";
import SaboneteLiquidoLP from "@/components/SaboneteLiquidoLP";
import KitLP from "@/components/KitLP";
import KitRotinaCompletaLP from "@/components/KitRotinaCompletaLP";
import KitComecoRotinaLP from "@/components/KitComecoRotinaLP";
import KitIntensidadeDiariaLP from "@/components/KitIntensidadeDiariaLP";
import KitBalmDuploLP from "@/components/KitBalmDuploLP";
import logoImg from "@/assets/logo-madbucks.webp";
import FomoNotifications from "@/components/FomoNotifications";

const LP_MAP: Record<string, React.ComponentType<{ product: ShopifyProduct["node"] }>> = {
  "madbucks-tattoo-intensify": IntensifyLP,
  "madbucks-tattoo-balm-stick": BalmStickLP,
  "madbucks-creme-hidratante-tattoo": CremeHidratanteLP,
  "madbucks-sabonete-liquido-tattoo": SaboneteLiquidoLP,
  "kit-tatuagem-perfeita": KitLP,
  "kit-rotina-completa-949436877": KitRotinaCompletaLP,
  "kit-comeco-de-rotina-949436881": KitComecoRotinaLP,
  "kit-intensidade-diaria-949436885": KitIntensidadeDiariaLP,
};

// SEO-optimized titles & descriptions per product (drives CTR from search)
const SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  "madbucks-tattoo-intensify": {
    title: "Tattoo Balm — Realça Cor e Contraste das Tatuagens",
    description: "Madbucks Tattoo Balm: realça cor, preto e contraste das suas tatuagens em segundos. Vegano, dermatologicamente testado. Frete grátis acima de R$199.",
  },
  "madbucks-creme-hidratante-tattoo": {
    title: "Creme Hidratante para Tatuagem — Hidratação Profunda Diária",
    description: "Hidratação profunda para pele tatuada. Preserva cores, evita ressecamento e prolonga a vida da sua tatuagem. Fórmula vegana, sem álcool. Compre online.",
  },
  "madbucks-tattoo-balm-stick": {
    title: "Balm Stick para Tatuagem — Proteção On-the-Go",
    description: "Bálsamo em stick prático para retoques no dia a dia. Hidrata, protege e realça a tatuagem em qualquer lugar. Vegano e cruelty-free. Madbucks.",
  },
  "madbucks-sabonete-liquido-tattoo": {
    title: "Sabonete Líquido para Tatuagem — Limpeza sem Agredir",
    description: "Limpeza suave para pele tatuada, sem resfriar a cicatrização nem desbotar cores. Fórmula vegana e pH balanceado. Ideal pós-tattoo e uso diário.",
  },
  "kit-tatuagem-perfeita": {
    title: "Kit Tatuagem Perfeita — Rotina Completa para Tatuagens",
    description: "Kit completo Madbucks: hidrata, protege e intensifica suas tatuagens. Rotina premium com economia vs unidades avulsas. Frete grátis acima de R$199.",
  },
  "kit-rotina-completa-949436877": {
    title: "Kit Rotina Completa — 4 Produtos Madbucks para Tatuagem",
    description: "A rotina mais completa para sua tattoo: sabonete, creme, balm 50g e balm stick. Casa + rua, ~25% de economia vs. avulso. Frete grátis acima de R$199.",
  },
  "kit-comeco-de-rotina-949436881": {
    title: "Kit Começo de Rotina — Skincare Iniciante para Tatuagem",
    description: "O kit de entrada Madbucks: sabonete 300ml + creme hidratante 200ml. Os 2 passos essenciais para começar a cuidar da sua tattoo do jeito certo.",
  },
  "kit-intensidade-diaria-949436885": {
    title: "Kit Intensidade Diária — Tattoo Balm 50g + Stick 12g",
    description: "Cor viva em casa e na rua. Pote 50g para a rotina + Balm Stick 12g para o bolso. Mesma fórmula, dois formatos. Frete grátis acima de R$199.",
  },
};


const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    fetchProductByHandle(handle)
      .then((data) => {
        setProduct(data);
        setLoading(false);
        if (data) {
          const variant = data.variants?.edges?.[0]?.node;
          trackViewContent({
            content_name: data.title,
            content_ids: [data.id],
            content_type: 'product',
            value: variant ? parseFloat(variant.price.amount) : undefined,
            currency: variant?.price.currencyCode || 'BRL',
          });
        }
      })
      .catch(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <PromoTicker />
        <Navbar />
        <div style={{ paddingTop: "calc(56px + var(--ticker-height, 0px))" }}>
          <ProductSkeleton />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <PromoTicker />
        <Navbar />
        <div className="container mx-auto px-4 text-center" style={{ paddingTop: "calc(128px + var(--ticker-height, 0px))" }}>
          <p className="text-muted-foreground">Produto não encontrado</p>
          <Link to="/" className="text-foreground font-bold text-sm mt-4 inline-block hover:underline">Voltar</Link>
        </div>
      </div>
    );
  }

  const LPComponent =
    LP_MAP[handle || ""] ||
    ((handle || "").toLowerCase().includes("kit") || product.title.toLowerCase().includes("kit")
      ? KitLP
      : undefined);
  const seoOverride = SEO_OVERRIDES[handle || ""];
  const seoTitle = seoOverride?.title || product.title;
  const seoDescription =
    seoOverride?.description ||
    product.description?.slice(0, 155) ||
    `${product.title} — Skincare premium para tatuagens da Madbucks. Vegano, cruelty-free e dermatologicamente testado.`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`/products/${handle}`}
        type="product"
        image={product.images?.edges?.[0]?.node?.url}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.title,
            "description": product.description,
            "image": product.images?.edges?.map(e => e.node.url) || [],
            "brand": { "@type": "Brand", "name": "Madbucks" },
            "url": `https://madbucks.com.br/products/${handle}`,
            "sku": product.variants?.edges?.[0]?.node?.id || handle,
            "category": "Skincare para Tatuagens",
            "offers": {
              "@type": "Offer",
              "priceCurrency": product.variants?.edges?.[0]?.node?.price?.currencyCode || "BRL",
              "price": product.variants?.edges?.[0]?.node?.price?.amount || "0",
              "availability": product.variants?.edges?.[0]?.node?.availableForSale
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              "seller": { "@type": "Organization", "name": "Madbucks" },
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "BR"
                }
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://madbucks.com.br/" },
              { "@type": "ListItem", "position": 2, "name": "Coleção", "item": "https://madbucks.com.br/collections" },
              { "@type": "ListItem", "position": 3, "name": product.title, "item": `https://madbucks.com.br/products/${handle}` }
            ]
          }
        ]}
      />
      <PromoTicker />
      <Navbar />
      {LPComponent ? (
        <LPComponent product={product} />
      ) : (
        <div className="container mx-auto px-4 pt-32 text-center">
          <p className="text-muted-foreground">Página do produto em construção</p>
          <Link to="/" className="text-foreground font-bold text-sm mt-4 inline-block hover:underline">Voltar</Link>
        </div>
      )}
      <FomoNotifications />
      <Footer />
    </div>
  );
};

export default ProductDetail;
