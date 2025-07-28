import { useState, useEffect } from "react";
import api from "@/lib/axios";
import type { Order, CreateOrderDto } from "@/types/api";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle response structure dari API
      const orderData = response.data?.data || response.data;
      setOrders(Array.isArray(orderData) ? orderData : []);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch orders");
      setOrders([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: CreateOrderDto) => {
    try {
      const response = await api.post("/orders", orderData);
      await fetchOrders(); // Refresh the list
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to create order");
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchOrders(); // Refresh the list
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to delete order");
    }
  };

  const getOrdersByTable = async (tableNumber: string) => {
    try {
      const response = await api.get<Order[]>(`/orders/table/${tableNumber}`);
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to fetch orders by table");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    deleteOrder,
    getOrdersByTable,
  };
};
