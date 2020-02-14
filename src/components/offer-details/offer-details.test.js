import React from 'react';
import renderer from 'react-test-renderer';
import {OfferDetails} from './offer-details.jsx';

const TestDataValue = {
  OFFER_NAME: `Party apartment`
};

it(`OfferCard component structure test`, () => {
  const tree = renderer
  .create(
      <OfferDetails
        offerName = {TestDataValue.OFFER_NAME}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
