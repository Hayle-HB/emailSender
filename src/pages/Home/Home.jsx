import React from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineUserGroup,
  HiLightningBolt,
  HiArrowRight,
} from "react-icons/hi";
import { useSelector } from "react-redux";

const Home = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const features = [
    {
      icon: <HiOutlineMail className="w-7 h-7" />,
      title: "Smart Email Campaigns",
      description:
        "Design beautiful email campaigns that engage your audience with our intuitive drag-and-drop builder.",
    },
    {
      icon: <HiOutlineUserGroup className="w-7 h-7" />,
      title: "Audience Insights",
      description:
        "Understand your audience better with advanced analytics and segmentation tools.",
    },
    {
      icon: <HiLightningBolt className="w-7 h-7" />,
      title: "Real-time Analytics",
      description:
        "Monitor campaign performance in real-time with comprehensive analytics and reporting.",
    },
  ];

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-[#0F172A]" : "bg-[#FAFAFA]"}`}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div
            className={`absolute inset-0 opacity-30 
            ${
              darkMode
                ? "bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"
                : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
            }`}
          />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight
                ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Elevate Your{" "}
                <span className="text-indigo-500">Email Marketing</span>
              </h1>
              <p
                className={`text-xl sm:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed
                ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Transform your email campaigns with powerful automation, deep
                insights, and beautiful templates that convert.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 px-8 py-4 rounded-full
                    bg-indigo-500 hover:bg-indigo-600 text-white font-semibold
                    shadow-lg shadow-indigo-500/25 transition-all duration-200"
                >
                  Get Started Free
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <button
                  className={`px-8 py-4 rounded-full font-semibold
                  ${
                    darkMode
                      ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } 
                  shadow-lg transition-all duration-200`}
                >
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`px-4 sm:px-6 lg:px-8 py-20 
        ${darkMode ? "bg-[#1E293B]" : "bg-white"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`p-8 rounded-2xl transition-transform hover:scale-105
                  ${
                    darkMode
                      ? "bg-[#0F172A] hover:bg-[#1E293B]"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
              >
                <div className="inline-block p-3 rounded-xl bg-indigo-500/10 mb-6">
                  <div className="text-indigo-500">{feature.icon}</div>
                </div>
                <h3
                  className={`text-2xl font-bold mb-4
                  ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-lg leading-relaxed
                  ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`px-4 sm:px-6 lg:px-8 py-20
        ${darkMode ? "bg-[#0F172A]" : "bg-[#FAFAFA]"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center"
          >
            {[
              {
                label: "Active Users",
                value: "50,000+",
                plus: "↑ 27% this month",
              },
              {
                label: "Emails Delivered",
                value: "10M+",
                plus: "99.9% success rate",
              },
              {
                label: "Customer Satisfaction",
                value: "4.9/5",
                plus: "Based on 3K+ reviews",
              },
            ].map((stat) => (
              <div key={stat.label} className="space-y-3">
                <p
                  className={`text-4xl font-bold
                  ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {stat.value}
                </p>
                <p
                  className={`text-lg font-medium
                  ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {stat.label}
                </p>
                <p className="text-sm text-indigo-500 font-medium">
                  {stat.plus}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
