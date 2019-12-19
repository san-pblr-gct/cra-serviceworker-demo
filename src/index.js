import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: registration => {
    console.log("regissterd");
    const waitingServiceWorker = registration.waiting;
    if (waitingServiceWorker) {
      console.log("regissterd am here");
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      registration.waiting.postMessage("skipWaiting");
      window.location.reload();
    }
  }
});
