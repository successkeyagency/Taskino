import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_USER_DATA } from "../../utils/data";
import { assets } from "../../assets/assets";

const emojiMap = {
  Dashboard: "🏠",
  "Manage Tasks": "📋",
  "Create Task": "➕",
  "Team Members": "👥",
  "My Tasks": "📋",
  Logout: "🔒",
};

const SideNav = ({ activeMenu, isOpen, onClose }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    if (user && user.role !== "admin") {
      setNavItems(SIDE_MENU_USER_DATA);
    }
  }, [user]);

  const handleNavigate = (route) => {
    if (route === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
      onClose?.();
    } else {
      navigate(route);
      onClose?.();
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-green-500 text-white p-6 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex`}
    >
      <div>
        <img
          src={assets.logo}
          alt="Logo"
          className="mx-auto h-16 block md:hidden"
        />
        <br />
        <div className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigate(item.path)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-left ${
                activeMenu === item.label
                  ? "bg-white text-black"
                  : "hover:bg-white/20"
              }`}
            >
              <span className="text-lg">{emojiMap[item.label]}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {user && (
        <div className="mt-10 flex items-center gap-3">
          <img
            src={user.profileImageUrl || ""}
            alt="avatar"
            className="w-10 h-10 rounded-full border border-white object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs">{user.email}</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SideNav;
