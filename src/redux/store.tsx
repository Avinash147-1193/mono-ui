import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./auth/reducer";
import { thunk } from "redux-thunk";

// Root State
export type RootState = ReturnType<typeof authReducer>;

// Store
const store = configureStore({
  reducer: authReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(thunk),
});

export default store;
