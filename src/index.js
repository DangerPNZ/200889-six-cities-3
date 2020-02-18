import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/app/app.jsx';
import {DataValue} from './mocks/offers.js';

ReactDOM.render(
    <App
      offersAmount = {DataValue.OFFERS_AMOUNT}
      offersNames = {DataValue.OFFERS_NAMES}
      offerCoords = {DataValue.COORDINATES}
    />,
    document.getElementById(`root`)
);
