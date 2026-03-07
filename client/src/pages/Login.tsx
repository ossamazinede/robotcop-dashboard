import { useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Zap } from "lucide-react";
import { Loader2 } from "lucide-react";

/**
 * Login Page - Manus OAuth Integration
 * 
 * Handles authentication flow and redirects to dashboard on successful login
 */
export default function Login() {
  const { user, loading, isAuthenticated } = useAuth();

  // Auto-redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      window.location.href = "/";
    }
  }, [isAuthenticated, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-neon-blue animate-spin" />
          <p className="text-muted-foreground font-mono">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center p-4">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-neon-blue/20 rounded-lg border border-neon-blue/30">
              <Shield className="w-6 h-6 text-neon-blue" />
            </div>
            <h1 className="text-3xl font-bold text-foreground font-mono">
              RobotCop
            </h1>
          </div>
          <p className="text-muted-foreground font-mono">
            The Cognitive Cloud Guardian
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            DevSecOps • CSPM • SOAR
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-card border-border p-8 glow-blue">
          <div className="space-y-6">
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground font-mono">
                    Real-Time Threat Detection
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    AI-powered anomaly detection with sub-second response times
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground font-mono">
                    Secure Access Control
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    OAuth-based authentication with audit logging
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground font-mono">
                    Compliance Evidence
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    NIST, ISO, CIS, SOC 2 compliance tracking
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-card text-muted-foreground">
                  Sign in to continue
                </span>
              </div>
            </div>

            {/* Login Button */}
            <Button
              onClick={() => {
                window.location.href = getLoginUrl();
              }}
              className="w-full bg-neon-blue hover:bg-neon-blue/80 text-primary-foreground font-mono h-10"
            >
              Sign in with Manus OAuth
            </Button>

            {/* Info Text */}
            <p className="text-xs text-muted-foreground text-center font-mono">
              By signing in, you agree to the Terms of Service and Privacy Policy
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Powered by Amazon Bedrock • AWS Security Hub • GuardDuty
          </p>
        </div>
      </div>
    </div>
  );
}
