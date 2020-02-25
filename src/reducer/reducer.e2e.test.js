import {reducer, ActionCreator} from './reducer.js';
import {DataValue} from '../mocks/offers.js';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    selectedCity: `Paris`,
    currentOffer: null,
    offers: DataValue.OFFERS_MOCK
  });
});

describe(`Reducer actions tests`, () => {
  it(`Reducer change city`, () => {
    expect(reducer({
      selectedCity: `Paris`,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK
    },
    ActionCreator.changeCity(`Cologne`)
    ))
    .toEqual({
      selectedCity: `Cologne`,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK
    });
  });
  it(`Reducer change getCityOffers`, () => {
    expect(reducer({
      selectedCity: `Paris`,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK
    },
    ActionCreator.getCityOffers(`Cologne`)
    ))
    .toEqual({
      selectedCity: `Paris`,
      currentOffer: null,
      offers: []
    });
  });
  it(`Reducer select offer`, () => {
    expect(reducer({
      city: `Cologne`,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK
    },
    ActionCreator.selectOffer(DataValue.OFFERS_MOCK[2])
    )).toEqual({
      city: `Cologne`,
      currentOffer: DataValue.OFFERS_MOCK[2],
      offers: DataValue.OFFERS_MOCK
    });
  });
});

/* Как возможно протестировать, что вернется правильное соответствие offers для выбранного города?
  Я могу придумать лишь вариант сделать ключ-значение в getCityOffers файла reducer.js
  (например TEST: `success`)
  Но соответствует-ли такой подход 'независимости кода от тестов'?
*/
