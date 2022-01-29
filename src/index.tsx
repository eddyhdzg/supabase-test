import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProvidersWrapper } from "providers";

ReactDOM.render(
  <React.StrictMode>
    <ProvidersWrapper>
      <App />
    </ProvidersWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
