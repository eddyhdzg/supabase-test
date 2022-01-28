import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ReactQueryProvider } from "providers";

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </React.StrictMode>,
  document.getElementById("root")
);