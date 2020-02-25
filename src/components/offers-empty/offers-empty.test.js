import React from 'react';
import renderer from 'react-test-renderer';
import {OffersEmpty} from './offers-empty.jsx';

const SELECTED_CITY = `New York`;

it(`Offers component structure test`, () => {
  const tree = renderer
  .create(
      <OffersEmpty
        selectedCity = {SELECTED_CITY}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
