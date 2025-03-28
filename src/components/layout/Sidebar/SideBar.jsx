import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HiOutlineMail,
  HiOutlineUserGroup,
  HiOutlineUser,
  HiMenuAlt2,
  HiOutlineHome,
  HiOutlineMap,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { toggleTheme } from "../../../feature/theme/theme";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();
  const dispatch = useDispatch();

  const menuItems = [
    {
      path: "/",
      name: "Home",
      icon: <HiOutlineHome className="w-5 h-5" />,
    },
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
    {
      path: "/roadmap",
      name: "Roadmap",
      icon: <HiOutlineMap className="w-5 h-5" />,
    },
  ];

  // First, add this new component at the top level of your SideBar component:
  const ActiveIndicator = ({ pathname, darkMode }) => (
    <div
      className={`absolute left-0 right-0 h-12 transition-all duration-500 ease-in-out transform
      ${darkMode ? "bg-green-900/30" : "bg-green-50"}
      ${
        pathname === "/"
          ? "translate-y-0"
          : pathname === "/send-email"
          ? "translate-y-14"
          : pathname === "/subscribers"
          ? "translate-y-28"
          : pathname === "/roadmap"
          ? "translate-y-42"
          : pathname === "/profile"
          ? "translate-y-[calc(100vh-6rem)]"
          : ""
      }`}
    >
      <div
        className={`absolute right-0 top-0 bottom-0 w-1 bg-green-500 transition-all duration-500 ease-in-out`}
      />
    </div>
  );

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
            className={`text-xl font-semibold flex items-center ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            <span className="text-blue-500">Email</span>
            <span className="ml-1">Sender</span>
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

      {/* Menu Items Container */}
      <div className="p-3 mt-8 relative">
        {/* Active Indicator - Place this before the menu items */}
        <ActiveIndicator pathname={location.pathname} darkMode={darkMode} />

        {/* Menu Items */}
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg mb-2 
            transform transition-all duration-500 ease-in-out
            relative z-10 group
            ${isOpen ? "space-x-3" : "justify-center"}
            ${
              location.pathname === item.path
                ? darkMode
                  ? "text-green-400"
                  : "text-green-700"
                : darkMode
                ? "text-gray-400 hover:text-green-400"
                : "text-gray-600 hover:text-green-700"
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
            {/* Remove the background hover effect and keep only the border */}
            <div
              className={`absolute right-0 top-0 bottom-0 w-1 transition-all duration-300 ease-in-out 
              transform scale-y-0 group-hover:scale-y-100 bg-green-500/50
              ${
                location.pathname === item.path
                  ? "scale-y-100 bg-green-500"
                  : ""
              }`}
            />
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
          relative z-10 group
          ${isOpen ? "space-x-3" : "justify-center"}
          ${
            location.pathname === "/profile"
              ? darkMode
                ? "text-green-400"
                : "text-green-700"
              : darkMode
              ? "text-gray-400 hover:text-green-400"
              : "text-gray-600 hover:text-green-700"
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
          {/* Remove the background hover effect and keep only the border */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-1 transition-all duration-300 ease-in-out 
            transform scale-y-0 group-hover:scale-y-100 bg-green-500/50
            ${
              location.pathname === "/profile" ? "scale-y-100 bg-green-500" : ""
            }`}
          />
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
            className={`flex flex-col items-center justify-center flex-1 h-full relative group
            transition-all duration-300 ease-in-out
            ${
              location.pathname === item.path
                ? darkMode
                  ? "text-green-400"
                  : "text-green-700"
                : darkMode
                ? "text-gray-400 hover:text-green-400"
                : "text-gray-600 hover:text-green-700"
            }`}
          >
            {/* Border indicator - now on the top */}
            <div
              className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out 
              transform scale-x-0 group-hover:scale-x-100 bg-green-500/50
              ${
                location.pathname === item.path
                  ? "scale-x-100 bg-green-500"
                  : ""
              }`}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center w-full">
              <div className="flex items-center justify-center w-full">
                {item.icon}
              </div>
              <span className="text-xs mt-1 text-center w-full">
                {item.name}
              </span>
            </div>
          </Link>
        ))}

        {/* Profile Link */}
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center flex-1 h-full relative group
          transition-all duration-300 ease-in-out
          ${
            location.pathname === "/profile"
              ? darkMode
                ? "text-green-400"
                : "text-green-700"
              : darkMode
              ? "text-gray-400 hover:text-green-400"
              : "text-gray-600 hover:text-green-700"
          }`}
        >
          {/* Border indicator - now on the top */}
          <div
            className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out 
            transform scale-x-0 group-hover:scale-x-100 bg-green-500/50
            ${
              location.pathname === "/profile" ? "scale-x-100 bg-green-500" : ""
            }`}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center w-full">
            <div className="flex items-center justify-center w-full">
              <HiOutlineUser className="w-5 h-5" />
            </div>
            <span className="text-xs mt-1 text-center w-full">Profile</span>
          </div>
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
