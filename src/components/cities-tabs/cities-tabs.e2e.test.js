import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CitiesTabs} from './cities-tabs.jsx';
import {City} from '../../utils/utils.js';
import {getValuesListFromEnum} from '../../utils/utils.js';

Enzume.configure({
  adapter: new Adapter()
});

it(`CitiesTabs component e2e test`, () => {
  const onCityTabClick = jest.fn();
  const component = shallow(
      <CitiesTabs
        selectedCity = {City.PARIS}
        onCityTabClick = {onCityTabClick}
      />
  );
  const tabs = component.find(`.locations__item a`);
  const cities = getValuesListFromEnum(City);

  cities.forEach((item, index) => {
    tabs.at(index).simulate(`click`);
    expect(onCityTabClick.mock.calls[index][0]).toBe(item);
  });
  expect(onCityTabClick.mock.calls.length).toBe(cities.length);
});
