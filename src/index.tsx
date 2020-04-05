import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import AppRouter from "./app/router";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import configureAppStore from "./app/store";

const store = configureAppStore();

function render() {
  ReactDOM.render(
    <React.Fragment>
      <Provider store={store}>
        <CssBaseline />
        <AppRouter />
      </Provider>
    </React.Fragment>,
    document.getElementById("root")
  );
}

render();

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./app/router", () => {
    console.log("should replace");
    render();
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
