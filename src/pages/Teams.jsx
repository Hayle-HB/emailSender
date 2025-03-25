import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaUserPlus,
  FaEnvelope,
  FaCalendarAlt,
  FaBuilding,
  FaTh,
  FaThList,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Card from "./Card";
import Small from "./Small";

const Teams = () => {
  // Mock data - replace with your actual API call
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewMode, setViewMode] = useState("card"); // "card" or "small"

  useEffect(() => {
    // Simulating API fetch with dummy data
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        // Replace this with your actual API call
        const dummyData = Array.from({ length: 19 }, (_, i) => ({
          id: i + 1,
          name: `Team Member ${i + 1}`,
          role: ["Developer", "Designer", "Manager", "Marketing", "Support"][
            Math.floor(Math.random() * 5)
          ],
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
          joinDate: new Date(
            Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)
          )
            .toISOString()
            .split("T")[0],
          status: ["Active", "On vacation", "In a meeting", "Remote"][
            Math.floor(Math.random() * 4)
          ],
          skills: Array.from(
            { length: Math.floor(Math.random() * 4) + 1 },
            () =>
              [
                "React",
                "JavaScript",
                "UI/UX",
                "Python",
                "Node.js",
                "Marketing",
                "Analytics",
                "Management",
                "Support",
              ][Math.floor(Math.random() * 9)]
          ),
        }));

        setTimeout(() => {
          setTeamMembers(dummyData);
          setIsLoading(false);
        }, 600); // Simulated loading delay
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
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
  };

  const handleCardClick = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "card" ? "small" : "card");
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Team Management
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your team members and their roles
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="relative flex-grow max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 group-focus-within:text-gray-600 transition-colors duration-200" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800/60 dark:border-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 ease-in-out
                        shadow-sm focus:shadow-md"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 shadow-inner">
            <button
              onClick={() => setViewMode("card")}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center ${
                viewMode === "card"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <FaThList className="mr-1.5" />
              <span className="text-sm font-medium">Detailed</span>
            </button>
            <button
              onClick={() => setViewMode("small")}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center ${
                viewMode === "small"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <FaTh className="mr-1.5" />
              <span className="text-sm font-medium">Compact</span>
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg 
                   hover:shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-700"
        >
          <FaUserPlus className="mr-2" />
          <span>Add Member</span>
        </motion.button>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-800 dark:border-gray-300"
          ></motion.div>
        </div>
      ) : viewMode === "card" ? (
        <motion.div
          key="card-view"
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredMembers.map((member) => (
            <Card
              key={member.id}
              member={member}
              onClick={() => handleCardClick(member)}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="small-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Small />
        </motion.div>
      )}

      {!isLoading && filteredMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No team members found matching your search.
          </p>
        </motion.div>
      )}

      {/* Detailed Member Modal */}
      {selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { type: "spring", stiffness: 300, damping: 25 },
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-40 bg-gray-100 dark:bg-gray-700 relative">
              <button
                className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2 text-gray-800 dark:text-white hover:bg-opacity-30 transition-all"
                onClick={closeModal}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <div className="absolute -bottom-16 left-8">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg"
                >
                  <img
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>

            <div className="pt-20 pb-8 px-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedMember.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedMember.role} • {selectedMember.department}
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Contact Information
                    </h3>
                    <div className="mt-2 flex items-center">
                      <FaEnvelope className="text-gray-500 mr-2" />
                      <span className="text-gray-900 dark:text-white">
                        {selectedMember.email}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Department
                    </h3>
                    <div className="mt-2 flex items-center">
                      <FaBuilding className="text-gray-500 mr-2" />
                      <span className="text-gray-900 dark:text-white">
                        {selectedMember.department}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </h3>
                    <div className="mt-2 flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-gray-900 dark:text-white">
                        {selectedMember.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Skills
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedMember.skills &&
                        selectedMember.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {skill}
                          </motion.span>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Join Date
                    </h3>
                    <div className="mt-2 flex items-center">
                      <FaCalendarAlt className="text-gray-500 mr-2" />
                      <span className="text-gray-900 dark:text-white">
                        {selectedMember.joinDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  onClick={closeModal}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:shadow-lg transition-all dark:bg-gray-700"
                >
                  Edit Profile
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Teams;
