import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaBuilding,
  FaEye,
  FaPencilAlt,
} from "react-icons/fa";

const Card = ({ member, onClick }) => {
  return (
    <motion.div
      key={member.id}
      initial={{ boxShadow: "0 4px 20px -2px rgba(0,0,0,0.05)" }}
      whileHover={{
        boxShadow:
          "0 15px 30px -5px rgba(0,0,0,0.15), 0 0 10px rgba(0,0,0,0.05)",
        transition: { duration: 0.4 },
      }}
      className="card-container group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden 
                transition-all duration-300 cursor-pointer border border-transparent
                hover:border-gray-200 dark:hover:border-gray-700"
      onClick={onClick}
    >
      {/* Card corners that light up on hover */}
      <div
        className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100
                    bg-gradient-to-br from-blue-400 to-transparent rounded-tl-xl
                    transition-opacity duration-500"
      ></div>
      <div
        className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100
                    bg-gradient-to-bl from-purple-400 to-transparent rounded-tr-xl
                    transition-opacity duration-500 delay-100"
      ></div>
      <div
        className="absolute bottom-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100
                    bg-gradient-to-tr from-green-400 to-transparent rounded-bl-xl
                    transition-opacity duration-500 delay-200"
      ></div>
      <div
        className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100
                    bg-gradient-to-tl from-amber-400 to-transparent rounded-br-xl
                    transition-opacity duration-500 delay-300"
      ></div>

      {/* Glass-like top header with gradient overlay */}
      <div className="h-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 dark:opacity-30 bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
          style={{
            backgroundImage: `url(${member.avatar})`,
            filter: "blur(8px)",
          }}
        ></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-600/30 to-gray-800/30 dark:from-gray-700/50 dark:to-gray-900/50
                    group-hover:from-indigo-900/30 group-hover:to-purple-900/30 dark:group-hover:from-indigo-800/50 dark:group-hover:to-purple-800/50
                    transition-colors duration-500"
        ></motion.div>
      </div>

      <div className="p-6 pt-0 relative z-10">
        {/* Avatar positioned to overlap header */}
        <div className="flex items-start -mt-10 mb-4">
          <motion.div
            whileHover={{
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 },
            }}
            className="relative z-10 ring-4 ring-white dark:ring-gray-800 rounded-full
                      group-hover:ring-blue-100 dark:group-hover:ring-blue-900 transition-all duration-300"
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
            <span
              className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-green-500 
                        ring-2 ring-white dark:ring-gray-800
                        group-hover:ring-blue-100 dark:group-hover:ring-blue-900
                        group-hover:animate-pulse transition-all duration-300"
            ></span>
          </motion.div>

          <div className="ml-4 mt-10 flex-1">
            <h3
              className="font-bold text-lg text-gray-800 dark:text-white
                          group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
            >
              {member.name}
            </h3>
            <div
              className="text-sm font-medium text-gray-500 dark:text-gray-400
                           group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-300"
            >
              {member.role}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-5">
          <div className="flex items-center overflow-hidden relative rounded-lg p-1.5">
            <div className="absolute inset-0 w-full h-full bg-gray-50 dark:bg-gray-700/30 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
            <FaBuilding className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 z-10 transition-colors duration-300" />
            <span className="font-medium text-gray-500 dark:text-gray-400 w-24 z-10">
              Department:
            </span>
            <span className="text-gray-800 dark:text-gray-200 z-10 group-hover:font-medium transition-all duration-300">
              {member.department}
            </span>
          </div>

          <div className="flex items-center overflow-hidden relative rounded-lg p-1.5">
            <div className="absolute inset-0 w-full h-full bg-gray-50 dark:bg-gray-700/30 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100"></div>
            <FaEnvelope className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 z-10 transition-colors duration-300" />
            <span className="font-medium text-gray-500 dark:text-gray-400 w-24 z-10">
              Email:
            </span>
            <span className="text-gray-800 dark:text-gray-200 truncate z-10 group-hover:font-medium transition-all duration-300">
              {member.email}
            </span>
          </div>

          <div className="flex items-center overflow-hidden relative rounded-lg p-1.5">
            <div className="absolute inset-0 w-full h-full bg-gray-50 dark:bg-gray-700/30 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-200"></div>
            <FaCalendarAlt className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 z-10 transition-colors duration-300" />
            <span className="font-medium text-gray-500 dark:text-gray-400 w-24 z-10">
              Joined:
            </span>
            <span className="text-gray-800 dark:text-gray-200 z-10 group-hover:font-medium transition-all duration-300">
              {member.joinDate}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {member.skills &&
            member.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 
                         rounded-full shadow-sm
                         group-hover:bg-blue-50 group-hover:text-blue-700
                         dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-300
                         transition-colors duration-300"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {skill}
              </span>
            ))}
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center">
          <div
            className="text-xs text-gray-500 dark:text-gray-400
                         group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 group-hover:bg-blue-500 mr-1.5 transition-colors duration-300"></span>
            {member.status}
          </div>

          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-500 dark:text-gray-400 
                        bg-gray-100 dark:bg-gray-700/50 rounded-full
                        group-hover:bg-blue-100 group-hover:text-blue-600
                        dark:group-hover:bg-blue-900/50 dark:group-hover:text-blue-400
                        transition-colors duration-300 shadow-sm"
            >
              <FaEye className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-500 dark:text-gray-400
                        bg-gray-100 dark:bg-gray-700/50 rounded-full
                        group-hover:bg-blue-100 group-hover:text-blue-600
                        dark:group-hover:bg-blue-900/50 dark:group-hover:text-blue-400
                        transition-colors duration-300 shadow-sm"
            >
              <FaPencilAlt className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 border-2 border-transparent
                      group-hover:border-blue-200/70 dark:group-hover:border-blue-700/70
                      transition-colors duration-700"
        ></div>

        {/* Border animation that travels around the card */}
        <div
          className="absolute -left-1 -top-1 w-5 h-5 opacity-0 
                      group-hover:opacity-100 group-hover:animate-border-top-left 
                      bg-gradient-to-br from-blue-400 to-purple-400"
        ></div>

        <div
          className="absolute -right-1 -top-1 w-5 h-5 opacity-0 
                      group-hover:opacity-100 group-hover:animate-border-top-right 
                      bg-gradient-to-bl from-purple-400 to-pink-400"
        ></div>

        <div
          className="absolute -right-1 -bottom-1 w-5 h-5 opacity-0 
                      group-hover:opacity-100 group-hover:animate-border-bottom-right 
                      bg-gradient-to-tl from-pink-400 to-amber-400"
        ></div>

        <div
          className="absolute -left-1 -bottom-1 w-5 h-5 opacity-0 
                      group-hover:opacity-100 group-hover:animate-border-bottom-left
                      bg-gradient-to-tr from-amber-400 to-blue-400"
        ></div>
      </div>
    </motion.div>
  );
};

export default Card;
