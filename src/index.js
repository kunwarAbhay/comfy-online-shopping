import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";
import "./queries.css";
import App from "./app";
import AppProvider from "./context";

let root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
