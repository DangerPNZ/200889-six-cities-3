import {NameSpace} from '../name-space.js';

const NAME_SPACE = NameSpace.APP_STATE;

export const getSelectedCity = (state) => state[NAME_SPACE].selectedCity;
export const getCurrentOffer = (state) => state[NAME_SPACE].currentOffer;
export const getOffersSortType = (state) => state[NAME_SPACE].offersSortType;
export const getActiveOfferId = (state) => state[NAME_SPACE].activeOfferId;
