import React from 'react';
import renderer from 'react-test-renderer';
import {OffersList} from './offers-list.jsx';

/* На вебинаре рекомендовалось использовать разные моки для теста компонентов.
Иначе, было бы разумнее импортировать один и тот же из utils */
const TestDataValue = {
  OFFERS_NAMES: [
    `Family apartments`,
    `Personal room`,
    `Country mansion`,
  ]
};

it(`OffersList component structure test`, () => {
  const tree = renderer
  .create(
      <OffersList
        offersNames = {TestDataValue.OFFERS_NAMES}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
