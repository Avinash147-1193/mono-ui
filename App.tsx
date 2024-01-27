import { Provider } from "react-redux";
import StackNavigation from "./navigation";
import React from "react";
import store from "./src/redux/store";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StackNavigation />
      </Provider>
    </>
  );
}
