import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewItem} from './review-item.jsx';


it(`ReviewItem component structure test`, () => {
  const tree = renderer
  .create(
      <ReviewItem/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
