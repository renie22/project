import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
