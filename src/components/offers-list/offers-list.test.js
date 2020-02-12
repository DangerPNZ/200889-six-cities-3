import React from 'react';
import renderer from 'react-test-renderer';
import {OffersList} from './offers-list.jsx';

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
        onUpdateAppState = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
