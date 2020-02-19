import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewsList} from './reviews-list.jsx';

const TestDataValue = {
  REVIEWS: [
    {},
    {},
    {}
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
