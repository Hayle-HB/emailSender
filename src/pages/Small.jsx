import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaSearch } from "react-icons/fa";

const Small = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredMember, setHoveredMember] = useState(null);

  useEffect(() => {
    // Simulating API fetch with dummy data
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        // Replace this with your actual API call
        const dummyData = Array.from({ length: 300 }, (_, i) => ({
          id: i + 1,
          name: `Team Member ${i + 1}`,
          email: `member${i + 1}@example.com`,
          avatar: `https://randomuser.me/api/portraits/${
            i % 2 ? "men" : "women"
          }/${(i % 70) + 1}.jpg`,
          department: [
            "Engineering",
            "Design",
            "Operations",
            "Marketing",
            "Customer Support",
          ][Math.floor(Math.random() * 5)],
        }));
        console.log(dummyData);
        setTimeout(() => {
          setTeamMembers(dummyData);
          setIsLoading(false);
        }, 400);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Team Members{" "}
          <span className="text-sm text-gray-500">
            ({filteredMembers.length})
          </span>
        </h1>

        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
                    bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-800 dark:border-gray-300"
          ></motion.div>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-12 gap-3"
        >
          {filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={item}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="relative group bg-white dark:bg-gray-800 rounded-lg p-3 
                        shadow-sm hover:shadow-md transition-all duration-300
                        border border-gray-100 dark:border-gray-700"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-white dark:ring-gray-700 shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-700"></span>
                </div>

                <h3 className="text-sm font-medium text-gray-900 dark:text-white text-center truncate w-full">
                  {member.name}
                </h3>

                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                  <FaEnvelope className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="truncate w-full">{member.email}</span>
                </div>
              </div>

              {/* Hover tooltip for longer email */}
              {hoveredMember === member.id && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded 
                            shadow-lg z-10 whitespace-nowrap"
                >
                  {member.email}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {!isLoading && filteredMembers.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No team members found matching your search.
        </div>
      )}
    </div>
  );
};

export default Small;
