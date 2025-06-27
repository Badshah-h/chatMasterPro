// Subscription service layer for subscription management
import { apiClient } from "@/lib/api-client";

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  status: "active" | "canceled" | "past_due" | "trialing" | "incomplete";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialEnd?: string;
  amount: number;
  currency: string;
  interval: "month" | "year";
  features: string[];
  usage: {
    widgets: number;
    conversations: number;
    storage: number;
  };
  limits: {
    widgets: number;
    conversations: number;
    storage: number;
  };
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: "month" | "year";
  features: string[];
  limits: {
    widgets: number;
    conversations: number;
    storage: number;
  };
  popular?: boolean;
}

export interface SubscriptionStats {
  total: number;
  active: number;
  canceled: number;
  trialing: number;
  revenue: {
    monthly: number;
    yearly: number;
    total: number;
  };
  churnRate: number;
  growthRate: number;
}

export interface CreateSubscriptionData {
  userId: string;
  planId: string;
  paymentMethodId?: string;
  trialDays?: number;
}

export interface UpdateSubscriptionData {
  planId?: string;
  cancelAtPeriodEnd?: boolean;
}

class SubscriptionService {
  async getSubscriptions(filters?: {
    status?: string;
    planId?: string;
    userId?: string;
    page?: number;
    limit?: number;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    return apiClient.get<Subscription[]>(`/subscriptions?${params.toString()}`);
  }

  async getSubscriptionById(id: string) {
    return apiClient.get<Subscription>(`/subscriptions/${id}`);
  }

  async getUserSubscription(userId: string) {
    return apiClient.get<Subscription>(`/users/${userId}/subscription`);
  }

  async createSubscription(data: CreateSubscriptionData) {
    return apiClient.post<Subscription>("/subscriptions", data);
  }

  async updateSubscription(id: string, data: UpdateSubscriptionData) {
    return apiClient.put<Subscription>(`/subscriptions/${id}`, data);
  }

  async cancelSubscription(id: string, cancelAtPeriodEnd: boolean = true) {
    return apiClient.post(`/subscriptions/${id}/cancel`, {
      cancelAtPeriodEnd,
    });
  }

  async reactivateSubscription(id: string) {
    return apiClient.post(`/subscriptions/${id}/reactivate`);
  }

  async getPlans() {
    return apiClient.get<Plan[]>("/plans");
  }

  async getPlanById(id: string) {
    return apiClient.get<Plan>(`/plans/${id}`);
  }

  async getSubscriptionStats() {
    return apiClient.get<SubscriptionStats>("/subscriptions/stats");
  }

  async getUsage(subscriptionId: string) {
    return apiClient.get<{
      widgets: { used: number; limit: number };
      conversations: { used: number; limit: number };
      storage: { used: number; limit: number };
    }>(`/subscriptions/${subscriptionId}/usage`);
  }

  async getInvoices(subscriptionId: string) {
    return apiClient.get<
      {
        id: string;
        amount: number;
        currency: string;
        status: string;
        date: string;
        downloadUrl: string;
      }[]
    >(`/subscriptions/${subscriptionId}/invoices`);
  }

  async previewUpgrade(subscriptionId: string, newPlanId: string) {
    return apiClient.post<{
      prorationAmount: number;
      nextInvoiceAmount: number;
      effectiveDate: string;
    }>(`/subscriptions/${subscriptionId}/preview-upgrade`, {
      planId: newPlanId,
    });
  }
}

export const subscriptionService = new SubscriptionService();
