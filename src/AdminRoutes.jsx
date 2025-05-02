import { Route } from "react-router-dom";
import AdminLayout from "./components/Layout/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Products from "./pages/Admin/Product/CreateProduct";
import Orders from "./pages/Admin/Orders";

export const adminRoutes = (
  <Route path="admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="products" element={<Products />} />
    <Route path="orders" element={<Orders />} />
  </Route>
);
