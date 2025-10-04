import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Farms from "./pages/Farms";
import Advisory from "./pages/Advisory";
import Expenses from "./pages/Expenses";
import Storage from "./pages/Storage";
import SeasonalCalendar from "./pages/SeasonalCalendar";
import SuccessStories from "./pages/SuccessStories";
import FarmingGuides from "./pages/FarmingGuides";
import NotFound from "./pages/NotFound";
import { OfflineIndicator } from "./components/OfflineIndicator";

const queryClient = new QueryClient();

const App = () => {
  // Register service worker for offline functionality (development only)
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OfflineIndicator />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/advisory" element={<Advisory />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/calendar" element={<SeasonalCalendar />} />
            <Route path="/stories" element={<SuccessStories />} />
            <Route path="/guides" element={<FarmingGuides />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
