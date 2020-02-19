import React from 'react';
import renderer from 'react-test-renderer';
import {OfferDetails} from './offer-details.jsx';

const TestDataValue = {
  OFFER_NAME: `Party apartment`,
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

it(`OfferCard component structure test`, () => {
  const tree = renderer
  .create(
      <OfferDetails
        offerName = {TestDataValue.OFFER_NAME}
        offerCoords = {TestDataValue.COORDINATES}
        reviews = {TestDataValue.REVIEWS}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
