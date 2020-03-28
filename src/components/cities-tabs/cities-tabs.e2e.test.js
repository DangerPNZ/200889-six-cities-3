import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CitiesTabs} from './cities-tabs.jsx';
import {CITIES_FAULT_TOLERANT} from '../../utils/constants.js';

Enzume.configure({
  adapter: new Adapter()
});

it(`CitiesTabs component e2e test`, () => {
  const onCityTabClick = jest.fn();
  const component = shallow(
      <CitiesTabs
        selectedCity = {CITIES_FAULT_TOLERANT[0]}
        onCityTabClick = {onCityTabClick}
        cities = {CITIES_FAULT_TOLERANT}
      />
  );
  const tabs = component.find(`.locations__item a`);

  CITIES_FAULT_TOLERANT.forEach((item, index) => {
    tabs.at(index).simulate(`click`);
    expect(onCityTabClick.mock.calls[index][0]).toBe(item);
  });
  expect(onCityTabClick.mock.calls.length).toBe(CITIES_FAULT_TOLERANT.length);
});
