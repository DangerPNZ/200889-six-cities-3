import React from 'react';
import renderer from 'react-test-renderer';
import {OfferCard} from './offer-card.jsx';

/* На вебинаре рекомендовалось использовать разные моки для теста компонентов.
Иначе, было бы разумнее импортировать один и тот же из utils */
const TestDataValue = {
  OFFER_NAME: `House with pool`
};

it(`OfferCard component structure test`, () => {
  const tree = renderer
  .create(
      <OfferCard
        offerName = {TestDataValue.OFFER_NAME}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
