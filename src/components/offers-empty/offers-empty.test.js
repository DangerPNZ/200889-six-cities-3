import React from 'react';
import renderer from 'react-test-renderer';
import {OffersEmpty} from './offers-empty.jsx';

const TestDataValue = {
  SELECTED_CITY: `Paris`
};

it(`Offers component structure test`, () => {
  const tree = renderer
  .create(
      <OffersEmpty
        selectedCity = {TestDataValue.SELECTED_CITY}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
