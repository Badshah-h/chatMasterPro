// Custom hook for subscription management
import { useState, useEffect } from "react";
import {
  subscriptionService,
  Subscription,
  Plan,
  SubscriptionStats,
  CreateSubscriptionData,
  UpdateSubscriptionData,
} from "@/services/subscription.service";
import { useToast } from "@/components/ui/use-toast";

export function useSubscriptions(filters?: {
  status?: string;
  planId?: string;
  userId?: string;
  page?: number;
  limit?: number;
}) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [stats, setStats] = useState<SubscriptionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await subscriptionService.getSubscriptions(filters);
      setSubscriptions(response.data);
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
  };

  const fetchPlans = async () => {
    try {
      const response = await subscriptionService.getPlans();
      setPlans(response.data);
    } catch (err) {
      console.error("Failed to fetch plans:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await subscriptionService.getSubscriptionStats();
      setStats(response.data);
    } catch (err) {
      console.error("Failed to fetch subscription stats:", err);
    }
  };

  const createSubscription = async (data: CreateSubscriptionData) => {
    try {
      const response = await subscriptionService.createSubscription(data);
      setSubscriptions((prev) => [response.data, ...prev]);
      toast({
        title: "Success",
        description: "Subscription created successfully",
      });
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create subscription";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateSubscription = async (
    id: string,
    data: UpdateSubscriptionData,
  ) => {
    try {
      const response = await subscriptionService.updateSubscription(id, data);
      setSubscriptions((prev) =>
        prev.map((sub) => (sub.id === id ? response.data : sub)),
      );
      toast({
        title: "Success",
        description: "Subscription updated successfully",
      });
      return response.data;
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
  };

  const cancelSubscription = async (
    id: string,
    cancelAtPeriodEnd: boolean = true,
  ) => {
    try {
      await subscriptionService.cancelSubscription(id, cancelAtPeriodEnd);
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === id
            ? { ...sub, status: "canceled", cancelAtPeriodEnd }
            : sub,
        ),
      );
      toast({
        title: "Success",
        description: cancelAtPeriodEnd
          ? "Subscription will be canceled at the end of the current period"
          : "Subscription canceled immediately",
      });
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
  };

  const reactivateSubscription = async (id: string) => {
    try {
      await subscriptionService.reactivateSubscription(id);
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === id
            ? { ...sub, status: "active", cancelAtPeriodEnd: false }
            : sub,
        ),
      );
      toast({
        title: "Success",
        description: "Subscription reactivated successfully",
      });
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
  };

  const getUsage = async (subscriptionId: string) => {
    try {
      const response = await subscriptionService.getUsage(subscriptionId);
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch usage data";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const getInvoices = async (subscriptionId: string) => {
    try {
      const response = await subscriptionService.getInvoices(subscriptionId);
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch invoices";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const previewUpgrade = async (subscriptionId: string, newPlanId: string) => {
    try {
      const response = await subscriptionService.previewUpgrade(
        subscriptionId,
        newPlanId,
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to preview upgrade";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const refresh = () => {
    fetchSubscriptions();
    fetchStats();
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [filters]);

  useEffect(() => {
    fetchPlans();
    fetchStats();
  }, []);

  return {
    subscriptions,
    plans,
    stats,
    loading,
    error,
    createSubscription,
    updateSubscription,
    cancelSubscription,
    reactivateSubscription,
    getUsage,
    getInvoices,
    previewUpgrade,
    refresh,
  };
}
