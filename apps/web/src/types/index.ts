export interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  its_ready: boolean;
  best_seller: boolean;
  img: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  description?: string;
}

export interface Order {
  id: string;
  tracking_number: string;
  name: string;
  table_number: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: string;
  productId: number;
  product: Product;
  quantity: number;
  description: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, description?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
  getCartCount: () => number;
}
