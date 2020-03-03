import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {api} from './api/api.js';
import thunk from 'redux-thunk';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducer/reducer.js';

//
import {ActionCreator} from './reducer/reducer.js';
import {ApiMethod} from './api/methods.js';
//

const store = createStore(reducer,
    compose(
        /* цепочка аргументов. Тут или в reducer?
        Для получения массива объектов со всеми данными нужна цепочка запросов.
        посмотреть про цепочку middleware в redux compose

        applyMiddleware(thunk)
        */
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);
// store.dispatch(ActionCreator.getOffers(ApiMethod.getOffers));

ReactDOM.render(
    <Provider store = {store}>
      <App/>
    </Provider>,
    document.getElementById(`root`)
);
