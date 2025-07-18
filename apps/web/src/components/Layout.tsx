import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useCart } from "../contexts/CartContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { getCartCount } = useCart();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-orange-500 to-yellow-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-white rounded-full p-2 mr-3 shadow-md">
                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <Link to="/" className="text-3xl font-bold text-white hover:text-yellow-200 transition-colors duration-200">
                Restoku
              </Link>
              ``
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link to="/" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive("/") ? "bg-white text-orange-600 shadow-md" : "text-white hover:bg-white/20 hover:text-yellow-200"}`}>
                  🏠 Home
                </Link>
                <Link to="/foods" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive("/foods") ? "bg-white text-orange-600 shadow-md" : "text-white hover:bg-white/20 hover:text-yellow-200"}`}>
                  🍽️ Menu
                </Link>
              </div>
            </div>

            {/* Cart Icon */}
            <div className="flex items-center">
              <Link to="/cart" className="relative bg-white/20 hover:bg-white/30 p-3 rounded-full text-white transition-all duration-200 transform hover:scale-105">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l3.6 7.59a1 1 0 00.92.61h7.72a1 1 0 00.92-.61l3.16-6.59H6" />
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                </svg>

                {getCartCount() > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">{getCartCount()}</span>}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button type="button" className="bg-white/20 hover:bg-white/30 p-2 rounded-lg text-white transition-all duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Satriyo Rizkyansah</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
