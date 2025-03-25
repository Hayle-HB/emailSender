import React from "react";
import { useSelector } from "react-redux";

const Button = ({
  children,
  variant = "primary", // primary, secondary, or accent
  size = "medium", // small, medium, large
  onClick,
  disabled = false,
  className = "",
}) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const baseStyles =
    "rounded-md font-medium transition-all duration-200 flex items-center justify-center";

  const variants = {
    primary: `${darkMode ? "bg-primary-600" : "bg-primary-500"} 
              text-white 
              hover:bg-primary-700 
              active:bg-primary-800`,
    secondary: `${darkMode ? "bg-secondary-700" : "bg-secondary-200"} 
                ${darkMode ? "text-white" : "text-secondary-800"}
                hover:bg-secondary-300 
                active:bg-secondary-400`,
    accent: "bg-accent-success hover:bg-accent-success/90 text-white",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabledStyles}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
