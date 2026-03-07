import { useEffect, useCallback } from "react";
import { trpc } from "@/lib/trpc";

/**
 * Hook to log analyst actions for audit trail
 * Automatically logs page visits and manual actions
 */
export function useAuditLog() {
  const logActionMutation = trpc.audit.logAction.useMutation();

  /**
   * Log a specific action
   */
  const logAction = useCallback(
    async (action: string, options?: {
      resource?: string;
      resourceType?: string;
      page?: string;
      details?: Record<string, any>;
    }) => {
      try {
        await logActionMutation.mutateAsync({
          action,
          resource: options?.resource,
          resourceType: options?.resourceType,
          page: options?.page || window.location.pathname,
          details: options?.details,
        });
      } catch (error) {
        console.error("[Audit] Failed to log action:", error);
        // Don't throw - audit logging should not break the app
      }
    },
    [logActionMutation]
  );

  /**
   * Log page visit
   */
  useEffect(() => {
    logAction("page_visit", {
      page: window.location.pathname,
    });
  }, [window.location.pathname]);

  return { logAction };
}

/**
 * Hook to log threat/incident interactions
 */
export function useIncidentAuditLog() {
  const { logAction } = useAuditLog();

  return {
    logViewThreat: (threatId: string) =>
      logAction("view_threat", {
        resource: threatId,
        resourceType: "threat",
      }),

    logViewIncident: (incidentId: string) =>
      logAction("view_incident", {
        resource: incidentId,
        resourceType: "incident",
      }),

    logExportReport: (reportType: string, incidentId?: string) =>
      logAction("export_report", {
        resource: incidentId,
        resourceType: reportType,
        details: { reportType },
      }),

    logRemediateIncident: (incidentId: string) =>
      logAction("remediate_incident", {
        resource: incidentId,
        resourceType: "incident",
      }),

    logViewForensics: (incidentId: string) =>
      logAction("view_forensics", {
        resource: incidentId,
        resourceType: "forensics",
      }),
  };
}
