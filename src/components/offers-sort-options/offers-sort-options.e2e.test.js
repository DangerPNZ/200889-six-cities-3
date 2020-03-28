import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OffersSortOptions} from './offers-sort-options.jsx';
import {SortOption} from '../../utils/constants.js';

Enzume.configure({
  adapter: new Adapter()
});

it(`OffersSortOptions component e2e test`, () => {
  const onCurrentSortTypeValueClick = jest.fn();
  const onSortOptionClick = jest.fn();
  const component = shallow(
      <OffersSortOptions
        offersSortType = {SortOption.BY_PRICE_HIGHT_TO_LOW}
        onSortOptionClick = {onSortOptionClick}
        isVisible = {true}
        onToggleActive = {onCurrentSortTypeValueClick}
      />
  );
  const currentSortTypeValue = component.find(`.places__sorting-type`);
  const tabs = component.find(`.places__option`);
  const sortTypes = Object.values(SortOption);
  currentSortTypeValue.simulate(`click`);
  sortTypes.forEach((item, index) => {
    tabs.at(index).simulate(`click`);
    expect(onSortOptionClick.mock.calls[index][0]).toBe(item);
  });
  expect(onCurrentSortTypeValueClick.mock.calls.length).toBe(1);
  expect(onSortOptionClick.mock.calls.length).toBe(sortTypes.length);
});
