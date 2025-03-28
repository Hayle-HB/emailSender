import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSelector } from "react-redux";
import {
  HiCode,
  HiDatabase,
  HiServer,
  HiCloud,
  HiLightningBolt,
  HiShieldCheck,
  HiCube,
  HiTerminal,
  HiChevronRight,
} from "react-icons/hi";

const RoadMap = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { scrollYProgress } = useScroll();
  const progressIndicator = useSpring(scrollYProgress);

  const stations = [
    {
      id: 1,
      name: "JavaScript Essentials",
      icon: <HiCode />,
      color: "#3B82F6",
      skills: ["ES6+", "Async/Await", "DOM", "Event Loop"],
    },
    {
      id: 2,
      name: "Node.js Core",
      icon: <HiTerminal />,
      color: "#10B981",
      skills: ["Modules", "File System", "Streams", "Buffer"],
    },
    {
      id: 3,
      name: "Express & APIs",
      icon: <HiServer />,
      color: "#6366F1",
      skills: ["Routing", "Middleware", "REST", "GraphQL"],
    },
    {
      id: 4,
      name: "Databases",
      icon: <HiDatabase />,
      color: "#F59E0B",
      skills: ["MongoDB", "PostgreSQL", "Redis", "ORMs"],
    },
    {
      id: 5,
      name: "Authentication",
      icon: <HiShieldCheck />,
      color: "#EC4899",
      skills: ["JWT", "OAuth", "Sessions", "Security"],
    },
    {
      id: 6,
      name: "Advanced Concepts",
      icon: <HiLightningBolt />,
      color: "#8B5CF6",
      skills: ["WebSockets", "Workers", "Clustering", "Caching"],
    },
    {
      id: 7,
      name: "Microservices",
      icon: <HiCube />,
      color: "#14B8A6",
      skills: ["Docker", "Kubernetes", "Message Queues", "Service Discovery"],
    },
    {
      id: 8,
      name: "DevOps",
      icon: <HiCloud />,
      color: "#F43F5E",
      skills: ["CI/CD", "AWS/GCP", "Monitoring", "Deployment"],
    },
    {
      id: 9,
      name: "React",
      icon: <HiCode />,
      color: "#3B82F6",
      skills: ["React", "React Router", "React Context", "React Hooks"],
    },
    {
      id: 10,
      name: "Next.js",
      icon: <HiCode />,
      color: "#3B82F6",
      skills: ["Next.js", "Next.js Router", "Next.js Context", "Next.js Hooks"],
    },
    {
      id: 11,
      name: "Tailwind CSS",
      icon: <HiCode />,
      color: "#3B82F6",
      skills: [
        "Tailwind CSS",
        "Tailwind CSS Router",
        "Tailwind CSS Context",
        "Tailwind CSS Hooks",
      ],
    },
    {
      id: 12,
      name: "TypeScript",
      icon: <HiCode />,
      color: "#3B82F6",
      skills: [
        "TypeScript",
        "TypeScript Router",
        "TypeScript Context",
        "TypeScript Hooks",
      ],
    },
    {
      id: 13,
      name: "Redux",
      icon: <HiCode />,
      color: "#3B82F6",
      skills: ["Redux", "Redux Router", "Redux Context", "Redux Hooks"],
    },
    {
      id: 14,
      name: "React Native",
      icon: <HiCode />,
      color: "#3B82F6",
      skills: [
        "React Native",
        "React Native Router",
        "React Native Context",
        "React Native Hooks",
      ],
    },
    {
      id: 15,
      name: "Node.js",
      icon: <HiCode />,
      color: "#3B82F6",
      skills: ["Node.js", "Node.js Router", "Node.js Context", "Node.js Hooks"],
    },
  ];

  // Keep your existing stations data but update the layout
  const updatedStations = stations.map((station, index) => ({
    ...station,
    x: 100 + (index % 3) * 400, // Three columns: 100, 500, 900
    y: 100 + Math.floor(index / 3) * 200, // More compact vertical spacing
  }));

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div
        className={`sticky top-0 z-20 backdrop-blur-sm bg-opacity-90 
          ${darkMode ? "bg-gray-900/80" : "bg-gray-50/80"} py-6`}
      >
        <h1
          className={`text-center text-3xl font-bold 
          ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Node.js Learning Journey
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updatedStations.map((station, index) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative ${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg shadow-lg p-6`}
            >
              {/* Connection Line */}
              {index !== updatedStations.length - 1 && (
                <div
                  className={`absolute -right-6 top-1/2 w-12 h-[2px] 
                    bg-gradient-to-r from-current to-transparent 
                    ${darkMode ? "text-gray-700" : "text-gray-300"}
                    ${(index + 1) % 3 === 0 ? "hidden" : "block lg:block"}`}
                />
              )}

              {/* Progress Indicator */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-blue-500 rounded-l-lg"
                style={{
                  scaleY: progressIndicator,
                  originY: 0,
                }}
              />

              {/* Content */}
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-lg bg-opacity-10"
                  style={{ backgroundColor: station.color }}
                >
                  {station.icon}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold mb-1
                    ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {station.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {station.skills.map((skill) => (
                      <div
                        key={skill}
                        className={`flex items-center gap-1 text-sm px-2 py-1 rounded
                          ${
                            darkMode
                              ? "bg-gray-700/50 text-gray-300"
                              : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        <HiChevronRight className="flex-shrink-0" />
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Indicator */}
              <div
                className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-medium
                  ${
                    darkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  }`}
              >
                Step {station.id}/{updatedStations.length}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          className={`h-1 w-40 rounded-full overflow-hidden
            ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
            style={{ scaleX: progressIndicator }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default RoadMap;
