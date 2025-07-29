import type { Product } from "../types";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleOrder = () => {
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          // onError={(e) => {
          //   e.currentTarget.src = `https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`;
          // }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.best_seller && <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">🏆 Best Seller</div>}
          {!product.its_ready && <div className="bg-gray-900/80 text-white text-xs font-bold px-3 py-1 rounded-full">Tidak Tersedia</div>}
        </div>

        {/* Overlay for unavailable items */}
        {!product.its_ready && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl shadow-xl">Habis</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">{product.name}</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{product.code}</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>

        {/* Order Button */}
        <button
          onClick={handleOrder}
          disabled={!product.its_ready}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform ${
            product.its_ready ? "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.its_ready ? (
            <span className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l3.6 7.59a1 1 0 00.92.61h7.72a1 1 0 00.92-.61l3.16-6.59H6" />
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
              </svg>
              Add to Cart
            </span>
          ) : (
            "Tidak Tersedia"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
