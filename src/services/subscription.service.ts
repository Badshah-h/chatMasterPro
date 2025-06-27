// Subscription service layer for subscription management

import {
  apiClient,
  type ApiResponse,
  type PaginatedResponse,
} from "@/lib/api-client";

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: "active" | "cancelled" | "past_due" | "unpaid" | "trialing";
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  cancelled_at?: string;
  trial_end?: string;
  created_at: string;
  updated_at: string;
  plan: {
    id: string;
    name: string;
    price: number;
    interval: "month" | "year";
    features: string[];
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  payment_method?: {
    type: string;
    last4: string;
    brand: string;
  };
}

export interface SubscriptionFilters {
  search?: string;
  status?: string;
  plan?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface SubscriptionStats {
  total: number;
  active: number;
  cancelled: number;
  past_due: number;
  trialing: number;
  mrr: number;
  arr: number;
  churn_rate: number;
  ltv: number;
}

class SubscriptionService {
  async getSubscriptions(
    filters?: SubscriptionFilters,
  ): Promise<PaginatedResponse<Subscription>> {
    return apiClient.getPaginated<Subscription>("/subscriptions", filters);
  }

  async getSubscription(id: string): Promise<ApiResponse<Subscription>> {
    return apiClient.get<Subscription>(`/subscriptions/${id}`);
  }

  async cancelSubscription(
    id: string,
    immediately: boolean = false,
  ): Promise<ApiResponse<Subscription>> {
    return apiClient.post<Subscription>(`/subscriptions/${id}/cancel`, {
      immediately,
    });
  }

  async reactivateSubscription(id: string): Promise<ApiResponse<Subscription>> {
    return apiClient.post<Subscription>(`/subscriptions/${id}/reactivate`, {});
  }

  async updateSubscription(
    id: string,
    planId: string,
  ): Promise<ApiResponse<Subscription>> {
    return apiClient.put<Subscription>(`/subscriptions/${id}`, {
      plan_id: planId,
    });
  }

  async getSubscriptionStats(): Promise<ApiResponse<SubscriptionStats>> {
    return apiClient.get<SubscriptionStats>("/subscriptions/stats");
  }

  async getUpcomingRenewals(): Promise<ApiResponse<Subscription[]>> {
    return apiClient.get<Subscription[]>("/subscriptions/upcoming-renewals");
  }

  async getPastDueSubscriptions(): Promise<ApiResponse<Subscription[]>> {
    return apiClient.get<Subscription[]>("/subscriptions/past-due");
  }

  async processRefund(
    subscriptionId: string,
    amount?: number,
  ): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`/subscriptions/${subscriptionId}/refund`, {
      amount,
    });
  }

  async sendPaymentReminder(
    subscriptionId: string,
  ): Promise<ApiResponse<void>> {
    return apiClient.post<void>(
      `/subscriptions/${subscriptionId}/payment-reminder`,
      {},
    );
  }
}

export const subscriptionService = new SubscriptionService();
