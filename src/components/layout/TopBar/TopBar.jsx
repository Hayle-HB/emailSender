import React, { useState } from "react";
import { FaBell, FaSearch, FaCog, FaRegKeyboard } from "react-icons/fa";
import { MdApps } from "react-icons/md";
import { HiMenuAlt2, HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../../feature/theme/theme";

const TopBar = ({ toggleSidebar, isOpen }) => {
  const [isFocused, setIsFocused] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <div
      className={`fixed top-0 right-0 h-16 z-20 transition-all duration-500 ease-in-out
      ${
        darkMode
          ? "bg-gray-900 border-b border-gray-800"
          : "bg-white border-b border-gray-200"
      }
      ${isOpen ? "md:left-64" : "md:left-20"} left-0`}
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Theme Toggle for Mobile & Logo */}
        <div className="flex items-center">
          {/* Theme Toggle for Mobile */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              darkMode
                ? "text-gray-200 hover:bg-gray-800 hover:text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {darkMode ? (
              <HiOutlineSun className="w-6 h-6" />
            ) : (
              <HiOutlineMoon className="w-6 h-6" />
            )}
          </button>

          {/* Logo for Mobile */}
          <span
            className={`ml-3 font-semibold md:hidden flex items-center ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            <span className="text-blue-500 mr-1">Email</span>
            <span>Sender</span>
          </span>

          {/* Theme Toggle for Desktop */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`hidden md:block p-2 rounded-lg transition-all duration-300 ${
              darkMode
                ? "text-gray-200 hover:bg-gray-800 hover:text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {darkMode ? (
              <HiOutlineSun className="w-6 h-6" />
            ) : (
              <HiOutlineMoon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Google-style Search Bar */}
        <div className="hidden sm:flex items-center flex-1 max-w-2xl mx-4">
          <div className="relative w-full">
            <div
              className={`flex items-center w-full px-4 py-2.5 rounded-full border 
              ${
                isFocused
                  ? darkMode
                    ? "border-gray-600 bg-gray-800"
                    : "border-gray-300 shadow-lg"
                  : darkMode
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-200 hover:shadow-md"
              } 
              transition-all duration-300`}
            >
              <FaSearch
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } text-lg`}
              />
              <input
                type="text"
                placeholder="Search..."
                className={`w-full px-4 outline-none bg-transparent ${
                  darkMode
                    ? "text-gray-200 placeholder-gray-500"
                    : "text-gray-700"
                }`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <FaRegKeyboard
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } text-lg ml-2 cursor-pointer`}
              />
            </div>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-2">
          {/* Search Icon for Mobile */}
          <button
            className={`sm:hidden p-2 rounded-lg ${
              darkMode
                ? "text-gray-200 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaSearch className="w-5 h-5" />
          </button>

          <button
            className={`hidden sm:block p-2 rounded-lg ${
              darkMode
                ? "text-gray-200 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaCog className="w-5 h-5" />
          </button>

          <button
            className={`hidden sm:block p-2 rounded-lg ${
              darkMode
                ? "text-gray-200 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <MdApps className="w-5 h-5" />
          </button>

          <button
            className={`relative p-2 rounded-lg ${
              darkMode
                ? "text-gray-200 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaBell className="w-5 h-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-blue-500 rounded-full" />
          </button>

          <button
            className={`p-1 rounded-lg ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
          >
            <img
              src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
