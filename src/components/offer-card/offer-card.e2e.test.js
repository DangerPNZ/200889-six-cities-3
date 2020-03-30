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
  const onMouseEnter = jest.fn();
  const onStatusToggle = jest.fn();
  const card = shallow(
      <OfferCard
        offer = {TestDataValue.OFFER}
        onOfferMouseInteract = {onMouseEnter}
        renderMode = {CardRenderMode.MAIN}
        onFavoriteStatusToggle = {onStatusToggle}
        authorizationStatus = {AuthorizationStatus.AUTHORIZED}
      />
  );
  const statusToggleBtn = card.find(`.place-card__bookmark-button`);
  card.simulate(`mouseenter`);
  card.simulate(`mouseleave`);
  statusToggleBtn.simulate(`click`);
  expect(onMouseEnter.mock.calls[0][0]).toBe(TestDataValue.OFFER.id);
  expect(onMouseEnter.mock.calls[1][0]).toBe(null);
  expect(onMouseEnter.mock.calls.length).toBe(2);
  expect(onStatusToggle.mock.calls.length).toBe(1);
  expect(onStatusToggle.mock.calls[0][0]).toBe(TestDataValue.OFFER);
});

