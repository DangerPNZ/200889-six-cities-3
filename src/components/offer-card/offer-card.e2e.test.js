import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OfferCard} from './offer-card.jsx';
import {CardRenderMode, AuthorizationStatus} from '../../utils/constants.js';

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
  const handleStatusToggle = jest.fn();
  const card = shallow(
      <OfferCard
        offer = {TestDataValue.OFFER}
        onOfferMouseInteract = {handleMouseEnter}
        renderMode = {CardRenderMode.MAIN}
        onFavoriteStatusToggle = {handleStatusToggle}
        authorizationStatus = {AuthorizationStatus.AUTHORIZED}
      />
  );
  const statusToggleBtn = card.find(`.place-card__bookmark-button`);
  card.simulate(`mouseenter`);
  card.simulate(`mouseleave`);
  statusToggleBtn.simulate(`click`);
  expect(handleMouseEnter.mock.calls[0][0]).toBe(TestDataValue.OFFER.id);
  expect(handleMouseEnter.mock.calls[1][0]).toBe(null);
  expect(handleMouseEnter.mock.calls.length).toBe(2);
  expect(handleStatusToggle.mock.calls.length).toBe(1);
  expect(handleStatusToggle.mock.calls[0][0]).toBe(TestDataValue.OFFER);
});

