import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCart } from "../contexts/CartContext";
const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };
    const handleOrder = () => {
        addToCart(product, 1);
    };
    return (_jsxs("div", { className: "bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group", children: [_jsxs("div", { className: "relative overflow-hidden", children: [_jsx("img", { src: product.img, alt: product.name, className: "w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500", onError: (e) => {
                            e.currentTarget.src = `https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=${encodeURIComponent(product.name)}`;
                        } }), _jsxs("div", { className: "absolute top-3 left-3 flex flex-col gap-2", children: [product.best_seller && _jsx("div", { className: "bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg", children: "\uD83C\uDFC6 Best Seller" }), !product.its_ready && _jsx("div", { className: "bg-gray-900/80 text-white text-xs font-bold px-3 py-1 rounded-full", children: "Tidak Tersedia" })] }), !product.its_ready && (_jsx("div", { className: "absolute inset-0 bg-black/50 flex items-center justify-center", children: _jsx("span", { className: "bg-red-500 text-white font-bold px-6 py-3 rounded-xl shadow-xl", children: "Habis" }) })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })] }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200", children: product.name }), _jsx("span", { className: "text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full", children: product.code })] }), _jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("div", { className: "text-2xl font-bold text-gray-900", children: formatPrice(product.price) }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("svg", { className: "w-4 h-4 text-yellow-400 fill-current", viewBox: "0 0 20 20", children: _jsx("path", { d: "M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" }) }), _jsx("span", { className: "text-sm text-gray-600", children: "4.8" })] })] }), _jsx("button", { onClick: handleOrder, disabled: !product.its_ready, className: `w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform ${product.its_ready ? "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`, children: product.its_ready ? (_jsxs("span", { className: "flex items-center justify-center", children: [_jsx("svg", { className: "w-5 h-5 mr-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8m-8 4V9a2 2 0 114 0v8m-4 0h4" }) }), "Tambah ke Keranjang"] })) : ("Tidak Tersedia") })] })] }));
};
export default ProductCard;
