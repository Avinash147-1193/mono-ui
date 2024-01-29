import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import authReducer from "./auth/reducer";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";
// Root State
export type RootState = ReturnType<typeof authReducer>;

composeWithDevTools({
  realtime: true,
  name: "Your Instance Name",
  hostname: "localhost",
  port: 8081, // the port your remotedev server is running at
});

// Store
const store = configureStore({
  reducer: authReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), //concat(logger) for logging
  devTools: {
    name: "redux store",
  },
});

export default store;
