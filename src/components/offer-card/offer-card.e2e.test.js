import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import nanoid from 'nanoid';
import {OfferCard} from './offer-card.jsx';

const TestDataValue = {
  OFFER: {
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
};

Enzume.configure({
  adapter: new Adapter()
});

it(`OfferCard component e2e test`, () => {
  const handleMouseEnter = jest.fn();
  const handleHeadingHandler = jest.fn();
  const card = shallow(
      <OfferCard
        offer = {TestDataValue.OFFER}
        onOfferMouseInteract = {handleMouseEnter}
        onOfferHeadingClick = {handleHeadingHandler}
      />
  );
  const cardHeading = card.find(`.place-card__name`);
  card.simulate(`mouseenter`);
  card.simulate(`mouseleave`);
  cardHeading.simulate(`click`);
  expect(handleMouseEnter.mock.calls[0][0]).toBe(TestDataValue.OFFER);
  expect(handleMouseEnter.mock.calls[1][0]).toBe(null);
  expect(handleMouseEnter.mock.calls.length).toBe(2);
  expect(handleHeadingHandler.mock.calls.length).toBe(1);
});

