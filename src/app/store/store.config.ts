/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  persistReducer,
  PersistConfig,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { reducer } from "./reducer";
import uiSlice from "./slices/ui.slice";
import { authApi } from "./services/auth.service";

import { Middleware } from "@reduxjs/toolkit";
import { resetAuth, setUser } from "./slices/auth.slice";

export const authMiddleWare: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: any) => {
    if (action?.payload?.status === 401) {
      dispatch(setUser(undefined));
      dispatch(resetAuth());
      localStorage.clear();
    }
    next(action);
  };

const persistConfig: PersistConfig<any> = {
  key: "ketti-vendor",
  storage,
  blacklist: [uiSlice.reducerPath, authApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducer as any);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, authMiddleWare);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
