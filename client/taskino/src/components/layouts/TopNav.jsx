import React, { useContext, useEffect, useState } from "react";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../../assets/assets";

const emojiMap = {
  Dashboard: "🏠",
  "Manage Tasks": "📋",
  "Create Task": "➕",
  "Team Members": "👥",
  "My Tasks": "📋",
  Logout: "🔒",
};

const TopNav = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [navItems, setNavItems] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    setMobileOpen(false);
    if (route === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
    } else {
      navigate(route);
    }
  };

  useEffect(() => {
    if (user) {
      setNavItems(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  const filteredNavItems = navItems.filter((item) => item.label !== "Logout");

  return (
    <header
      className={`w-full ${
        user?.role === "admin" ? "bg-orange-500" : "bg-green-500"
      } border-b border-black px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md`}
    >
      <div className="flex items-center gap-4">
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-lg font-bold text-gray-800 tracking-tight flex items-center"
        >
          <img
            src={assets.logo}
            alt="Logo"
            className="max-w-[50px] h-auto object-contain shadow-2xl"
          />
        </motion.h2>

        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        {filteredNavItems.map((item, index) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            key={index}
            onClick={() => handleNavigate(item.path)}
            className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-md transition ${
              activeMenu === item.label
                ? "bg-orange-100 text-orange-600"
                : "text-white hover:bg-black"
            }`}
          >
            <span className="text-base">{emojiMap[item.label]}</span>
            {item.label}
          </motion.button>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavigate("logout")}
          className="text-xs font-semibold px-3 py-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          🔒 Logout
        </motion.button>

        {user && (
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={user?.profileImageUrl || ""}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover border border-gray-300"
          />
        )}
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-md px-6 py-4 z-50 md:hidden rounded-b-xl"
          >
            <div className="flex flex-col gap-3">
              {user && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 mb-2"
                >
                  <img
                    src={user?.profileImageUrl || ""}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </motion.div>
              )}

              {filteredNavItems.map((item, index) => (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  key={index}
                  onClick={() => handleNavigate(item.path)}
                  className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
                    activeMenu === item.label
                      ? "bg-orange-100 text-orange-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-base">{emojiMap[item.label]}</span>
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate("logout")}
                className="text-sm text-left px-3 py-2 mt-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                🔒 Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TopNav;
