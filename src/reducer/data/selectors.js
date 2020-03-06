import {createSelector} from 'reselect';
import {NameSpace} from '../name-space.js';
import {compare, CompareDirection} from '../../utils/utils.js';

const OfferKey = {
  PRICE: `price`,
  RATING: `rating`
};
const NAME_SPACE = NameSpace.DATA;

export const getOffers = (state) => state[NAME_SPACE].offers;

export const getOffersDefaultOrder = createSelector(
    getOffers,
    (offers) => offers.slice()
);
export const getOffersSortedByPriceDesk = createSelector(
    getOffers,
    (offers) => offers.sort(compare(OfferKey.PRICE, CompareDirection.DESC)).slice()
);
export const getOffersSortedByPriceAsk = createSelector(
    getOffers,
    (offers) => offers.sort(compare(OfferKey.PRICE, CompareDirection.ASC)).slice()
);
export const getOffersSortedByRatingDesk = createSelector(
    getOffers,
    (offers) => offers.sort(compare(OfferKey.RATING, CompareDirection.ASC)).slice()
);
