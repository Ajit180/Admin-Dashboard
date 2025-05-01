import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-2 rounded-lg bg-gray-700 text-white font-semibold transition-all"
      : "block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 tracking-wide">Admin Panel</h2>
        <nav>
          <ul className="space-y-3">
            <li>
              <NavLink to="admin/category" className={navLinkClass}>
                📁 Category
              </NavLink>
            </li>
            <li>
              <NavLink to="admin/dashboard" className={navLinkClass}>
                📊 Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="admin/products" className={navLinkClass}>
                📦 Products
              </NavLink>
            </li>
            <li>
              <NavLink to="admin/orders" className={navLinkClass}>
                🧾 Orders
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
