import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../api/api.js';
import {reducer, ActionCreator, ActionType, Operation} from './user.js';
import {AuthorizationStatus} from '../../utils/constants.js';

const TestDataValue = {
  USER_EMAIL: `user@mail.com`
};
const api = createApi(() => {}, () => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    userEmail: null,
    authorizationStatus: AuthorizationStatus.NO_AUTH
  });
});

describe(`Reducer actions tests`, () => {
  it(`Reducer should setAuthorizationStatus`, () => {
    expect(reducer({
      userEmail: null,
      authorizationStatus: AuthorizationStatus.NO_AUTH
    }, ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTHORIZED))).toEqual({
      userEmail: null,
      authorizationStatus: AuthorizationStatus.AUTHORIZED
    });
  });

  it(`Reducer should setUserEmail`, () => {
    expect(reducer({
      userEmail: null,
      authorizationStatus: AuthorizationStatus.AUTHORIZED
    }, ActionCreator.setUserEmail(TestDataValue.USER_EMAIL))).toEqual({
      userEmail: TestDataValue.USER_EMAIL,
      authorizationStatus: AuthorizationStatus.AUTHORIZED
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API get request to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onAuthorized = jest.fn();
    const authorizationCheckRequest = Operation.checkAuth(onAuthorized);

    apiMock
      .onGet(`/login`)
      .reply(200, {email: TestDataValue.USER_EMAIL});

    return authorizationCheckRequest(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.AUTHORIZED
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER_EMAIL,
          payload: TestDataValue.USER_EMAIL
        });
        expect(onAuthorized.mock.calls.length).toBe(1);
      });
  });

  it(`Should make a unauthorized API get request to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onAuthorized = jest.fn();
    const authorizationCheckRequest = Operation.checkAuth(onAuthorized);

    apiMock
      .onGet(`/login`)
      .reply(401, {email: TestDataValue.USER_EMAIL});

    return authorizationCheckRequest(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.NO_AUTH
        });
        expect(onAuthorized.mock.calls.length).toBe(0);
      });
  });

  it(`Should make a correct API post request to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onAuthorized = jest.fn();
    const authorizationCheckRequest = Operation.logIn({}, onAuthorized);

    apiMock
      .onPost(`/login`)
      .reply(200, {email: TestDataValue.USER_EMAIL});

    return authorizationCheckRequest(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.AUTHORIZED
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER_EMAIL,
          payload: TestDataValue.USER_EMAIL
        });
        expect(onAuthorized.mock.calls.length).toBe(1);
      });
  });
});

