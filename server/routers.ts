import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { logAuditAction, getUserAuditLogs, getAnalystProfile, upsertAnalystProfile } from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  /**
   * Audit logging procedures
   */
  audit: router({
    /**
     * Log an analyst action (view, export, remediate, etc.)
     */
    logAction: protectedProcedure
      .input(
        z.object({
          action: z.string().min(1),
          resource: z.string().optional(),
          resourceType: z.string().optional(),
          page: z.string().optional(),
          details: z.record(z.string(), z.any()).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const ipAddress = (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0] || 
                         (ctx.req.socket?.remoteAddress || "unknown");
        const userAgent = ctx.req.headers["user-agent"] || "unknown";

        await logAuditAction({
          userId: ctx.user.id,
          action: input.action,
          resource: input.resource,
          resourceType: input.resourceType,
          page: input.page,
          details: input.details,
          ipAddress,
          userAgent,
          status: "success",
        });

        return { success: true };
      }),

    /**
     * Get audit logs for current user (admin can view all)
     */
    getLogs: protectedProcedure
      .input(
        z.object({
          userId: z.number().optional(),
          limit: z.number().default(50),
        })
      )
      .query(async ({ ctx, input }) => {
        const targetUserId = input.userId && ctx.user.role === "admin" ? input.userId : ctx.user.id;
        return await getUserAuditLogs(targetUserId, input.limit);
      }),
  }),

  /**
   * User profile and session procedures
   */
  profile: router({
    /**
     * Get current user's analyst profile
     */
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      return await getAnalystProfile(ctx.user.id);
    }),

    /**
     * Update analyst profile
     */
    updateProfile: protectedProcedure
      .input(
        z.object({
          department: z.string().optional(),
          title: z.string().optional(),
          expertise: z.array(z.string()).optional(),
          certifications: z.array(z.string()).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await upsertAnalystProfile({
          userId: ctx.user.id,
          department: input.department,
          title: input.title,
          expertise: input.expertise,
          certifications: input.certifications,
        });

        await logAuditAction({
          userId: ctx.user.id,
          action: "update_profile",
          resourceType: "profile",
          page: "/profile",
          status: "success",
        });

        return { success: true };
      }),

    /**
     * Get user info with profile
     */
    getUserInfo: protectedProcedure.query(async ({ ctx }) => {
      const profile = await getAnalystProfile(ctx.user.id);
      return {
        user: ctx.user,
        profile,
      };
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
