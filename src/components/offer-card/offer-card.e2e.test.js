import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {OfferCard} from './offer-card.jsx';

const TestDataValue = {
  OFFER_NAME: `Residence`
};

Enzume.configure({
  adapter: new Adapter()
});

it(`OfferCard component e2e test`, () => {
  const handleMouseEnter = jest.fn();
  const handleHeadingHandler = jest.fn();
  const card = shallow(
      <OfferCard
        offerName = {TestDataValue.OFFER_NAME}
        onUpdateOffersListState = {handleMouseEnter}
        onUpdateAppState = {handleHeadingHandler}
      />
  );
  const cardHeading = card.find(`.place-card__name`);
  card.simulate(`mouseenter`);
  card.simulate(`mouseleave`);
  cardHeading.simulate(`click`);
  expect(handleMouseEnter.mock.calls[0][0]).toBe(TestDataValue.OFFER_NAME);
  expect(handleMouseEnter.mock.calls[1][0]).toBe(null);
  expect(handleMouseEnter.mock.calls.length).toBe(2);
  expect(handleHeadingHandler.mock.calls.length).toBe(1);
});

