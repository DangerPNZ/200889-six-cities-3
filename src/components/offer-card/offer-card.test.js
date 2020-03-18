import React from 'react';
import renderer from 'react-test-renderer';
import {OfferCard} from './offer-card.jsx';
import {CardRenderMode} from '../../utils/utils.js';

const TestDataValue = {
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
    maxAdults: 1
  }
};

it(`OfferCard component structure test with MAIN render mode`, () => {
  const tree = renderer
  .create(
      <OfferCard
        offer = {TestDataValue.OFFER}
        onOfferMouseInteract = {() => {}}
        onOfferHeadingClick = {() => {}}
        renderMode = {CardRenderMode.MAIN}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`OfferCard component structure test with NEAR render mode`, () => {
  const tree = renderer
  .create(
      <OfferCard
        offer = {TestDataValue.OFFER}
        onOfferMouseInteract = {() => {}}
        onOfferHeadingClick = {() => {}}
        renderMode = {CardRenderMode.NEAR}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
