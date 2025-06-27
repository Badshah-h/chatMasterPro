// Analytics service layer for dashboard metrics

import { apiClient, type ApiResponse } from "@/lib/api-client";

export interface DashboardStats {
  users: {
    total: number;
    active: number;
    growth_rate: number;
    new_today: number;
  };
  revenue: {
    total: number;
    monthly: number;
    growth_rate: number;
    arr: number;
  };
  subscriptions: {
    active: number;
    cancelled: number;
    churn_rate: number;
    conversion_rate: number;
  };
  widgets: {
    total: number;
    active: number;
    conversations: number;
    avg_response_time: number;
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color: string;
  }[];
}

export interface TimeSeriesData {
  date: string;
  value: number;
  change?: number;
}

export interface AnalyticsFilters {
  period: "7d" | "30d" | "90d" | "1y";
  metric?: string;
  compare?: boolean;
}

class AnalyticsService {
  async getDashboardStats(
    filters?: AnalyticsFilters,
  ): Promise<ApiResponse<DashboardStats>> {
    const params = filters
      ? new URLSearchParams(filters as any).toString()
      : "";
    return apiClient.get<DashboardStats>(`/analytics/dashboard?${params}`);
  }

  async getUserGrowthChart(
    filters?: AnalyticsFilters,
  ): Promise<ApiResponse<ChartData>> {
    const params = filters
      ? new URLSearchParams(filters as any).toString()
      : "";
    return apiClient.get<ChartData>(`/analytics/users/growth?${params}`);
  }

  async getRevenueChart(
    filters?: AnalyticsFilters,
  ): Promise<ApiResponse<ChartData>> {
    const params = filters
      ? new URLSearchParams(filters as any).toString()
      : "";
    return apiClient.get<ChartData>(`/analytics/revenue?${params}`);
  }

  async getChurnAnalysis(filters?: AnalyticsFilters): Promise<
    ApiResponse<{
      churn_rate: number;
      retention_rate: number;
      cohort_data: TimeSeriesData[];
    }>
  > {
    const params = filters
      ? new URLSearchParams(filters as any).toString()
      : "";
    return apiClient.get(`/analytics/churn?${params}`);
  }

  async getEngagementMetrics(filters?: AnalyticsFilters): Promise<
    ApiResponse<{
      daily_active_users: number;
      session_duration: number;
      bounce_rate: number;
      feature_usage: Record<string, number>;
    }>
  > {
    const params = filters
      ? new URLSearchParams(filters as any).toString()
      : "";
    return apiClient.get(`/analytics/engagement?${params}`);
  }

  async getConversionFunnel(filters?: AnalyticsFilters): Promise<
    ApiResponse<{
      stages: {
        name: string;
        count: number;
        conversion_rate: number;
      }[];
    }>
  > {
    const params = filters
      ? new URLSearchParams(filters as any).toString()
      : "";
    return apiClient.get(`/analytics/conversion?${params}`);
  }

  async exportData(
    type: "users" | "revenue" | "subscriptions",
    format: "csv" | "xlsx",
  ): Promise<Blob> {
    const response = await fetch(
      `/api/analytics/export/${type}?format=${format}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Export failed");
    }

    return response.blob();
  }
}

export const analyticsService = new AnalyticsService();
