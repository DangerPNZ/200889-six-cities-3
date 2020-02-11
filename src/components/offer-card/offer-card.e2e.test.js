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
  const handleMouseFocus = jest.fn((value) => value);
  const card = shallow(
      <OfferCard
        offerName = {TestDataValue.OFFER_NAME}
        onUpdateState = {handleMouseFocus}
      />
  );
  card.simulate(`mouseenter`, handleMouseFocus);
  expect(handleMouseFocus.mock.results[0].value).toBe(TestDataValue.OFFER_NAME);
  expect(handleMouseFocus.mock.calls.length).toBe(1);
});

