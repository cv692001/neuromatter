import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import OfferingsPage from "./pages/OfferingsPage";
import TechnologyPage from "./pages/TechnologyPage";
import NewsPage from "./pages/NewsPage";
import BestNeuromarketingAgencyPage from "./pages/BestNeuromarketingAgencyPage";
import BestCROAgencyPage from "./pages/BestCROAgencyPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/offerings" element={<OfferingsPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route
            path="/best-neuromarketing-agency-india"
            element={<BestNeuromarketingAgencyPage />}
          />
          <Route
            path="/best-conversion-rate-optimization-agencies-india"
            element={<BestCROAgencyPage />}
          />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
