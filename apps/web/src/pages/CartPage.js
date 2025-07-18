import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { v4 as uuidv4 } from "uuid";
const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, getTotalAmount, clearCart } = useCart();
    const [customerName, setCustomerName] = useState("");
    const [tableNumber, setTableNumber] = useState("");
    const navigate = useNavigate();
    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };
    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        }
        else {
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
        return (_jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "text-center py-12", children: [_jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8m-8 4V9a2 2 0 114 0v8m-4 0h4" }) }), _jsx("h3", { className: "mt-2 text-lg font-medium text-gray-900", children: "Your cart is empty" }), _jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Start adding some delicious food to your cart." }), _jsx("div", { className: "mt-6", children: _jsx(Link, { to: "/foods", className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700", children: "Browse Menu" }) })] }) }));
    }
    return (_jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsx("nav", { className: "flex mb-8", "aria-label": "Breadcrumb", children: _jsxs("ol", { className: "flex items-center space-x-4", children: [_jsx("li", { children: _jsx(Link, { to: "/", className: "text-gray-400 hover:text-gray-500", children: "Home" }) }), _jsx("li", { children: _jsx("span", { className: "text-gray-400", children: "/" }) }), _jsx("li", { children: _jsx(Link, { to: "/foods", className: "text-gray-400 hover:text-gray-500", children: "Foods" }) }), _jsx("li", { children: _jsx("span", { className: "text-gray-400", children: "/" }) }), _jsx("li", { children: _jsx("span", { className: "text-gray-900 font-medium", children: "Cart" }) })] }) }), _jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: "My Cart" }), _jsx("div", { className: "bg-white shadow overflow-hidden sm:rounded-lg mb-8", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "#" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Image" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Food" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Amount" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Price" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Total Amount" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Delete" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: cartItems.map((item, index) => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: index + 1 }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("img", { src: item.product.img, alt: item.product.name, className: "w-16 h-16 object-cover rounded", onError: (e) => {
                                                    e.currentTarget.src = `https://via.placeholder.com/64x64/f3f4f6/9ca3af?text=${encodeURIComponent(item.product.name.charAt(0))}`;
                                                } }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("div", { className: "text-sm font-medium text-gray-900", children: item.product.name }) }), _jsx("td", { className: "px-6 py-4 text-sm text-gray-500", children: item.description || "-" }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => handleQuantityChange(item.product.id, item.quantity - 1), className: "w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full", children: "-" }), _jsx("span", { className: "w-8 text-center", children: item.quantity }), _jsx("button", { onClick: () => handleQuantityChange(item.product.id, item.quantity + 1), className: "w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full", children: "+" })] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: formatPrice(item.product.price) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: formatPrice(item.product.price * item.quantity) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("button", { onClick: () => removeFromCart(item.product.id), className: "text-red-600 hover:text-red-900", children: _jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 8a1 1 0 012 0v3a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v3a1 1 0 002 0V8z", clipRule: "evenodd" }) }) }) })] }, item.product.id))) })] }) }) }), _jsx("div", { className: "bg-white shadow sm:rounded-lg p-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Customer Information" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700", children: "Name" }), _jsx("input", { type: "text", id: "name", value: customerName, onChange: (e) => setCustomerName(e.target.value), className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500", placeholder: "Enter your name" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "table", className: "block text-sm font-medium text-gray-700", children: "Table Number" }), _jsx("input", { type: "text", id: "table", value: tableNumber, onChange: (e) => setTableNumber(e.target.value), className: "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500", placeholder: "Enter table number" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Order Summary" }), _jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex justify-between text-xl font-bold text-gray-900 mb-4", children: [_jsx("span", { children: "Total Harga:" }), _jsx("span", { children: formatPrice(getTotalAmount()) })] }), _jsx("button", { onClick: handleCheckout, className: "w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200", children: "Checkout" })] })] })] }) })] }));
};
export default CartPage;
