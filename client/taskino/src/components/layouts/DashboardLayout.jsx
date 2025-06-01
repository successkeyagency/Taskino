import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import TopNav from "./TopNav";
import SideNav from "./SideBar";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const isAdmin = user.role === "admin";

  return isAdmin ? (
    <div className="min-h-screen text-gray-800">
      <TopNav activeMenu={activeMenu} />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        {children}
      </main>
    </div>
  ) : (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 overflow-x-hidden relative">
      {/* Sidebar */}
      <SideNav
        activeMenu={activeMenu}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Backdrop (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-3 rounded-lg bg-green-400 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 md:hidden"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? "❌" : "<-open"}
      </button>

      {/* Main content */}
      <main
        className={`flex-1 px-0 sm:px-6 md:px-8 py-3 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
