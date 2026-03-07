import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Audit Log Table - Track all analyst actions for compliance
 * Records: page visits, threat interactions, exports, configuration changes
 */
export const auditLogs = mysqlTable("auditLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  action: varchar("action", { length: 255 }).notNull(), // e.g., "view_threat", "export_report", "remediate_incident"
  resource: varchar("resource", { length: 255 }), // e.g., "threat-001", "incident-INC-2026-0342"
  resourceType: varchar("resourceType", { length: 64 }), // e.g., "threat", "incident", "report"
  page: varchar("page", { length: 255 }), // e.g., "/", "/soar", "/insights"
  details: json("details"), // Additional context as JSON
  ipAddress: varchar("ipAddress", { length: 45 }), // IPv4 or IPv6
  userAgent: text("userAgent"), // Browser/client info
  status: mysqlEnum("status", ["success", "failure"]).default("success"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;

/**
 * User Session Table - Track active sessions for security
 */
export const userSessions = mysqlTable("userSessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().unique(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  isActive: boolean("isActive").default(true),
  lastActivity: timestamp("lastActivity").defaultNow(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = typeof userSessions.$inferInsert;

/**
 * Analyst Profile Table - Extended user information for SOC analysts
 */
export const analystProfiles = mysqlTable("analystProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  department: varchar("department", { length: 255 }), // e.g., "SOC", "Incident Response", "Threat Intel"
  title: varchar("title", { length: 255 }), // e.g., "Senior Security Analyst"
  expertise: json("expertise"), // Array of expertise areas
  lastLoginAt: timestamp("lastLoginAt"),
  totalIncidentsHandled: int("totalIncidentsHandled").default(0),
  averageResolutionTime: int("averageResolutionTime"), // in seconds
  certifications: json("certifications"), // Array of certifications
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AnalystProfile = typeof analystProfiles.$inferSelect;
export type InsertAnalystProfile = typeof analystProfiles.$inferInsert;

/**
 * Incident Assignment Table - Track which analysts are assigned to incidents
 */
export const incidentAssignments = mysqlTable("incidentAssignments", {
  id: int("id").autoincrement().primaryKey(),
  incidentId: varchar("incidentId", { length: 64 }).notNull(),
  userId: int("userId").notNull(),
  assignedAt: timestamp("assignedAt").defaultNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
  status: mysqlEnum("status", ["assigned", "in_progress", "resolved", "escalated"]).default("assigned"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type IncidentAssignment = typeof incidentAssignments.$inferSelect;
export type InsertIncidentAssignment = typeof incidentAssignments.$inferInsert;

// TODO: Add your tables here