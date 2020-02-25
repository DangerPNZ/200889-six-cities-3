import React from 'react';
import renderer from 'react-test-renderer';
import {CitiesTabs} from './cities-tabs.jsx';

it(`CitiesTabs component structure test`, () => {
  const tree = renderer
  .create(
      <CitiesTabs
        selectedCity = {`Paris`}
        onCityTabClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
