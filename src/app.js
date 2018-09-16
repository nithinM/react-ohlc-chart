import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./components/Dashboard";
import "normalize.css";
import "./styles/app.scss";

const localSymbols = localStorage.getItem("ohlcSymbolsData");
let symbols = [];
if (localSymbols) {
  symbols = JSON.parse(localSymbols);
}

ReactDOM.render(
  <Dashboard symbols={symbols} />,
  document.getElementById("main-app")
);
