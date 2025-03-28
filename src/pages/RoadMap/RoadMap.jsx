import React, { useRef } from "react";
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

  // Update stations with proper x,y coordinates
  const updatedStations = stations.map((station, index) => ({
    ...station,
    x: 200 + (index % 2) * 200, // Alternating between 200 and 400 on x-axis
    y: 100 + index * 150, // Each station 150px apart vertically
  }));

  // Generate SVG path based on stations
  const generatePath = () => {
    return updatedStations.reduce((path, station, index) => {
      if (index === 0) return `M${station.x},${station.y}`;
      return `${path} L${station.x},${station.y}`;
    }, "");
  };

  const pathDefinition = generatePath();
  const viewBoxHeight = Math.max(...updatedStations.map((s) => s.y)) + 200; // Add padding

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="fixed inset-0 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox={`0 0 800 ${viewBoxHeight}`}
          preserveAspectRatio="xMidYMin slice"
        >
          {/* Background Line */}
          <path
            d={pathDefinition}
            fill="none"
            stroke={darkMode ? "#374151" : "#E5E7EB"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-300"
          />

          {/* Progress Line */}
          <motion.path
            d={pathDefinition}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength: progressIndicator,
            }}
          />

          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>

          {/* Stations */}
          {updatedStations.map((station, index) => (
            <g key={station.id}>
              {/* Connection Line to Next Station */}
              {index < updatedStations.length - 1 && (
                <path
                  d={`M${station.x},${station.y} L${
                    updatedStations[index + 1].x
                  },${updatedStations[index + 1].y}`}
                  stroke={darkMode ? "#374151" : "#E5E7EB"}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="transition-colors duration-300"
                />
              )}

              {/* Station Circle */}
              <motion.circle
                cx={station.x}
                cy={station.y}
                r="20"
                fill={darkMode ? "#1F2937" : "white"}
                stroke={station.color}
                strokeWidth="4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              />

              {/* Station Icon */}
              <foreignObject
                x={station.x - 12}
                y={station.y - 12}
                width="24"
                height="24"
                className="text-center"
              >
                <div className="flex items-center justify-center h-full">
                  {React.cloneElement(station.icon, {
                    className: `w-5 h-5`,
                    style: { color: station.color },
                  })}
                </div>
              </foreignObject>

              {/* Station Label */}
              <text
                x={station.x + (index % 2 ? -30 : 30)}
                y={station.y}
                fill={darkMode ? "#D1D5DB" : "#374151"}
                className="text-sm font-medium"
                textAnchor={index % 2 ? "end" : "start"}
                dominantBaseline="middle"
              >
                {station.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 pt-20">
        {updatedStations.map((station, index) => (
          <motion.div
            key={station.id}
            initial={{ opacity: 0, x: index % 2 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`sticky top-24 mx-auto max-w-md p-6 rounded-xl shadow-xl mb-48
              ${darkMode ? "bg-gray-800/90" : "bg-white/90"}
              backdrop-blur-sm border-l-4`}
            style={{ borderColor: station.color }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`p-3 rounded-lg bg-opacity-20`}
                style={{ backgroundColor: station.color }}
              >
                {station.icon}
              </div>
              <div>
                <h3
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {station.name}
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Level {station.id} of {updatedStations.length}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {station.skills.map((skill) => (
                <div
                  key={skill}
                  className={`p-2 rounded-lg text-sm
                    ${darkMode ? "bg-gray-700/50" : "bg-gray-100"}
                    ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicator */}
      <motion.div
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 
          px-6 py-3 rounded-full shadow-lg z-50
          ${darkMode ? "bg-gray-800" : "bg-white"}`}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <motion.div className="h-1 w-32 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            style={{ scaleX: progressIndicator }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RoadMap;
