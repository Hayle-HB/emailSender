import React from "react";
import { useSelector } from "react-redux";
import { HiMail, HiUpload, HiTemplate, HiChartBar } from "react-icons/hi";
import { motion } from "framer-motion";

const Home = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const features = [
    {
      icon: HiMail,
      title: "Bulk Email Sending",
      description:
        "Send personalized emails to multiple recipients efficiently",
    },
    {
      icon: HiUpload,
      title: "CSV Upload",
      description: "Import recipient lists directly from CSV files",
    },
    {
      icon: HiTemplate,
      title: "Email Templates",
      description: "Create and save reusable email templates",
    },
    {
      icon: HiChartBar,
      title: "Analytics",
      description: "Track email performance and engagement metrics",
    },
  ];

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] ${
        darkMode ? "bg-[#0F172A]" : "bg-[#FAFAFA]"
      }`}
    >
      <div className="min-h-full w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div
          className="min-h-full w-full flex flex-col justify-center gap-6 sm:gap-8 md:gap-12 
          py-6 sm:py-8 md:py-12 mt-16 md:mt-0"
        >
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 sm:space-y-6"
          >
            <div className="relative px-2 sm:px-0">
              <h1
                className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold
                tracking-tight leading-tight sm:leading-tight md:leading-tight
                ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                <span className="inline-block mb-1 sm:mb-0">
                  Send Emails at
                </span>
                <span className="relative inline-block px-2 mx-1 sm:mx-2">
                  <span className="relative z-10">Scale</span>
                  <div className="absolute inset-0 transform -rotate-2 bg-indigo-500/10 rounded-lg" />
                </span>
                <span className="inline-block">with</span>
                <br className="hidden sm:block" />
                <span className="text-blue-500 inline-block mt-1 sm:mt-2">
                  Confidence
                </span>
              </h1>
            </div>
            <p
              className={`text-sm xs:text-base sm:text-lg md:text-xl 
              max-w-[280px] xs:max-w-xs sm:max-w-lg md:max-w-2xl mx-auto font-medium
              px-3 xs:px-4 sm:px-6 md:px-0
              ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Powerful email management platform designed for businesses that
              want to reach their audience effectively
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 
              gap-3 sm:gap-4 md:gap-6 
              px-3 sm:px-4 md:px-0"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`p-3 xs:p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl ${
                  darkMode
                    ? "bg-gray-800/50 hover:bg-gray-800/70"
                    : "bg-white hover:bg-gray-50"
                } transition-all duration-200 shadow-lg hover:shadow-xl`}
              >
                <feature.icon
                  className="w-6 h-6 xs:w-8 xs:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
                  text-indigo-500 mb-2 xs:mb-3 sm:mb-4"
                />
                <h3
                  className={`text-sm xs:text-base sm:text-lg font-semibold mb-1 sm:mb-2
                  ${darkMode ? "text-gray-100" : "text-gray-900"}`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-xs sm:text-sm
                  ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center 
              gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-12 
              px-2 pb-4 sm:pb-6"
          >
            {[
              { value: "10K+", label: "Emails Sent" },
              { value: "1K+", label: "Active Users" },
              { value: "99%", label: "Delivery Rate" },
              { value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <p
                  className={`text-xl xs:text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1
                  ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
                >
                  {stat.value}
                </p>
                <p
                  className={`text-xs sm:text-sm
                  ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
