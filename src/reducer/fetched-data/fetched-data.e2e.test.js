import MockAdapter from 'axios-mock-adapter';
import {reducer, ActionType, ActionCreator, Operation, FavoriteFlag} from './fetched-data.js';
import {ActionType as ContextActionType} from '../context/context.js';
import {createApi} from '../../api/api.js';
import {DataAdapter} from '../../api/data-adapter.js';
import {expandObj} from '../../utils/utils.js';
import {CITIES_FAULT_TOLERANT, ReducerName} from '../../utils/constants.js';

const TestDataValue = {
  RAW_OFFERS: [
    {
      bedrooms: 3,
      city: {
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        },
        name: `Amsterdam`
      },
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
      host: {
        [`avatar_url`]: `img/1.png`,
        id: 3,
        [`is_pro`]: true,
        name: `Angelina`
      },
      id: 1,
      images: [`img/1.png`, `img/2.png`],
      [`is_favorite`]: false,
      [`is_premium`]: false,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      },
      [`max_adults`]: 4,
      [`preview_image`]: `img/1.png`,
      price: 120,
      rating: 4.8,
      title: `Beautiful & luxurious studio at great location`,
      type: `apartment`
    }
  ],
  OFFER: {
    city: {
      name: `Hamburg`,
      coordinates: [0],
      mapZoom: 10
    },
    name: `Amazing room`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    goods: [`Lorem`, `ipsum`, `dolor`, `sit amet`, `consectetur`],
    bedrooms: 3,
    host: {
      avatarUrl: `./img.jpg`,
      id: 5,
      isPro: true,
      name: `Samantha`
    },
    images: [`./photo.jpg`, `./photo_1.jpg`, `./photo_2.jpg`, `./photo_3.jpg`],
    previewImage: `./preview.jpg`,
    location: {
      coordinates: [0],
      zoom: 10
    },
    id: 1,
    price: 100,
    type: `room`,
    premium: true,
    isFavorites: false,
    rating: 4,
    maxAdults: 1,
    reviews: [{
      review: `Good!`,
      userRating: 5,
      date: `May 2019`,
      commentId: 1,
      author: {
        avatarUrl: `./user.jpg`,
        id: 3,
        isPro: true,
        name: `Mike`
      }
    }],
    nearby: [{
      city: {
        name: `Hamburg`,
        coordinates: [0],
        mapZoom: 10
      },
      name: `Light room`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      goods: [`Lorem`, `ipsum`, `dolor`, `sit amet`, `consectetur`],
      bedrooms: 2,
      host: {
        avatarUrl: `./img.jpg`,
        id: 5,
        isPro: true,
        name: `Samantha`
      },
      images: [`./photo.jpg`, `./photo_1.jpg`, `./photo_2.jpg`, `./photo_3.jpg`],
      previewImage: `./preview.jpg`,
      location: {
        coordinates: [0],
        zoom: 10
      },
      id: 2,
      price: 150,
      type: `room`,
      premium: false,
      isFavorites: true,
      rating: 4,
      maxAdults: 1
    }]
  },
  RAW_FAVORITES_OFFERS: [
    {
      bedrooms: 3,
      city: {
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        },
        name: `Amsterdam`
      },
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
      host: {
        [`avatar_url`]: `img/1.png`,
        id: 3,
        [`is_pro`]: true,
        name: `Angelina`
      },
      id: 1,
      images: [`img/1.png`, `img/2.png`],
      [`is_favorite`]: true,
      [`is_premium`]: false,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      },
      [`max_adults`]: 4,
      [`preview_image`]: `img/1.png`,
      price: 120,
      rating: 4.8,
      title: `Beautiful & luxurious studio at great location`,
      type: `apartment`
    }
  ],
  RAW_REVIEWS: [{
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: `2019-05-08T14:13:56.569Z`,
    id: 5,
    rating: 4,
    user: {
      [`avatar_url`]: `img/1.png`,
      id: 4,
      [`is_pro`]: false,
      name: `Max`
    }
  }],
  REVIEW_DATA: {
    comment: `To submit review please make sure to set rating and describe your stay with at least 50 characters.`,
    rating: 4
  },
  RAW_COMMENTS: [{
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: `2019-05-08T14:13:56.569Z`,
    id: 1,
    rating: 4,
    user: {
      [`avatar_url`]: `img/1.png`,
      id: 4,
      [`is_pro`]: false,
      name: `Max`
    }
  }]
};
const api = createApi(() => {}, () => {});
const cities = new Set();
TestDataValue.RAW_OFFERS.forEach((offer) => cities.add(offer.city.name));
const citiesList = Array.from(cities);
const offersInAppFormat = DataAdapter.formatCityOffersInAppFormat(TestDataValue.RAW_OFFERS);
it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    offers: [],
    favorites: []
  });
});

it(`Reducer should update offers by load offers`, () => {
  expect(reducer({
    offers: [],
    favorites: []
  }, ActionCreator.setOffers(offersInAppFormat))).toEqual({
    offers: offersInAppFormat,
    favorites: []
  });
});

