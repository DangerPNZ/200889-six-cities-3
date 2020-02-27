import React from 'react';
import renderer from 'react-test-renderer';
import nanoid from 'nanoid';
import {OfferDetails} from './offer-details.jsx';

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
      coordinates: [],
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
      coordinates: [],
      id: nanoid(),
      price: 170,
      type: `Lux apartment`,
      premium: true,
      isFavorites: true,
      rating: 2.7,
      reviews: []
    }
  ]
};

it(`OfferCard component structure test`, () => {
  const tree = renderer
  .create(
      <OfferDetails
        offerCurrent = {TestDataValue.OFFERS[0]}
        offers = {TestDataValue.OFFERS}
        onOfferHeadingClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
