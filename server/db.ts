import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, auditLogs, InsertAuditLog, userSessions, InsertUserSession, analystProfiles, InsertAnalystProfile } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Log analyst action for audit trail
 */
export async function logAuditAction(log: InsertAuditLog): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot log audit action: database not available");
    return;
  }

  try {
    await db.insert(auditLogs).values(log);
  } catch (error) {
    console.error("[Database] Failed to log audit action:", error);
    // Don't throw - audit logging should not break the main flow
  }
}

/**
 * Get audit logs for a specific user
 */
export async function getUserAuditLogs(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get audit logs: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(auditLogs)
      .where(eq(auditLogs.userId, userId))
      .orderBy((t) => t.timestamp)
      .limit(limit);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get audit logs:", error);
    return [];
  }
}

/**
 * Create or update user session
 */
export async function createUserSession(session: InsertUserSession): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create session: database not available");
    return;
  }

  try {
    await db.insert(userSessions).values(session);
  } catch (error) {
    console.error("[Database] Failed to create session:", error);
    throw error;
  }
}

/**
 * Get active sessions for a user
 */
export async function getUserActiveSessions(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get sessions: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(userSessions)
      .where(eq(userSessions.userId, userId))
      .orderBy((t) => t.createdAt);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get sessions:", error);
    return [];
  }
}

/**
 * Create or update analyst profile
 */
export async function upsertAnalystProfile(profile: InsertAnalystProfile): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert analyst profile: database not available");
    return;
  }

  try {
    const result = await db
      .select()
      .from(analystProfiles)
      .where(eq(analystProfiles.userId, profile.userId!))
      .limit(1);

    if (result.length > 0) {
      // Update existing profile
      await db
        .update(analystProfiles)
        .set(profile)
        .where(eq(analystProfiles.userId, profile.userId!));
    } else {
      // Create new profile
      await db.insert(analystProfiles).values(profile);
    }
  } catch (error) {
    console.error("[Database] Failed to upsert analyst profile:", error);
    throw error;
  }
}

/**
 * Get analyst profile by user ID
 */
export async function getAnalystProfile(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get analyst profile: database not available");
    return undefined;
  }

  try {
    const result = await db
      .select()
      .from(analystProfiles)
      .where(eq(analystProfiles.userId, userId))
      .limit(1);

    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get analyst profile:", error);
    return undefined;
  }
}

// TODO: add feature queries here as your schema grows.
