import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";
import {BrowserRouter} from 'react-router-dom';
import {Main} from './main.jsx';
import {Provider} from 'react-redux';
import {CITIES_FAULT_TOLERANT, SortOption, ReducerName, AuthorizationStatus} from '../../utils/constants.js';

const HAMBURG_INDEX_IN_FAULT_TOLERANT = 4;
const mockStore = configureStore([]);
const TestDataValue = {
  OFFERS: [
    {
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
      maxAdults: 1
    },
    {
      city: {
        name: `Hamburg`,
        coordinates: [45.4566, 54.355],
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
        coordinates: [45.4566, 54.355],
        zoom: 10
      },
      id: 2,
      price: 150,
      type: `room`,
      premium: false,
      isFavorites: true,
      rating: 4,
      maxAdults: 1
    }
  ],
  OFFERS_SORT_TYPE: `Price: low to high`,
  ERROR_DATA: {
    heading: `Test error. This heading`,
    description: `Test error. This discription.`
  },
  USER_EMAIL: `user@mail.ru`
};

it(`Main component structure test`, () => {
  const store = mockStore({
    [ReducerName.FETCHED_DATA]: {
      offers: TestDataValue.OFFERS,
    },
    [ReducerName.CONTEXT]: {
      offersSortType: SortOption.DEFAULT
    },
    [ReducerName.USER]: {
      authorizationStatus: AuthorizationStatus.AUTHORIZED
    }
  });
  const tree = renderer
  .create(
      <BrowserRouter>
        <Provider store = {store}>
          <Main
            selectedCity = {CITIES_FAULT_TOLERANT[HAMBURG_INDEX_IN_FAULT_TOLERANT]}
            offersSortType = {TestDataValue.OFFERS_SORT_TYPE}
            sortedOffers = {TestDataValue.OFFERS}
            onSortOptionClick = {() => {}}
            onCityTabClick = {() => {}}
            userEmail = {TestDataValue.USER_EMAIL}
            errorData = {TestDataValue.ERROR_DATA}
            onErrorClose = {() => {}}
            cities = {CITIES_FAULT_TOLERANT}
          />
        </Provider>
      </BrowserRouter>,
      {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
