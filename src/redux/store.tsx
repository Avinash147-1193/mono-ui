import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./auth/reducer";

// Root State
export interface RootState {
  auth: ReturnType<typeof authReducer>;
  // Add more reducers if needed
}

// Store
const store = configureStore({
  reducer: authReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
