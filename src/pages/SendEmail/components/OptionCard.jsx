import React from "react";
import { HiOutlineArrowRight, HiCheck } from "react-icons/hi";

const OptionCard = ({ option, isSelected, darkMode, onSelect }) => {
  const IconComponent = option.IconComponent;

  return (
    <div className="relative mt-3">
      {/* Selection Badge */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-green-500 text-white p-1.5 rounded-full shadow-lg">
            <HiCheck className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Card Header - Fixed Positioning */}
      <div
        className={`absolute -top-3 left-4 px-2 z-20
        ${darkMode ? "bg-[#0F172A]" : "bg-[#FAFAFA]"}
        before:content-[''] before:absolute before:inset-0 before:bg-inherit before:-z-10`}
      >
        <span
          className={`text-xs font-medium uppercase tracking-wider
          ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
        >
          {option.type || "Option"}
        </span>
      </div>

      <button
        onClick={() => onSelect(option.id)}
        className={`w-full h-full text-left p-6 rounded-2xl transition-all duration-300
          group relative overflow-hidden
          ${
            isSelected
              ? darkMode
                ? "bg-indigo-500/10 border-2 border-indigo-500"
                : "bg-indigo-50 border-2 border-indigo-500"
              : darkMode
              ? "bg-[#1E293B] hover:bg-[#1E293B]/80 border-2 border-gray-700"
              : "bg-white hover:bg-gray-50 border-2 border-gray-200"
          }
          ${
            darkMode
              ? "shadow-lg shadow-indigo-500/10"
              : "shadow-xl shadow-gray-200/50"
          }`}
      >
        {/* Hover Effect Gradient */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
          bg-gradient-to-r from-transparent 
          ${darkMode ? "via-indigo-500/5" : "via-indigo-50"} to-transparent`}
        />

        {/* Content Container */}
        <div className="relative z-10">
          {/* Icon Container */}
          <div
            className={`inline-flex p-3 rounded-xl mb-6 transition-all duration-300
              ${
                isSelected
                  ? "bg-indigo-500 text-white scale-110"
                  : darkMode
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-indigo-50 text-indigo-500"
              }
              group-hover:scale-110`}
          >
            <IconComponent className="w-8 h-8" />
          </div>

          {/* Title Section */}
          <div className="mb-4">
            <h3
              className={`text-xl font-bold mb-2 transition-colors
                ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {option.title}
            </h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {option.description}
            </p>
          </div>

          {/* Benefits List */}
          <ul className="space-y-3 mb-6">
            {option.benefits.map((benefit, i) => (
              <li
                key={i}
                className={`flex items-start text-sm
                  ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                <span className="mr-2 mt-1 text-indigo-500">•</span>
                <span className="leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Action Button */}
          <div
            className={`flex items-center text-sm font-medium transition-all
              ${
                isSelected
                  ? "text-indigo-500"
                  : darkMode
                  ? "text-gray-400 group-hover:text-indigo-400"
                  : "text-gray-600 group-hover:text-indigo-600"
              }`}
          >
            <span className="mr-2">Select this option</span>
            <HiOutlineArrowRight
              className={`transition-all duration-300
                ${isSelected ? "translate-x-1" : "group-hover:translate-x-1"}`}
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default OptionCard;
