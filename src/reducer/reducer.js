import {combineReducers} from 'redux';
import {reducer as appState} from './app-state/app-state.js';
import {reducer as data} from './data/data.js';
import {NameSpace} from './name-space.js';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.APP_STATE]: appState
});

// // import {extend} from '../utils/utils.js';
// import {City} from '../utils/utils.js';
// import {SortOption} from '../utils/utils.js';
// import {DataAdapter} from '../api/data-adapter';

// const initialState = {
//   selectedCity: City.PARIS,
//   currentOffer: null,
//   // offers: [],
//   sortedOffers: [],
//   offersSortType: SortOption.DEFAULT,
//   activeOfferId: null
// };
// const ActionType = {
//   CHANGE_CITY: `CHANGE_CITY`,
//   SELECT_OFFER: `SELECT_OFFER`,
//   CHANGE_OFFERS_SORT_TYPE: `CHANGE_OFFERS_SORT_TYPE`,
//   SET_OFFER_ID: `SET_OFFER_ID`,
//   SET_OFFERS: `SET_OFFERS`
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ActionType.CHANGE_CITY:
//       return extend(state, {
//         selectedCity: action.payload
//       });
//     case ActionType.SELECT_OFFER:
//       return extend(state, {
//         currentOffer: action.payload
//       });
//     case ActionType.CHANGE_OFFERS_SORT_TYPE:
//       return extend(state, {
//         offersSortType: action.payload
//       });
//     case ActionType.SET_OFFER_ID:
//       return extend(state, {
//         activeOfferId: action.payload
//       });
//     case ActionType.SET_OFFERS:
//       return extend(state, {
//         offers: action.payload
//       });
//   }
//   return state;
// };
// const ActionCreator = {
//   changeCity: (value) => ({
//     type: ActionType.CHANGE_CITY,
//     payload: value
//   }),
//   selectOffer: (value) => ({
//     type: ActionType.SELECT_OFFER,
//     payload: value
//   }),
//   changeOffersSortType: (type) => ({
//     type: ActionType.CHANGE_OFFERS_SORT_TYPE,
//     payload: type
//   }),
//   setOfferId: (id) => ({
//     type: ActionType.SET_OFFER_ID,
//     payload: id
//   }),
//   setOffers: (offers) => ({
//     type: ActionType.SET_OFFERS,
//     payload: offers
//   })
// };

// export const Operation = {
//   getOffers: () => (dispatch, getState, api) => api.get(`/hotels`)
//   .then((response) => {
//     dispatch(ActionCreator.setOffers(DataAdapter.formatCityOffersInAppFormat(response.data)));
//   }),
//   getDataByDetalize: (offer) => (dispatch, getState, api) => api.get(`/hotels/${offer.id}/nearby`)
//   .then((response) => {
//     offer.nearby = DataAdapter.formatCityOffersInAppFormat(response.data).slice(0, 3);
//     return api.get(`/comments/${offer.id}`);
//   })
//   .then((response) => {
//     offer.reviews = DataAdapter.formatReviewsInAppFormat(response.data);
//     dispatch(ActionCreator.selectOffer(offer));
//   })
// };

// export {reducer, ActionType, ActionCreator};
