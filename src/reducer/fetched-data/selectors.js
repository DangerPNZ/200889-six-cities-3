import {createSelector} from 'reselect';
import {ReducerName} from '../reducer.js';
import {compare, CompareDirection, SortOption} from '../../utils/utils.js';

const OfferKey = {
  PRICE: `price`,
  RATING: `rating`
};
const REDUCER = ReducerName.FETCHED_DATA;
export const getOffers = (state) => state[REDUCER].offers;
const getSortType = (state) => state[ReducerName.CONTEXT].offersSortType;
const getSelectedCity = (state) => state[ReducerName.CONTEXT].selectedCity;

export const getOffersDefaultOrder = (offers, selectedCity) => offers
.slice()
.filter((item) => item.city.name === selectedCity);
export const getOffersSortedByPriceAsk = (offers, selectedCity) => offers
.slice()
.filter((item) => item.city.name === selectedCity)
.sort(compare(OfferKey.PRICE, CompareDirection.ASC));
export const getOffersSortedByPriceDesk = (offers, selectedCity) => offers
.slice()
.filter((item) => item.city.name === selectedCity)
.sort(compare(OfferKey.PRICE, CompareDirection.DESC));
export const getOffersSortedByRatingDesk = (offers, selectedCity) => offers
.slice()
.filter((item) => item.city.name === selectedCity)
.sort(compare(OfferKey.RATING, CompareDirection.DESC));
export const getSortedOffers = createSelector(
    [getSortType, getOffers, getSelectedCity],
    (sortType, offers, selectedCity) => {
      switch (sortType) {
        case SortOption.DEFAULT:
          return getOffersDefaultOrder(offers, selectedCity);
        case SortOption.BY_PRICE_LOW_TO_HIGHT:
          return getOffersSortedByPriceAsk(offers, selectedCity);
        case SortOption.BY_PRICE_HIGHT_TO_LOW:
          return getOffersSortedByPriceDesk(offers, selectedCity);
        case SortOption.BY_RATING_HIGHT_TO_LOW:
          return getOffersSortedByRatingDesk(offers, selectedCity);
      }
      return offers;
    }
);
