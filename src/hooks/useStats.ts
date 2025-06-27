// Custom hook for dashboard statistics
import { useState, useEffect } from "react";
import {
  analyticsService,
  AnalyticsData,
  AnalyticsFilters,
} from "@/services/analytics.service";
import { useToast } from "@/components/ui/use-toast";

export function useStats(initialFilters?: AnalyticsFilters) {
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AnalyticsFilters>(
    initialFilters || {},
  );
  const [realtimeStats, setRealtimeStats] = useState<{
    activeUsers: number;
    activeConversations: number;
    systemLoad: number;
    responseTime: number;
  } | null>(null);
  const { toast } = useToast();

  const fetchStats = async () => {
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
  };

  const fetchRealtimeStats = async () => {
    try {
      const response = await analyticsService.getRealtimeStats();
      setRealtimeStats(response.data);
    } catch (err) {
      console.error("Failed to fetch realtime stats:", err);
    }
  };

  const exportAnalytics = async () => {
    try {
      const response = await analyticsService.exportAnalytics(filters);
      // Handle blob download
      const url = window.URL.createObjectURL(response.data as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "analytics-export.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Analytics exported successfully",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to export analytics";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const updateFilters = (newFilters: AnalyticsFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  const refresh = () => {
    fetchStats();
    fetchRealtimeStats();
  };

  // Set up realtime updates
  useEffect(() => {
    const interval = setInterval(fetchRealtimeStats, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [filters]);

  useEffect(() => {
    fetchRealtimeStats();
  }, []);

  return {
    stats,
    realtimeStats,
    loading,
    error,
    filters,
    exportAnalytics,
    updateFilters,
    resetFilters,
    refresh,
  };
}
