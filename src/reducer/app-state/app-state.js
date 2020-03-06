import {extend, City, SortOption} from '../../utils/utils.js';
const initialState = {
  selectedCity: City.PARIS,
  currentOffer: null,
  offersSortType: SortOption.DEFAULT,
  activeOfferId: null
};
const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  SELECT_OFFER: `SELECT_OFFER`,
  CHANGE_OFFERS_SORT_TYPE: `CHANGE_OFFERS_SORT_TYPE`,
  SET_OFFER_ID: `SET_OFFER_ID`
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
    case ActionType.CHANGE_OFFERS_SORT_TYPE:
      return extend(state, {
        offersSortType: action.payload
      });
    case ActionType.SET_OFFER_ID:
      return extend(state, {
        activeOfferId: action.payload
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
  setOfferId: (id) => ({
    type: ActionType.SET_OFFER_ID,
    payload: id
  })
};

export {reducer, ActionType, ActionCreator};
