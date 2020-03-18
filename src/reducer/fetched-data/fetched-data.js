import {extend} from '../../utils/utils.js';
import {DataAdapter} from '../../api/data-adapter.js';
import {ActionCreator as ContextActionCreator} from '../context/context.js';

const ActionType = {
  SET_OFFERS: `SET_OFFERS`
};
const ActionCreator = {
  setOffers: (offers) => ({
    type: ActionType.SET_OFFERS,
    payload: offers
  })
};
const MAX_NEARBY_AMOUNT = 3;
const Operation = {
  getOffers: () => (dispatch, getState, api) => api.get(`/hotels`)
  .then((response) => {
    dispatch(ActionCreator.setOffers(DataAdapter.formatCityOffersInAppFormat(response.data)));
  }),
  getDataByDetalize: (offer) => (dispatch, getState, api) => {
    Promise.all([api.get(`/hotels/${offer.id}/nearby`), api.get(`/comments/${offer.id}`)])
    .then((response) => {
      const offerWithDetalizeData = Object.assign({}, offer,
          {
            nearby: DataAdapter.formatCityOffersInAppFormat(response[0].data).slice(0, MAX_NEARBY_AMOUNT),
            reviews: DataAdapter.formatReviewsInAppFormat(response[1].data)
          }
      );
      dispatch(ContextActionCreator.setCurrentOffer(offerWithDetalizeData));
    });
  },
  sendReview: (offer, reviewData, onFail) => (dispatch, getState, api) => api.post(`/comments/${offer.id}`, reviewData)
  .then((response) => {
    const offerWithRefreshedReviews = Object.assign({}, offer,
        {
          reviews: DataAdapter.formatReviewsInAppFormat(response.data)
        }
    );
    dispatch(ContextActionCreator.setCurrentOffer(offerWithRefreshedReviews));
    return true;
  })
  .catch(() => {
    onFail();
  })
};
const initialState = {
  offers: []
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

export {reducer, ActionType, ActionCreator, Operation};
