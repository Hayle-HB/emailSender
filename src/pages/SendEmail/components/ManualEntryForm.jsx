import React, { useState } from "react";
import {
  HiOutlineMail,
  HiX,
  HiOutlineExclamationCircle,
  HiTrash,
  HiPaperAirplane,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const scrollbarStyles = `
  /* For Webkit browsers like Chrome/Safari */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 100vh;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 100vh;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* For Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }

  /* Dark mode */
  .dark ::-webkit-scrollbar-thumb {
    background: #475569;
  }

  .dark ::-webkit-scrollbar-thumb:hover {
    background: #64748b;
  }

  .dark * {
    scrollbar-color: #475569 transparent;
  }
`;

const ManualEntryForm = ({ recipients, onAdd, onRemove, darkMode, onNext }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailSubmit = () => {
    if (!email) return;

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Check if email already exists
    if (recipients.some((r) => r.email.toLowerCase() === email.toLowerCase())) {
      setError("Email already exists");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    if (onAdd(email)) {
      setEmail("");
      setError("");
      setShowError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEmailSubmit();
  };

  const handlePaste = async (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const emails = paste.match(/[\w.-]+@[\w.-]+\.\w+/g);
    if (emails) {
      const uniqueEmails = emails.filter(
        (email) =>
          !recipients.some((r) => r.email.toLowerCase() === email.toLowerCase())
      );
      uniqueEmails.forEach((email) => onAdd(email));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && !email && recipients.length > 0) {
      onRemove(recipients.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleEmailSubmit();
    }
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="w-full px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {recipients.length === 0 ? (
            // Single column layout when no recipients
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`max-w-4xl mx-auto rounded-2xl p-6 
                ${
                  darkMode
                    ? "bg-[#1E293B] shadow-lg shadow-indigo-500/10"
                    : "bg-white shadow-xl shadow-gray-200/50"
                }`}
            >
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                        setShowError(false);
                      }}
                      onKeyDown={handleKeyDown}
                      onPaste={handlePaste}
                      placeholder="Enter email addresses..."
                      className={`w-full pl-12 pr-12 py-3.5 rounded-xl transition-all
                        ${
                          darkMode
                            ? "bg-[#0F172A] text-white border-gray-700 focus:border-indigo-500"
                            : "bg-gray-50 text-gray-900 border-gray-200 focus:border-indigo-500"
                        } 
                        border-2 focus:ring-4 focus:ring-indigo-500/20 outline-none
                        ${error && showError ? "border-red-500" : ""}`}
                    />
                    {/* Mail Icon Left */}
                    <div
                      className={`absolute left-4 top-1/2 -translate-y-1/2
                    ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      <HiOutlineMail className="w-5 h-5" />
                    </div>

                    {/* Send Button Right */}
                    <button
                      onClick={handleEmailSubmit}
                      type="button"
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg
                        transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800
                        ${
                          email
                            ? darkMode
                              ? "text-indigo-400 hover:text-indigo-300"
                              : "text-indigo-500 hover:text-indigo-600"
                            : darkMode
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      disabled={!email}
                    >
                      <HiPaperAirplane
                        className={`w-5 h-5 transform rotate-90 transition-transform
                        ${email ? "scale-100" : "scale-90"}`}
                      />
                    </button>
                  </div>

                  {/* Error Message with Animation */}
                  <AnimatePresence>
                    {error && showError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -bottom-8 left-0 right-0 flex items-center justify-start text-red-500"
                      >
                        <HiOutlineExclamationCircle className="w-4 h-4 mr-1.5" />
                        <span className="text-sm font-medium">{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Helper Text - Add after the error message AnimatePresence */}
                  <div
                    className={`mt-6 space-y-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <span className="flex items-center gap-1.5">
                        <kbd
                          className={`px-2 py-1 text-xs rounded-md
                        ${
                          darkMode
                            ? "bg-gray-800 text-gray-300 border border-gray-700"
                            : "bg-gray-100 text-gray-700 border border-gray-200"
                        }`}
                        >
                          Enter
                        </kbd>
                        <span>or click</span>
                        <HiPaperAirplane className="w-4 h-4 transform rotate-90" />
                      </span>
                      <span>to add email</span>
                    </div>
                    <div className="text-xs space-y-1 font-medium">
                      <p>
                        • Press Backspace to remove the last email when input is
                        empty
                      </p>
                      <p>• Paste multiple emails at once</p>
                      <p>• Duplicate emails will be automatically filtered</p>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          ) : (
            // Two column layout when recipients exist
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4 lg:gap-6 max-w-[1400px] mx-auto"
            >
              {/* Left Column - Input (Fixed width) */}
              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className={`rounded-2xl p-4 sm:p-6 h-fit
                  ${
                    darkMode
                      ? "bg-[#1E293B] shadow-lg shadow-indigo-500/10"
                      : "bg-white shadow-xl shadow-gray-200/50"
                  }`}
              >
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                          setShowError(false);
                        }}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        placeholder="Enter email addresses..."
                        className={`w-full pl-12 pr-12 py-3.5 rounded-xl transition-all
                          ${
                            darkMode
                              ? "bg-[#0F172A] text-white border-gray-700 focus:border-indigo-500"
                              : "bg-gray-50 text-gray-900 border-gray-200 focus:border-indigo-500"
                          } 
                          border-2 focus:ring-4 focus:ring-indigo-500/20 outline-none
                          ${error && showError ? "border-red-500" : ""}`}
                      />
                      {/* Mail Icon Left */}
                      <div
                        className={`absolute left-4 top-1/2 -translate-y-1/2
                      ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        <HiOutlineMail className="w-5 h-5" />
                      </div>

                      {/* Send Button Right */}
                      <button
                        onClick={handleEmailSubmit}
                        type="button"
                        className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg
                          transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800
                          ${
                            email
                              ? darkMode
                                ? "text-indigo-400 hover:text-indigo-300"
                                : "text-indigo-500 hover:text-indigo-600"
                              : darkMode
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        disabled={!email}
                      >
                        <HiPaperAirplane
                          className={`w-5 h-5 transform rotate-90 transition-transform
                          ${email ? "scale-100" : "scale-90"}`}
                        />
                      </button>
                    </div>

                    {/* Error Message with Animation */}
                    <AnimatePresence>
                      {error && showError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute -bottom-8 left-0 right-0 flex items-center justify-start text-red-500"
                        >
                          <HiOutlineExclamationCircle className="w-4 h-4 mr-1.5" />
                          <span className="text-sm font-medium">{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Helper Text - Add after the error message AnimatePresence */}
                    <div
                      className={`mt-6 space-y-2 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <span className="flex items-center gap-1.5">
                          <kbd
                            className={`px-2 py-1 text-xs rounded-md
                          ${
                            darkMode
                              ? "bg-gray-800 text-gray-300 border border-gray-700"
                              : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                          >
                            Enter
                          </kbd>
                          <span>or click</span>
                          <HiPaperAirplane className="w-4 h-4 transform rotate-90" />
                        </span>
                        <span>to add email</span>
                      </div>
                      <div className="text-xs space-y-1 font-medium">
                        <p>
                          • Press Backspace to remove the last email when input
                          is empty
                        </p>
                        <p>• Paste multiple emails at once</p>
                        <p>• Duplicate emails will be automatically filtered</p>
                      </div>
                    </div>
                  </div>
                </form>
              </motion.div>

              {/* Right Column - Recipients List */}
              <motion.div
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                className={`rounded-2xl p-4 sm:p-6 min-h-[200px] w-full
                  ${
                    darkMode
                      ? "bg-[#1E293B] shadow-lg shadow-indigo-500/10"
                      : "bg-white shadow-xl shadow-gray-200/50"
                  }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4">
                  <span
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {recipients.length} recipient
                    {recipients.length !== 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={() => recipients.forEach((_, i) => onRemove(i))}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg 
                      transition-colors text-sm font-medium
                      ${
                        darkMode
                          ? "text-red-400 hover:bg-red-400/10"
                          : "text-red-500 hover:bg-red-50"
                      }`}
                  >
                    <HiTrash className="w-4 h-4" />
                    Clear all
                  </button>
                </div>
                <div
                  className="flex flex-wrap gap-2 max-h-[400px] overflow-y-auto
                  scrollbar-thin scrollbar-track-transparent hover:scrollbar-track-gray-100 
                  dark:hover:scrollbar-track-gray-800/50
                  scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300
                  dark:scrollbar-thumb-gray-700 dark:hover:scrollbar-thumb-gray-600
                  scrollbar-thumb-rounded-full"
                >
                  <AnimatePresence>
                    {recipients.map((recipient, index) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        key={index}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 
                          rounded-full text-sm border transition-all duration-200
                          group hover:border-red-300 w-full sm:w-[calc(50%-4px)] lg:w-[calc(33.333%-8px)]
                          ${
                            darkMode
                              ? "bg-gray-800/50 text-gray-200 border-gray-700"
                              : "bg-gray-50/80 text-gray-700 border-gray-200"
                          }`}
                      >
                        <HiOutlineMail className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                        <span className="truncate flex-1">
                          {recipient.email}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemove(index)}
                          className={`p-0.5 rounded-full flex-shrink-0
                            transition-colors duration-200
                            ${
                              darkMode
                                ? "text-gray-400 hover:text-red-400"
                                : "text-gray-500 hover:text-red-500"
                            }`}
                        >
                          <HiX className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ManualEntryForm;
