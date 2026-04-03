import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, formatPrice, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    fetchProductByHandle(handle).then((data) => {
      setProduct(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
          <p className="text-muted-foreground text-lg">Produto não encontrado</p>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">Voltar</Link>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho!", { position: "top-center" });
  };

  const hasMultipleVariants = product.variants.edges.length > 1 || 
    (product.variants.edges.length === 1 && product.variants.edges[0].node.title !== 'Default Title');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Voltar</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-card border border-border">
              {images[selectedImage]?.node ? (
                <img
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">Sem imagem</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 flex-shrink-0 transition-colors ${
                      idx === selectedImage ? 'border-primary' : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl tracking-[0.1em] text-foreground mb-2">
                {product.title}
              </h1>
              <p className="text-3xl font-bold text-primary">
                {selectedVariant ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) : ''}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Variants */}
            {hasMultipleVariants && product.options.map((option) => (
              <div key={option.name} className="space-y-2">
                <label className="text-sm font-medium text-foreground">{option.name}</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((variant, idx) => {
                    const optValue = variant.node.selectedOptions.find(o => o.name === option.name)?.value;
                    return (
                      <button
                        key={variant.node.id}
                        onClick={() => setSelectedVariantIdx(idx)}
                        disabled={!variant.node.availableForSale}
                        className={`px-4 py-2 rounded-md text-sm border transition-all ${
                          idx === selectedVariantIdx
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-muted-foreground'
                        } ${!variant.node.availableForSale ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                      >
                        {optValue || variant.node.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <Button
              size="lg"
              className="w-full gap-2 text-base"
              onClick={handleAddToCart}
              disabled={isLoading || !selectedVariant?.availableForSale}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
              {selectedVariant?.availableForSale ? 'Adicionar ao Carrinho' : 'Indisponível'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
