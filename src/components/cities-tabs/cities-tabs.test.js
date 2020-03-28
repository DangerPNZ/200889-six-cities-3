import React from 'react';
import renderer from 'react-test-renderer';
import {CitiesTabs} from './cities-tabs.jsx';
import {CITIES_FAULT_TOLERANT} from '../../utils/constants.js';

it(`CitiesTabs component structure test`, () => {
  const tree = renderer
  .create(
      <CitiesTabs
        selectedCity = {CITIES_FAULT_TOLERANT[0]}
        onCityTabClick = {() => {}}
        cities = {CITIES_FAULT_TOLERANT}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
