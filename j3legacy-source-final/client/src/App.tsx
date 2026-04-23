import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ServiceDetail from "./pages/ServiceDetail";

// Hash-based routing for GitHub Pages compatibility.
// URLs will be: j3legacy.tech/#/services/managed-it
// This avoids 404s when refreshing or directly accessing sub-routes on GitHub Pages.

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router hook={useHashLocation}>
            <Routes />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
