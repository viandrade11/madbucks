import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCartSync } from "@/hooks/useCartSync";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Index from "./pages/Index.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Collection from "./pages/Collection.tsx";
import B2B from "./pages/B2B.tsx";
import B2BApresentacao from "./pages/B2BApresentacao.tsx";
import TabelaPrecos from "./pages/TabelaPrecos.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/collections" element={<Collection />} />
      <Route path="/colecao" element={<Collection />} />
      <Route path="/products/:handle" element={<ProductDetail />} />
      <Route path="/produto/:handle" element={<ProductDetail />} />
      <Route path="/b2b" element={<B2B />} />
      <Route path="/para-empresas" element={<B2B />} />
      <Route path="/b2b/apresentacao" element={<B2BApresentacao />} />
      <Route path="/b2b/deck" element={<B2BApresentacao />} />
      <Route path="/b2b/tabela-precos" element={<TabelaPrecos />} />
      <Route path="/tabela-precos" element={<TabelaPrecos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
