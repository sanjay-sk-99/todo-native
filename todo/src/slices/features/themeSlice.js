// redux/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { CustomLightTheme, CustomDarkTheme } from "../../themes/constant";

const initialState = {
  isDark: false,
  theme: CustomLightTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      state.theme = state.isDark ? CustomDarkTheme : CustomLightTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
