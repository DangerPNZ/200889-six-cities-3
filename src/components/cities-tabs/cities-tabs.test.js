import React from 'react';
import renderer from 'react-test-renderer';
import {CitiesTabs} from './cities-tabs.jsx';
import {City} from '../../utils/utils.js';

it(`CitiesTabs component structure test`, () => {
  const tree = renderer
  .create(
      <CitiesTabs
        selectedCity = {City.PARIS}
        onCityTabClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
