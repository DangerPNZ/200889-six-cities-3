import React from 'react';
import renderer from 'react-test-renderer';
import {Map} from './map.jsx';

it(`Map component structure test`, () => {
  const tree = renderer
  .create(
      <Map
        offers = {[]}
      />,
      {
        createNodeMock: () => document.createElement(`div`)
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
