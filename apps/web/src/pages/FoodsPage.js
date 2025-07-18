import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { dummyProducts } from "../data/products";
const FoodsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");
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
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Food Lists" }), _jsx("p", { className: "text-gray-600", children: "Find your favorite food..." })] }), _jsxs("div", { className: "mb-8 flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx("input", { type: "text", placeholder: "Find your favorite food...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" }), _jsx("svg", { className: "absolute left-3 top-2.5 h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setFilter("all"), className: `px-4 py-2 rounded-lg font-medium transition-colors ${filter === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`, children: "All" }), _jsx("button", { onClick: () => setFilter("best_seller"), className: `px-4 py-2 rounded-lg font-medium transition-colors ${filter === "best_seller" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`, children: "Best Seller" }), _jsx("button", { onClick: () => setFilter("available"), className: `px-4 py-2 rounded-lg font-medium transition-colors ${filter === "available" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`, children: "Available" })] })] }), _jsx("div", { className: "mb-6", children: _jsxs("p", { className: "text-gray-600", children: ["Showing ", filteredProducts.length, " of ", dummyProducts.length, " products"] }) }), filteredProducts.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredProducts.map((product) => (_jsx(ProductCard, { product: product }, product.id))) })) : (_jsxs("div", { className: "text-center py-12", children: [_jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }), _jsx("h3", { className: "mt-2 text-sm font-medium text-gray-900", children: "No products found" }), _jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Try adjusting your search or filter criteria." })] }))] }));
};
export default FoodsPage;
