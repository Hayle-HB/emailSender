import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toggleTheme } from "../../../feature/theme/theme";
import {
  HiHome,
  HiMail,
  HiUserGroup,
  HiChatAlt2,
  HiSun,
  HiMoon,
  HiMenuAlt2,
  HiX,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineChevronDown,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

// Navigation Item Component
const NavItem = ({ item, isActive, collapsed, darkMode, onClick }) => {
  const baseClasses = "flex items-center px-3 py-3 rounded-xl transition-all duration-200";
  const activeClasses = darkMode 
    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
    : "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30";
  const inactiveClasses = darkMode
    ? "text-gray-400 hover:bg-gray-800 hover:text-white" 
    : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600";
  const iconClasses = isActive
    ? "text-white"
    : darkMode 
      ? "text-gray-400 group-hover:text-white"
      : "text-gray-500 group-hover:text-indigo-500";

  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${isActive ? activeClasses : inactiveClasses}
        ${collapsed ? "justify-center mx-auto" : "justify-start"}
        group relative
      `}
    >
      <div className={iconClasses}>{item.icon}</div>
      {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
      
      {collapsed && (
        <div className="
          absolute left-full ml-2 px-2 py-1
          bg-gray-800 text-white text-xs rounded-md 
          whitespace-nowrap z-50
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-200
        ">
          {item.label}
        </div>
      )}
    </Link>
  );
};

// Profile Menu Component 
const ProfileMenu = ({ darkMode, showProfileMenu, setShowProfileMenu }) => {
  const menuButtonClasses = `
    flex items-center space-x-1 px-2 py-1.5 rounded-full
    transition-colors duration-200
    ${darkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-100 text-gray-700"}
  `;

  const dropdownClasses = `
    absolute right-0 mt-2 w-56 rounded-xl overflow-hidden
    ${darkMode ? "bg-gray-800 shadow-black/20" : "bg-white shadow-gray-200/80"}
    border ${darkMode ? "border-gray-700" : "border-gray-100"}
    py-1 origin-top-right
    animate-in slide-in-from-top-2 duration-150
  `;

  const menuItemClasses = (isRed = false) => `
    flex items-center px-4 py-2 text-sm
    ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}
    ${isRed ? "text-red-500" : darkMode ? "text-white" : "text-gray-700"}
  `;

  return (
    <div className="relative profile-menu">
      <button 
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className={menuButtonClasses}
        aria-label="User profile"
      >
        <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium">
          JD
        </div>
        <HiOutlineChevronDown className={`
          h-4 w-4 transition-transform duration-200
          ${showProfileMenu ? "rotate-180" : ""}
          ${darkMode ? "text-gray-400" : "text-gray-500"}
        `} />
      </button>

      {showProfileMenu && (
        <div className={dropdownClasses}>
          <div className={`px-4 py-3 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <p className="text-sm font-medium">John Doe</p>
            <p className={`text-xs truncate mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              john.doe@example.com
            </p>
          </div>

          <div className="py-1">
            <a href="#profile" className={menuItemClasses()}>
              <HiOutlineUser className="mr-3 h-4 w-4" />
              Your Profile
            </a>
            <a href="#settings" className={menuItemClasses()}>
              <HiOutlineCog className="mr-3 h-4 w-4" />
              Settings
            </a>
          </div>

          <div className={`py-1 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <a href="#logout" className={menuItemClasses(true)}>
              <HiOutlineLogout className="mr-3 h-4 w-4" />
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// Search Bar Component
const SearchBar = ({ darkMode, searchFocused, setSearchFocused }) => {
  const containerClasses = `
    relative flex items-center
    ${darkMode ? "bg-gray-800" : "bg-gray-100"}
    ${searchFocused ? `ring-2 ring-indigo-500/${darkMode ? "50" : "30"}` : ""}
    rounded-full px-3.5 py-1.5
    transition-all duration-200
  `;

  const searchIconClasses = `
    ${searchFocused ? "text-indigo-400" : darkMode ? "text-gray-400" : "text-gray-500"}
    mr-2 h-5 w-5
  `;

  const inputClasses = `
    bg-transparent border-none outline-none w-full text-sm
    ${darkMode ? "text-white placeholder:text-gray-500" : "text-gray-800 placeholder:text-gray-400"}
  `;

  return (
    <div className={containerClasses}>
      <HiOutlineSearch className={searchIconClasses} />
      <input
        type="text"
        placeholder="Search..."
        className={inputClasses}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
      />
    </div>
  );
};

// Main component
const Sidebar = ({
  onToggleCollapse,
  logo = "TeamFlow",
  initialCollapsed = false,
  navigationItems = [
    {
      path: "/dashboard",
      icon: <HiHome className="text-2xl" />,
      label: "Dashboard",
    },
    {
      path: "/email-management",
      icon: <HiMail className="text-2xl" />,
      label: "Email",
    },
    {
      path: "/telegram-bot",
      icon: <HiChatAlt2 className="text-2xl" />,
      label: "Messages",
    },
    {
      path: "/team-management",
      icon: <HiUserGroup className="text-2xl" />,
      label: "Team",
    },
  ],
}) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const location = useLocation();

  // State management
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Theme styles
  const theme = {
    sidebar: {
      bg: darkMode ? "bg-gray-900" : "bg-white",
      text: darkMode ? "text-white" : "text-gray-800",
      border: darkMode ? "border-gray-800" : "border-gray-100",
      muted: darkMode ? "text-gray-400" : "text-gray-500",
      hover: darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100",
      accent: darkMode ? "text-indigo-400" : "text-indigo-600",
    },
    header: {
      shadow: scrolled
        ? darkMode
          ? "shadow-md shadow-black/10"
          : "shadow-md"
        : "",
    },
  };

  // Effects
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showProfileMenu && !e.target.closest(".profile-menu")) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileMenu]);

  // Handlers
  const handleThemeToggle = () => dispatch(toggleTheme());

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const toggleCollapse = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    if (onToggleCollapse) {
      onToggleCollapse(newCollapsedState);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileMenu}
        className={`
          md:hidden fixed top-4 right-4 z-50
          p-2 rounded-full
          ${
            darkMode
              ? "bg-indigo-500 text-white hover:bg-indigo-600"
              : "bg-white text-indigo-600 hover:bg-gray-100"
          }
          shadow-lg transition-all duration-200
        `}
      >
        {mobileOpen ? <HiX size={24} /> : <HiMenuAlt2 size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          transition-all duration-300 ease-in-out
          ${theme.sidebar.bg} ${theme.sidebar.text}
          border-r ${theme.sidebar.border}
          shadow-2xl z-50
        `}
      >
        {/* Sidebar Header */}
        <div
          className={`
            p-4 flex items-center justify-between
            border-b ${theme.sidebar.border}
          `}
        >
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <span className={`font-bold text-xl ${theme.sidebar.accent}`}>
                {logo}
              </span>
            </div>
          )}

          <button
            onClick={toggleCollapse}
            className={`
              p-2 rounded-lg transition-colors duration-200
              ${theme.sidebar.hover} ${theme.sidebar.muted} hover:${
              theme.sidebar.text
            }
              ${collapsed ? "mx-auto" : ""}
            `}
          >
            {collapsed ? (
              <HiChevronRight size={20} />
            ) : (
              <HiChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="py-6">
          <div className="space-y-2 px-3">
            {navigationItems.map((item) => (
              <NavItem
                key={item.path}
                item={item}
                isActive={location.pathname === item.path}
                collapsed={collapsed}
                darkMode={darkMode}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <div
          className={`
            absolute bottom-0 w-full p-4 
            border-t ${theme.sidebar.border}
          `}
        >
          <button
            onClick={handleThemeToggle}
            className={`
              ${collapsed ? "mx-auto" : "w-full"} 
              flex items-center ${
                collapsed ? "justify-center" : "justify-between"
              }
              p-3 rounded-xl transition-all duration-200
              ${
                darkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {!collapsed && <span>Theme</span>}
            {darkMode ? (
              <HiSun size={20} className="text-yellow-400" />
            ) : (
              <HiMoon size={20} className="text-indigo-600" />
            )}
          </button>
        </div>
      </aside>

      {/* Header - Integrated with Sidebar */}
      <header
        className={`
          fixed top-0 left-0 right-0 h-16 z-40
          ${mobileOpen ? "translate-x-0" : ""}
          ${theme.sidebar.bg} ${theme.sidebar.text}
          border-b ${theme.sidebar.border}
          ${theme.header.shadow}
          transition-all duration-300 ease-in-out
          ${collapsed ? "md:pl-24" : "md:pl-68"}
          ${mobileOpen ? "md:pl-4" : ""}
        `}
      >
        <div className="flex items-center justify-between h-full px-4">
          {/* Left side - empty space for mobile/sidebar offset */}
          <div className="md:w-8 w-4"></div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-auto">
            <SearchBar
              darkMode={darkMode}
              searchFocused={searchFocused}
              setSearchFocused={setSearchFocused}
            />
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <button
              className={`
                p-2 rounded-full
                transition-colors duration-200
                ${theme.sidebar.hover} ${theme.sidebar.muted}
                hover:text-indigo-500
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
                  border-2 border-white dark:border-gray-900
                "
              ></span>
            </button>

            {/* Profile Menu */}
            <ProfileMenu
              darkMode={darkMode}
              showProfileMenu={showProfileMenu}
              setShowProfileMenu={setShowProfileMenu}
            />
          </div>
        </div>
      </header>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Content Spacer - To ensure content starts below header */}
      <div className="h-16"></div>
    </>
  );
};

export default Sidebar;
