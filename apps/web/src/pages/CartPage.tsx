import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { v4 as uuidv4 } from "uuid";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalAmount, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!customerName.trim() || !tableNumber.trim()) {
      alert("Please fill in your name and table number");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Generate tracking number
    const trackingNumber = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Save order to localStorage (simulating backend)
    const order = {
      id: uuidv4(),
      tracking_number: trackingNumber,
      name: customerName,
      table_number: tableNumber,
      orderItems: cartItems.map((item) => ({
        id: Math.floor(Math.random() * 10000),
        orderId: uuidv4(),
        productId: item.product.id,
        product: item.product,
        quantity: item.quantity,
        description: item.description || "",
      })),
      total: getTotalAmount(),
      created_at: new Date().toISOString(),
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("restaurant-orders") || "[]");
    existingOrders.push(order);
    localStorage.setItem("restaurant-orders", JSON.stringify(existingOrders));

    // Clear cart
    clearCart();

    // Navigate to success page with tracking number
    navigate("/success", { state: { trackingNumber, customerName } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8m-8 4V9a2 2 0 114 0v8m-4 0h4" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
          <p className="mt-1 text-sm text-gray-500">Start adding some delicious food to your cart.</p>
          <div className="mt-6">
            <Link to="/foods" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <Link to="/foods" className="text-gray-400 hover:text-gray-500">
              Foods
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <span className="text-gray-900 font-medium">Cart</span>
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Cart</h1>

      {/* Cart Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <tr key={item.product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.product.img}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/64x64/f3f4f6/9ca3af?text=${encodeURIComponent(item.product.name.charAt(0))}`;
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.description || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full">
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full">
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPrice(item.product.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatPrice(item.product.price * item.quantity)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => removeFromCart(item.product.id)} className="text-red-600 hover:text-red-900">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 8a1 1 0 012 0v3a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v3a1 1 0 002 0V8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkout Section */}
      <div className="bg-white shadow sm:rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="table" className="block text-sm font-medium text-gray-700">
                  Table Number
                </label>
                <input
                  type="text"
                  id="table"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter table number"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between text-xl font-bold text-gray-900 mb-4">
                <span>Total Harga:</span>
                <span>{formatPrice(getTotalAmount())}</span>
              </div>
              <button onClick={handleCheckout} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
