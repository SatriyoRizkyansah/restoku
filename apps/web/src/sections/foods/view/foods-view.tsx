import { useState } from "react";
import ProductCard from "../../../components/ProductCard";
import { dummyProducts } from "../../../data/products";

export function FoodsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "best_seller" | "available">("all");

  // Filter products based on search and filter
  const filteredProducts = dummyProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

    switch (filter) {
      case "best_seller":
        return matchesSearch && product.best_seller;
      case "available":
        return matchesSearch && product.its_ready;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🍽️ Menu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Lengkap</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Temukan hidangan favorit Anda dari koleksi menu autentik kami</p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Cari makanan favorit Anda..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
                />
                <svg className="absolute left-4 top-4 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${filter === "all" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setFilter("best_seller")}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${filter === "best_seller" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  🏆 Best Seller
                </button>
                <button
                  onClick={() => setFilter("available")}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${filter === "available" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  ✅ Tersedia
                </button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              Menampilkan {filteredProducts.length} dari {dummyProducts.length} menu
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="transform hover:scale-105 transition-all duration-300">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Menu tidak ditemukan</h3>
              <p className="text-gray-600 mb-6">Coba ubah kata kunci pencarian atau filter yang Anda gunakan.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilter("all");
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Reset Pencarian
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
