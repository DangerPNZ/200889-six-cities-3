import {extend} from '../../utils/utils.js';

const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTHORIZED: `AUTHORIZED`
};
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
      return extend(state, {
        authorizationStatus: action.payload
      });
    case ActionType.SET_USER_EMAIL:
      return extend(state, {
        userEmail: action.payload
      });
  }
  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => api.get(`/login`)
    .then((response) => {
      dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTHORIZED));
      dispatch(ActionCreator.setUserEmail(response.data.email));
    })
    .catch(() => dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH))),
  logIn: (logInData) => (dispatch, getState, api) => api.post(`/login`, logInData)
  .then((response) => {
    dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTHORIZED));
    dispatch(ActionCreator.setUserEmail(response.data.email));
  })
};

export {reducer, ActionType, ActionCreator, Operation, AuthorizationStatus};
