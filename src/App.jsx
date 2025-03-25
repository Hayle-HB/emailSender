import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import store from "./app/store";
import SideBar from "./components/layout/Sidebar/SideBar";
import TopBar from "./components/layout/TopBar/TopBar";
import PageTransition from "./components/layout/PageTransition";

// Import your page components
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent font-poppins">
        Welcome to Email Sender
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 font-inter max-w-2xl text-center leading-relaxed">
        Your all-in-one platform for managing and sending emails efficiently.
        Get started by exploring our features.
      </p>
    </div>
  );
};

const SendEmail = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-semibold mb-4 font-poppins dark:text-gray-200">
        Send Email
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 font-inter max-w-2xl text-center leading-relaxed">
        Create and send beautiful emails to your subscribers.
      </p>
    </div>
  );
};

const Subscribers = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-semibold mb-4 font-poppins dark:text-gray-200">
        Subscribers
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 font-inter max-w-2xl text-center leading-relaxed">
        Manage your subscriber list and keep track of your audience.
      </p>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-semibold mb-4 font-poppins dark:text-gray-200">
        Profile
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 font-inter max-w-2xl text-center leading-relaxed">
        Manage your account settings and preferences.
      </p>
    </div>
  );
};

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
