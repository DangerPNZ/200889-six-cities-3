import React from 'react';
import renderer from 'react-test-renderer';
import {OfferCard} from './offer-card.jsx';

const TestDataValue = {
  OFFER_NAME: `House with pool`
};

it(`OfferCard component structure test`, () => {
  const tree = renderer
  .create(
      <OfferCard
        offerName = {TestDataValue.OFFER_NAME}
        onOfferMouseInteract = {() => {}}
        onOfferHeadingClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
