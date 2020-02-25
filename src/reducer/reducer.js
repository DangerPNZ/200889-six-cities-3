import {extend} from '../utils/utils.js';
import {DataValue} from '../mocks/offers.js';
import {City} from '../utils/utils.js';

/* v * Мок для тестирования работоспособности action getCityOffers. (данные-исключение при выборе города Cologne) Позднее удалить */
import nanoid from 'nanoid';
const REVIEWS_MOCK = [
  {
    author: `Max`,
    review: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    userRating: 4,
    date: `April 2019`
  },
  {
    author: `Adelina`,
    review: `A quiet cozy and picturesque that.`,
    userRating: 3,
    date: `May 2018`
  },
  {
    author: `John`,
    review: `The building is green and from 18th century.`,
    userRating: 5,
    date: `June 2018`
  }
];
const MockValue = {
  OFFERS_MOCK: [
    {
      name: `Offer 1`,
      coordinates: [52.3909553943508, 4.85309666406198],
      id: nanoid(),
      price: 120,
      type: `Apartment`,
      premium: true,
      isFavorites: false,
      rating: 4.7,
      reviews: REVIEWS_MOCK
    },
    {
      name: `Offer 2`,
      coordinates: [52.369553943508, 4.85309666406198],
      id: nanoid(),
      price: 150,
      type: `Room`,
      premium: false,
      isFavorites: false,
      rating: 4.2,
      reviews: REVIEWS_MOCK
    },
    {
      name: `Offer 3`,
      coordinates: [52.3909553943508, 4.929309666406198],
      id: nanoid(),
      price: 100,
      type: `Hotel room`,
      premium: false,
      isFavorites: true,
      rating: 2.7,
      reviews: REVIEWS_MOCK
    },
    {
      name: `Offer 4`,
      coordinates: [52.3809553943508, 4.939309666406198],
      id: nanoid(),
      price: 170,
      type: `Lux apartment`,
      premium: true,
      isFavorites: true,
      rating: 3.9,
      reviews: REVIEWS_MOCK
    }
  ]
};
/* ^ * Мок для тестирования работоспособности action getCityOffers. (данные-исключение при выборе города Cologne) Позднее удалить */

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
    case City.COLOGNE: return MockValue.OFFERS_MOCK;
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
