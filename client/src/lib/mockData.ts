/**
 * Mock Data Service for RobotCop SOC Dashboard
 * 
 * This file contains realistic mock data that simulates AWS backend responses.
 * Replace API calls with actual AWS SDK calls (Boto3 equivalent) when backend is ready.
 */

// ============================================================================
// MAIN OVERVIEW PAGE DATA
// ============================================================================

export const mockNISTComplianceScore = {
  currentScore: 94,
  previousScore: 87,
  trend: "up",
  components: {
    identify: 96,
    protect: 92,
    detect: 94,
    respond: 95,
    recover: 91,
  },
  lastUpdated: new Date(Date.now() - 5 * 60000), // 5 minutes ago
};

export const mockMTTRMetrics = {
  previous: {
    value: 62,
    unit: "minutes",
    description: "Human-driven response",
  },
  current: {
    value: 12,
    unit: "seconds",
    description: "AI-automated response",
  },
  improvement: 99.7,
  lastIncident: new Date(Date.now() - 2 * 60000), // 2 minutes ago
};

export const mockActiveThreatsSummary = {
  critical: 2,
  high: 8,
  medium: 24,
  low: 45,
  total: 79,
  lastDetected: new Date(Date.now() - 30000), // 30 seconds ago
  detectionSource: "GuardDuty + DevOps Guru",
};

export const mockThreatTimeline = [
  {
    id: "threat-001",
    timestamp: new Date(Date.now() - 2 * 60000),
    severity: "critical",
    title: "Unauthorized IAM Access Attempt",
    description: "Multiple failed login attempts from unknown IP detected",
    source: "GuardDuty",
    status: "auto-remediated",
  },
  {
    id: "threat-002",
    timestamp: new Date(Date.now() - 5 * 60000),
    severity: "high",
    title: "EC2 Instance Configuration Drift",
    description: "Security group rules modified outside CI/CD pipeline",
    source: "DevOps Guru",
    status: "auto-remediated",
  },
  {
    id: "threat-003",
    timestamp: new Date(Date.now() - 12 * 60000),
    severity: "medium",
    title: "S3 Bucket Public Access Detected",
    description: "Bucket ACL changed to public-read without authorization",
    source: "Security Hub",
    status: "auto-remediated",
  },
];

// ============================================================================
// AUTOMATED RESPONSE & SOAR PAGE DATA
// ============================================================================

export const mockIncidentTimeline = [
  {
    phase: "DETECT",
    timestamp: new Date(Date.now() - 5 * 60000),
    description: "Anomaly detected by DevOps Guru",
    status: "completed",
    duration: "2 seconds",
  },
  {
    phase: "ANALYZE",
    timestamp: new Date(Date.now() - 4 * 60000 - 58000),
    description: "AI analysis via Amazon Bedrock (Claude 3)",
    status: "completed",
    duration: "8 seconds",
  },
  {
    phase: "ISOLATE",
    timestamp: new Date(Date.now() - 4 * 60000 - 50000),
    description: "Security Group Deny-All applied",
    status: "completed",
    duration: "3 seconds",
  },
  {
    phase: "REVOKE",
    timestamp: new Date(Date.now() - 4 * 60000 - 47000),
    description: "IAM session tokens revoked",
    status: "completed",
    duration: "1 second",
  },
  {
    phase: "REPORT",
    timestamp: new Date(Date.now() - 4 * 60000 - 46000),
    description: "Forensic report generated",
    status: "completed",
    duration: "4 seconds",
  },
];

export const mockKillSwitchStatus = {
  incidentId: "INC-2026-0342",
  severity: "critical",
  status: "executed",
  executionTime: 12000, // milliseconds
  steps: [
    {
      id: 1,
      name: "IAM Session Revoked",
      status: "completed",
      timestamp: new Date(Date.now() - 4 * 60000 - 47000),
      details: "Revoked all active sessions for compromised principal",
    },
    {
      id: 2,
      name: "Security Group Deny-All Applied",
      status: "completed",
      timestamp: new Date(Date.now() - 4 * 60000 - 50000),
      details: "Applied temporary deny-all ingress/egress rules",
    },
    {
      id: 3,
      name: "Instance Isolated",
      status: "completed",
      timestamp: new Date(Date.now() - 4 * 60000 - 45000),
      details: "Instance moved to isolated subnet",
    },
    {
      id: 4,
      name: "Forensic Snapshot Created",
      status: "completed",
      timestamp: new Date(Date.now() - 4 * 60000 - 40000),
      details: "EBS snapshot and RAM dump stored in WORM S3 bucket",
    },
  ],
};

export const mockDriftDetection = {
  status: "compliant",
  lastCheck: new Date(Date.now() - 10 * 60000),
  driftCount: 0,
  resources: {
    total: 247,
    compliant: 247,
    drifted: 0,
  },
  terraformVersion: "1.6.2",
  awsRegion: "us-east-1",
  nextCheck: new Date(Date.now() + 50 * 60000),
};

// ============================================================================
// COGNITIVE AI INSIGHTS PAGE DATA
// ============================================================================

