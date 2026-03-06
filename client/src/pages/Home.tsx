import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  mockNISTComplianceScore,
  mockMTTRMetrics,
  mockActiveThreatsSummary,
  mockThreatTimeline,
} from "@/lib/mockData";

/**
 * Main Overview Page - "The Brain"
 * 
 * Design: Dark SOC aesthetic with neon accents
 * - NIST/ISO Compliance Score (circular progress)
 * - MTTR Metrics (previous vs current)
 * - Active Threats Overview (summary cards)
 * - Recent Threat Timeline
 */

export default function Home() {
  // Prepare threat distribution data for chart
  const threatDistribution = useMemo(() => {
    const summary = mockActiveThreatsSummary;
    return [
      { name: "Critical", value: summary.critical, fill: "var(--neon-red)" },
      { name: "High", value: summary.high, fill: "var(--orange-warning)" },
      { name: "Medium", value: summary.medium, fill: "var(--cyan-accent)" },
      { name: "Low", value: summary.low, fill: "var(--neon-green)" },
    ];
  }, []);

  // Prepare NIST component scores for bar chart
  const nistComponentData = useMemo(() => {
    const scores = mockNISTComplianceScore.components;
    return [
      { name: "Identify", score: scores.identify },
      { name: "Protect", score: scores.protect },
      { name: "Detect", score: scores.detect },
      { name: "Respond", score: scores.respond },
      { name: "Recover", score: scores.recover },
    ];
  }, []);

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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground font-mono">
          The Brain
        </h1>
        <p className="text-muted-foreground">
          Centralized security posture and threat intelligence from AWS Security Hub
        </p>
      </div>

      {/* Top Row: NIST Score & MTTR Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* NIST Compliance Score */}
        <Card className="bg-card border-border p-8 glow-blue">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground font-mono">
                NIST Compliance Score
              </h2>
              <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/50">
                <ArrowUp className="w-3 h-3 mr-1" />
                +7%
              </Badge>
            </div>

            {/* Circular Progress */}
            <div className="flex justify-center py-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="var(--neon-blue)"
                    strokeWidth="8"
                    strokeDasharray={`${(94 / 100) * 2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-neon-blue font-mono">
                      {mockNISTComplianceScore.currentScore}%
                    </div>
                    <div className="text-xs text-muted-foreground">Compliant</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Component Breakdown */}
            <div className="space-y-2 pt-4 border-t border-border">
              {Object.entries(mockNISTComplianceScore.components).map(
                ([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground capitalize font-mono">
                      {key}
                    </span>
                    <span className="text-sm font-semibold text-foreground font-mono">
                      {value}%
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </Card>

        {/* MTTR Metrics */}
        <Card className="bg-card border-border p-8 glow-green lg:col-span-2">
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-foreground font-mono">
              Mean Time To Respond (MTTR)
            </h2>

            {/* Comparison */}
            <div className="grid grid-cols-2 gap-4">
              {/* Previous */}
              <div className="bg-secondary rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground font-mono mb-2">
                  Previous (Manual)
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-orange-warning font-mono">
                    {mockMTTRMetrics.previous.value}
                  </span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {mockMTTRMetrics.previous.unit}
                  </span>
                </div>
              </div>

              {/* Current */}
              <div className="bg-secondary rounded-lg p-4 border border-neon-green/30">
                <p className="text-xs text-muted-foreground font-mono mb-2">
                  Current (AI-Automated)
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-neon-green font-mono">
                    {mockMTTRMetrics.current.value}
                  </span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {mockMTTRMetrics.current.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Improvement Metric */}
            <div className="bg-gradient-to-r from-neon-blue/10 to-neon-green/10 rounded-lg p-4 border border-neon-blue/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-mono">
                    Improvement
                  </p>
                  <p className="text-2xl font-bold text-neon-green font-mono">
                    {mockMTTRMetrics.improvement.toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-neon-green" />
              </div>
            </div>

            {/* Last Incident Info */}
            <div className="text-xs text-muted-foreground border-t border-border pt-4 font-mono">
              Last incident auto-remediated{" "}
              {Math.floor((Date.now() - mockMTTRMetrics.lastIncident.getTime()) / 60000)} minutes ago
            </div>
          </div>
        </Card>
      </div>

      {/* Middle Row: Threat Distribution & NIST Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Distribution */}
        <Card className="bg-card border-border p-8">
          <h2 className="text-lg font-bold text-foreground font-mono mb-6">
            Threat Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={threatDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {threatDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
            {threatDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {item.name}
                  </p>
                  <p className="text-sm font-semibold text-foreground font-mono">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* NIST Component Scores */}
        <Card className="bg-card border-border p-8">
          <h2 className="text-lg font-bold text-foreground font-mono mb-6">
            NIST Framework Components
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={nistComponentData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="var(--muted-foreground)"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                style={{ fontSize: "12px" }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              <Bar dataKey="score" fill="var(--neon-blue)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Row: Active Threats Summary & Recent Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Threat Count Cards */}
        {[
          {
            label: "Critical",
            value: mockActiveThreatsSummary.critical,
            color: "neon-red",
            bgColor: "red-950",
          },
          {
            label: "High",
            value: mockActiveThreatsSummary.high,
            color: "orange-warning",
            bgColor: "orange-950",
          },
          {
            label: "Medium",
            value: mockActiveThreatsSummary.medium,
            color: "cyan-accent",
            bgColor: "cyan-950",
          },
          {
            label: "Low",
            value: mockActiveThreatsSummary.low,
            color: "neon-green",
            bgColor: "green-950",
          },
        ].map((threat) => (
          <Card
            key={threat.label}
            className={`bg-${threat.bgColor} border-${threat.color}/30 p-6 text-center`}
          >
            <p className="text-sm text-muted-foreground font-mono mb-2">
              {threat.label} Threats
            </p>
            <p className={`text-3xl font-bold font-mono text-${threat.color}`}>
              {threat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Recent Threat Timeline */}
      <Card className="bg-card border-border p-8">
        <h2 className="text-lg font-bold text-foreground font-mono mb-6">
          Recent Threat Timeline
        </h2>
        <div className="space-y-4">
          {mockThreatTimeline.map((threat, index) => (
            <div
              key={threat.id}
              className={`flex gap-4 pb-4 ${
                index !== mockThreatTimeline.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {/* Timeline Marker */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    threat.severity === "critical"
                      ? "bg-neon-red"
                      : threat.severity === "high"
                        ? "bg-orange-warning"
                        : "bg-cyan-accent"
                  }`}
                />
                {index !== mockThreatTimeline.length - 1 && (
                  <div className="w-0.5 h-12 bg-border mt-2" />
                )}
              </div>

              {/* Threat Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground font-mono">
                        {threat.title}
                      </h3>
                      <Badge
                        className={`text-xs font-mono ${getSeverityBadgeColor(threat.severity)}`}
                      >
                        {threat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {threat.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                      <span>Source: {threat.source}</span>
                      <span>
                        {threat.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex-shrink-0">
                    {threat.status === "auto-remediated" ? (
                      <div className="flex items-center gap-1 px-3 py-1 bg-green-900/30 rounded-lg border border-neon-green/30">
                        <CheckCircle2 className="w-4 h-4 text-neon-green" />
                        <span className="text-xs text-neon-green font-mono">
                          Auto-Remediated
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-3 py-1 bg-red-900/30 rounded-lg border border-neon-red/30">
                        <AlertTriangle className="w-4 h-4 text-neon-red" />
                        <span className="text-xs text-neon-red font-mono">
                          Pending
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <Button
          variant="outline"
          className="w-full mt-6 border-border text-foreground hover:bg-secondary hover:text-foreground"
        >
          View All Threats →
        </Button>
      </Card>
    </div>
  );
}
