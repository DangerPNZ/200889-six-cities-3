import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {CitiesTabs} from './cities-tabs.jsx';


Enzume.configure({
  adapter: new Adapter()
});

it(`CitiesTabs component e2e test`, () => {
  const onCityTabClick = jest.fn();
  const component = shallow(
      <CitiesTabs
        selectedCity = {`Paris`}
        onCityTabClick = {onCityTabClick}
      />
  );
  const tabs = component.find(`.locations__item a`);
  const CITIES = [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusselgorf`];

  CITIES.forEach((item, index) => {
    tabs.at(index).simulate(`click`);
    expect(onCityTabClick.mock.calls[index][0]).toBe(item);
  });
  expect(onCityTabClick.mock.calls.length).toBe(CITIES.length);
});
