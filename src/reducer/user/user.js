import {expandObj} from '../../utils/utils.js';
import {AuthorizationStatus} from '../../utils/constants.js';

const ActionType = {
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  SET_USER_EMAIL: `SET_USER_EMAIL`
};
const ActionCreator = {
  setAuthorizationStatus: (status) => ({
    type: ActionType.SET_AUTHORIZATION_STATUS,
    payload: status
  }),
  setUserEmail: (email) => ({
    type: ActionType.SET_USER_EMAIL,
    payload: email
  })
};

const initialState = {
  userEmail: null,
  authorizationStatus: AuthorizationStatus.NO_AUTH
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return expandObj(state, {
        authorizationStatus: action.payload
      });
    case ActionType.SET_USER_EMAIL:
      return expandObj(state, {
        userEmail: action.payload
      });
  }
  return state;
};
const Operation = {
  checkAuth: (onAuthorized) => (dispatch, getState, api) => api.get(`/login`)
    .then((response) => {
      dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTHORIZED));
      dispatch(ActionCreator.setUserEmail(response.data.email));
      onAuthorized();
    })
    .catch(() => dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH))),
  logIn: (logInData, onAuthorized) => (dispatch, getState, api) => api.post(`/login`, logInData)
  .then((response) => {
    dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTHORIZED));
    dispatch(ActionCreator.setUserEmail(response.data.email));
    onAuthorized();
  })
};

export {reducer, ActionType, ActionCreator, Operation, AuthorizationStatus};
