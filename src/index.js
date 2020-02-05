import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/index.jsx";

const DataValue = {
  OFFERS_AMOUNT: `555`
};

ReactDOM.render(
    <App
      offersAmount = {DataValue.OFFERS_AMOUNT}
    />,
    document.getElementById(`root`)
);
