import {ReducerName} from '../../utils/constants.js';

const REDUCER = ReducerName.CONTEXT;
export const getSelectedCity = (state) => state[REDUCER].selectedCity;
export const getCurrentOffer = (state) => state[REDUCER].currentOffer;
export const getOffersSortType = (state) => state[REDUCER].offersSortType;
export const getActiveOfferId = (state) => state[REDUCER].activeOfferId;
export const getErrorData = (state) => state[REDUCER].errorData;
