
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import UrlManager from "./pages/UrlManager";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoutes from "./components/ProtectedRoutes";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);
  
  return null;
};

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/manage" element={<ProtectedRoutes><UrlManager /></ProtectedRoutes>} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
