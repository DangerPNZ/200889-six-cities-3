import {DataAdapter} from '../../api/data-adapter.js';
import {ActionCreator as ContextActionCreator} from '../context/context.js';
import {expandObj} from '../../utils/utils.js';
import {CITIES_FAULT_TOLERANT, ReducerName} from '../../utils/constants.js';

const FavoriteFlag = {
  ENABLE: 1,
  DISABLE: 0
};
const ActionType = {
  SET_OFFERS: `SET_OFFERS`,
  SET_FAVORITES: `SET_FAVORITES`,
  SET_CITIES: `SET_CITIES`
};
const ActionCreator = {
  setOffers: (offers) => ({
    type: ActionType.SET_OFFERS,
    payload: offers
  }),
  setFavorites: (favoriteOffers) => ({
    type: ActionType.SET_FAVORITES,
    payload: favoriteOffers
  }),
  setCities: (cities) => ({
    type: ActionType.SET_CITIES,
    payload: cities
  })
};
const MAX_NEARBY_AMOUNT = 3;
const getDataByDetalize = (offer, api, dispatch) => {
  return Promise.all([api.get(`/hotels/${offer.id}/nearby`), api.get(`/comments/${offer.id}`)])
  .then((response) => {
    const offerWithDetalizeData = expandObj(offer, {
      nearby: DataAdapter.formatCityOffersInAppFormat(response[0].data).slice(0, MAX_NEARBY_AMOUNT),
      reviews: DataAdapter.formatReviewsInAppFormat(response[1].data)
    });
    dispatch(ContextActionCreator.setCurrentOffer(offerWithDetalizeData));
  });
};
const Operation = {
  getOffers: () => (dispatch, getState, api) => api.get(`/hotels`)
  .then((response) => {
    const allOffers = response.data;
    const cities = new Set();
    allOffers.forEach((offer) => cities.add(offer.city.name));
    const citiesList = Array.from(cities);
    dispatch(ContextActionCreator.changeCity(citiesList[0]));
    dispatch(ActionCreator.setCities(citiesList));
    dispatch(ActionCreator.setOffers(DataAdapter.formatCityOffersInAppFormat(allOffers)));
  })
  .catch(() => {
    dispatch(ContextActionCreator.changeCity(CITIES_FAULT_TOLERANT[0]));
    dispatch(ActionCreator.setCities(CITIES_FAULT_TOLERANT));
  }),
  getDataByDetalize: (offer) => (dispatch, getState, api) => {
    return getDataByDetalize(offer, api, dispatch);
  },
  sendReview: (offer, reviewData, onFail) => (dispatch, getState, api) => api.post(`/comments/${offer.id}`, reviewData)
  .then((response) => {
    const offerWithRefreshedReviews = expandObj(offer,
        {
          reviews: DataAdapter.formatReviewsInAppFormat(response.data)
        }
    );
    dispatch(ContextActionCreator.setCurrentOffer(offerWithRefreshedReviews));
    return true;
  })
  .catch(() => {
    onFail();
  }),
  setFavorites: () => (dispatch, getState, api) => api.get(`/favorite`)
  .then((response) => {
    if (response.data.length) {
      const favorites = DataAdapter.formatCityOffersInAppFormat(response.data);
      const offers = getState()[`${ReducerName.FETCHED_DATA}`].offers.slice();
      favorites.forEach((favoriteItem) => {
        const offerIndex = offers.findIndex((offer) => offer.id === favoriteItem.id);
        offers[offerIndex] = expandObj(offers[offerIndex], favoriteItem);
      });
      dispatch(ActionCreator.setOffers(offers));
      dispatch(ActionCreator.setFavorites(favorites));
    }
  }),
  changeFavoriteState: (offer, currentOfferId) => (dispatch, getState, api) => api.post(`/favorite/${offer.id}/${offer.isFavorites ? FavoriteFlag.DISABLE : FavoriteFlag.ENABLE}`)
  .then((response) => {
    const offerWithChangedFavoriteState = DataAdapter.formatOfferItemInAppFormat(response.data);
    const offers = getState()[`${ReducerName.FETCHED_DATA}`].offers.slice();
    const favorites = getState()[`${ReducerName.FETCHED_DATA}`].favorites.slice();
    const offerIndex = offers.findIndex((item) => item.id === offerWithChangedFavoriteState.id);
    offers[offerIndex] = expandObj(offers[offerIndex], offerWithChangedFavoriteState);
    if (offerWithChangedFavoriteState.isFavorites) {
      favorites.push(offerWithChangedFavoriteState);
    } else {
      const offerIndexInFavorites = favorites.findIndex((item) => item.id === offerWithChangedFavoriteState.id);
      favorites.splice(offerIndexInFavorites, 1);
    }
    dispatch(ActionCreator.setOffers(offers));
    dispatch(ActionCreator.setFavorites(favorites));
    if (currentOfferId) {
      const currentOffer = getState()[`${ReducerName.FETCHED_DATA}`].offers.find((item) => item.id === currentOfferId);
      getDataByDetalize(currentOffer, api, dispatch);
    }
  })
};
const initialState = {
  offers: [],
  favorites: []
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return expandObj(state, {
        offers: action.payload
      });
    case ActionType.SET_FAVORITES:
      return expandObj(state, {
        favorites: action.payload
      });
    case ActionType.SET_CITIES:
      return expandObj(state, {
        cities: action.payload
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation, FavoriteFlag};
