import { createSlice } from "@reduxjs/toolkit";

// Get initial theme from system preference or localStorage
const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem("theme");
    // If there's a saved theme preference
    if (savedTheme !== null) {
      // Parse as boolean - convert "true"/"false" string to boolean
      return savedTheme === "true";
    }
    // If no saved preference, check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch (error) {
    // Fallback to light theme if there's any error
    console.warn("Error reading theme preference:", error);
    return false;
  }
};

const initialState = {
  darkMode: getInitialTheme(),
  themeColor: "blue", // default theme color
  animations: true, // toggle for animations
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      // Save to localStorage as string
      localStorage.setItem("theme", String(state.darkMode));
      // Update document class for global styling
      if (state.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    setThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
    toggleAnimations: (state) => {
      state.animations = !state.animations;
    },
    // Reset to system preference
    resetTheme: (state) => {
      const systemDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      state.darkMode = systemDarkMode;
      localStorage.removeItem("theme");
      // Update document class
      if (systemDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { toggleTheme, setThemeColor, toggleAnimations, resetTheme } =
  themeSlice.actions;
export default themeSlice.reducer;
