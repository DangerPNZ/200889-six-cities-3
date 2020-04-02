import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewsList} from './reviews-list.jsx';

const TestDataValue = {
  REVIEWS: [
    {
      review: `Good!`,
      userRating: 5,
      date: `May 2019`,
      commentId: 1,
      author: {
        avatarUrl: `./user.jpg`,
        id: 3,
        isPro: false,
        name: `Mike`
      }
    },
    {
      review: `Amazing`,
      userRating: 4.5,
      date: `June 2019`,
      commentId: 2,
      author: {
        avatarUrl: `./user.jpg`,
        id: 2,
        isPro: true,
        name: `Ed`
      }
    },
    {
      review: `Not bad`,
      userRating: 4,
      date: `May 2019`,
      commentId: 3,
      author: {
        avatarUrl: `./user.jpg`,
        id: 1,
        isPro: false,
        name: `Max`
      }
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
