import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import GuideLayout from "./layouts/GuideLayout";
import RootLayout from "./layouts/RootLayout";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/guide/:guideId" element={<GuideLayout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App;