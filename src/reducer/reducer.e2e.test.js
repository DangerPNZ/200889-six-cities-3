import {reducer, ActionCreator} from './reducer.js';
import {DataValue} from '../mocks/offers.js';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    selectedCity: `Paris`,
    currentOffer: null,
    offers: DataValue.OFFERS_MOCK
  });
});

it(`Reducer change city`, () => {
  expect(reducer({
    selectedCity: `Paris`,
    currentOffer: null,
    offers: DataValue.OFFERS_MOCK
  },
  ActionCreator.changeCity(`Hamburg`)
  ))
  .toEqual({
    selectedCity: `Hamburg`,
    currentOffer: null,
    offers: DataValue.OFFERS_MOCK
  });
});

it(`Reducer select offer`, () => {
  expect(reducer({
    city: `Paris`,
    currentOffer: null,
    offers: DataValue.OFFERS_MOCK
  },
  ActionCreator.selectOffer(DataValue.OFFERS_MOCK[2])
  )).toEqual({
    city: `Paris`,
    currentOffer: DataValue.OFFERS_MOCK[2],
    offers: DataValue.OFFERS_MOCK
  });
});

/* Как возможно протестировать, что вернется правильное соответствие offers для выбранного города?
  Я могу придумать лишь вариант сделать ключ-значение в getCityOffers файла reducer.js
  (например TEST: `success`)
  Но соответствует-ли такой подход 'независимости кода от тестов'?
*/
