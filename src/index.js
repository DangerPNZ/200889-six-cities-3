import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {api} from './api/api.js';
import thunk from 'redux-thunk';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer.js';
import {Operation as DataOperation} from './reducer/data/data.js';

const store = createStore(reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.getOffers());

ReactDOM.render(
    <Provider store = {store}>
      <App/>
    </Provider>,
    document.getElementById(`root`)
);
