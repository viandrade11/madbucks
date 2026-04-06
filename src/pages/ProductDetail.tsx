import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { trackViewContent } from "@/lib/meta-pixel";
import { Navbar } from "@/components/Navbar";
import { SEO } from "@/components/SEO";

import { Loader2 } from "lucide-react";
import IntensifyLP from "@/components/IntensifyLP";
import BalmStickLP from "@/components/BalmStickLP";
import CremeHidratanteLP from "@/components/CremeHidratanteLP";
import SaboneteLiquidoLP from "@/components/SaboneteLiquidoLP";
import KitLP from "@/components/KitLP";
import logoImg from "@/assets/logo-madbucks.webp";

const LP_MAP: Record<string, React.ComponentType<{ product: ShopifyProduct["node"] }>> = {
  "madbucks-tattoo-intensify": IntensifyLP,
  "madbucks-tattoo-balm-stick": BalmStickLP,
  "madbucks-creme-hidratante-tattoo": CremeHidratanteLP,
  "madbucks-sabonete-liquido-tattoo": SaboneteLiquidoLP,
  "kit-tatuagem-perfeita": KitLP,
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
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
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
        description={product.description?.slice(0, 155) || `${product.title} — Skincare premium para tatuagens da Madbucks.`}
        canonical={`/products/${handle}`}
        type="product"
        image={product.images?.edges?.[0]?.node?.url}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.title,
          "description": product.description,
          "image": product.images?.edges?.map(e => e.node.url) || [],
          "brand": { "@type": "Brand", "name": "Madbucks" },
          "url": `https://madbucks.lovable.app/products/${handle}`,
          "offers": {
            "@type": "Offer",
            "priceCurrency": product.variants?.edges?.[0]?.node?.price?.currencyCode || "BRL",
            "price": product.variants?.edges?.[0]?.node?.price?.amount || "0",
            "availability": product.variants?.edges?.[0]?.node?.availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            "seller": { "@type": "Organization", "name": "Madbucks" }
          }
        }}
      />
      <Navbar />
      {LPComponent ? (
        <LPComponent product={product} />
      ) : (
        <div className="container mx-auto px-4 pt-32 text-center">
          <p className="text-muted-foreground">Página do produto em construção</p>
          <Link to="/" className="text-foreground font-bold text-sm mt-4 inline-block hover:underline">Voltar</Link>
        </div>
      )}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <img src={logoImg} alt="Madbucks" className="h-5" />
            <p className="text-xs text-muted-foreground">Skincare para tatuados. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