export const mockForensicsReport = {
  incidentId: "INC-2026-0342",
  timestamp: new Date(Date.now() - 4 * 60000),
  generatedBy: "Amazon Bedrock (Claude 3 Sonnet)",
  narrative: `At 14:32 UTC, GuardDuty detected 47 failed authentication attempts targeting the prod-api-user IAM principal from IP 203.0.113.45 (GeoIP: Unknown). The attack pattern matched known credential stuffing behavior. Within 2 seconds, DevOps Guru's anomaly detection flagged unusual API call patterns (GetUser, ListAccessKeys) from the same principal. Amazon Bedrock analysis determined this was a compromised credential incident with high confidence (98.7%). The automated response orchestrated by AWS Step Functions immediately revoked all active sessions, applied deny-all security group rules, and isolated the affected EC2 instance. A forensic snapshot was captured and stored in the immutable S3 bucket (WORM enabled, KMS encrypted). No data exfiltration was detected. The incident was fully contained within 12 seconds of initial detection.`,
  riskAssessment: {
    severity: "CRITICAL",
    confidenceScore: 98.7,
    dataExposureRisk: "LOW",
    lateralMovementRisk: "MITIGATED",
  },
  recommendations: [
    "Review IAM user permissions for prod-api-user; apply principle of least privilege",
    "Enable MFA on all human-managed IAM users",
    "Implement IP whitelisting for API access",
    "Rotate all credentials associated with prod-api-user",
  ],
};

export const mockRootCauseAnalysis = {
  incidentId: "INC-2026-0342",
  rootCauses: [
    {
      cause: "Weak credential management",
      probability: 92,
      evidence: "Credentials found in GitHub repository (public commit history)",
      mitigation: "Implement secrets scanning in CI/CD pipeline",
    },
    {
      cause: "Lack of MFA enforcement",
      probability: 88,
      evidence: "No MFA enabled on compromised IAM user",
      mitigation: "Enforce MFA for all IAM users via SCPs",
    },
    {
      cause: "Insufficient monitoring",
      probability: 75,
      evidence: "47 failed attempts before detection (GuardDuty threshold: 5)",
      mitigation: "Lower GuardDuty sensitivity; enable real-time alerting",
    },
  ],
  preventionStrategies: [
    "Implement GitHub secret scanning and AWS Secrets Manager integration",
    "Enable AWS Config for continuous compliance monitoring",
    "Deploy AWS WAF rules to rate-limit authentication attempts",
    "Implement zero-trust network access via AWS PrivateLink",
  ],
};

// ============================================================================
// ARCHITECTURE & EVIDENCE VAULT PAGE DATA
// ============================================================================

export const mockWORMStorageStatus = {
  bucketName: "robotcop-forensics-worm-prod",
  region: "us-east-1",
  status: "operational",
  totalSnapshots: 342,
  totalSize: "2.4 TB",
  encryption: "AWS KMS (CMK)",
  objectLock: {
    enabled: true,
    mode: "GOVERNANCE",
    retentionDays: 2555, // 7 years
  },
  lastSnapshot: {
    id: "snap-forensic-20260306-143245",
    timestamp: new Date(Date.now() - 4 * 60000),
    size: "8.2 GB",
    type: "EBS Snapshot + RAM Dump",
    incidentId: "INC-2026-0342",
  },
  accessLog: {
    lastAccess: new Date(Date.now() - 2 * 60000),
    accessCount: 3,
    authorizedUsers: ["forensics-analyst@robotcop.internal"],
  },
};

export const mockS3BucketMetrics = [
  {
    bucket: "robotcop-forensics-worm-prod",
    size: "2.4 TB",
    objectCount: 342,
    encryption: "KMS",
    versioningEnabled: true,
    publicAccess: false,
    status: "compliant",
  },
  {
    bucket: "robotcop-logs-archive",
    size: "18.7 TB",
    objectCount: 1247,
    encryption: "KMS",
    versioningEnabled: true,
    publicAccess: false,
    status: "compliant",
  },
  {
    bucket: "robotcop-terraform-state",
    size: "145 MB",
    objectCount: 89,
    encryption: "KMS",
    versioningEnabled: true,
    publicAccess: false,
    status: "compliant",
  },
];

// ============================================================================
// COMPLIANCE & AUDIT DATA
// ============================================================================

export const mockComplianceFrameworks = [
  {
    name: "NIST Cybersecurity Framework",
    score: 94,
    status: "compliant",
    lastAudit: new Date(Date.now() - 7 * 24 * 60 * 60000), // 7 days ago
  },
  {
    name: "ISO 27001",
    score: 91,
    status: "compliant",
    lastAudit: new Date(Date.now() - 14 * 24 * 60 * 60000), // 14 days ago
  },
  {
    name: "CIS AWS Foundations Benchmark",
    score: 96,
    status: "compliant",
    lastAudit: new Date(Date.now() - 3 * 24 * 60 * 60000), // 3 days ago
  },
  {
    name: "SOC 2 Type II",
    score: 93,
    status: "compliant",
    lastAudit: new Date(Date.now() - 30 * 24 * 60 * 60000), // 30 days ago
  },
];

// ============================================================================
// SYSTEM HEALTH DATA
// ============================================================================

export const mockSystemHealth = {
  securityHub: { status: "operational", lastSync: new Date(Date.now() - 60000) },
  guardDuty: { status: "operational", lastSync: new Date(Date.now() - 30000) },
  devOpsGuru: { status: "operational", lastSync: new Date(Date.now() - 120000) },
  bedrock: { status: "operational", lastSync: new Date(Date.now() - 45000) },
  stepFunctions: { status: "operational", lastSync: new Date(Date.now() - 90000) },
  ssm: { status: "operational", lastSync: new Date(Date.now() - 75000) },
};
