import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

require("dotenv").config();

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
