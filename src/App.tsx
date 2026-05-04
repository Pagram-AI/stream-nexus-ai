import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Documentation from "./pages/Documentation.tsx";
import NotFound from "./pages/NotFound.tsx";
import NodeDashboard from "./pages/NodeDashboard.tsx";
import RunNode from "./pages/RunNode.tsx";
import ConnectWallet from "./pages/ConnectWallet.tsx";
import SupportChat from "./components/SupportChat.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/run-node" element={<RunNode />} />
          <Route path="/node-dashboard" element={<NodeDashboard />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SupportChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
