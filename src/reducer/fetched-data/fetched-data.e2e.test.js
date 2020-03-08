import MockAdapter from 'axios-mock-adapter';
import {reducer, ActionType, Operation} from './fetched-data.js';
import {createApi} from '../../api/api.js';
import {DataAdapter} from '../../api/data-adapter.js';

const api = createApi();

const TestDataValue = {
  RAW_OFFERS: [
    {
      bedrooms: 3,
      city: {
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        },
        name: `Amsterdam`
      },
      description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
      goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
      host: {
        [`avatar_url`]: `img/1.png`,
        id: 3,
        [`is_pro`]: true,
        name: `Angelina`
      },
      id: 1,
      images: [`img/1.png`, `img/2.png`],
      [`is_favorite`]: false,
      [`is_premium`]: false,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      },
      [`max_adults`]: 4,
      [`preview_image`]: `img/1.png`,
      price: 120,
      rating: 4.8,
      title: `Beautiful & luxurious studio at great location`,
      type: `apartment`
    }
  ]
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    offers: []
  });
});

it(`Reducer should update offers by load offers`, () => {
  expect(reducer({
    offers: [],
  }, {
    type: ActionType.SET_OFFERS,
    payload: TestDataValue.OFFERS
  })).toEqual({
    offers: TestDataValue.OFFERS
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.getOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, TestDataValue.RAW_OFFERS);

    return questionLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_OFFERS,
          payload: DataAdapter.formatCityOffersInAppFormat(TestDataValue.RAW_OFFERS),
        });
      });
  });
});
