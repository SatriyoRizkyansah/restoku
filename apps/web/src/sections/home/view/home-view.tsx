"use client";

import { Link } from "react-router-dom";
import ProductCard from "../../../components/ProductCard";
import { dummyProducts } from "../../../data/products";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export function HomeView() {
  // Show only best sellers for home page
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/products/best-sellers");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const bestSellerProducts = dummyProducts.filter((product) => product.best_seller);
  const bestSellerProducts = products || [];

  // if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-600">Kyoto Kitchen</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">Itadakimasu! Experience the authentic flavors of Japanese cuisine, crafted with love and time-honored techniques.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/foods"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Explore the Menu
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-orange-400 text-orange-600 hover:bg-orange-400 hover:text-white font-semibold rounded-full transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-7 0h6" />
                </svg>
                See the Chef's Special
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🏆 Customer Favorites</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Beloved dishes our guests keep coming back for</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellerProducts.map((product) => (
              <div key={product.id} className="transform hover:scale-105 transition-transform duration-300">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/foods" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg group">
              View All Menu
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Kyoto Kitchen?</h2>
            <p className="text-lg text-gray-600">Our commitment to providing the best culinary experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:bg-yellow-50 p-8 rounded-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Service</h3>
              <p className="text-gray-600 leading-relaxed">Efficient ordering process and quick food delivery without compromising quality</p>
            </div>

            <div className="text-center group hover:bg-green-50 p-8 rounded-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-green-400 to-emerald-400 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fresh Ingredients</h3>
              <p className="text-gray-600 leading-relaxed">Using only the finest fresh ingredients prepared with the highest hygiene standards</p>
            </div>

            <div className="text-center group hover:bg-red-50 p-8 rounded-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-red-400 to-pink-400 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Made with Love</h3>
              <p className="text-gray-600 leading-relaxed">Every dish is crafted with care, using authentic traditional recipes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-400 to-yellow-400">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Savor the Flavor?</h2>
          <p className="text-xl text-white/90 mb-8">Order now and enjoy an unforgettable dining experience</p>
          <Link to="/foods" className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 hover:bg-gray-100 font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Start Ordering Now
          </Link>
        </div>
      </section>
    </div>
  );
}
