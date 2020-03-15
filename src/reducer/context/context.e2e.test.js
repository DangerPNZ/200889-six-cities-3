import {reducer, ActionCreator} from './context.js';
import {City, SortOption} from '../../utils/utils.js';

const TestDataValue = {
  OFFER: {
    city: {
      name: `Hamburg`,
      coordinates: [45.4566, 54.355],
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
      coordinates: [45.4566, 54.355],
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
  MOCK_ID: 23,
  ERROR_DATA: {
    heading: `Test error. This heading`,
    description: `Test error. This discription.`
  }
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    selectedCity: City.PARIS,
    currentOffer: null,
    offersSortType: SortOption.DEFAULT,
    activeOfferId: null,
    errorData: null
  });
});

describe(`Reducer actions tests`, () => {
  it(`Reducer change city`, () => {
    expect(reducer({
      selectedCity: City.PARIS,
      currentOffer: null,
      offersSortType: SortOption.DEFAULT,
      activeOfferId: null,
      errorData: null
    },
    ActionCreator.changeCity(City.COLOGNE)
    ))
    .toEqual({
      selectedCity: City.COLOGNE,
      currentOffer: null,
      offersSortType: SortOption.DEFAULT,
      activeOfferId: null,
      errorData: null
    });
  });

  it(`Reducer select offer`, () => {
    expect(reducer({
      selectedCity: City.COLOGNE,
      currentOffer: null,
      offersSortType: SortOption.DEFAULT,
      activeOfferId: null,
      errorData: null
    },
    ActionCreator.setCurrentOffer(TestDataValue.OFFER)
    )).toEqual({
      selectedCity: City.COLOGNE,
      currentOffer: TestDataValue.OFFER,
      offersSortType: SortOption.DEFAULT,
      activeOfferId: null,
      errorData: null
    });
  });

  it(`Reducer change offersSortType`, () => {
    expect(reducer({
      selectedCity: City.COLOGNE,
      currentOffer: TestDataValue.OFFER,
      offersSortType: SortOption.DEFAULT,
      activeOfferId: null,
      errorData: null
    },
    ActionCreator.changeOffersSortType(SortOption.BY_PRICE_LOW_TO_HIGHT)
    )).toEqual({
      selectedCity: City.COLOGNE,
      currentOffer: TestDataValue.OFFER,
      offersSortType: SortOption.BY_PRICE_LOW_TO_HIGHT,
      activeOfferId: null,
      errorData: null
    });
  });

  it(`Reducer change setOfferId`, () => {
    expect(reducer({
      selectedCity: City.COLOGNE,
      currentOffer: TestDataValue.OFFER,
      offersSortType: SortOption.BY_PRICE_LOW_TO_HIGHT,
      activeOfferId: null,
      errorData: null
    },
    ActionCreator.setOfferId(TestDataValue.MOCK_ID)
    )).toEqual({
      selectedCity: City.COLOGNE,
      currentOffer: TestDataValue.OFFER,
      offersSortType: SortOption.BY_PRICE_LOW_TO_HIGHT,
      activeOfferId: TestDataValue.MOCK_ID,
      errorData: null
    });
  });

  it(`Reducer change setOfferId`, () => {
    expect(reducer({
      selectedCity: City.COLOGNE,
      currentOffer: TestDataValue.OFFER,
      offersSortType: SortOption.BY_PRICE_LOW_TO_HIGHT,
      activeOfferId: TestDataValue.MOCK_ID,
      errorData: null
    },
    ActionCreator.setErrorData(TestDataValue.ERROR_DATA)
    )).toEqual({
      selectedCity: City.COLOGNE,
      currentOffer: TestDataValue.OFFER,
      offersSortType: SortOption.BY_PRICE_LOW_TO_HIGHT,
      activeOfferId: TestDataValue.MOCK_ID,
      errorData: TestDataValue.ERROR_DATA
    });
  });
});

