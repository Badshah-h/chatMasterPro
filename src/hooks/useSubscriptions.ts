// Custom hook for subscription management

import { useState, useEffect, useCallback } from "react";
import {
  subscriptionService,
  type Subscription,
  type SubscriptionFilters,
  type SubscriptionStats,
} from "@/services/subscription.service";
import { useToast } from "@/components/ui/use-toast";

interface UseSubscriptionsReturn {
  subscriptions: Subscription[];
  stats: SubscriptionStats | null;
  loading: boolean;
  error: string | null;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters: SubscriptionFilters;
  setFilters: (filters: SubscriptionFilters) => void;
  cancelSubscription: (id: string, immediately?: boolean) => Promise<void>;
  reactivateSubscription: (id: string) => Promise<void>;
  updateSubscription: (id: string, planId: string) => Promise<void>;
  processRefund: (id: string, amount?: number) => Promise<void>;
  sendPaymentReminder: (id: string) => Promise<void>;
  refreshSubscriptions: () => Promise<void>;
}

export function useSubscriptions(): UseSubscriptionsReturn {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [stats, setStats] = useState<SubscriptionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<SubscriptionFilters>({
    page: 1,
    per_page: 10,
    sort_by: "created_at",
    sort_order: "desc",
  });

  const { toast } = useToast();

  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [subscriptionsResponse, statsResponse] = await Promise.all([
        subscriptionService.getSubscriptions(filters),
        subscriptionService.getSubscriptionStats(),
      ]);
      setSubscriptions(subscriptionsResponse.data);
      setPagination(subscriptionsResponse.meta);
      setStats(statsResponse.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch subscriptions";
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

  const cancelSubscription = useCallback(
    async (id: string, immediately: boolean = false) => {
      try {
        await subscriptionService.cancelSubscription(id, immediately);
        toast({
          title: "Success",
          description: `Subscription ${immediately ? "cancelled immediately" : "scheduled for cancellation"}`,
        });
        await fetchSubscriptions();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to cancel subscription";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      }
    },
    [fetchSubscriptions, toast],
  );

  const reactivateSubscription = useCallback(
    async (id: string) => {
      try {
        await subscriptionService.reactivateSubscription(id);
        toast({
          title: "Success",
          description: "Subscription reactivated successfully",
        });
        await fetchSubscriptions();
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to reactivate subscription";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      }
    },
    [fetchSubscriptions, toast],
  );

  const updateSubscription = useCallback(
    async (id: string, planId: string) => {
      try {
        await subscriptionService.updateSubscription(id, planId);
        toast({
          title: "Success",
          description: "Subscription updated successfully",
        });
        await fetchSubscriptions();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update subscription";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      }
    },
    [fetchSubscriptions, toast],
  );

  const processRefund = useCallback(
    async (id: string, amount?: number) => {
      try {
        await subscriptionService.processRefund(id, amount);
        toast({
          title: "Success",
          description: "Refund processed successfully",
        });
        await fetchSubscriptions();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to process refund";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      }
    },
    [fetchSubscriptions, toast],
  );

  const sendPaymentReminder = useCallback(
    async (id: string) => {
      try {
        await subscriptionService.sendPaymentReminder(id);
        toast({
          title: "Success",
          description: "Payment reminder sent successfully",
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to send payment reminder";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      }
    },
    [toast],
  );

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  return {
    subscriptions,
    stats,
    loading,
    error,
    pagination,
    filters,
    setFilters,
    cancelSubscription,
    reactivateSubscription,
    updateSubscription,
    processRefund,
    sendPaymentReminder,
    refreshSubscriptions: fetchSubscriptions,
  };
}
