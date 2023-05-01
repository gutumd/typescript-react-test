import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const THEME_KEY = "theme";

interface MarvelAppState {
  isModal: Boolean;
  view: string;
  theme: string;
}

const initialState: MarvelAppState = {
  isModal: false,
  view: "grid",
  theme: localStorage.getItem(THEME_KEY) ?? "light",
};

export const marvelAppSlice = createSlice({
  name: "marvelApp",
  initialState,
  reducers: {
    changeView(state, action: PayloadAction<string>) {
      state.view = action.payload;
    },
    toggleModal(state, action: PayloadAction<Boolean>) {
      state.isModal = action.payload;
    },
    changeTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
      localStorage.setItem(THEME_KEY, state.theme);
    },
  },
});

export const marvelAppActions = marvelAppSlice.actions;
export const marvelAppReducer = marvelAppSlice.reducer;
