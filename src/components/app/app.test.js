import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

/* На вебинаре рекомендовалось использовать разные моки для теста компонентов.
Иначе, было бы разумнее импортировать один и тот же из utils */
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
