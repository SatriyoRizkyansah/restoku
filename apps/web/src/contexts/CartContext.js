import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
const CartContext = createContext(undefined);
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("kuliner-cart");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);
    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("kuliner-cart", JSON.stringify(cartItems));
    }, [cartItems]);
    const addToCart = (product, description) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.product.id === product.id);
            if (existingItem) {
                return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
            }
            return [
                ...prev,
                {
                    id: Date.now(), // Simple ID generation for demo
                    product,
                    quantity: 1,
                    description: description || "",
                },
            ];
        });
    };
    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    };
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)));
    };
    const clearCart = () => {
        setCartItems([]);
    };
    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };
    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalAmount,
        getCartCount,
    };
    return _jsx(CartContext.Provider, { value: value, children: children });
};
