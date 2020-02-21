import React from 'react';
import renderer from 'react-test-renderer';
import nanoid from 'nanoid';
import {OffersList} from './offers-list.jsx';

const TestDataValue = {
  OFFERS: [
    {
      name: `Canal View Prinsengracht`,
      coordinates: [52.3909553943508, 4.929309666406198],
      id: nanoid(),
      price: 100,
      type: `Hotel room`,
      premium: false,
      isFavorites: true,
      reviews: [
        {
          author: `Max`,
          review: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
        },
        {
          author: `Adelina`,
          review: `A quiet cozy and picturesque that.`
        },
        {
          author: `Stephen`,
          review: `The building is green and from 18th century.`
        }
      ]
    },
    {
      name: `Nice, cozy, warm big bed apartment`,
      coordinates: [52.3809553943508, 4.939309666406198],
      id: nanoid(),
      price: 170,
      type: `Lux apartment`,
      premium: true,
      isFavorites: true,
      reviews: [
        {
          author: `Max`,
          review: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`
        },
        {
          author: `Adelina`,
          review: `A quiet cozy and picturesque that.`
        },
        {
          author: `Stephen`,
          review: `The building is green and from 18th century.`
        }
      ]
    }
  ]
};

it(`OffersList component structure test`, () => {
  const tree = renderer
  .create(
      <OffersList
        offers = {TestDataValue.OFFERS}
        onOfferHeadingClick = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
