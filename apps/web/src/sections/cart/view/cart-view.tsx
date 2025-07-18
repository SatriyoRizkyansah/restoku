import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import { v4 as uuidv4 } from "uuid";

export function CartView() {
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
      alert("Mohon isi nama dan nomor meja Anda");
      return;
    }

    if (cartItems.length === 0) {
      alert("Keranjang Anda kosong");
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="mb-8">
              {/* <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8m-8 4V9a2 2 0 114 0v8m-4 0h4" />
              </svg> */}

              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l3.6 7.59a1 1 0 00.92.61h7.72a1 1 0 00.92-.61l3.16-6.59H6" />
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Kosong</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">Sepertinya Anda belum menambahkan makanan ke dalam keranjang. Mari mulai menjelajahi menu lezat kami!</p>
            <Link
              to="/foods"
              className="inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Jelajahi Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🛒 Keranjang <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Belanja</span>
          </h1>
          <p className="text-xl text-gray-600">Review pesanan Anda sebelum melanjutkan ke pembayaran</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Daftar Pesanan</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.product.img}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-xl shadow-md"
                          onError={(e) => {
                            e.currentTarget.src = `https://via.placeholder.com/80x80/f3f4f6/9ca3af?text=${encodeURIComponent(item.product.name.charAt(0))}`;
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.description || "Tanpa catatan khusus"}</p>
                        <p className="text-lg font-bold text-gray-900">{formatPrice(item.product.price)}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>

                        <span className="w-12 text-center text-lg font-semibold">{item.quantity}</span>

                        <button onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900 mb-2">{formatPrice(item.product.price * item.quantity)}</p>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700 transition-colors duration-200">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 8a1 1 0 012 0v3a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v3a1 1 0 002 0V8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Informasi Pesanan</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Pemesan
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div>
                  <label htmlFor="table" className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Meja
                  </label>
                  <input
                    type="text"
                    id="table"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Masukkan nomor meja"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                  <span>Total:</span>
                  <span className="text-purple-600">{formatPrice(getTotalAmount())}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Checkout Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
