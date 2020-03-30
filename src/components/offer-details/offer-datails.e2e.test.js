import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OfferDetails} from './offer-details.jsx';
import {AuthorizationStatus} from '../../utils/constants.js';

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
  USER_EMAIL: `user@mail.ru`,
  OFFER_ID: 5
};

Enzume.configure({
  adapter: new Adapter()
});

it(`OfferCard component e2e test`, () => {
  const onStatusToggle = jest.fn();
  const tree = shallow(
      <OfferDetails
        offerCurrent = {TestDataValue.OFFER}
        authorizationStatus = {AuthorizationStatus.AUTHORIZED}
        onErrorClose = {() => {}}
        onReviewSend = {() => {}}
        onFavoriteStatusToggle = {onStatusToggle}
        userEmail = {TestDataValue.USER_EMAIL}
        allOffers = {TestDataValue.OFFERS}
        onOfferGetDetalizeInfo = {() => {}}
        offerId = {TestDataValue.OFFER_ID}
      />
  );
  const statusToggleBtn = tree.find(`.property__bookmark-button`);
  statusToggleBtn.simulate(`click`);
  expect(onStatusToggle.mock.calls.length).toBe(1);
  expect(onStatusToggle.mock.calls[0][0]).toBe(TestDataValue.OFFER);
  expect(onStatusToggle.mock.calls[0][1]).toBe(TestDataValue.OFFER.id);
});

