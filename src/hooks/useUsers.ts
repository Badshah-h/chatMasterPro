// Custom hook for user management
import { useState, useEffect } from "react";
import {
  userService,
  User,
  UserFilters,
  CreateUserData,
  UpdateUserData,
} from "@/services/user.service";
import { useToast } from "@/components/ui/use-toast";

export function useUsers(initialFilters?: UserFilters) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserFilters>(initialFilters || {});
  const [stats, setStats] = useState<{
    total: number;
    active: number;
    inactive: number;
    pending: number;
    byRole: Record<string, number>;
  } | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUsers(filters);
      setUsers(response.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch users";
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

  const fetchStats = async () => {
    try {
      const response = await userService.getUserStats();
      setStats(response.data);
    } catch (err) {
      console.error("Failed to fetch user stats:", err);
    }
  };

  const createUser = async (userData: CreateUserData) => {
    try {
      const response = await userService.createUser(userData);
      setUsers((prev) => [response.data, ...prev]);
      toast({
        title: "Success",
        description: "User created successfully",
      });
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create user";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateUser = async (id: string, userData: UpdateUserData) => {
    try {
      const response = await userService.updateUser(id, userData);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? response.data : user)),
      );
      toast({
        title: "Success",
        description: "User updated successfully",
      });
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update user";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete user";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const bulkUpdateUsers = async (
    userIds: string[],
    updates: UpdateUserData,
  ) => {
    try {
      await userService.bulkUpdateUsers(userIds, updates);
      await fetchUsers(); // Refresh the list
      toast({
        title: "Success",
        description: `${userIds.length} users updated successfully`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update users";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const exportUsers = async () => {
    try {
      const response = await userService.exportUsers(filters);
      // Handle blob download
      const url = window.URL.createObjectURL(response.data as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "users-export.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Users exported successfully",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to export users";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const updateFilters = (newFilters: UserFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  const refresh = () => {
    fetchUsers();
    fetchStats();
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    users,
    loading,
    error,
    stats,
    filters,
    createUser,
    updateUser,
    deleteUser,
    bulkUpdateUsers,
    exportUsers,
    updateFilters,
    resetFilters,
    refresh,
  };
}
