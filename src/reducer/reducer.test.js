import {reducer, ActionType, ActionCreator} from './reducer.js';
import {DataValue} from '../mocks/offers.js';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    city: `Amsterdam`,
    currentOffer: null,
    offers: DataValue.OFFERS_MOCK
  });
});

it(`Reducer change city`, () => {
  expect(reducer({
    city: `Amsterdam`,
    currentOffer: null,
    offers: DataValue.OFFERS_MOCK
  },
  ActionCreator.changeCity(`Hamburg`)
  ))
  .toEqual({
    city: `Hamburg`,
    currentOffer: null,
    offers: DataValue.OFFERS_MOCK
  });
});

it(`Reducer select offer`, () => {
  expect(reducer({
    city: `Amsterdam`,
    currentOffer: null,
    offers: DataValue.OFFERS_MOCK
  },
  ActionCreator.selectOffer(DataValue.OFFERS_MOCK[2])
  )).toEqual({
    city: `Amsterdam`,
    currentOffer: DataValue.OFFERS_MOCK[2],
    offers: DataValue.OFFERS_MOCK
  });
});
