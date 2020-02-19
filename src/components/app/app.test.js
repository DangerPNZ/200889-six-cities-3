import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

const TestDataValue = {
  OFFERS_AMOUNT: `300`,
  OFFERS_NAMES: [
    `Сomfortable apartments`,
    `Luxury room`,
    `Royal mansion`,
  ],
  COORDINATES: [
    [52.3909553943508, 4.85309666406198],
    [52.369553943508, 4.85309666406198],
    [52.3909553943508, 4.929309666406198],
    [52.3809553943508, 4.939309666406198]
  ],
  REVIEWS: [
    {},
    {},
    {}
  ]
};

it(`App component structure test`, () => {
  const tree = renderer
  .create(
      <App
        offersAmount = {TestDataValue.OFFERS_AMOUNT}
        offersNames = {TestDataValue.OFFERS_NAMES}
        offerCoords = {TestDataValue.COORDINATES}
        reviews = {TestDataValue.REVIEWS}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
