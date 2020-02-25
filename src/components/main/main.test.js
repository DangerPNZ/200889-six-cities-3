import React from 'react';
import renderer from 'react-test-renderer';
import nanoid from 'nanoid';
import {Main} from './main.jsx';

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
      name: `Prinsengracht`,
      coordinates: [52.3909553943508, 4.929309666406198],
      id: nanoid(),
      price: 74,
      type: `Hotel`,
      premium: true,
      isFavorites: true,
      rating: 4.7,
      reviews: REVIEWS_MOCK
    },
    {
      name: `Nice apartment`,
      coordinates: [52.3809553943508, 4.939309666406198],
      id: nanoid(),
      price: 90,
      type: `Apartment`,
      premium: false,
      isFavorites: true,
      rating: 4.7,
      reviews: REVIEWS_MOCK
    }
  ]
};

it(`Main component structure test`, () => {
  const tree = renderer
  .create(
      <Main
        offers = {TestDataValue.OFFERS}
        onOfferHeadingClick = {() => {}}
        selectedCity = {`Cologne`}
        onCityTabClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
