import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./components/layout/Sidebar/SideBar";
import Teams from "./pages/Teams";
import Small from "./pages/Small";
// import EmailSender from "./components/features/EmailSender/EmailSender";
import Dashboard from "./pages/Dashboard/Dashboard";
// Import your page components
const EmailSender = () => <div>Email Sender Page</div>;
// const Dashboard = () => <div>Dashboard Page</div>;
const EmailManagement = () => <EmailSender />;
const TelegramBot = () => <div>Telegram Bot Page</div>;
const ProfilePage = () => <div>Profile Page</div>;
const Settings = () => <div>Settings Page</div>;
const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh]">
    <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700">404</h1>
    <p className="text-xl mt-4">Page not found</p>
    <button
      onClick={() => window.history.back()}
      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Go Back
    </button>
  </div>
);

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Track window size for responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      } else if (window.innerWidth > 1200) {
        setSidebarCollapsed(false);
      }
    };

    // Initial check
    handleResize();

    // Add listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
    setPageTransition(true);

    // Reset page transition state after animation
    setTimeout(() => {
      setPageTransition(false);
    }, 300);
  };

  return (
    <Router>
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Sidebar onToggleCollapse={handleSidebarToggle} />

        {/* Main Content */}
        <main
          className={`
            transition-all duration-300 ease-in-out
            p-4 md:p-6
            pt-20 // Additional padding to account for header
            ${sidebarCollapsed ? "md:ml-20" : "md:ml-64"}
          `}
        >
          <Routes>
            {/* Main routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/email-management" element={<EmailManagement />} />
            <Route path="/telegram-bot" element={<TelegramBot />} />

            {/* Team management routes */}
            <Route path="/team-management" element={<Teams />} />
            <Route path="/team-management/compact" element={<Small />} />

            {/* User specific routes */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<Settings />} />

            {/* Fallback route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global notifications container */}
        <div
          className="fixed bottom-4 right-4 z-50"
          id="notification-container"
        ></div>
      </div>
    </Router>
  );
};

export default App;
