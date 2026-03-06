import { useEffect, useRef, useState } from "react";

/**
 * usePolling Hook
 * 
 * Provides real-time data polling with configurable intervals.
 * Automatically handles cleanup and prevents memory leaks.
 * 
 * @param callback - Function to execute on each poll interval
 * @param interval - Polling interval in milliseconds (default: 30000 = 30 seconds)
 * @param enabled - Whether polling is active (default: true)
 */

export function usePolling(
  callback: () => void,
  interval: number = 30000,
  enabled: boolean = true
) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Execute callback immediately on mount
    callback();

    // Set up polling interval
    intervalRef.current = setInterval(() => {
      callback();
    }, interval);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [callback, interval, enabled]);
}

/**
 * useMetricsPolling Hook
 * 
 * Specialized hook for polling dashboard metrics with simulated data updates.
 * Simulates realistic metric changes (NIST score ±1%, threat count ±2-5).
 * 
 * @param interval - Polling interval in milliseconds (default: 45000 = 45 seconds)
 * @returns Object containing current metrics and refresh timestamp
 */

export function useMetricsPolling(interval: number = 45000) {
  const [metrics, setMetrics] = useState({
    nistScore: 94,
    threatCount: 79,
    mttrSeconds: 12,
    lastUpdated: new Date(),
  });

  const updateMetrics = () => {
    setMetrics((prev) => {
      // Simulate realistic metric fluctuations
      const nistChange = Math.random() > 0.5 ? 1 : -1;
      const threatChange = Math.floor(Math.random() * 5) - 2; // -2 to +3

      return {
        nistScore: Math.max(85, Math.min(99, prev.nistScore + nistChange)),
        threatCount: Math.max(60, prev.threatCount + threatChange),
        mttrSeconds: Math.max(8, Math.min(15, prev.mttrSeconds + (Math.random() > 0.5 ? 1 : -1))),
        lastUpdated: new Date(),
      };
    });
  };

  usePolling(updateMetrics, interval, true);

  return metrics;
}
