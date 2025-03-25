// redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../feature/theme/theme";

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store;
