// Product types
export interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  its_ready: boolean;
  img?: string;
  best_seller: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDto {
  code: string;
  name: string;
  price: number;
  its_ready: boolean;
  best_seller: boolean;
  img?: File | string;
}

export interface UpdateProductDto {
  code?: string;
  name?: string;
  price?: number;
  its_ready?: boolean;
  best_seller?: boolean;
  img?: File | string;
}

// Order types
export interface OrderItem {
  id: number;
  productId: number;
  orderId: string;
  quantity: number;
  description?: string;
  product?: {
    id: number;
    name: string;
    price: number;
    img?: string;
  };
}

export interface Order {
  id: string;
  tracking_number: string;
  name: string;
  table_number: string;
  orderItems: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateOrderItemDto {
  productId: number;
  quantity: number;
  description?: string;
}

export interface CreateOrderDto {
  name: string;
  table_number: string;
  orders: CreateOrderItemDto[];
}

// User types
export interface User {
  id: number;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}
