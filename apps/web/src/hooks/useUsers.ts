import { useState, useEffect } from "react";
import api from "@/lib/axios";
import type { User, CreateUserDto, UpdateUserDto } from "@/types/api";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle response structure dari API
      const userData = response.data?.data || response.data;
      setUsers(Array.isArray(userData) ? userData : []);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users");
      setUsers([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: CreateUserDto) => {
    try {
      const response = await api.post("/users", userData);
      await fetchUsers(); // Refresh the list
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to create user");
    }
  };

  const updateUser = async (id: number, userData: UpdateUserDto) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.patch(`/users/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchUsers(); // Refresh the list
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to update user");
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchUsers(); // Refresh the list
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};
