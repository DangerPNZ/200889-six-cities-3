import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ReviewForm} from './review-form.jsx';

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
  REVIEW_DATA: {
    comment: `Lorem ipsum dolor sit amet, consectetur adipiscing`,
    rating: 4
  }
};

Enzume.configure({
  adapter: new Adapter()
});

it(`ReviewForm component e2e test`, () => {
  const onSend = jest.fn();
  const onInputChange = jest.fn();
  const onToggleActive = jest.fn();
  const reviewForm = shallow(
      <ReviewForm
        offerCurrent = {TestDataValue.OFFER}
        onInputChange = {onInputChange}
        onReviewSend = {onSend}
        notFilled = {false}
        reviewData = {TestDataValue.REVIEW_DATA}
        isActive = {false}
        onActiveToggle = {onToggleActive}
      />
  );
  const ratingRadioBtns = reviewForm.find(`.form__rating-input`);
  const reviewTextarea = reviewForm.find(`.reviews__textarea`);
  const event = {preventDefault: () => {}};
  ratingRadioBtns.at(0).simulate(`change`);
  reviewTextarea.simulate(`change`);
  expect(onInputChange.mock.calls.length).toBe(2);
  reviewForm.simulate(`submit`, event);
  expect(onSend.mock.calls.length).toBe(1);
  expect(onToggleActive.mock.calls.length).toBe(1);
  expect(onSend.mock.calls[0][0]).toBe(TestDataValue.OFFER);
  expect(onSend.mock.calls[0][1]).toBe(TestDataValue.REVIEW_DATA);
});
