import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { Navbar } from "@/components/Navbar";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Loader2 } from "lucide-react";
import IntensifyLP from "@/components/IntensifyLP";
import BalmStickLP from "@/components/BalmStickLP";
import CremeHidratanteLP from "@/components/CremeHidratanteLP";
import SaboneteLiquidoLP from "@/components/SaboneteLiquidoLP";
import KitLP from "@/components/KitLP";
import logoImg from "@/assets/logo-madbucks.png";

const LP_MAP: Record<string, React.ComponentType<{ product: ShopifyProduct["node"] }>> = {
  "madbucks-tattoo-intensify": IntensifyLP,
  "madbucks-tattoo-balm-stick-69668baa49da0": BalmStickLP,
  "madbucks-creme-hidratante-tattoo-69667a5124762": CremeHidratanteLP,
  "madbucks-sabonete-liquido-tattoo-69667a03eaf59": SaboneteLiquidoLP,
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
      .then((data) => { setProduct(data); setLoading(false); })
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
      <Navbar />
      {LPComponent ? (
        <>
          <LPComponent product={product} />
          <ComparisonTable />
        </>
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
