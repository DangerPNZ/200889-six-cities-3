import React from 'react';
import renderer from 'react-test-renderer';
import nanoid from 'nanoid';
import {OffersList} from './offers-list.jsx';

const TestDataValue = {
  OFFERS: [
    {
      name: `Canal View Prinsengracht`,
      coordinates: [],
      id: nanoid(),
      price: 100,
      type: `Hotel room`,
      premium: false,
      isFavorites: true,
      rating: 3.7,
      reviews: []
    },
    {
      name: `Nice, cozy, warm big bed apartment`,
      coordinates: [],
      id: nanoid(),
      price: 170,
      type: `Lux apartment`,
      premium: true,
      isFavorites: true,
      rating: 2.7,
      reviews: []
    }
  ]
};

it(`OffersList component structure test`, () => {
  const tree = renderer
  .create(
      <OffersList
        offers = {TestDataValue.OFFERS}
        onOfferHeadingClick = {() => {}}
        sortedOffers = {TestDataValue.OFFERS}
        onOfferMouseInteract = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
