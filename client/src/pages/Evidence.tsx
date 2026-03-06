import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Database,
  CheckCircle2,
  AlertTriangle,
  Download,
  Eye,
  Shield,
} from "lucide-react";
import {
  mockWORMStorageStatus,
  mockS3BucketMetrics,
  mockComplianceFrameworks,
} from "@/lib/mockData";

/**
 * Architecture & Evidence Vault Page
 * 
 * Design: Dark SOC aesthetic with security/compliance focus
 * - WORM Storage Status: Immutable forensic snapshots
 * - S3 Bucket Metrics: Encryption, versioning, access control
 * - Compliance Frameworks: NIST, ISO, CIS, SOC 2
 */

export default function Evidence() {
  const wormStatus = useMemo(() => {
    return mockWORMStorageStatus;
  }, []);

  const s3Metrics = useMemo(() => {
    return mockS3BucketMetrics;
  }, []);

  const complianceFrameworks = useMemo(() => {
    return mockComplianceFrameworks;
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground font-mono">
          Evidence Vault
        </h1>
        <p className="text-muted-foreground">
          Immutable forensic storage and compliance evidence management
        </p>
      </div>

      {/* WORM Storage Status */}
      <Card className="bg-card border-border p-8 glow-green">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground font-mono mb-2">
                WORM Storage Status
              </h2>
              <p className="text-sm text-muted-foreground font-mono">
                {wormStatus.bucketName} ({wormStatus.region})
              </p>
            </div>
            <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Operational
            </Badge>
          </div>

          {/* Storage Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-secondary rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground font-mono mb-2">
                Total Snapshots
              </p>
              <p className="text-2xl font-bold text-foreground font-mono">
                {wormStatus.totalSnapshots}
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground font-mono mb-2">
                Total Size
              </p>
              <p className="text-2xl font-bold text-foreground font-mono">
                {wormStatus.totalSize}
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground font-mono mb-2">
                Encryption
              </p>
              <p className="text-sm font-bold text-foreground font-mono">
                {wormStatus.encryption}
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-4 border border-neon-green/30">
              <p className="text-xs text-muted-foreground font-mono mb-2">
                Object Lock
              </p>
              <p className="text-sm font-bold text-neon-green font-mono">
                {wormStatus.objectLock.enabled ? "ENABLED" : "DISABLED"}
              </p>
            </div>
          </div>

          {/* Object Lock Details */}
          <div className="bg-secondary rounded-lg p-6 border border-border space-y-4">
            <h3 className="text-sm font-bold text-foreground font-mono flex items-center gap-2">
              <Lock className="w-4 h-4 text-neon-green" />
              Object Lock Configuration
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  Mode
                </p>
                <p className="text-sm text-foreground font-mono">
                  {wormStatus.objectLock.mode}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  Retention Period
                </p>
                <p className="text-sm text-foreground font-mono">
                  {wormStatus.objectLock.retentionDays} days (7 years)
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-mono pt-4 border-t border-border">
              Objects cannot be deleted or modified once locked. Compliance mode prevents even root user deletion.
            </p>
          </div>

          {/* Latest Snapshot */}
          <div className="bg-gradient-to-r from-neon-green/10 to-neon-blue/10 rounded-lg p-6 border border-neon-green/20">
            <h3 className="text-sm font-bold text-foreground font-mono mb-4">
              Latest Forensic Snapshot
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  Snapshot ID
                </p>
                <p className="text-sm text-foreground font-mono break-all">
                  {wormStatus.lastSnapshot.id}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  Size
                </p>
                <p className="text-sm text-foreground font-mono">
                  {wormStatus.lastSnapshot.size}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  Type
                </p>
                <p className="text-sm text-foreground font-mono">
                  {wormStatus.lastSnapshot.type}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  Incident
                </p>
                <p className="text-sm text-foreground font-mono">
                  {wormStatus.lastSnapshot.incidentId}
                </p>
              </div>
            </div>
          </div>

          {/* Access Log */}
          <div className="bg-secondary rounded-lg p-6 border border-border space-y-4">
            <h3 className="text-sm font-bold text-foreground font-mono flex items-center gap-2">
              <Eye className="w-4 h-4 text-neon-blue" />
              Access Log
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-mono">
                  Last Access
                </span>
                <span className="text-sm text-foreground font-mono">
                  {wormStatus.accessLog.lastAccess.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-mono">
                  Access Count (24h)
                </span>
                <span className="text-sm text-foreground font-mono">
                  {wormStatus.accessLog.accessCount}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground font-mono">
                  Authorized Users
                </span>
                <span className="text-sm text-foreground font-mono">
                  {wormStatus.accessLog.authorizedUsers.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* S3 Bucket Metrics */}
      <Card className="bg-card border-border p-8">
        <h2 className="text-lg font-bold text-foreground font-mono mb-6">
          S3 Bucket Compliance Status
        </h2>
        <div className="space-y-4">
          {s3Metrics.map((bucket, index) => (
            <div
              key={index}
              className="bg-secondary rounded-lg p-6 border border-border hover:border-neon-blue/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground font-mono mb-1">
                    {bucket.bucket}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    {bucket.size} • {bucket.objectCount} objects
                  </p>
                </div>
                <Badge
                  className={`${
                    bucket.status === "compliant"
                      ? "bg-neon-green/20 text-neon-green border-neon-green/50"
                      : "bg-neon-red/20 text-neon-red border-neon-red/50"
                  }`}
                >
                  {bucket.status === "compliant" ? "✓" : "⚠"} {bucket.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-neon-blue" />
                  <span className="text-muted-foreground font-mono">{bucket.encryption}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-neon-green" />
                  <span className="text-muted-foreground font-mono">
                    {bucket.versioningEnabled ? "Versioning" : "No Versioning"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-neon-blue" />
                  <span className="text-muted-foreground font-mono">
                    {bucket.publicAccess ? "Public" : "Private"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-neon-blue" />
                  <span className="text-muted-foreground font-mono">Replication</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-neon-green" />
                  <span className="text-muted-foreground font-mono">Object Lock</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Compliance Frameworks */}
      <Card className="bg-card border-border p-8">
        <h2 className="text-lg font-bold text-foreground font-mono mb-6">
          Compliance Frameworks
        </h2>
        <div className="space-y-4">
          {complianceFrameworks.map((framework, index) => (
            <div
              key={index}
              className="bg-secondary rounded-lg p-6 border border-border hover:border-neon-blue/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground font-mono mb-1">
                    {framework.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Last audit:{" "}
                    {Math.floor(
                      (Date.now() - framework.lastAudit.getTime()) / (24 * 60 * 60000)
                    )}{" "}
                    days ago
                  </p>
                </div>
                <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
                  ✓ {framework.status.toUpperCase()}
                </Badge>
              </div>

              {/* Compliance Score Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">
                    Compliance Score
                  </span>
                  <span className="text-sm font-bold text-neon-green font-mono">
                    {framework.score}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-green"
                    style={{ width: `${framework.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Forensic Evidence Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border p-6">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono">
              Evidence Integrity
            </p>
            <p className="text-3xl font-bold text-neon-green font-mono">100%</p>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              All snapshots verified and immutable
            </p>
          </div>
        </Card>
        <Card className="bg-card border-border p-6">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono">
              Encryption Coverage
            </p>
            <p className="text-3xl font-bold text-neon-blue font-mono">100%</p>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              All data encrypted at rest and in transit
            </p>
          </div>
        </Card>
        <Card className="bg-card border-border p-6">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono">
              Access Control
            </p>
            <p className="text-3xl font-bold text-neon-green font-mono">3</p>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              Authorized forensics analysts
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
