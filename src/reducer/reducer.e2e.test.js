import {reducer, ActionCreator} from './reducer.js';
import {DataValue} from '../mocks/offers.js';
import {City} from '../utils/utils.js';
import {SortOption} from '../utils/utils.js';
import {CompareDirection} from '../utils/utils.js';
import {compare} from '../utils/utils.js';

const mockId = `_tse4436gf`;
it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    selectedCity: City.PARIS,
    currentOffer: null,
    offers: DataValue.OFFERS_MOCK,
    sortedOffers: DataValue.OFFERS_MOCK,
    offersSortType: SortOption.DEFAULT,
    offerInMouseEnterId: null
  });
});

describe(`Reducer actions tests`, () => {
  it(`Reducer change city`, () => {
    expect(reducer({
      selectedCity: City.PARIS,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK,
      sortedOffers: DataValue.OFFERS_MOCK,
      offersSortType: SortOption.DEFAULT,
      offerInMouseEnterId: null
    },
    ActionCreator.changeCity(City.COLOGNE)
    ))
    .toEqual({
      selectedCity: City.COLOGNE,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK,
      sortedOffers: DataValue.OFFERS_MOCK,
      offersSortType: SortOption.DEFAULT,
      offerInMouseEnterId: null
    });
  });
  it(`Reducer change getCityOffers`, () => {
    expect(reducer({
      selectedCity: City.COLOGNE,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK,
      sortedOffers: [],
      offersSortType: SortOption.DEFAULT,
      offerInMouseEnterId: null
    },
    ActionCreator.getCityOffers(City.COLOGNE)
    ))
    .toEqual({
      selectedCity: City.COLOGNE,
      currentOffer: null,
      offers: [],
      sortedOffers: [],
      offersSortType: SortOption.DEFAULT,
      offerInMouseEnterId: null
    });
  });
  it(`Reducer select offer`, () => {
    expect(reducer({
      city: City.COLOGNE,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK,
      sortedOffers: DataValue.OFFERS_MOCK,
      offersSortType: SortOption.DEFAULT,
      offerInMouseEnterId: null
    },
    ActionCreator.selectOffer(DataValue.OFFERS_MOCK[2])
    )).toEqual({
      city: City.COLOGNE,
      currentOffer: DataValue.OFFERS_MOCK[2],
      offers: DataValue.OFFERS_MOCK,
      sortedOffers: DataValue.OFFERS_MOCK,
      offersSortType: SortOption.DEFAULT,
      offerInMouseEnterId: null
    });
  });
  it(`Reducer change offersSortType`, () => {
    expect(reducer({
      city: City.COLOGNE,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK,
      sortedOffers: DataValue.OFFERS_MOCK,
      offersSortType: SortOption.DEFAULT,
      offerInMouseEnterId: null
    },
    ActionCreator.changeOffersSortType(SortOption.BY_PRICE_LOW_TO_HIGHT)
    )).toEqual({
      city: City.COLOGNE,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK,
      sortedOffers: DataValue.OFFERS_MOCK,
      offersSortType: SortOption.BY_PRICE_LOW_TO_HIGHT,
      offerInMouseEnterId: null
    });
  });
  it(`Reducer change offerInMouseEnterId`, () => {
    expect(reducer({
      city: City.COLOGNE,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK,
      sortedOffers: DataValue.OFFERS_MOCK,
      offersSortType: SortOption.BY_PRICE_LOW_TO_HIGHT,
      offerInMouseEnterId: null
    },
    ActionCreator.getOfferInMouseEnterId(mockId)
    )).toEqual({
      city: City.COLOGNE,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK,
      sortedOffers: DataValue.OFFERS_MOCK,
      offersSortType: SortOption.BY_PRICE_LOW_TO_HIGHT,
      offerInMouseEnterId: mockId
    });
  });
  it(`Reducer sort offers`, () => {
    expect(reducer({
      city: City.COLOGNE,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK,
      sortedOffers: DataValue.OFFERS_MOCK,
      offersSortType: SortOption.BY_PRICE_LOW_TO_HIGHT,
      offerInMouseEnterId: null
    },
    ActionCreator.sortOffers(SortOption.BY_PRICE_HIGHT_TO_LOW)
    )).toEqual({
      city: City.COLOGNE,
      currentOffer: null,
      offers: DataValue.OFFERS_MOCK,
      sortedOffers: DataValue.OFFERS_MOCK.sort(compare(`price`, CompareDirection.ASC)),
      offersSortType: SortOption.BY_PRICE_LOW_TO_HIGHT,
      offerInMouseEnterId: null
    });
  });
});

