import {extend} from '../utils/utils.js';
import {DataValue} from '../mocks/offers.js';
import {City} from '../utils/utils.js';
import {SortOption} from '../utils/utils.js';

const initialState = {
  selectedCity: City.PARIS,
  currentOffer: null,
  offers: DataValue.OFFERS_MOCK,
  sortedOffers: DataValue.OFFERS_MOCK,
  offersSortType: SortOption.DEFAULT,
  offerInMouseEnterId: null
};
const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SELECT_OFFER: `SELECT_OFFER`,
  CHANGE_OFFERS_SORT_TYPE: `CHANGE_OFFERS_SORT_TYPE`,
  GET_OFFER_ID: `GET_OFFER_ID`
};
const getSelectedCityOffers = (city) => {
  switch (city) {
    case City.PARIS: return DataValue.OFFERS_MOCK;
    case City.COLOGNE: return [];
    case City.BRUSSELS: return DataValue.OFFERS_MOCK;
    case City.AMSTERDAM: return DataValue.OFFERS_MOCK;
    case City.HAMBURG: return DataValue.OFFERS_MOCK;
    case City.DUSSELDORF: return DataValue.OFFERS_MOCK;
  }
  return null;
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        offers: getSelectedCityOffers(action.payload),
        selectedCity: action.payload
      });
    case ActionType.SELECT_OFFER:
      return extend(state, {
        currentOffer: action.payload
      });
    case ActionType.CHANGE_OFFERS_SORT_TYPE:
      return extend(state, {
        offersSortType: action.payload
      });
    case ActionType.GET_OFFER_ID:
      return extend(state, {
        offerInMouseEnterId: action.payload
      });
  }
  return state;
};
const ActionCreator = {
  changeCity: (value) => ({
    type: ActionType.CHANGE_CITY,
    payload: value
  }),
  selectOffer: (value) => ({
    type: ActionType.SELECT_OFFER,
    payload: value
  }),
  changeOffersSortType: (type) => ({
    type: ActionType.CHANGE_OFFERS_SORT_TYPE,
    payload: type
  }),
  getOfferId: (id) => ({
    type: ActionType.GET_OFFER_ID,
    payload: id
  })
};

export {reducer, ActionType, ActionCreator};
