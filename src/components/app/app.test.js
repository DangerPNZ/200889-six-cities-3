import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

const TestDataValue = {
  OFFERS_AMOUNT: `300`,
  OFFERS_NAMES: [
    `Сomfortable apartments`,
    `Luxury room`,
    `Royal mansion`,
  ]
};

it(`App component structure test`, () => {
  const tree = renderer
  .create(
      <App
        offersAmount = {TestDataValue.OFFERS_AMOUNT}
        offersNames = {TestDataValue.OFFERS_NAMES}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
