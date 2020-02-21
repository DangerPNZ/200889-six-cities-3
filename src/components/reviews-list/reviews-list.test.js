import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewsList} from './reviews-list.jsx';

const TestDataValue = {
  REVIEWS: [
    {
      id: `_rt363f`,
      author: `Max`,
      review: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
    },
    {
      id: `_dsfd6f`,
      author: `Adelina`,
      review: `A quiet cozy and picturesque that.`
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
