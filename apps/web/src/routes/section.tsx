import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import { CartProvider } from "../contexts/CartContext";

export const HomePage = lazy(() => import("../pages/home-page"));
export const FoodsPage = lazy(() => import("../pages/foods-page"));
export const CartPage = lazy(() => import("../pages/cart-page"));
export const SuccessPage = lazy(() => import("../pages/success-page"));
export const AdminPage = lazy(() => import("../pages/admin-page"));

export const routesSections: RouteObject[] = [
  {
    path: "/",
    element: (
      <CartProvider>
        <Layout>
          <HomePage />
        </Layout>
      </CartProvider>
    ),
  },
  {
    path: "/foods",
    element: (
      <CartProvider>
        <Layout>
          <FoodsPage />
        </Layout>
      </CartProvider>
    ),
  },
  {
    path: "/cart",
    element: (
      <CartProvider>
        <Layout>
          <CartPage />
        </Layout>
      </CartProvider>
    ),
  },
  {
    path: "/success",
    element: (
      <CartProvider>
        <SuccessPage />
      </CartProvider>
    ),
  },
  {
    id: "admin",
    path: "/admin",
    element: <AdminPage />,
  },
];
