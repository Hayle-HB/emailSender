import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../../feature/theme/theme";
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineCog,
  HiOutlineChevronDown,
} from "react-icons/hi";

const Header = ({ sidebarCollapsed }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Track scroll position for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showProfileMenu && !e.target.closest(".profile-menu")) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileMenu]);

  // Color scheme based on theme
  const theme = {
    bg: darkMode ? "bg-slate-800" : "bg-white",
    text: darkMode ? "text-slate-100" : "text-slate-700",
    textMuted: darkMode ? "text-slate-400" : "text-slate-500",
    border: darkMode ? "border-slate-700" : "border-slate-200",
    accent: darkMode ? "text-sky-400" : "text-sky-500",
    inputBg: darkMode ? "bg-slate-700" : "bg-slate-100",
    inputFocusBg: darkMode ? "bg-slate-700" : "bg-white",
    hoverBg: darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100",
    shadow: scrolled
      ? darkMode
        ? "shadow-md shadow-black/10"
        : "shadow-md shadow-slate-200/50"
      : "",
    dropdownBg: darkMode ? "bg-slate-700" : "bg-white",
    dropdownShadow: "shadow-xl shadow-slate-900/10",
    dropdownHover: darkMode ? "hover:bg-slate-600" : "hover:bg-slate-50",
    buttonHover: darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100",
    divider: darkMode ? "bg-slate-600" : "bg-slate-200",
  };

  return (
    <header
      className={`
        sticky top-0 z-40
        ${theme.bg} ${theme.text}
        ${theme.shadow}
        transition-all duration-200
        border-b ${theme.border}
      `}
    >
      <div
        className={`
        flex items-center justify-between
        h-16 px-4 md:px-6
        transition-all
        ${sidebarCollapsed ? "md:ml-20" : "md:ml-64"}
      `}
      >
        {/* Left side - Search */}
        <div className="flex-1 max-w-md">
          <div
            className={`
            relative flex items-center
            ${theme.inputBg} 
            ${
              searchFocused
                ? `${theme.inputFocusBg} ring-2 ring-sky-500/50`
                : "ring-0"
            }
            rounded-full px-3.5 py-1.5
            transition-all duration-200
          `}
          >
            <HiOutlineSearch
              className={`
              ${searchFocused ? theme.accent : theme.textMuted}
              mr-2 h-5 w-5
            `}
            />
            <input
              type="text"
              placeholder="Search..."
              className={`
                bg-transparent border-none outline-none
                w-full text-sm ${theme.text}
                placeholder:${theme.textMuted}
              `}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`
              p-2 rounded-full
              transition-colors duration-200
              ${theme.buttonHover} ${theme.textMuted}
              hover:${theme.accent}
            `}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <HiOutlineSun className="h-5 w-5" />
            ) : (
              <HiOutlineMoon className="h-5 w-5" />
            )}
          </button>

          {/* Notifications */}
          <button
            className={`
              p-2 rounded-full
              transition-colors duration-200
              ${theme.buttonHover} ${theme.textMuted}
              hover:${theme.accent}
              relative
            `}
            aria-label="Notifications"
          >
            <HiOutlineBell className="h-5 w-5" />
            <span
              className="
              absolute top-1 right-1
              w-2 h-2
              bg-red-500
              rounded-full
              border-2 border-white
              dark:border-slate-800
            "
            ></span>
          </button>

          {/* Profile Menu */}
          <div className="relative profile-menu">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`
                flex items-center space-x-1
                px-2 py-1.5 rounded-full
                transition-colors duration-200
                ${theme.buttonHover}
                ${showProfileMenu ? theme.accent : ""}
              `}
              aria-label="User profile"
            >
              <div
                className="
                h-8 w-8 rounded-full overflow-hidden
                bg-gradient-to-br from-sky-400 to-indigo-500
                flex items-center justify-center text-white font-medium
              "
              >
                JD
              </div>
              <span className="hidden md:block text-sm font-medium">
                John Doe
              </span>
              <HiOutlineChevronDown
                className={`
                h-4 w-4 transition-transform duration-200
                ${showProfileMenu ? "rotate-180" : ""}
                ${theme.textMuted}
              `}
              />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div
                className={`
                absolute right-0 mt-2
                w-56 rounded-xl overflow-hidden
                ${theme.dropdownBg}
                ${theme.dropdownShadow}
                border ${theme.border}
                py-1
                origin-top-right
                animate-in fade-in zoom-in-95
                duration-100
              `}
              >
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs truncate mt-0.5 text-slate-500 dark:text-slate-400">
                    john.doe@example.com
                  </p>
                </div>

                <div className="py-1">
                  <a
                    href="#profile"
                    className={`
                      flex items-center px-4 py-2 text-sm
                      ${theme.dropdownHover} ${theme.text}
                    `}
                  >
                    <HiOutlineUser className="mr-3 h-4 w-4" />
                    Your Profile
                  </a>
                  <a
                    href="#settings"
                    className={`
                      flex items-center px-4 py-2 text-sm
                      ${theme.dropdownHover} ${theme.text}
                    `}
                  >
                    <HiOutlineCog className="mr-3 h-4 w-4" />
                    Settings
                  </a>
                </div>

                <div className="py-1 border-t border-slate-200 dark:border-slate-700">
                  <a
                    href="#logout"
                    className={`
                      flex items-center px-4 py-2 text-sm
                      ${theme.dropdownHover} text-red-500
                    `}
                  >
                    <HiOutlineLogout className="mr-3 h-4 w-4" />
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
