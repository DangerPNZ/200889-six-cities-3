import React from 'react';
import renderer from 'react-test-renderer';
import {Main} from './main.jsx';

const TestDataValue = {
  OFFERS_AMOUNT: `404`,
  OFFERS_NAMES: [
    `Сomfortable room`,
    `Hi-tech apartment`,
    `Country house`,
  ],
  COORDINATES: [
    [0, 0]
  ]
};

it(`Main component structure test`, () => {
  const tree = renderer
  .create(
      <Main
        offersAmount = {TestDataValue.OFFERS_AMOUNT}
        offersNames = {TestDataValue.OFFERS_NAMES}
        onOfferHeadingClick = {() => {}}
        offerCoords = {TestDataValue.COORDINATES}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