it(`Reducer should update favorites by load favorites`, () => {
  expect(reducer({
    offers: offersInAppFormat,
    favorites: []
  }, ActionCreator.setFavorites(DataAdapter.formatCityOffersInAppFormat(TestDataValue.RAW_FAVORITES_OFFERS)))).toEqual({
    offers: offersInAppFormat,
    favorites: DataAdapter.formatCityOffersInAppFormat(TestDataValue.RAW_FAVORITES_OFFERS)
  });
});

it(`Reducer should set cities`, () => {
  expect(reducer({
    offers: offersInAppFormat,
    favorites: DataAdapter.formatCityOffersInAppFormat(TestDataValue.RAW_FAVORITES_OFFERS)
  }, ActionCreator.setCities(CITIES_FAULT_TOLERANT))).toEqual({
    offers: offersInAppFormat,
    cities: CITIES_FAULT_TOLERANT,
    favorites: DataAdapter.formatCityOffersInAppFormat(TestDataValue.RAW_FAVORITES_OFFERS)
  });
});

describe(`Operation work correctly`, () => {
  it(`Test getOffers operation success`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.getOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, TestDataValue.RAW_OFFERS);

    return questionLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ContextActionType.CHANGE_CITY,
          payload: citiesList[0]
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_CITIES,
          payload: citiesList
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_OFFERS,
          payload: offersInAppFormat
        });
      });
  });

  it(`Test getOffers operation fail`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.getOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(500);

    return questionLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ContextActionType.CHANGE_CITY,
          payload: CITIES_FAULT_TOLERANT[0]
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_CITIES,
          payload: CITIES_FAULT_TOLERANT
        });
      });
  });

  it(`Test getDataByDetalize operation`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offer = DataAdapter.formatOfferItemInAppFormat(TestDataValue.RAW_OFFERS[0]);
    const getDataByDetalize = Operation.getDataByDetalize(offer);
    apiMock
      .onGet(`/hotels/${offer.id}/nearby`)
      .reply(200, TestDataValue.RAW_OFFERS);
    apiMock
    .onGet(`/comments/${offer.id}`)
    .reply(200, TestDataValue.RAW_COMMENTS);

    return getDataByDetalize(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ContextActionType.SET_CURRENT_OFFER,
          payload: expandObj(offer,
              {
                nearby: offersInAppFormat,
                reviews: DataAdapter.formatReviewsInAppFormat(TestDataValue.RAW_COMMENTS)
              }
          )
        });
      });
  });

  it(`Test sendReview operation`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onFail = jest.fn();
    const sendReviewOperation = Operation.sendReview(TestDataValue.OFFER, TestDataValue.REVIEW_DATA, onFail);
    const resultOffer = expandObj(TestDataValue.OFFER, {
      reviews: DataAdapter.formatReviewsInAppFormat(TestDataValue.RAW_REVIEWS)
    });

    apiMock
      .onPost(`/comments/${TestDataValue.OFFER.id}`)
      .reply(200, TestDataValue.RAW_REVIEWS);

    return sendReviewOperation(dispatch, () => {}, api)
      .then(() => {
        expect(onFail.mock.calls.length).toBe(0);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ContextActionType.SET_CURRENT_OFFER,
          payload: resultOffer
        });
      });
  });

  it(`Test sendReview operation after fail request`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onFail = jest.fn();
    const sendReviewOperation = Operation.sendReview(TestDataValue.OFFER, TestDataValue.REVIEW_DATA, onFail);

    apiMock
      .onPost(`/comments/${TestDataValue.OFFER.id}`)
      .reply(400);

    return sendReviewOperation(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(onFail.mock.calls.length).toBe(1);
      });
  });

  it(`Test setFavorites operation`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getState = () => ({
      [`${ReducerName.FETCHED_DATA}`]: {
        offers: offersInAppFormat
      }
    });
    const favoritesData = expandObj(TestDataValue.RAW_OFFERS[0], {
      [`is_favorite`]: true}
    );
    const setFavoritesOperation = Operation.setFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [favoritesData]);

    return setFavoritesOperation(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_OFFERS,
          payload: DataAdapter.formatCityOffersInAppFormat([favoritesData])
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_FAVORITES,
          payload: DataAdapter.formatCityOffersInAppFormat([favoritesData])
        });
      });
  });

  it(`Test changeFavoriteState operation`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const initOffer = expandObj(TestDataValue.RAW_OFFERS[0], {
      [`is_favorite`]: true
    });
    const getState = () => ({
      [`${ReducerName.FETCHED_DATA}`]: {
        offers: [DataAdapter.formatOfferItemInAppFormat(initOffer)],
        favorites: [DataAdapter.formatOfferItemInAppFormat(initOffer)]
      }
    });
    const offer = DataAdapter.formatOfferItemInAppFormat(TestDataValue.RAW_OFFERS[0]);
    const changeFavoriteState = Operation.changeFavoriteState(offer);

    apiMock
      .onPost(`/favorite/${offer.id}/${offer.isFavorites ? FavoriteFlag.DISABLE : FavoriteFlag.ENABLE}`)
      .reply(200, TestDataValue.RAW_OFFERS[0]);

    return changeFavoriteState(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_OFFERS,
          payload: [offer]
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_FAVORITES,
          payload: []
        });
      });
  });
});
