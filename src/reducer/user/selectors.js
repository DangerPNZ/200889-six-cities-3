import {ReducerName} from '../reducer.js';

const REDUCER = ReducerName.USER;
export const getAuthorizationStatus = (state) => state[REDUCER].authorizationStatus;
export const getUserEmail = (state) => state[REDUCER].userEmail;
