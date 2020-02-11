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
  const card = shallow(
      <OfferCard
        offerName = {TestDataValue.OFFER_NAME}
        onUpdateState = {handleMouseEnter}
      />
  );
  card.simulate(`mouseenter`, handleMouseEnter);
  expect(handleMouseEnter.mock.calls[0][0]).toBe(TestDataValue.OFFER_NAME);
  expect(handleMouseEnter.mock.calls.length).toBe(1);
});

