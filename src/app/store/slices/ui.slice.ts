import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AppLanguages,
  IUI,
  SidebarStates,
} from "../../../interfaces/ui.interface";

const initialState: IUI = {
  sidebarState: SidebarStates.VISIBLE,
  lang: AppLanguages.RU,
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setSidebarState: (store, action: PayloadAction<SidebarStates>) => {
      store.sidebarState = action.payload;
    },
    setLanguage: (store, action: PayloadAction<AppLanguages>) => {
      store.lang = action.payload;
    },
  },
});

export default uiSlice;

export const { setSidebarState, setLanguage } = uiSlice.actions;
