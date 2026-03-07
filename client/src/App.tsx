import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SOAR from "./pages/SOAR";
import Insights from "./pages/Insights";
import Evidence from "./pages/Evidence";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import DashboardLayout from "./components/DashboardLayout";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
      <Route path="/soar" component={SOAR} />
      <Route path="/insights" component={Insights} />
      <Route path="/evidence" component={Evidence} />
      <Route path="/profile" component={Profile} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AppWithLayout() {
  return (
    <DashboardLayout>
      <Router />
    </DashboardLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <AppWithLayout />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
