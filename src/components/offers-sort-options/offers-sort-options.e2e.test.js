import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OffersSortOptions} from './offers-sort-options.jsx';
import {SortOption} from '../../utils/utils.js';
import {getValuesListFromEnum} from '../../utils/utils.js';

Enzume.configure({
  adapter: new Adapter()
});

it(`OffersSortOptions component e2e test`, () => {
  const onSortOptionClick = jest.fn();
  const component = shallow(
      <OffersSortOptions
        offersSortType = {SortOption.BY_PRICE_HIGHT_TO_LOW}
        onSortOptionClick = {onSortOptionClick}
      />
  );
  const tabs = component.find(`.places__option`);
  const sortTypes = getValuesListFromEnum(SortOption);

  sortTypes.forEach((item, index) => {
    tabs.at(index).simulate(`click`);
    expect(onSortOptionClick.mock.calls[index][0]).toBe(item);
  });
  expect(onSortOptionClick.mock.calls.length).toBe(sortTypes.length);
});
