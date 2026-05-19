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
import logoImg from "@/assets/logo-madbucks.webp";
import FomoNotifications from "@/components/FomoNotifications";

const LP_MAP: Record<string, React.ComponentType<{ product: ShopifyProduct["node"] }>> = {
  "madbucks-tattoo-intensify": IntensifyLP,
  "madbucks-tattoo-balm-stick": BalmStickLP,
  "madbucks-creme-hidratante-tattoo": CremeHidratanteLP,
  "madbucks-sabonete-liquido-tattoo": SaboneteLiquidoLP,
  "kit-tatuagem-perfeita": KitLP,
};

// SEO-optimized titles & descriptions per product (drives CTR from search)
const SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  "madbucks-tattoo-intensify": {
    title: "Intensificador de Tatuagem — Realça Cor e Contraste",
    description: "Madbucks Tattoo Intensify: realça cor, preto e contraste das suas tatuagens em segundos. Vegano, dermatologicamente testado. Frete grátis acima de R$199.",
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

  const LPComponent = LP_MAP[handle || ""];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={product.title}
        description={product.description?.slice(0, 155) || `${product.title} — Skincare premium para tatuagens da Madbucks. Ingredientes naturais, livre de crueldade animal e dermatologicamente testado.`}
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
            "url": `https://madbucks.lovable.app/products/${handle}`,
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
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://madbucks.lovable.app/" },
              { "@type": "ListItem", "position": 2, "name": "Coleção", "item": "https://madbucks.lovable.app/collections" },
              { "@type": "ListItem", "position": 3, "name": product.title, "item": `https://madbucks.lovable.app/products/${handle}` }
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
