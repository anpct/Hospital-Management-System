import React, { useEffect } from "react";
import "./App.css";
import Routes from "./Routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/actions/auth";
import AlertTemplate from "./components/AlertTemplate";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { Provider as AlertProvider } from "react-alert";

const alertOptions = {
  timeout: 5000,
  position: "bottom center",
};

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AlertProvider theme={theme} template={AlertTemplate} {...alertOptions}>
          <Routes />
        </AlertProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
