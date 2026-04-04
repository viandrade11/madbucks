import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";
import { PriceDisplay } from "@/components/PriceDisplay";
import { UpsellSection } from "@/components/UpsellSection";
import { useEffect } from "react";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const currency = items[0]?.price.currencyCode || 'BRL';

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  const cartHandles = items.map((item) => item.product.node.handle);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative text-foreground hover:text-muted-foreground transition-colors">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-foreground text-background text-[10px] flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-border">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-lg font-extrabold uppercase tracking-[0.15em]">Carrinho</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Seu carrinho está vazio" : `${totalItems} ${totalItems !== 1 ? 'itens' : 'item'}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Seu carrinho está vazio</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto min-h-0 space-y-3">
                {items.map((item) => {
                  const variant = item.product.node.variants.edges.find(
                    (v) => v.node.id === item.variantId
                  )?.node;
                  return (
                    <div key={item.variantId} className="flex gap-3 py-3 border-b border-border">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold uppercase tracking-wider truncate">{item.product.node.title}</h4>
                        {item.selectedOptions.length > 0 && item.selectedOptions[0].value !== 'Default Title' && (
                          <p className="text-[10px] text-muted-foreground mt-0.5">{item.selectedOptions.map(o => o.value).join(' • ')}</p>
                        )}
                        <PriceDisplay
                          amount={item.price.amount}
                          currencyCode={item.price.currencyCode}
                          compareAtAmount={variant?.compareAtPrice?.amount}
                          size="sm"
                          className="mt-1"
                        />
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <button className="text-muted-foreground hover:text-foreground" onClick={() => removeItem(item.variantId)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <div className="flex items-center gap-1 border border-border">
                          <button className="h-6 w-6 flex items-center justify-center hover:bg-muted" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                          <button className="h-6 w-6 flex items-center justify-center hover:bg-muted" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Upsell in cart */}
                <div className="pt-4 pb-2">
                  <UpsellSection compact title="Você também vai gostar" />
                </div>
              </div>
              <div className="flex-shrink-0 space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider">Total</span>
                  <span className="text-lg font-extrabold">{formatPrice(totalPrice.toString(), currency)}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full rounded-none h-12 text-xs uppercase tracking-[0.2em] font-bold" disabled={items.length === 0 || isLoading || isSyncing}>
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-3 h-3 mr-2" />Finalizar Compra</>}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
  const currency = items[0]?.price.currencyCode || 'BRL';

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative text-foreground hover:text-muted-foreground transition-colors">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-foreground text-background text-[10px] flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-border">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-lg font-extrabold uppercase tracking-[0.15em]">Carrinho</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Seu carrinho está vazio" : `${totalItems} ${totalItems !== 1 ? 'itens' : 'item'}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Seu carrinho está vazio</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto min-h-0 space-y-3">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-3 py-3 border-b border-border">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold uppercase tracking-wider truncate">{item.product.node.title}</h4>
                      {item.selectedOptions.length > 0 && item.selectedOptions[0].value !== 'Default Title' && (
                        <p className="text-[10px] text-muted-foreground mt-0.5">{item.selectedOptions.map(o => o.value).join(' • ')}</p>
                      )}
                      <p className="font-bold text-sm mt-1">{formatPrice(item.price.amount, item.price.currencyCode)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <button className="text-muted-foreground hover:text-foreground" onClick={() => removeItem(item.variantId)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <div className="flex items-center gap-1 border border-border">
                        <button className="h-6 w-6 flex items-center justify-center hover:bg-muted" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                        <button className="h-6 w-6 flex items-center justify-center hover:bg-muted" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-shrink-0 space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider">Total</span>
                  <span className="text-lg font-extrabold">{formatPrice(totalPrice.toString(), currency)}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full rounded-none h-12 text-xs uppercase tracking-[0.2em] font-bold" disabled={items.length === 0 || isLoading || isSyncing}>
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-3 h-3 mr-2" />Finalizar Compra</>}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
