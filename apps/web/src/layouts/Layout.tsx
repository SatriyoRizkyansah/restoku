import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../contexts/CartContext";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                Kuliner
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/") ? "text-yellow-600 bg-yellow-50" : "text-gray-500 hover:text-gray-700"}`}>
                  Home
                </Link>
                <Link to="/foods" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive("/foods") ? "text-yellow-600 bg-yellow-50" : "text-gray-500 hover:text-gray-700"}`}>
                  Foods
                </Link>
              </div>
            </div>

            {/* Cart */}
            <div className="flex items-center">
              <Link to="/cart" className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <ShoppingCartIcon className="h-6 w-6" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">{cartCount}</span>}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive("/") ? "text-yellow-600 bg-yellow-50" : "text-gray-500 hover:text-gray-700"}`}>
              Home
            </Link>
            <Link to="/foods" className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive("/foods") ? "text-yellow-600 bg-yellow-50" : "text-gray-500 hover:text-gray-700"}`}>
              Foods
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-500">2025 Satriyo Rizkyansah</div>
        </div>
      </footer>
    </div>
  );
};
