import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Main} from './main.jsx';

const TestDataValue = {
  OFFERS_AMOUNT: `355`,
  OFFERS_NAMES: [
    `Room`,
    `Apartment`,
    `House`,
  ]
};

Enzume.configure({
  adapter: new Adapter()
});

it(`Main component e2e test`, () => {
  const headingsHandler = jest.fn();
  const main = shallow(
      <Main
        offersAmount = {TestDataValue.OFFERS_AMOUNT}
        offersNames = {TestDataValue.OFFERS_NAMES}
        headingsHandler = {headingsHandler}
        onUpdateAppState = {() => {}}
      />
  );
  const headingLvlOne = main.find(`h1`);
  const headingLvlSecond = main.find(`h2`);

  headingLvlOne.simulate(`click`);
  headingLvlSecond.simulate(`click`);

  expect(headingsHandler.mock.calls.length).toBe(2);
});
