import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, LogOut, Shield, Clock, FileText } from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";

/**
 * User Profile Page - Analyst Information & Audit Trail
 * 
 * Displays:
 * - Current user information
 * - Analyst profile (department, expertise, certifications)
 * - Recent audit log of actions
 * - Session management
 */
export default function Profile() {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  // Get user profile and audit logs
  const { data: profileData, isLoading: profileLoading } = trpc.profile.getUserInfo.useQuery();
  const { data: auditLogs, isLoading: logsLoading } = trpc.audit.getLogs.useQuery({ limit: 20 });

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-neon-blue animate-spin" />
      </div>
    );
  }

  const analystProfile = profileData?.profile;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground font-mono">
          Profile
        </h1>
        <p className="text-muted-foreground">
          Analyst information and activity audit trail
        </p>
      </div>

      {/* User Information Card */}
      <Card className="bg-card border-border p-8 glow-blue">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-neon-blue/20 rounded-lg border border-neon-blue/30">
                <User className="w-6 h-6 text-neon-blue" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground font-mono">
                  {user?.name || "Analyst"}
                </h2>
                <p className="text-muted-foreground font-mono mt-1">
                  {user?.email}
                </p>
              </div>
            </div>
            <Badge
              className={`${
                user?.role === "admin"
                  ? "bg-neon-red/20 text-neon-red border-neon-red/50"
                  : "bg-neon-blue/20 text-neon-blue border-neon-blue/50"
              }`}
            >
              {user?.role?.toUpperCase()}
            </Badge>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-1">
                User ID
              </p>
              <p className="text-sm text-foreground font-mono">{user?.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-1">
                Login Method
              </p>
              <p className="text-sm text-foreground font-mono">
                {user?.loginMethod || "OAuth"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-1">
                Member Since
              </p>
              <p className="text-sm text-foreground font-mono">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-mono mb-1">
                Last Signed In
              </p>
              <p className="text-sm text-foreground font-mono">
                {user?.lastSignedIn
                  ? new Date(user.lastSignedIn).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-6 border-t border-border">
            <Button
              onClick={handleLogout}
              disabled={loggingOut}
              variant="outline"
              className="border-neon-red/30 text-neon-red hover:bg-neon-red/10 font-mono"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {loggingOut ? "Logging out..." : "Sign Out"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Analyst Profile Card */}
      {analystProfile ? (
        <Card className="bg-card border-border p-8">
          <h2 className="text-lg font-bold text-foreground font-mono mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-neon-green" />
            Analyst Profile
          </h2>

          <div className="space-y-4">
            {analystProfile.department && (
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  Department
                </p>
                <p className="text-sm text-foreground">{analystProfile.department}</p>
              </div>
            )}

            {analystProfile.title && (
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  Title
                </p>
                <p className="text-sm text-foreground">{analystProfile.title}</p>
              </div>
            )}

            {(analystProfile.expertise as any)?.length > 0 ? (
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-2">
                  Expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  {(analystProfile.expertise as string[]).map((skill, idx) => (
                    <Badge
                      key={idx}
                      className="bg-neon-blue/20 text-neon-blue border-neon-blue/50"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            {(analystProfile.certifications as any)?.length > 0 ? (
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-2">
                  Certifications
                </p>
                <div className="flex flex-wrap gap-2">
                  {(analystProfile.certifications as string[]).map((cert, idx) => (
                    <Badge
                      key={idx}
                      className="bg-neon-green/20 text-neon-green border-neon-green/50"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            {analystProfile.totalIncidentsHandled !== undefined && (
              <div className="pt-4 border-t border-border grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">
                    Incidents Handled
                  </p>
                  <p className="text-lg font-bold text-neon-blue font-mono">
                    {analystProfile.totalIncidentsHandled}
                  </p>
                </div>
                {analystProfile.averageResolutionTime && (
                  <div>
                    <p className="text-xs text-muted-foreground font-mono mb-1">
                      Avg Resolution Time
                    </p>
                    <p className="text-lg font-bold text-neon-green font-mono">
                      {Math.floor(analystProfile.averageResolutionTime / 60)}m
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      ) : null}

      {/* Audit Log */}
      <Card className="bg-card border-border p-8">
        <h2 className="text-lg font-bold text-foreground font-mono mb-6 flex items-center gap-2">
          <FileText className="w-5 h-5 text-neon-blue" />
          Recent Activity
        </h2>

        {logsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-neon-blue animate-spin" />
          </div>
        ) : auditLogs && auditLogs.length > 0 ? (
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between gap-4 p-4 bg-secondary rounded-lg border border-border hover:border-neon-blue/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground font-mono">
                      {log.action.replace(/_/g, " ").toUpperCase()}
                    </h3>
                    {log.resourceType && (
                      <Badge className="text-xs bg-neon-blue/20 text-neon-blue border-neon-blue/50">
                        {log.resourceType}
                      </Badge>
                    )}
                  </div>
                  {log.page && (
                    <p className="text-xs text-muted-foreground font-mono mb-2">
                      Page: {log.page}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                    {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                  </div>
                </div>
                <Badge
                  className={`${
                    log.status === "success"
                      ? "bg-neon-green/20 text-neon-green border-neon-green/50"
                      : "bg-neon-red/20 text-neon-red border-neon-red/50"
                  }`}
                >
                  {log.status}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground font-mono">No activity recorded yet</p>
          </div>
        )}
      </Card>
    </div>
  );
}
