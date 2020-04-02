import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createApi} from './api/api.js';
import thunk from 'redux-thunk';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer.js';
import {Operation as DataOperation} from './reducer/fetched-data/fetched-data.js';
import {ActionCreator as ContextActionCreator} from './reducer/context/context.js';
import {Operation as UserOperation, ActionCreator as UserActionCreator, AuthorizationStatus} from './reducer/user/user.js';

const onUnauthorized = () => store.dispatch(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
const onError = (errorData) => store.dispatch(ContextActionCreator.setErrorData(errorData));
const api = createApi(onUnauthorized, onError);
const store = createStore(reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);
const onAuthorized = () => store.dispatch(DataOperation.setFavorites());
const renderApp = () => {
  ReactDOM.render(
      <Provider store = {store}>
        <App
          onError = {onError}
          onAuthorized = {onAuthorized}
        />
      </Provider>,
      document.getElementById(`root`)
  );
};

store.dispatch(DataOperation.getOffers())
.then(() => {
  renderApp();
  store.dispatch(UserOperation.checkAuth(onAuthorized));
})
.catch(() => renderApp());

