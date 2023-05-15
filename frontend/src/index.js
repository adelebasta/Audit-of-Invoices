import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "../src/components/Footer";

import App from "./App";
import { store } from "./store";

import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
      <Footer />
    </Router>
  </Provider>,
  document.getElementById("root")
);
