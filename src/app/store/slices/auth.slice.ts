import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResult, IAuthState } from "../../../interfaces/auth.interface";

const initialState: Partial<IAuthState> = {
  user: undefined,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (store, action: PayloadAction<AuthResult | undefined>) => {
      store.user = action.payload;
    },
    resetAuth: () => initialState,
  },
});

export default authSlice;

export const { setUser, resetAuth } = authSlice.actions;
