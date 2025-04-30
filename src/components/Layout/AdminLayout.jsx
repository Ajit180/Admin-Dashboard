import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        <nav>
          <ul className="space-y-2">
          <li>
              <Link to="admin/category">Category</Link>
            </li>
            <li>
              <Link to="admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="admin/products">Products</Link>
            </li>
            <li>
              <Link to="admin/orders">Orders</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* main content  */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
