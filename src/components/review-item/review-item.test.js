import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewItem} from './review-item.jsx';

const TestDataValue = {
  REVIEW: {
    review: `Good!`,
    userRating: 5,
    date: `May 2019`,
    commentId: 1,
    author: {
      avatarUrl: `./user.jpg`,
      id: 3,
      isPro: true,
      name: `Mike`
    }
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
