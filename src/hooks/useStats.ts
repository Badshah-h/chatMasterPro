// Custom hook for dashboard statistics

import { useState, useEffect, useCallback } from "react";
import {
  analyticsService,
  type DashboardStats,
  type AnalyticsFilters,
} from "@/services/analytics.service";
import { useToast } from "@/components/ui/use-toast";

interface UseStatsReturn {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  filters: AnalyticsFilters;
  setFilters: (filters: AnalyticsFilters) => void;
  refreshStats: () => Promise<void>;
}

export function useStats(): UseStatsReturn {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AnalyticsFilters>({
    period: "30d",
    compare: false,
  });

  const { toast } = useToast();

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await analyticsService.getDashboardStats(filters);
      setStats(response.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch statistics";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [filters, toast]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    filters,
    setFilters,
    refreshStats: fetchStats,
  };
}
