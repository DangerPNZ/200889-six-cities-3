import {extend} from '../../utils/utils.js';
import {DataAdapter} from '../../api/data-adapter.js';
import {ActionCreator as AppStateActionCreator} from '../app-state/app-state.js';

const initialState = {
  offers: []
};
const ActionType = {
  SET_OFFERS: `SET_OFFERS`
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return extend(state, {
        offers: action.payload
      });
  }
  return state;
};
const ActionCreator = {
  setOffers: (offers) => ({
    type: ActionType.SET_OFFERS,
    payload: offers
  })
};
const Operation = {
  getOffers: () => (dispatch, getState, api) => api.get(`/hotels`)
  .then((response) => {
    dispatch(ActionCreator.setOffers(DataAdapter.formatCityOffersInAppFormat(response.data)));
  }),
  getDataByDetalize: (offer) => (dispatch, getState, api) => api.get(`/hotels/${offer.id}/nearby`)
  .then((response) => {
    offer.nearby = DataAdapter.formatCityOffersInAppFormat(response.data).slice(0, 3);
    return api.get(`/comments/${offer.id}`);
  })
  .then((response) => {
    offer.reviews = DataAdapter.formatReviewsInAppFormat(response.data);
    dispatch(AppStateActionCreator.selectOffer(offer));
  })
};
export {reducer, ActionType, ActionCreator, Operation};
