import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { dummyProducts } from "../data/products";

const HomePage: React.FC = () => {
  // Show only best sellers for home page
  const bestSellerProducts = dummyProducts.filter((product) => product.best_seller);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Kuliner</h1>
        <p className="text-xl text-gray-600 mb-8">Discover delicious Indonesian cuisine made with love</p>
        <Link to="/foods" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
          Explore Menu
        </Link>
      </div>

      {/* Best Sellers Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Best Sellers</h2>
          <Link to="/foods" className="text-blue-600 hover:text-blue-800 font-medium">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="text-center">
          <div className="bg-yellow-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Service</h3>
          <p className="text-gray-600">Quick preparation and delivery of your favorite meals</p>
        </div>

        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Fresh Ingredients</h3>
          <p className="text-gray-600">We use only the freshest and highest quality ingredients</p>
        </div>

        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Made with Love</h3>
          <p className="text-gray-600">Every dish is prepared with care and traditional recipes</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
