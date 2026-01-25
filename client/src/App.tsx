import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LoadingScreen } from "@/components/LoadingScreen";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Contact from "@/pages/contact";
import WorkWithUs from "@/pages/work-with-us";
import About from "@/pages/about";
import ClientPortfolio from "@/pages/client-portfolio";
import Admin from "@/pages/admin";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Launch from "@/pages/launch";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/work-with-us" component={WorkWithUs} />
      <Route path="/about" component={About} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/client/:id">
        {(params) => <ClientPortfolio clientId={params.id} />}
      </Route>
      <Route path="/launch" component={Launch} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  // Only show loading screen once per session - check globally in App
  const [showLoadingScreen, setShowLoadingScreen] = useState(() => {
    if (typeof window !== "undefined") {
      const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
      return !hasSeenIntro; // Show loading if user hasn't seen intro
    }
    return true;
  });

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasSeenIntro", "true");
    }
  };

  // Skip intro LoadingScreen on /launch page (it handles its own loading)
  const isLaunchPage = location === "/launch";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {showLoadingScreen && !isLaunchPage && <LoadingScreen onComplete={handleLoadingComplete} />}
        {(!showLoadingScreen || isLaunchPage) && (
          <>
            <Router />
            {location !== "/admin" && location !== "/launch" && <WhatsAppButton />}
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
