import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HiOutlineMail,
  HiOutlineUserGroup, 
  HiOutlineUser,
  HiMenuAlt2,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { toggleTheme } from "../../../feature/theme/theme";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();
  const dispatch = useDispatch();

  const menuItems = [
    {
      path: "/send-email",
      name: "Send Email",
      icon: <HiOutlineMail className="w-5 h-5" />,
    },
    {
      path: "/subscribers",
      name: "Subscribers",
      icon: <HiOutlineUserGroup className="w-5 h-5" />,
    },
  ];

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div
      className={`hidden md:block fixed left-0 h-screen 
      ${darkMode ? "bg-gray-900" : "bg-gray-50"} 
      border-r ${darkMode ? "border-gray-800" : "border-gray-100"}
      transform transition-[width] duration-500 ease-in-out
      ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* Logo Area */}
      <div
        className={`p-6 h-20 flex items-center transform transition-all duration-500 ease-in-out
        ${isOpen ? "justify-between" : "justify-center"}`}
      >
        <div
          className={`transform transition-all duration-500 ease-in-out
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 w-0"}`}
        >
          <h1
            className={`text-xl font-semibold ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            EmailManager
          </h1>
        </div>
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg transform transition-all duration-500 ease-in-out ${
            darkMode
              ? "text-gray-200 hover:bg-gray-800"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <HiMenuAlt2
            className={`w-5 h-5 transform transition-transform duration-500 ease-in-out
            ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>

      {/* Menu Items */}
      <div className="p-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg mb-1 
            transform transition-all duration-500 ease-in-out
            ${isOpen ? "space-x-3" : "justify-center"}
            ${
              location.pathname === item.path
                ? darkMode
                  ? "bg-gray-800 text-gray-200"
                  : "bg-white text-gray-800 shadow-sm"
                : darkMode
                ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                : "text-gray-600 hover:bg-white hover:text-gray-800"
            }`}
          >
            <div className="transform transition-all duration-500 ease-in-out min-w-[20px]">
              {item.icon}
            </div>
            <div
              className={`transform transition-all duration-500 ease-in-out overflow-hidden
              ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}
            >
              <span className="font-medium text-sm whitespace-nowrap">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* User Profile at Bottom */}
      <div
        className={`absolute bottom-0 w-full p-4 border-t transform transition-all duration-500 ease-in-out
        ${darkMode ? "border-gray-800" : "border-gray-100"}`}
      >
        <Link
          to="/profile"
          className={`flex items-center px-4 py-3 rounded-lg 
          transform transition-all duration-500 ease-in-out
          ${isOpen ? "space-x-3" : "justify-center"}
          ${
            location.pathname === "/profile"
              ? darkMode
                ? "bg-gray-800 text-gray-200"
                : "bg-white text-gray-800 shadow-sm"
              : darkMode
              ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              : "text-gray-600 hover:bg-white hover:text-gray-800"
          }`}
        >
          <div className="transform transition-all duration-500 ease-in-out min-w-[20px]">
            <HiOutlineUser className="w-5 h-5" />
          </div>
          <div
            className={`transform transition-all duration-500 ease-in-out overflow-hidden
            ${isOpen ? "w-auto opacity-100" : "w-0 opacity-0"}`}
          >
            <span className="font-medium text-sm whitespace-nowrap">
              Profile
            </span>
          </div>
        </Link>
      </div>
    </div>
  );

  // Mobile Bottom Navigation
  const MobileNavigation = () => (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 ${
        darkMode ? "bg-gray-900" : "bg-white"
      } border-t ${darkMode ? "border-gray-800" : "border-gray-100"} z-50`}
    >
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              location.pathname === item.path
                ? darkMode
                  ? "text-gray-200 bg-gray-800"
                  : "text-blue-600"
                : darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            location.pathname === "/profile"
              ? darkMode
                ? "text-gray-200 bg-gray-800"
                : "text-blue-600"
              : darkMode
              ? "text-gray-400"
              : "text-gray-600"
          }`}
        >
          <HiOutlineUser className="w-5 h-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileNavigation />
    </>
  );
};

export default SideBar;
