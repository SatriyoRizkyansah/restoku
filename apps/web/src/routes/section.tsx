import { jsx as _jsx } from "react/jsx-runtime";
import { lazy } from "react";
import Layout from "../components/Layout";
import { CartProvider } from "../contexts/CartContext";
import DashboardLayout from "../layouts/DashboardLayout";

export const HomePage = lazy(() => import("../pages/home-page"));
export const FoodsPage = lazy(() => import("../pages/foods-page"));
export const CartPage = lazy(() => import("../pages/cart-page"));
export const SuccessPage = lazy(() => import("../pages/success-page"));
export const AdminPage = lazy(() => import("../pages/admin-page"));
export const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

export const routesSections = [
  {
    path: "/",
    element: _jsx(CartProvider, { children: _jsx(Layout, { children: _jsx(HomePage, {}) }) }),
  },
  {
    path: "/foods",
    element: _jsx(CartProvider, { children: _jsx(Layout, { children: _jsx(FoodsPage, {}) }) }),
  },
  {
    path: "/cart",
    element: _jsx(CartProvider, { children: _jsx(Layout, { children: _jsx(CartPage, {}) }) }),
  },
  {
    path: "/success",
    element: _jsx(CartProvider, { children: _jsx(SuccessPage, {}) }),
  },
  {
    id: "dashboard",
    path: "/dashboard",
    element: _jsx(DashboardLayout, { children: _jsx(Dashboard, {}) }),
  },
  {
    id: "admin",
    path: "/admin",
    element: _jsx(AdminPage, {}),
  },
];
