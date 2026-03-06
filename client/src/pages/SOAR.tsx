import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  Shield,
  Lock,
  HardDrive,
  FileText,
  ArrowRight,
} from "lucide-react";
import {
  mockIncidentTimeline,
  mockKillSwitchStatus,
  mockDriftDetection,
} from "@/lib/mockData";

/**
 * Automated Response & SOAR Page - "The Muscle"
 * 
 * Design: Dark SOC aesthetic with automation focus
 * - Incident Timeline: Lifecycle of automated response
 * - Kill Switch Visualizer: Step-by-step orchestration status
 * - Drift Detection: Terraform IaC vs AWS state comparison
 */

export default function SOAR() {
  const killSwitchSteps = useMemo(() => {
    return mockKillSwitchStatus.steps;
  }, []);

  const driftStatus = useMemo(() => {
    return mockDriftDetection;
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground font-mono">
          The Muscle
        </h1>
        <p className="text-muted-foreground">
          Automated incident response orchestration via AWS Step Functions
        </p>
      </div>

      {/* Incident Timeline */}
      <Card className="bg-card border-border p-8">
        <h2 className="text-lg font-bold text-foreground font-mono mb-6">
          Incident Response Timeline
        </h2>
        <div className="space-y-6">
          {mockIncidentTimeline.map((phase, index) => (
            <div key={phase.phase} className="flex gap-6">
              {/* Timeline Connector */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-neon-blue/20 border-2 border-neon-blue flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-neon-blue font-mono">
                    {index + 1}
                  </span>
                </div>
                {index !== mockIncidentTimeline.length - 1 && (
                  <div className="w-1 h-16 bg-gradient-to-b from-neon-blue to-transparent mt-2" />
                )}
              </div>

              {/* Phase Details */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-foreground font-mono">
                    {phase.phase}
                  </h3>
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50">
                    ✓ Completed
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {phase.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                  <span>
                    {phase.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                  <span className="text-neon-blue">Duration: {phase.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Execution Time */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-mono">
              Total Execution Time
            </span>
            <span className="text-2xl font-bold text-neon-green font-mono">
              12 seconds
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            From detection to full containment and forensic capture
          </p>
        </div>
      </Card>

      {/* Kill Switch Visualizer */}
      <Card className="bg-card border-border p-8 glow-red">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground font-mono mb-2">
              Kill Switch Orchestration
            </h2>
            <p className="text-sm text-muted-foreground">
              Incident: {mockKillSwitchStatus.incidentId} • Severity:{" "}
              <span className="text-neon-red font-mono">
                {mockKillSwitchStatus.severity.toUpperCase()}
              </span>
            </p>
          </div>

          {/* Kill Switch Steps */}
          <div className="space-y-4">
            {killSwitchSteps.map((step, index) => (
              <div
                key={step.id}
                className="bg-secondary rounded-lg p-6 border border-border hover:border-neon-blue/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Step Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-neon-green/20 border-2 border-neon-green flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-neon-green" />
                    </div>
                  </div>

                  {/* Step Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-sm font-bold text-foreground font-mono">
                        Step {step.id}: {step.name}
                      </h3>
                      <Badge className="bg-neon-green/20 text-neon-green border-neon-green/50 text-xs">
                        ✓ Executed
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {step.details}
                    </p>
                    <div className="text-xs text-muted-foreground font-mono">
                      {step.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </div>
                  </div>

                  {/* Arrow to next step */}
                  {index !== killSwitchSteps.length - 1 && (
                    <div className="flex-shrink-0 text-neon-blue">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Execution Summary */}
          <div className="bg-gradient-to-r from-neon-green/10 to-neon-blue/10 rounded-lg p-6 border border-neon-green/20">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  Status
                </p>
                <p className="text-lg font-bold text-neon-green font-mono">
                  EXECUTED
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  Execution Time
                </p>
                <p className="text-lg font-bold text-neon-blue font-mono">
                  {mockKillSwitchStatus.executionTime}ms
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">
                  Steps Completed
                </p>
                <p className="text-lg font-bold text-neon-green font-mono">
                  {killSwitchSteps.length}/{killSwitchSteps.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Drift Detection */}
      <Card className="bg-card border-border p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground font-mono">
                Infrastructure Drift Detection
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Terraform IaC vs Actual AWS State
              </p>
            </div>
            <Badge
              className={`text-lg font-mono px-4 py-2 ${
                driftStatus.status === "compliant"
                  ? "bg-neon-green/20 text-neon-green border-neon-green/50"
                  : "bg-neon-red/20 text-neon-red border-neon-red/50"
              }`}
            >
              {driftStatus.status === "compliant" ? "✓" : "⚠"} COMPLIANT
            </Badge>
          </div>

          {/* Drift Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground font-mono mb-2">
                Total Resources
              </p>
              <p className="text-2xl font-bold text-foreground font-mono">
                {driftStatus.resources.total}
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-4 border border-neon-green/30">
              <p className="text-xs text-muted-foreground font-mono mb-2">
                Compliant
              </p>
              <p className="text-2xl font-bold text-neon-green font-mono">
                {driftStatus.resources.compliant}
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-4 border border-border">
              <p className="text-xs text-muted-foreground font-mono mb-2">
                Drifted
              </p>
              <p className="text-2xl font-bold text-orange-warning font-mono">
                {driftStatus.resources.drifted}
              </p>
            </div>
          </div>

          {/* Drift Details */}
          <div className="bg-secondary rounded-lg p-6 border border-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-mono">
                Last Check
              </span>
              <span className="text-sm text-foreground font-mono">
                {driftStatus.lastCheck.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-mono">
                Terraform Version
              </span>
              <span className="text-sm text-foreground font-mono">
                {driftStatus.terraformVersion}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-mono">
                AWS Region
              </span>
              <span className="text-sm text-foreground font-mono">
                {driftStatus.awsRegion}
              </span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground font-mono">
                Next Check
              </span>
              <span className="text-sm text-neon-blue font-mono">
                in ~{Math.floor((driftStatus.nextCheck.getTime() - Date.now()) / 60000)} minutes
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button className="flex-1 bg-neon-blue hover:bg-neon-blue/80 text-primary-foreground font-mono">
              Run Drift Check Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-secondary font-mono"
            >
              View Drift Details
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-neon-green/30 text-neon-green hover:bg-green-950/30 font-mono"
            >
              Remediate via CI/CD
            </Button>
          </div>
        </div>
      </Card>

      {/* Automation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border p-6">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono">Incidents Auto-Remediated</p>
            <p className="text-3xl font-bold text-neon-green font-mono">342</p>
            <p className="text-xs text-muted-foreground mt-2 font-mono">This month</p>
          </div>
        </Card>
        <Card className="bg-card border-border p-6">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono">Manual Interventions Avoided</p>
            <p className="text-3xl font-bold text-neon-blue font-mono">1,247</p>
            <p className="text-xs text-muted-foreground mt-2 font-mono">This quarter</p>
          </div>
        </Card>
        <Card className="bg-card border-border p-6">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-mono">Avg. Response Time</p>
            <p className="text-3xl font-bold text-orange-warning font-mono">8.2s</p>
            <p className="text-xs text-muted-foreground mt-2 font-mono">Across all incidents</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
