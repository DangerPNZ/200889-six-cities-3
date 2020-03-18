import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OfferCard} from './offer-card.jsx';
import {CardRenderMode} from '../../utils/utils.js';

const TestDataValue = {
  OFFER: {
    city: {
      name: ``,
      coordinates: [],
      mapZoom: 10
    },
    name: ``,
    description: ``,
    goods: [``],
    bedrooms: 3,
    host: {
      avatarUrl: ``,
      id: 5,
      isPro: true,
      name: ``
    },
    images: [``],
    previewImage: ``,
    location: {
      coordinates: [],
      zoom: 10
    },
    id: 1,
    price: 100,
    type: ``,
    premium: true,
    isFavorites: false,
    rating: 4,
    maxAdults: 1
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
        renderMode = {CardRenderMode.MAIN}
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

