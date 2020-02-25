import React from 'react';
import renderer from 'react-test-renderer';
import nanoid from 'nanoid';
import {Offers} from './offers.jsx';

const REVIEWS_MOCK = [
  {
    author: `Oliver`,
    review: `The most comfortable place`,
    userRating: 5,
    date: `May 2018`
  },
  {
    author: `James`,
    review: `Really liked`,
    userRating: 4,
    date: `January 2016`
  },
  {
    author: `Mia`,
    review: `I've been better`,
    userRating: 2,
    date: `February 2020`
  }
];
const TestDataValue = {
  OFFERS: [
    {
      name: `Apartment overlooking the river`,
      coordinates: [52.3909553943508, 4.929309666406198],
      id: nanoid(),
      price: 200,
      type: `Apartment`,
      premium: true,
      isFavorites: true,
      rating: 4.7,
      reviews: REVIEWS_MOCK
    },
    {
      name: `Room in the city center`,
      coordinates: [52.3809553943508, 4.939309666406198],
      id: nanoid(),
      price: 170,
      type: `Hotel room`,
      premium: true,
      isFavorites: false,
      rating: 4,
      reviews: REVIEWS_MOCK
    }
  ]
};

it(`Offers component structure test`, () => {
  const tree = renderer
  .create(
      <Offers
        offers = {TestDataValue.OFFERS}
        onOfferHeadingClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
