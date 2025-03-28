import React, { useState, useCallback } from "react";
import {
  HiOutlineUpload,
  HiX,
  HiDocument,
  HiExclamationCircle,
  HiCheck,
  HiOutlineMail,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const CSVUploadForm = ({ onUpload, dragActive, setDragActive, darkMode }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [readEmails, setReadEmails] = useState([]);
  const [isReading, setIsReading] = useState(false);

  const validateFile = (file) => {
    // First check if it's a CSV file
    if (!file.name.toLowerCase().endsWith(".csv")) {
      throw new Error("Please upload a CSV file");
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size should be less than 5MB");
    }

    return true;
  };

  const processCSV = (text) => {
    const lines = text.split("\n");
    if (lines.length < 2) {
      throw new Error("CSV file is empty");
    }

    const headers = lines[0].toLowerCase().split(",");
    const emailIndex = headers.findIndex((h) => h.trim() === "email");

    if (emailIndex === -1) {
      throw new Error('CSV must contain an "Email" column');
    }

    const emails = lines
      .slice(1) // Skip header row
      .map((line) => line.split(",")[emailIndex]?.trim())
      .filter((email) => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

    if (emails.length === 0) {
      throw new Error("No valid email addresses found in the CSV file");
    }

    return emails;
  };

  const handleFileUpload = useCallback(
    async (uploadedFile) => {
      setError("");
      setIsReading(true);
      setReadEmails([]);

      try {
        validateFile(uploadedFile);

        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const text = event.target.result;
            const emails = processCSV(text);

            setTimeout(() => {
              setReadEmails(emails);
              setFile(uploadedFile);
              onUpload({ target: { files: [uploadedFile], emails } });
              setIsReading(false);
            }, 2000);
          } catch (err) {
            setTimeout(() => {
              setError(err.message);
              setIsReading(false);
            }, 2000);
          }
        };

        reader.onerror = () => {
          setTimeout(() => {
            setError("Error reading file");
            setIsReading(false);
          }, 2000);
        };

        reader.readAsText(uploadedFile);
      } catch (err) {
        setTimeout(() => {
          setError(err.message);
          setIsReading(false);
        }, 2000);
      }
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFileUpload(droppedFile);
    },
    [handleFileUpload, setDragActive]
  );

  const removeFile = () => {
    setFile(null);
    setReadEmails([]);
    onUpload({ target: { files: [], emails: [] } });
  };

  return (
    <div className="space-y-4">
      {/* Main Container */}
      <div
        className={`relative rounded-2xl p-6 
        ${darkMode ? "bg-[#1E293B]" : "bg-white"} 
        shadow-lg transition-all duration-200`}
      >
        {/* Loading Overlay - Positioned absolute on top */}
        <AnimatePresence>
          {isReading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/10 dark:bg-black/20 backdrop-blur-sm 
                rounded-2xl z-10 flex flex-col items-center justify-center"
            >
              <div
                className="w-12 h-12 border-4 border-indigo-500 border-t-transparent 
                rounded-full animate-spin mb-4"
              />
              <p
                className={`text-sm font-medium
                ${darkMode ? "text-gray-200" : "text-gray-700"}`}
              >
                Reading CSV file...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <HiDocument className="w-6 h-6 text-indigo-500" />
            <span
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {file ? file.name : "Upload CSV"}
            </span>
          </div>
          {file && (
            <button
              onClick={removeFile}
              className={`p-1.5 rounded-lg transition-colors
                ${
                  darkMode
                    ? "hover:bg-gray-700 text-gray-400 hover:text-red-400"
                    : "hover:bg-gray-100 text-gray-500 hover:text-red-500"
                }`}
            >
              <HiX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Area */}
        {!file ? (
          // Upload Area
          <div
            className={`relative border-2 border-dashed rounded-xl p-6
              transition-all duration-200 
              ${
                dragActive
                  ? "border-indigo-500 bg-indigo-50/5"
                  : darkMode
                  ? "border-gray-700 hover:border-gray-600"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              const droppedFile = e.dataTransfer.files[0];
              if (droppedFile) handleFileUpload(droppedFile);
            }}
          >
            {/* Upload UI */}
            <div className="text-center">
              <HiOutlineUpload
                className={`w-12 h-12 mx-auto mb-4 transition-colors
                  ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              />
              <p
                className={`text-base sm:text-lg mb-2 transition-colors
                ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Drag and drop your CSV file here, or
              </p>
              <input
                type="file"
                accept=".csv"
                className="hidden"
                id="csvInput"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) handleFileUpload(selectedFile);
                }}
              />
              <label
                htmlFor="csvInput"
                className="inline-block px-4 py-2 bg-indigo-500 text-white
                  rounded-lg cursor-pointer hover:bg-indigo-600 transition-all
                  text-sm sm:text-base font-medium"
              >
                Browse Files
              </label>
            </div>
          </div>
        ) : (
          // Emails Display
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {readEmails.length} email{readEmails.length !== 1 ? "s" : ""}{" "}
                found
              </span>
            </div>
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {readEmails.map((email, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-2 p-2 rounded-lg
                    ${darkMode ? "bg-gray-800/50" : "bg-gray-50"}`}
                >
                  <HiOutlineMail className="w-4 h-4 text-indigo-500" />
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {email}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-red-500 text-sm"
          >
            <HiExclamationCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CSVUploadForm;
