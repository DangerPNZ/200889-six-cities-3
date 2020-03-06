import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator as AppStateActionCreator} from "../../reducer/app-state/app-state.js";
import {OfferCard} from '../offer-card/offer-card.jsx';
import {SortOption, CompareDirection, compare, getSelectedCityOffers} from '../../utils/utils.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {getOffers} from '../../reducer/data/selectors.js';
import {getSelectedCity, getOffersSortType} from '../../reducer/app-state/selectors.js';

const RENDER_MODE_TO_MAIN = `toMain`;
const OfferKey = {
  PRICE: `price`,
  RATING: `rating`
};
const getSortedOffers = (sortType, offers) => {
  switch (sortType) {
    case SortOption.DEFAULT: return offers.slice();
    case SortOption.BY_PRICE_LOW_TO_HIGHT: return offers.sort(compare(OfferKey.PRICE, CompareDirection.DESC)).slice();
    case SortOption.BY_PRICE_HIGHT_TO_LOW: return offers.sort(compare(OfferKey.PRICE, CompareDirection.ASC)).slice();
    case SortOption.BY_RATING_HIGHT_TO_LOW: return offers.sort(compare(OfferKey.RATING, CompareDirection.ASC)).slice();
  }
  return offers.slice();
};
const OffersListComponent = ({sortedOffers, onOfferMouseInteract, onOfferHeadingClick}) => (
  <div className="cities__places-list places__list tabs__content">
    {
      sortedOffers.map((offerItem) => <OfferCard
        offer = {offerItem}
        onOfferMouseInteract = {onOfferMouseInteract}
        onOfferHeadingClick = {onOfferHeadingClick}
        key = {offerItem.id}
        renderMode = {RENDER_MODE_TO_MAIN}
      />)
    }
  </div>
);
export const OffersList = React.memo(OffersListComponent);

OffersListComponent.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired,
        id: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        premium: PropTypes.bool.isRequired,
        isFavorites: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        reviews: PropTypes.arrayOf(
            PropTypes.exact({
              author: PropTypes.string.isRequired,
              review: PropTypes.string.isRequired,
              userRating: PropTypes.number.isRequired,
              date: PropTypes.string.isRequired
            }).isRequired
        ).isRequired
      }).isRequired
  ).isRequired,
  onOfferHeadingClick: PropTypes.func.isRequired,
  onOfferMouseInteract: PropTypes.func.isRequired,
  sortedOffers: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  offers: getSelectedCityOffers(getOffers(state), getSelectedCity(state)),
  sortedOffers: getSortedOffers(getOffersSortType(state), getSelectedCityOffers(getOffers(state), getSelectedCity(state))),
});
const mapDispatchToProps = (dispatch) => ({
  onOfferHeadingClick(selectedOffer) {
    dispatch(DataOperation.getDataByDetalize(selectedOffer));
  },
  onOfferMouseInteract(id) {
    dispatch(AppStateActionCreator.setOfferId(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
