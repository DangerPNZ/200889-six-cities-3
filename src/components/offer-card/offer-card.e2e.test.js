import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import nanoid from 'nanoid';
import {OfferCard} from './offer-card.jsx';

const TestDataValue = {
  OFFER: {
    name: ``,
    coordinates: [],
    id: nanoid(),
    price: 170,
    type: ``,
    premium: true,
    isFavorites: true,
    rating: 3.9,
    reviews: []
  }
};
const RENDER_MODE_TO_MAIN = `toMain`;

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
        renderMode = {RENDER_MODE_TO_MAIN}
      />
  );
  const cardHeading = card.find(`.place-card__name`);
  card.simulate(`mouseenter`);
  card.simulate(`mouseleave`);
  cardHeading.simulate(`click`);
  expect(handleMouseEnter.mock.calls[0][0]).toBe(TestDataValue.OFFER.id);
  expect(handleMouseEnter.mock.calls[1][0]).toBe(null);
  expect(handleMouseEnter.mock.calls.length).toBe(2);
  expect(handleHeadingHandler.mock.calls[0][0]).toBe(TestDataValue.OFFER);
  expect(handleHeadingHandler.mock.calls.length).toBe(1);
});

