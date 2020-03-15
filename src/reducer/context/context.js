import {extend, City, SortOption} from '../../utils/utils.js';

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_CURRENT_OFFER: `SET_CURRENT_OFFER`,
  CHANGE_OFFERS_SORT_TYPE: `CHANGE_OFFERS_SORT_TYPE`,
  SET_OFFER_ID: `SET_OFFER_ID`,
  SET_ERROR_DATA: `SET_ERROR_DATA`
};
const ActionCreator = {
  changeCity: (value) => ({
    type: ActionType.CHANGE_CITY,
    payload: value
  }),
  setCurrentOffer: (value) => ({
    type: ActionType.SET_CURRENT_OFFER,
    payload: value
  }),
  changeOffersSortType: (type) => ({
    type: ActionType.CHANGE_OFFERS_SORT_TYPE,
    payload: type
  }),
  setOfferId: (id) => ({
    type: ActionType.SET_OFFER_ID,
    payload: id
  }),
  setErrorData: (errorData) => ({
    type: ActionType.SET_ERROR_DATA,
    payload: errorData
  })
};

const initialState = {
  selectedCity: City.PARIS,
  currentOffer: null,
  offersSortType: SortOption.DEFAULT,
  activeOfferId: null,
  errorData: null
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        selectedCity: action.payload
      });
    case ActionType.SET_CURRENT_OFFER:
      return extend(state, {
        currentOffer: action.payload
      });
    case ActionType.CHANGE_OFFERS_SORT_TYPE:
      return extend(state, {
        offersSortType: action.payload
      });
    case ActionType.SET_OFFER_ID:
      return extend(state, {
        activeOfferId: action.payload
      });
    case ActionType.SET_ERROR_DATA:
      return extend(state, {
        errorData: action.payload
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
