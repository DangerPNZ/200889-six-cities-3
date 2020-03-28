import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Favorites} from './favorites.jsx';
import {AuthorizationStatus, CITIES_FAULT_TOLERANT} from '../../utils/constants.js';

const TestDataValue = {
  OFFERS: [
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
  USER_EMAIL: `user@mail.ru`
};

it(`Favorites component structure test with favorite offer`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <Favorites
          offers = {TestDataValue.OFFERS}
          userEmail = {TestDataValue.USER_EMAIL}
          onErrorClose = {() => {}}
          onFavoriteStatusToggle = {() => {}}
          authorizationStatus = {AuthorizationStatus.AUTHORIZED}
          cities = {CITIES_FAULT_TOLERANT}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Favorites component structure test with empty favorites list`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <Favorites
          offers = {[]}
          userEmail = {TestDataValue.USER_EMAIL}
          onErrorClose = {() => {}}
          onFavoriteStatusToggle = {() => {}}
          authorizationStatus = {AuthorizationStatus.AUTHORIZED}
          cities = {CITIES_FAULT_TOLERANT}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
