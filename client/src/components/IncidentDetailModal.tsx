import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Download,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  Zap,
  FileText,
} from "lucide-react";

/**
 * IncidentDetailModal Component
 * 
 * Displays comprehensive incident details including:
 * - Full threat information
 * - Timeline of events
 * - Remediation actions
 * - Evidence links
 * - Export options
 */

interface IncidentDetail {
  id: string;
  timestamp: Date;
  severity: string;
  title: string;
  description: string;
  source: string;
  status: string;
  details?: {
    affectedResources?: string[];
    rootCause?: string;
    detectionMethod?: string;
    remediationSteps?: string[];
    forensicSnapshot?: string;
  };
}

interface IncidentDetailModalProps {
  open: boolean;
  incident: IncidentDetail | null;
  onClose: () => void;
  onExport?: (incident: IncidentDetail) => void;
}

export default function IncidentDetailModal({
  open,
  incident,
  onClose,
  onExport,
}: IncidentDetailModalProps) {
  const [exporting, setExporting] = useState(false);

  if (!incident) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-950 text-neon-red border-neon-red/30";
      case "high":
        return "bg-orange-950 text-orange-warning border-orange-warning/30";
      case "medium":
        return "bg-cyan-950 text-cyan-accent border-cyan-accent/30";
      case "low":
        return "bg-green-950 text-neon-green border-neon-green/30";
      default:
        return "bg-gray-800 text-gray-300 border-gray-600/30";
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-900/40 text-neon-red border-neon-red/50";
      case "high":
        return "bg-orange-900/40 text-orange-warning border-orange-warning/50";
      case "medium":
        return "bg-cyan-900/40 text-cyan-accent border-cyan-accent/50";
      case "low":
        return "bg-green-900/40 text-neon-green border-neon-green/50";
      default:
        return "bg-gray-900/40 text-gray-300 border-gray-600/50";
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      if (onExport) {
        onExport(incident);
      }
    } finally {
      setExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground font-mono mb-2">
                {incident.title}
              </DialogTitle>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className={getSeverityBadgeColor(incident.severity)}>
                  {incident.severity.toUpperCase()}
                </Badge>
                <Badge className="bg-secondary text-muted-foreground border-border">
                  {incident.source}
                </Badge>
                {incident.status === "auto-remediated" ? (
                  <Badge className="bg-green-900/30 text-neon-green border-neon-green/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Auto-Remediated
                  </Badge>
                ) : (
                  <Badge className="bg-red-900/30 text-neon-red border-neon-red/30">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Incident Summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground font-mono">
              Incident Summary
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              {incident.description}
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-neon-blue" />
              Timeline
            </h3>
            <div className="bg-secondary rounded-lg p-4 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-mono">
                  Detection Time
                </span>
                <span className="text-sm text-foreground font-mono">
                  {incident.timestamp.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground font-mono">
                  Detection Source
                </span>
                <span className="text-sm text-foreground font-mono">
                  {incident.source}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground font-mono">
                  Time Since Detection
                </span>
                <span className="text-sm text-neon-blue font-mono">
                  {Math.floor((Date.now() - incident.timestamp.getTime()) / 60000)} minutes ago
                </span>
              </div>
            </div>
          </div>

          {/* Affected Resources */}
          {incident.details?.affectedResources && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground font-mono flex items-center gap-2">
                <Shield className="w-4 h-4 text-neon-blue" />
                Affected Resources
              </h3>
              <div className="bg-secondary rounded-lg p-4 border border-border">
                <ul className="space-y-2">
                  {incident.details.affectedResources.map((resource, index) => (
                    <li key={index} className="text-sm text-foreground font-mono">
                      • {resource}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Root Cause */}
          {incident.details?.rootCause && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-warning" />
                Root Cause
              </h3>
              <div className="bg-secondary rounded-lg p-4 border border-border">
                <p className="text-sm text-foreground leading-relaxed">
                  {incident.details.rootCause}
                </p>
              </div>
            </div>
          )}

          {/* Detection Method */}
          {incident.details?.detectionMethod && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground font-mono flex items-center gap-2">
                <Zap className="w-4 h-4 text-neon-blue" />
                Detection Method
              </h3>
              <div className="bg-secondary rounded-lg p-4 border border-border">
                <p className="text-sm text-foreground">{incident.details.detectionMethod}</p>
              </div>
            </div>
          )}

          {/* Remediation Steps */}
          {incident.details?.remediationSteps && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neon-green" />
                Remediation Steps
              </h3>
              <div className="bg-secondary rounded-lg p-4 border border-border">
                <ol className="space-y-2">
                  {incident.details.remediationSteps.map((step, index) => (
                    <li key={index} className="text-sm text-foreground font-mono">
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Forensic Evidence */}
          {incident.details?.forensicSnapshot && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-neon-blue" />
                Forensic Evidence
              </h3>
              <div className="bg-secondary rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-mono">
                    Snapshot ID
                  </span>
                  <code className="text-xs text-foreground bg-background px-2 py-1 rounded border border-border font-mono">
                    {incident.details.forensicSnapshot}
                  </code>
                </div>
                <p className="text-xs text-muted-foreground mt-3 font-mono">
                  Stored in WORM S3 bucket with 7-year retention policy
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              onClick={handleExport}
              disabled={exporting}
              className="flex-1 bg-neon-blue hover:bg-neon-blue/80 text-primary-foreground font-mono"
            >
              <Download className="w-4 h-4 mr-2" />
              {exporting ? "Exporting..." : "Export as PDF"}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-secondary font-mono"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
