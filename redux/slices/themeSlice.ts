import { createSlice } from "@reduxjs/toolkit";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const initialState = {
  isDarkMode: false,
  theme: DefaultTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? DarkTheme : DefaultTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;