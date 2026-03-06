import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  GitBranch,
  Download,
  RefreshCw,
} from "lucide-react";
import {
  mockIncidentTimeline,
  mockKillSwitchStatus,
  mockDriftDetection,
} from "@/lib/mockData";
import IncidentDetailModal from "@/components/IncidentDetailModal";
import { exportIncidentPDF } from "@/lib/pdfExport";

/**
 * Automated Response & SOAR Page - "The Muscle"
 * 
 * Design: Dark SOC aesthetic with automation focus
 * - Incident Timeline: Lifecycle of recent incident
 * - Kill Switch Visualizer: AWS Step Functions orchestration
 * - Drift Detection: Terraform IaC vs actual AWS state
 */

export default function SOAR() {
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const incidentTimeline = useMemo(() => {
    return mockIncidentTimeline;
  }, []);

  const killSwitchStatus = useMemo(() => {
    return mockKillSwitchStatus;
  }, []);

  const driftDetection = useMemo(() => {
    return mockDriftDetection;
  }, []);

  const handleTimelineClick = (incident: any) => {
    const incidentDetail = {
      id: incident.phase,
      timestamp: incident.timestamp,
      severity: "high",
      title: incident.description,
      description: `Incident phase: ${incident.phase}`,
      source: "RobotCop SOAR",
      status: incident.status,
      details: {
        affectedResources: ["prod-api-user", "i-0a1b2c3d4e5f6g7h8"],
        rootCause: "Compromised IAM credentials exposed in GitHub repository",
        detectionMethod: "GuardDuty anomaly detection + DevOps Guru pattern matching",
        remediationSteps: [
          "Revoke all active IAM sessions",
          "Apply deny-all security group rules",
          "Isolate affected EC2 instance",
          "Create forensic snapshot",
          "Rotate all compromised credentials",
        ],
        forensicSnapshot: `snap-forensic-${incident.timestamp.getTime()}`,
      },
    };
    setSelectedIncident(incidentDetail);
    setModalOpen(true);
  };

  const handleExportIncident = (incident: any) => {
    exportIncidentPDF({
      id: incident.id,
      timestamp: incident.timestamp,
      severity: incident.severity,
      title: incident.title,
      description: incident.description,
      source: incident.source,
      status: incident.status,
      details: incident.details,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-neon-green";
      case "in-progress":
        return "text-neon-blue";
      case "failed":
        return "text-neon-red";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-900/30 border-neon-green/30";
      case "in-progress":
        return "bg-blue-900/30 border-neon-blue/30";
      case "failed":
        return "bg-red-900/30 border-neon-red/30";
      default:
        return "bg-gray-900/30 border-gray-600/30";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground font-mono">
          The Muscle
        </h1>
        <p className="text-muted-foreground">
          Automated incident response orchestration and infrastructure compliance
        </p>
      </div>

      {/* Incident Timeline */}
      <Card className="bg-card border-border p-8">
        <h2 className="text-lg font-bold text-foreground font-mono mb-6">
          Incident Response Timeline
        </h2>
        <div className="space-y-4">
          {incidentTimeline.map((incident, index) => (
            <div
              key={incident.phase}
              className={`flex gap-4 pb-4 cursor-pointer transition-all hover:bg-secondary rounded-lg p-3 ${
                index !== incidentTimeline.length - 1 ? "border-b border-border" : ""
              }`}
              onClick={() => handleTimelineClick(incident)}
            >
              {/* Timeline Marker */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    incident.status === "completed"
                      ? "bg-neon-green"
                      : incident.status === "in-progress"
                        ? "bg-neon-blue"
                        : "bg-neon-red"
                  }`}
                />
                {index !== incidentTimeline.length - 1 && (
                  <div className="w-0.5 h-16 bg-border mt-2" />
                )}
              </div>

              {/* Incident Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground font-mono">
                        {incident.phase}
                      </h3>
                      <Badge
                        className={`text-xs font-mono ${
                          incident.status === "completed"
                            ? "bg-green-900/40 text-neon-green border-neon-green/50"
                            : incident.status === "in-progress"
                              ? "bg-blue-900/40 text-neon-blue border-neon-blue/50"
                              : "bg-red-900/40 text-neon-red border-neon-red/50"
                        }`}
                      >
                        {incident.status?.toUpperCase() || "UNKNOWN"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {incident.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                      <span>
                        {incident.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                      <span>Duration: {incident.duration}</span>
                    </div>
                  </div>

                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {incident.status === "completed" ? (
                      <CheckCircle2 className="w-5 h-5 text-neon-green" />
                    ) : incident.status === "in-progress" ? (
                      <RefreshCw className="w-5 h-5 text-neon-blue animate-spin" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-neon-red" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Kill Switch Visualizer */}
      <Card className="bg-card border-border p-8 glow-blue">
        <h2 className="text-lg font-bold text-foreground font-mono mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-neon-blue" />
          Kill Switch Orchestration
        </h2>
        <p className="text-sm text-muted-foreground mb-6 font-mono">
          AWS Step Functions execution: {mockKillSwitchStatus.incidentId}
        </p>

        {/* Step Flow */}
        <div className="space-y-3">
          {mockKillSwitchStatus.steps.map((step, index) => (
            <div key={step.id} className="space-y-3">
              {/* Step Card */}
              <div
                className={`rounded-lg p-4 border transition-all ${getStatusBgColor(step.status)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className={`text-sm font-bold font-mono ${getStatusColor(step.status)}`}>
                      {step.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      {step.details}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-mono">
                      <span>
                        {step.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {step.status === "completed" ? (
                      <CheckCircle2 className="w-5 h-5 text-neon-green" />
                    ) : step.status === "in-progress" ? (
                      <RefreshCw className="w-5 h-5 text-neon-blue animate-spin" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-neon-red" />
                    )}
                  </div>
                </div>
              </div>

              {/* Arrow to next step */}
              {index !== mockKillSwitchStatus.steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="text-neon-blue font-mono text-lg">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Execution Summary */}
        <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-mono mb-1">
              Total Duration
            </p>
            <p className="text-lg font-bold text-neon-blue font-mono">
              {(mockKillSwitchStatus.executionTime / 1000).toFixed(1)}s
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-mono mb-1">
              Steps Completed
            </p>
            <p className="text-lg font-bold text-neon-green font-mono">
              {mockKillSwitchStatus.steps.filter((s) => s.status === "completed").length}/
              {mockKillSwitchStatus.steps.length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-mono mb-1">
              Status
            </p>
            <p className="text-lg font-bold text-neon-green font-mono">
              {mockKillSwitchStatus.status?.toUpperCase() || "UNKNOWN"}
            </p>
          </div>
        </div>
      </Card>

      {/* Drift Detection */}
      <Card className="bg-card border-border p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground font-mono flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-neon-blue" />
            Infrastructure Drift Detection
          </h2>
          <Badge
            className={`${
              driftDetection.driftCount > 0
                ? "bg-red-900/40 text-neon-red border-neon-red/50"
                : "bg-green-900/40 text-neon-green border-neon-green/50"
            }`}
          >
            {driftDetection.driftCount > 0 ? "DRIFT DETECTED" : "IN SYNC"}
          </Badge>
        </div>

        {/* Drift Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-mono mb-1">Total Resources</p>
            <p className="text-2xl font-bold text-foreground font-mono">
              {driftDetection.resources.total}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-mono mb-1">Compliant</p>
            <p className="text-2xl font-bold text-neon-green font-mono">
              {driftDetection.resources.compliant}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-mono mb-1">Drifted</p>
            <p className="text-2xl font-bold text-neon-red font-mono">
              {driftDetection.resources.drifted}
            </p>
          </div>
        </div>

        {/* Drift Details */}
        <div className="space-y-4">
          {driftDetection.resources.drifted > 0 ? (
            <div className="rounded-lg p-4 border bg-red-900/20 border-neon-red/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-neon-red flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground font-mono mb-1">
                    Drift Detected
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {driftDetection.driftCount} resource(s) have diverged from Terraform state.
                    This may indicate manual changes or infrastructure modifications outside of IaC.
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    Last checked: {driftDetection.lastCheck.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg p-4 border bg-green-900/20 border-neon-green/30">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground font-mono mb-1">
                    All Resources In Sync
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Infrastructure matches Terraform configuration. No drift detected.
                  </p>
                  <p className="text-xs text-muted-foreground font-mono mt-2">
                    Next check: {driftDetection.nextCheck.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Configuration Info */}
        <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground font-mono mb-1">Terraform Version</p>
            <p className="text-sm text-foreground font-mono">{driftDetection.terraformVersion}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-mono mb-1">AWS Region</p>
            <p className="text-sm text-foreground font-mono">{driftDetection.awsRegion}</p>
          </div>
        </div>

        {/* Remediation Actions */}
        <div className="mt-6 pt-6 border-t border-border space-y-3">
          <h3 className="text-sm font-bold text-foreground font-mono">
            Remediation Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button className="bg-neon-blue hover:bg-neon-blue/80 text-primary-foreground font-mono">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync via Terraform
            </Button>
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-secondary font-mono"
            >
              <Download className="w-4 h-4 mr-2" />
              View Drift Report
            </Button>
          </div>
        </div>
      </Card>

      {/* Incident Detail Modal */}
      <IncidentDetailModal
        open={modalOpen}
        incident={selectedIncident}
        onClose={() => setModalOpen(false)}
        onExport={handleExportIncident}
      />
    </div>
  );
}
