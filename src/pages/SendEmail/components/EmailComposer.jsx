import React from "react";

const EmailComposer = ({ content, onChange, onSend, darkMode }) => (
  <div className={`bg-white dark:bg-[#1E293B] rounded-2xl p-6 shadow-xl`}>
    <h2
      className={`text-2xl font-semibold mb-6 ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      Compose Your Message
    </h2>
    <textarea
      placeholder="Write your email content here..."
      className={`w-full p-4 rounded-xl min-h-[200px] transition-all
        ${
          darkMode
            ? "bg-[#0F172A] text-white border-gray-700"
            : "bg-gray-50 text-gray-900 border-gray-200"
        }
        border focus:ring-2 focus:ring-indigo-500/20 outline-none`}
      value={content}
      onChange={(e) => onChange(e.target.value)}
    />

    {content && (
      <div className="mt-6 text-center">
        <button
          onClick={onSend}
          className="bg-indigo-500 text-white px-8 py-3 rounded-lg
            hover:bg-indigo-600 transition-colors"
        >
          Send Emails
        </button>
      </div>
    )}
  </div>
);

export default EmailComposer;
