import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewItem} from './review-item.jsx';

const TestDataValue = {
  REVIEW: {
    id: `_rt363f`,
    author: `Max`,
    review: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
  }
};

it(`ReviewItem component structure test`, () => {
  const tree = renderer
  .create(
      <ReviewItem
        reviewItem = {TestDataValue.REVIEW}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
