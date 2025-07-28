import { useState, useEffect } from "react";
import api from "@/lib/axios";
import type { Product, CreateProductDto, UpdateProductDto } from "@/types/api";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");

      const productData = response.data?.data || response.data;

      setProducts(Array.isArray(productData) ? productData : []);
      setError(null);
    } catch (err: any) {
      console.error("❌ PRODUCTS - Error:", err);
      setError(err.response?.data?.message || "Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: CreateProductDto) => {
    try {
      const formData = new FormData();

      // Append all fields to FormData
      formData.append("code", productData.code);
      formData.append("name", productData.name);
      formData.append("price", productData.price.toString());
      formData.append("its_ready", productData.its_ready.toString());
      formData.append("best_seller", productData.best_seller.toString());

      if (productData.img && productData.img instanceof File) {
        formData.append("img", productData.img);
      }

      const response = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchProducts(); // Refresh the list
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to create product");
    }
  };

  const updateProduct = async (id: number, productData: UpdateProductDto) => {
    try {
      const formData = new FormData();

      // Append only defined fields to FormData
      if (productData.code !== undefined) formData.append("code", productData.code);
      if (productData.name !== undefined) formData.append("name", productData.name);
      if (productData.price !== undefined) formData.append("price", productData.price.toString());
      if (productData.its_ready !== undefined) formData.append("its_ready", productData.its_ready.toString());
      if (productData.best_seller !== undefined) formData.append("best_seller", productData.best_seller.toString());

      if (productData.img && productData.img instanceof File) {
        formData.append("img", productData.img);
      }

      const response = await api.patch(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchProducts(); // Refresh the list
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to update product");
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      await fetchProducts(); // Refresh the list
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
