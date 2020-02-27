import React from 'react';
import renderer from 'react-test-renderer';
import nanoid from 'nanoid';
import {OfferCard} from './offer-card.jsx';

const TestDataValue = {
  OFFER: {
    name: `Nice, cozy, warm big bed apartment`,
    coordinates: [],
    id: nanoid(),
    price: 145,
    type: `Lux apartment`,
    premium: true,
    isFavorites: true,
    rating: 3.5,
    reviews: [
      {
        author: `Hanna`,
        review: `Unique lightness of Amsterdam. The building is green and from 18th century.`,
        userRating: 1,
        date: `April 2017`
      },
      {
        author: `Bill`,
        review: `A quiet cozy and picturesque that.`,
        userRating: 0,
        date: `January 2018`
      },
      {
        author: `Ed`,
        review: `The building is green and from 18th century.`,
        userRating: 3,
        date: `September 2019`
      }
    ]
  }
};
const RENDER_MODE_TO_MAIN = `toMain`;

it(`OfferCard component structure test`, () => {
  const tree = renderer
  .create(
      <OfferCard
        offer = {TestDataValue.OFFER}
        onOfferMouseInteract = {() => {}}
        onOfferHeadingClick = {() => {}}
        renderMode = {RENDER_MODE_TO_MAIN}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
