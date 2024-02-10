// Import necessary libraries
import * as React from "react";
import SelectedStack from "./navigation";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const App: React.FC = () => {
  // You can implement your authentication logic here to set the 'authenticated' state

  return (
    <>
      <Provider store={store}>
        <SelectedStack />
      </Provider>
    </>
  );
};

export default App;
