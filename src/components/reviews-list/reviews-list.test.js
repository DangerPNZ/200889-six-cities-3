import React from 'react';
import renderer from 'react-test-renderer';
import nanoid from 'nanoid';
import {ReviewsList} from './reviews-list.jsx';

const TestDataValue = {
  REVIEWS: [
    {
      id: nanoid(),
      author: `Mike`,
      review: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      userRating: 5,
      date: `April 2017`
    },
    {
      id: nanoid(),
      author: `Edward`,
      review: `A quiet cozy and picturesque that.`,
      userRating: 2,
      date: `January 2017`
    },
    {
      id: nanoid(),
      author: `Stephen`,
      review: `The building is green and from 18th century.`,
      userRating: 4,
      date: `April 2017`
    }
  ]
};

it(`ReviewItem component structure test`, () => {
  const tree = renderer
  .create(
      <ReviewsList
        reviews = {TestDataValue.REVIEWS}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
