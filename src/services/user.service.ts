// User service layer for clean abstraction

import {
  apiClient,
  type ApiResponse,
  type PaginatedResponse,
} from "@/lib/api-client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer" | "user";
  status: "active" | "inactive" | "pending" | "suspended";
  avatar?: string;
  created_at: string;
  updated_at: string;
  last_login?: string;
  subscription?: {
    plan: string;
    status: string;
    expires_at?: string;
  };
  stats?: {
    widgets_created: number;
    conversations: number;
    last_active: string;
  };
}

export interface UserFilters {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface CreateUserData {
  name: string;
  email: string;
  role: User["role"];
  password?: string;
  send_invitation?: boolean;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: User["role"];
  status?: User["status"];
}

class UserService {
  async getUsers(filters?: UserFilters): Promise<PaginatedResponse<User>> {
    return apiClient.getPaginated<User>("/users", filters);
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return apiClient.get<User>(`/users/${id}`);
  }

  async createUser(data: CreateUserData): Promise<ApiResponse<User>> {
    return apiClient.post<User>("/users", data);
  }

  async updateUser(
    id: string,
    data: UpdateUserData,
  ): Promise<ApiResponse<User>> {
    return apiClient.put<User>(`/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/users/${id}`);
  }

  async suspendUser(id: string): Promise<ApiResponse<User>> {
    return apiClient.post<User>(`/users/${id}/suspend`, {});
  }

  async activateUser(id: string): Promise<ApiResponse<User>> {
    return apiClient.post<User>(`/users/${id}/activate`, {});
  }

  async resendInvitation(id: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>(`/users/${id}/resend-invitation`, {});
  }

  async getUserStats(): Promise<
    ApiResponse<{
      total: number;
      active: number;
      inactive: number;
      pending: number;
      growth_rate: number;
    }>
  > {
    return apiClient.get("/users/stats");
  }
}

export const userService = new UserService();
