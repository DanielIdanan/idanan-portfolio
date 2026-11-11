// YOUR src/main.jsx — only 2 lines change (marked). Keep everything else you already have.
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";   // keep if you already have it
import App from "./App.jsx";
import MobileSwitch from "./MobileSwitch.jsx";       // <-- ADD this import
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>                                  {/* keep if you already have it */}
      <MobileSwitch Desktop={App} />                 {/* <-- was <App /> */}
    </BrowserRouter>
  </React.StrictMode>
);
