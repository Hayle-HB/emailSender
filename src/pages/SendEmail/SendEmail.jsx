import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  HiOutlineUserAdd,
  HiOutlineUpload,
  HiOutlineArrowRight,
} from "react-icons/hi";
import Papa from "papaparse"; // CSV parsing library

const SendEmail = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [selectedOption, setSelectedOption] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [emailContent, setEmailContent] = useState("");

  const options = [
    {
      id: "manual",
      title: "Manual Entry",
      icon: <HiOutlineUserAdd className="w-8 h-8" />,
      description: "Add recipients one by one manually",
      benefits: [
        "Perfect for small lists",
        "Direct control over each entry",
        "Edit as you go",
        "No file preparation needed",
      ],
    },
    {
      id: "csv",
      title: "CSV Upload",
      icon: <HiOutlineUpload className="w-8 h-8" />,
      description: "Upload a CSV file with your recipient list",
      benefits: [
        "Ideal for large lists",
        "Bulk import in seconds",
        "Support for custom fields",
        "Excel/Spreadsheet compatible",
      ],
    },
  ];

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setRecipients(results.data);
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    }
  };

  const handleManualAdd = (email) => {
    setRecipients([...recipients, { email }]);
  };

  const handleSendEmails = () => {
    // Example payload structure
    const payload = {
      recipients,
      content: emailContent,
    };

    // Send to backend (replace with your API endpoint)
    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Email sent successfully:", data);
        // Handle success (e.g., show a success message)
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-[#0F172A]" : "bg-[#FAFAFA]"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-3xl sm:text-4xl font-bold mb-4
            ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            How would you like to add recipients?
          </h1>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Choose the method that works best for your mailing list
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <button
                onClick={() => handleOptionSelect(option.id)}
                className={`w-full h-full text-left p-6 rounded-2xl transition-all duration-300
                  ${
                    selectedOption === option.id
                      ? darkMode
                        ? "bg-indigo-500/20 border-2 border-indigo-500"
                        : "bg-indigo-50 border-2 border-indigo-500"
                      : darkMode
                      ? "bg-[#1E293B] hover:bg-[#1E293B]/80"
                      : "bg-white hover:bg-gray-50"
                  }
                  ${
                    darkMode
                      ? "shadow-lg shadow-indigo-500/10"
                      : "shadow-xl shadow-gray-200/50"
                  }
                `}
              >
                <div
                  className={`inline-flex p-3 rounded-xl mb-4
                    ${
                      selectedOption === option.id
                        ? "bg-indigo-500 text-white"
                        : "bg-indigo-100 text-indigo-500"
                    }`}
                >
                  {option.icon}
                </div>

                <h3
                  className={`text-xl font-semibold mb-3
                    ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {option.title}
                </h3>

                <p
                  className={`mb-4 
                    ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {option.description}
                </p>

                <ul className="space-y-2">
                  {option.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className={`flex items-center text-sm
                        ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      <span className="mr-2">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-6 flex items-center text-sm font-medium
                    ${
                      selectedOption === option.id
                        ? "text-indigo-500"
                        : darkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                >
                  Select this option
                  <HiOutlineArrowRight
                    className={`ml-2 transition-transform duration-200
                      ${selectedOption === option.id ? "translate-x-1" : ""}`}
                  />
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Manual Entry Form */}
        {selectedOption === "manual" && (
          <div className="mt-8">
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Add Recipient Manually
            </h2>
            <input
              type="email"
              placeholder="Enter recipient email"
              className={`w-full p-3 rounded-lg mb-4
                ${
                  darkMode
                    ? "bg-[#1E293B] text-white"
                    : "bg-white text-gray-900"
                }
                border ${darkMode ? "border-gray-700" : "border-gray-300"}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleManualAdd(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <ul className="list-disc pl-5">
              {recipients.map((recipient, index) => (
                <li
                  key={index}
                  className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {recipient.email}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CSV Upload Form */}
        {selectedOption === "csv" && (
          <div className="mt-8">
            <h2
              className={`text-xl font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Upload CSV File
            </h2>
            <input
              type="file"
              accept=".csv"
              className="mb-4"
              onChange={handleCSVUpload}
            />
            <ul className="list-disc pl-5">
              {recipients.map((recipient, index) => (
                <li
                  key={index}
                  className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {recipient.email}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Email Content */}
        <div className="mt-8">
          <h2
            className={`text-xl font-semibold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Email Content
          </h2>
          <textarea
            placeholder="Write your email content here..."
            className={`w-full p-3 rounded-lg h-40
              ${darkMode ? "bg-[#1E293B] text-white" : "bg-white text-gray-900"}
              border ${darkMode ? "border-gray-700" : "border-gray-300"}`}
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          />
        </div>

        {/* Send Emails Button */}
        {recipients.length > 0 && emailContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <button
              onClick={handleSendEmails}
              className="bg-indigo-500 hover:bg-indigo-600 text-white 
                px-8 py-3 rounded-full font-semibold transition-all duration-200
                shadow-lg shadow-indigo-500/25"
            >
              Send Emails
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SendEmail;
