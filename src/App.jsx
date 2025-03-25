import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import store from "./app/store";
import SideBar from "./components/layout/Sidebar/SideBar";
import TopBar from "./components/layout/TopBar/TopBar";
import PageTransition from "./components/layout/PageTransition";

// Import your page components
import Home from "./pages/Home";
import SendEmail from "./pages/SendEmail";
import Subscribers from "./pages/Subscribers";
import Profile from "./pages/Profile";

// Create a wrapper component for routes
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/send-email"
          element={
            <PageTransition>
              <SendEmail />
            </PageTransition>
          }
        />
        <Route
          path="/subscribers"
          element={
            <PageTransition>
              <Subscribers />
            </PageTransition>
          }
        />
        <Route
          path="/profile"
          element={
            <PageTransition>
              <Profile />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

// Create a wrapper component to access Redux state
const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`${darkMode ? "dark bg-gray-900" : "bg-gray-50"} min-h-screen`}
    >
      <div className="flex">
        <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`flex-1 transition-all duration-500 ease-in-out ${
            sidebarOpen ? "md:ml-64" : "md:ml-20"
          }`}
        >
          <TopBar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
          <main className="pt-20 p-6 mb-16 md:mb-0 transition-all duration-500 ease-in-out">
            <AnimatedRoutes />
          </main>
        </div>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
