import { useState } from "react";
import { Menu, X, Shield, BarChart3, Zap, Brain, Archive } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * DashboardLayout Component
 * 
 * Design Philosophy: "Cognitive Autonomy in the Shadows"
 * - Dark SOC aesthetic with neon accents (blue for AI, red for critical, green for safe)
 * - Persistent sidebar navigation with collapsible state
 * - Top header with branding and system status
 * - Responsive design: sidebar collapses on mobile
 */

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    {
      label: "Overview",
      href: "/",
      icon: Shield,
      description: "The Brain - Centralization",
    },
    {
      label: "Automated Response",
      href: "/soar",
      icon: Zap,
      description: "The Muscle - Automation",
    },
    {
      label: "AI Insights",
      href: "/insights",
      icon: Brain,
      description: "The Wisdom - Cognitive",
    },
    {
      label: "Evidence Vault",
      href: "/evidence",
      icon: Archive,
      description: "Architecture & WORM Storage",
    },
  ];

  // Get current path for active state
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 ${
          sidebarOpen ? "w-80" : "w-20"
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-purple-cognitive rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-sidebar-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground font-mono">RobotCop</h1>
                <p className="text-xs text-muted-foreground">SOC Dashboard</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group block ${
                  currentPath === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : sidebarOpen
                      ? "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0 text-neon-blue group-hover:text-neon-blue" />
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-sidebar-foreground truncate">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="border-t border-sidebar-border p-4 space-y-2">
            <p className="text-xs text-muted-foreground font-mono">
              System Status: <span className="text-neon-green">OPERATIONAL</span>
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              Last Sync: <span className="text-neon-blue">2 min ago</span>
            </p>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-80" : "ml-20"}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-card border-b border-border">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <BarChart3 className="w-6 h-6 text-neon-blue" />
              <h2 className="text-2xl font-bold text-foreground font-mono">
                Security Operations Center
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground font-mono">
                  All Systems Nominal
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
