import React from 'react';
import renderer from 'react-test-renderer';
import {OffersSortOptions} from './offers-sort-options.jsx';
import {SortOption} from '../../utils/utils.js';

it(`CitiesTabs component structure test`, () => {
  const tree = renderer
  .create(
      <OffersSortOptions
        offersSortType = {SortOption.BY_PRICE_HIGHT_TO_LOW}
        onSortOptionClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
