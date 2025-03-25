import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaEnvelope,
  FaRobot,
  FaChartLine,
  FaCalendarAlt,
  FaSearch,
  FaBell,
  FaEllipsisH,
} from "react-icons/fa";
import Card from "../Card";

const Dashboard = () => {
  const [stats, setStats] = useState({
    teamMembers: 0,
    emailsSent: 0,
    telegramMessages: 0,
    activeSubscriptions: 0,
  });

  const [recentMembers, setRecentMembers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [emailMetrics, setEmailMetrics] = useState([]);
  const [scheduledEmails, setScheduledEmails] = useState([]);

  useEffect(() => {
    // Simulate API calls
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data
        setStats({
          teamMembers: 275,
          emailsSent: 12584,
          telegramMessages: 3826,
          activeSubscriptions: 142,
        });

        setRecentMembers(
          Array.from({ length: 8 }, (_, i) => ({
            id: i + 1,
            name: `Team Member ${i + 1}`,
            role: [
              "Developer",
              "Designer",
              "Project Manager",
              "Marketing Specialist",
              "Support Agent",
            ][Math.floor(Math.random() * 5)],
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
              Date.now() - Math.random() * 10000000000
            ).toLocaleDateString(),
            status: ["Active", "On vacation", "In a meeting", "Remote"][
              Math.floor(Math.random() * 4)
            ],
            skills: Array.from(
              { length: Math.floor(Math.random() * 4) + 1 },
              (_, j) =>
                [
                  "React",
                  "Python",
                  "UI Design",
                  "Marketing",
                  "Communication",
                  "Node.js",
                  "MongoDB",
                  "Sales",
                  "Customer Support",
                ][Math.floor(Math.random() * 9)]
            ),
          }))
        );

        setActivities([
          {
            id: 1,
            user: "John Doe",
            action: "sent an email campaign",
            time: "2 hours ago",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            id: 2,
            user: "Sarah Miller",
            action: "added a new team member",
            time: "4 hours ago",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          {
            id: 3,
            user: "David Wilson",
            action: "updated the telegram bot",
            time: "Yesterday",
            avatar: "https://randomuser.me/api/portraits/men/46.jpg",
          },
          {
            id: 4,
            user: "Emma Thompson",
            action: "created a new subscription plan",
            time: "2 days ago",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg",
          },
          {
            id: 5,
            user: "Michael Brown",
            action: "deleted an inactive subscriber",
            time: "3 days ago",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
          },
        ]);

        setNotifications([
          {
            id: 1,
            message: "New subscriber joined the newsletter",
            time: "10 minutes ago",
            read: false,
          },
          {
            id: 2,
            message: "Email campaign 'June Newsletter' completed",
            time: "1 hour ago",
            read: false,
          },
          {
            id: 3,
            message: "System update scheduled for tomorrow",
            time: "5 hours ago",
            read: true,
          },
        ]);

        setEmailMetrics([
          { month: "Jan", sent: 1200, opened: 840, clicked: 380 },
          { month: "Feb", sent: 1400, opened: 980, clicked: 450 },
          { month: "Mar", sent: 1100, opened: 730, clicked: 320 },
          { month: "Apr", sent: 1300, opened: 890, clicked: 410 },
          { month: "May", sent: 1600, opened: 1120, clicked: 570 },
          { month: "Jun", sent: 1800, opened: 1270, clicked: 650 },
        ]);

        setScheduledEmails([
          {
            id: 1,
            title: "Weekly Newsletter",
            scheduledFor: "Tomorrow, 9:00 AM",
            recipients: 345,
          },
          {
            id: 2,
            title: "Product Update",
            scheduledFor: "Jun 25, 10:30 AM",
            recipients: 128,
          },
          {
            id: 3,
            title: "Customer Survey",
            scheduledFor: "Jun 30, 2:00 PM",
            recipients: 275,
          },
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const statCard = (icon, title, value, color) => (
    <motion.div
      variants={item}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border-t-4 ${color} flex items-center`}
    >
      <div
        className={`rounded-full h-12 w-12 flex items-center justify-center ${color
          .replace("border", "bg")
          .replace("-500", "-100")} ${color.replace("border", "text")}`}
      >
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          {title}
        </h3>
        <div className="flex items-end">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {value.toLocaleString()}
          </span>
          <span className="text-green-500 ml-2 text-sm flex items-center">
            +12%
            <svg
              className="w-3 h-3 ml-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );

  const SmallMemberCard = ({ member }) => (
    <div className="flex items-center p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <img
        src={member.avatar}
        alt={member.name}
        className="w-10 h-10 rounded-full object-cover ring-2 ring-offset-2 ring-white dark:ring-gray-800"
      />
      <div className="ml-3 overflow-hidden">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {member.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {member.role}
        </p>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-start space-x-3 py-3">
      <img
        src={activity.avatar}
        alt={activity.user}
        className="w-8 h-8 rounded-full flex-shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium text-gray-900 dark:text-white">
            {activity.user}
          </span>{" "}
          {activity.action}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {activity.time}
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"
        ></motion.div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Loading dashboard data...
        </p>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's an overview of your team activity
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <FaBell className="w-5 h-5" />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>
          </div>

          <div className="bg-gray-200 dark:bg-gray-700 h-6 w-px"></div>

          <div className="flex items-center space-x-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="h-8 w-8 rounded-full object-cover ring-2 ring-offset-2 ring-white dark:ring-gray-800"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                John Doe
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
      >
        {statCard(
          <FaUsers className="h-5 w-5" />,
          "Team Members",
          stats.teamMembers,
          "border-blue-500"
        )}
        {statCard(
          <FaEnvelope className="h-5 w-5" />,
          "Emails Sent",
          stats.emailsSent,
          "border-purple-500"
        )}
        {statCard(
          <FaRobot className="h-5 w-5" />,
          "Telegram Messages",
          stats.telegramMessages,
          "border-green-500"
        )}
        {statCard(
          <FaChartLine className="h-5 w-5" />,
          "Active Subscriptions",
          stats.activeSubscriptions,
          "border-amber-500"
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Team Members */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Team Members */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Team Members
              </h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                View All
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentMembers.slice(0, 4).map((member) => (
                  <Card key={member.id} member={member} onClick={() => {}} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Email Metrics */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Email Metrics
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Last 6 months performance
              </p>
            </div>

            <div className="p-6">
              <div className="h-64 flex items-end space-x-2">
                {emailMetrics.map((month, index) => (
                  <div
                    key={month.month}
                    className="flex-1 flex flex-col items-center"
                  >
                    {/* Replace with an actual chart library in production */}
                    <div className="w-full flex space-x-1 h-48 items-end mb-2">
                      <div
                        className="w-1/3 bg-blue-500 rounded-t-sm"
                        style={{ height: `${(month.sent / 2000) * 100}%` }}
                      ></div>
                      <div
                        className="w-1/3 bg-green-500 rounded-t-sm"
                        style={{ height: `${(month.opened / 2000) * 100}%` }}
                      ></div>
                      <div
                        className="w-1/3 bg-purple-500 rounded-t-sm"
                        style={{ height: `${(month.clicked / 2000) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {month.month}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-4 space-x-6">
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-blue-500 rounded-sm mr-2"></span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Sent
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-green-500 rounded-sm mr-2"></span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Opened
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-purple-500 rounded-sm mr-2"></span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Clicked
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Recent Activities */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Activities
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-0">
                {activities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Scheduled Emails */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Scheduled Emails
              </h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                View All
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {scheduledEmails.map((email) => (
                  <div key={email.id} className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg">
                      <FaCalendarAlt className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {email.title}
                      </p>
                      <div className="flex items-center mt-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {email.scheduledFor}
                        </p>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">
                          •
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {email.recipients} recipients
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <FaEllipsisH className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Notifications
              </h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Mark all as read
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg ${
                      notification.read
                        ? "bg-gray-50 dark:bg-gray-700/30"
                        : "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        notification.read
                          ? "text-gray-700 dark:text-gray-300"
                          : "text-gray-900 dark:text-white font-medium"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
