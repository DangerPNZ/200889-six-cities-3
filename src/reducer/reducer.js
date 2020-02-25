import {extend} from '../utils/utils.js';
import {DataValue} from '../mocks/offers.js';
import {City} from '../utils/utils.js';

const initialState = {
  selectedCity: City.PARIS,
  currentOffer: null,
  offers: DataValue.OFFERS_MOCK
};
const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SELECT_OFFER: `SELECT_OFFER`,
  GET_CITY_OFFERS: `GET_CITY_OFFERS`
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
        selectedCity: action.payload
      });
    case ActionType.SELECT_OFFER:
      return extend(state, {
        currentOffer: action.payload
      });
    case ActionType.GET_CITY_OFFERS:
      return extend(state, {
        offers: getSelectedCityOffers(action.payload)
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
  getCityOffers: (city) => ({
    type: ActionType.GET_CITY_OFFERS,
    payload: city
  })
};


export {reducer, ActionType, ActionCreator};
