import React from 'react';
import renderer from 'react-test-renderer';
import nanoid from 'nanoid';
import {App} from './app.jsx';

const REVIEWS_MOCK = [
  {
    author: `Mike`,
    review: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    userRating: 5,
    date: `April 2017`
  },
  {
    author: `Edward`,
    review: `A quiet cozy and picturesque that.`,
    userRating: 2,
    date: `January 2017`
  },
  {
    author: `Stephen`,
    review: `The building is green and from 18th century.`,
    userRating: 4,
    date: `April 2017`
  }
];
const TestDataValue = {
  OFFERS: [
    {
      name: `Canal`,
      coordinates: [52.3909553943508, 4.929309666406198],
      id: nanoid(),
      price: 110,
      type: `Room`,
      premium: false,
      isFavorites: true,
      rating: 4.2,
      reviews: REVIEWS_MOCK
    },
    {
      name: `Nice, warm big bed apartment`,
      coordinates: [52.3809553943508, 4.939309666406198],
      id: nanoid(),
      price: 177,
      type: `Lux apartment`,
      premium: true,
      isFavorites: false,
      rating: 2.2,
      reviews: REVIEWS_MOCK
    }
  ]
};

it(`App component structure test`, () => {
  const tree = renderer
  .create(
      <App
        offers = {TestDataValue.OFFERS}
        onOfferHeadingClick = {() => {}}
        selectedCity = {`Paris`}
        onCityTabClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
