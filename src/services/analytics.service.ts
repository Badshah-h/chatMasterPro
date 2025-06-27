// Analytics service layer for dashboard metrics
import { apiClient } from "@/lib/api-client";

export interface AnalyticsData {
  conversations: {
    total: number;
    change: number;
    trend: "up" | "down";
  };
  users: {
    total: number;
    active: number;
    change: number;
  };
  revenue: {
    total: number;
    change: number;
    trend: "up" | "down";
  };
  performance: {
    uptime: number;
    responseTime: number;
    errorRate: number;
  };
}

export interface ConversationMetrics {
  date: string;
  conversations: number;
  users: number;
  satisfaction: number;
}

export interface TopicAnalysis {
  topic: string;
  count: number;
  percentage: number;
  trend: "up" | "down" | "stable";
}

export interface UserBehavior {
  averageSessionDuration: number;
  bounceRate: number;
  returnVisitorRate: number;
  conversionRate: number;
}

export interface AnalyticsFilters {
  startDate?: string;
  endDate?: string;
  widgetId?: string;
  userId?: string;
  timeRange?: "7d" | "30d" | "90d" | "1y";
}

class AnalyticsService {
  async getDashboardStats(filters?: AnalyticsFilters) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    return apiClient.get<AnalyticsData>(
      `/analytics/dashboard?${params.toString()}`,
    );
  }

  async getConversationMetrics(filters?: AnalyticsFilters) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    return apiClient.get<ConversationMetrics[]>(
      `/analytics/conversations?${params.toString()}`,
    );
  }

  async getTopicAnalysis(filters?: AnalyticsFilters) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    return apiClient.get<TopicAnalysis[]>(
      `/analytics/topics?${params.toString()}`,
    );
  }

  async getUserBehavior(filters?: AnalyticsFilters) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    return apiClient.get<UserBehavior>(
      `/analytics/user-behavior?${params.toString()}`,
    );
  }

  async getPerformanceMetrics(filters?: AnalyticsFilters) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    return apiClient.get<{
      responseTime: number[];
      uptime: number[];
      errorRate: number[];
      timestamps: string[];
    }>(`/analytics/performance?${params.toString()}`);
  }

  async exportAnalytics(filters?: AnalyticsFilters) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    return apiClient.get<Blob>(`/analytics/export?${params.toString()}`);
  }

  async getRealtimeStats() {
    return apiClient.get<{
      activeUsers: number;
      activeConversations: number;
      systemLoad: number;
      responseTime: number;
    }>("/analytics/realtime");
  }
}

export const analyticsService = new AnalyticsService();
