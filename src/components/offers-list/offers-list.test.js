import React from 'react';
import renderer from 'react-test-renderer';
import nanoid from 'nanoid';
import {OffersList} from './offers-list.jsx';

const REVIEWS_MOCK = [
  {
    author: `Hanna`,
    review: `Unique lightness of Amsterdam. The building is green and from 18th century.`,
    userRating: 1,
    date: `April 2017`
  },
  {
    author: `Bill`,
    review: `A quiet cozy and picturesque that.`,
    userRating: 0,
    date: `January 2018`
  },
  {
    author: `Ed`,
    review: `The building is green and from 18th century.`,
    userRating: 3,
    date: `September 2019`
  }
];
const TestDataValue = {
  OFFERS: [
    {
      name: `Canal View Prinsengracht`,
      coordinates: [52.3909553943508, 4.929309666406198],
      id: nanoid(),
      price: 100,
      type: `Hotel room`,
      premium: false,
      isFavorites: true,
      rating: 3.7,
      reviews: REVIEWS_MOCK
    },
    {
      name: `Nice, cozy, warm big bed apartment`,
      coordinates: [52.3809553943508, 4.939309666406198],
      id: nanoid(),
      price: 170,
      type: `Lux apartment`,
      premium: true,
      isFavorites: true,
      rating: 2.7,
      reviews: REVIEWS_MOCK
    }
  ]
};
const OFFERS_SORT_TYPE = `Price: low to high`;

it(`OffersList component structure test`, () => {
  const tree = renderer
  .create(
      <OffersList
        offers = {TestDataValue.OFFERS}
        onOfferHeadingClick = {() => {}}
        offersSortType = {OFFERS_SORT_TYPE}
        onOfferMouseInteract = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
