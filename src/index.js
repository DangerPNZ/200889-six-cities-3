import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";

const DataValue = {
  OFFERS_AMOUNT: `555`,
  OFFERS_NAMES: [
    `Beautiful & luxurious apartment at great location`,
    `Wood and stone place`,
    `Canal View Prinsengracht`,
    `Nice, cozy, warm big bed apartment`,
    `Wood and stone place`
  ]
};

ReactDOM.render(
    <App
      offersAmount = {DataValue.OFFERS_AMOUNT}
      offersNames = {DataValue.OFFERS_NAMES}
    />,
    document.getElementById(`root`)
);
