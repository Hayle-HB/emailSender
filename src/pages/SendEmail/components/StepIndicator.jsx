import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";

const StepIndicator = ({ currentStep, totalSteps, onBack, darkMode }) => (
  <div className="flex items-center justify-center mb-8">
    {currentStep > 1 && (
      <button
        onClick={onBack}
        className={`absolute left-8 p-2 rounded-full transition-all
          ${
            darkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
      >
        <HiOutlineArrowLeft className="w-6 h-6" />
      </button>
    )}
    <div className="flex items-center space-x-4">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-all ${
            index + 1 === currentStep
              ? "bg-indigo-500 scale-125"
              : index + 1 < currentStep
              ? "bg-indigo-400"
              : darkMode
              ? "bg-gray-700"
              : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  </div>
);

export default StepIndicator;
