import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/app/app.jsx';
import {DataValue} from './mocks/offers.js';

ReactDOM.render(
    <App
      offers = {DataValue.OFFERS_MOCK}
    />,
    document.getElementById(`root`)
);
