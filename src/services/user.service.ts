// User service layer for clean abstraction
import { apiClient } from "@/lib/api-client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive" | "pending";
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  permissions: string[];
}

export interface CreateUserData {
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  permissions?: string[];
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: "admin" | "user" | "moderator";
  status?: "active" | "inactive" | "pending";
  permissions?: string[];
}

export interface UserFilters {
  role?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

class UserService {
  async getUsers(filters?: UserFilters) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    return apiClient.get<User[]>(`/users?${params.toString()}`);
  }

  async getUserById(id: string) {
    return apiClient.get<User>(`/users/${id}`);
  }

  async createUser(userData: CreateUserData) {
    return apiClient.post<User>("/users", userData);
  }

  async updateUser(id: string, userData: UpdateUserData) {
    return apiClient.put<User>(`/users/${id}`, userData);
  }

  async deleteUser(id: string) {
    return apiClient.delete(`/users/${id}`);
  }

  async getUserStats() {
    return apiClient.get<{
      total: number;
      active: number;
      inactive: number;
      pending: number;
      byRole: Record<string, number>;
    }>("/users/stats");
  }

  async bulkUpdateUsers(userIds: string[], updates: UpdateUserData) {
    return apiClient.post("/users/bulk-update", {
      userIds,
      updates,
    });
  }

  async exportUsers(filters?: UserFilters) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    return apiClient.get<Blob>(`/users/export?${params.toString()}`);
  }
}

export const userService = new UserService();
