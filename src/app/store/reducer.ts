import { combineReducers } from "@reduxjs/toolkit";
import uiSlice from "./slices/ui.slice";
import authSlice from "./slices/auth.slice";
import { authApi } from "./services/auth.service";

export const reducer = combineReducers({
  ui: uiSlice.reducer,
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
