import React from 'react';
import renderer from 'react-test-renderer';
import nanoid from 'nanoid';
import {Reviews} from './reviews.jsx';

const TestDataValue = {
  REVIEW: {
    name: `Prinsengracht`,
    coordinates: [],
    id: nanoid(),
    price: 74,
    type: `Motel`,
    premium: true,
    isFavorites: true,
    rating: 4.9,
    reviews: [
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
    ]
  }
};

it(`ReviewItem component structure test`, () => {
  const tree = renderer
  .create(
      <Reviews
        offerCurrent = {TestDataValue.REVIEW}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
