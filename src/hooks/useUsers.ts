// Custom hook for user management

import { useState, useEffect, useCallback } from "react";
import {
  userService,
  type User,
  type UserFilters,
  type CreateUserData,
  type UpdateUserData,
} from "@/services/user.service";
import { useToast } from "@/components/ui/use-toast";

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters: UserFilters;
  setFilters: (filters: UserFilters) => void;
  createUser: (data: CreateUserData) => Promise<void>;
  updateUser: (id: string, data: UpdateUserData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  suspendUser: (id: string) => Promise<void>;
  activateUser: (id: string) => Promise<void>;
  resendInvitation: (id: string) => Promise<void>;
  refreshUsers: () => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    per_page: 10,
    sort_by: "created_at",
    sort_order: "desc",
  });

  const { toast } = useToast();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUsers(filters);
      setUsers(response.data);
      setPagination(response.meta);
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
  }, [filters, toast]);

  const createUser = useCallback(
    async (data: CreateUserData) => {
      try {
        await userService.createUser(data);
        toast({
          title: "Success",
          description: "User created successfully",
        });
        await fetchUsers();
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
    },
    [fetchUsers, toast],
  );

  const updateUser = useCallback(
    async (id: string, data: UpdateUserData) => {
      try {
        await userService.updateUser(id, data);
        toast({
          title: "Success",
          description: "User updated successfully",
        });
        await fetchUsers();
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
    },
    [fetchUsers, toast],
  );

  const deleteUser = useCallback(
    async (id: string) => {
      try {
        await userService.deleteUser(id);
        toast({
          title: "Success",
          description: "User deleted successfully",
        });
        await fetchUsers();
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
    },
    [fetchUsers, toast],
  );

  const suspendUser = useCallback(
    async (id: string) => {
      try {
        await userService.suspendUser(id);
        toast({
          title: "Success",
          description: "User suspended successfully",
        });
        await fetchUsers();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to suspend user";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      }
    },
    [fetchUsers, toast],
  );

  const activateUser = useCallback(
    async (id: string) => {
      try {
        await userService.activateUser(id);
        toast({
          title: "Success",
          description: "User activated successfully",
        });
        await fetchUsers();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to activate user";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw err;
      }
    },
    [fetchUsers, toast],
  );

  const resendInvitation = useCallback(
    async (id: string) => {
      try {
        await userService.resendInvitation(id);
        toast({
          title: "Success",
          description: "Invitation sent successfully",
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to send invitation";
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
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    pagination,
    filters,
    setFilters,
    createUser,
    updateUser,
    deleteUser,
    suspendUser,
    activateUser,
    resendInvitation,
    refreshUsers: fetchUsers,
  };
}
