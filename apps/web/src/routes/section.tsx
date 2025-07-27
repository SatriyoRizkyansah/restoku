import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Layout from "../components/HomeLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import { CartProvider } from "../contexts/CartContext";

// Lazy-loaded pages
export const HomePage = lazy(() => import("../pages/home-page"));
export const FoodsPage = lazy(() => import("../pages/foods-page"));
export const CartPage = lazy(() => import("../pages/cart-page"));
export const SuccessPage = lazy(() => import("../pages/success-page"));
export const AuthPage = lazy(() => import("../pages/auth-page"));
export const Dashboard = lazy(() => import("../pages/dashboard-page"));

// export const routesSections = [
//   {
//     path: "/",
//     element: _jsx(CartProvider, { children: _jsx(Layout, { children: _jsx(HomePage, {}) }) }),
//   },
//   {
//     path: "/foods",
//     element: _jsx(CartProvider, { children: _jsx(Layout, { children: _jsx(FoodsPage, {}) }) }),
//   },
//   {
//     path: "/cart",
//     element: _jsx(CartProvider, { children: _jsx(Layout, { children: _jsx(CartPage, {}) }) }),
//   },
//   {
//     path: "/success",
//     element: _jsx(CartProvider, { children: _jsx(SuccessPage, {}) }),
//   },
//   {
//     id: "dashboard",
//     path: "/dashboard",
//     element: _jsx(DashboardLayout, { children: _jsx(Dashboard, {}) }),
//   },
//   {
//     id: "admin",
//     path: "/admin",
//     element: _jsx(AdminPage, {}),
//   },
// ];

// Wrapper Layout with CartProvider
const PublicLayout = () => (
  <CartProvider>
    <Layout>
      <Outlet />
    </Layout>
  </CartProvider>
);

export const routesSections: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    element: <PublicLayout />,
    children: [
      { path: "home", element: <HomePage /> },
      { path: "foods", element: <FoodsPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "success", element: <SuccessPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
];
