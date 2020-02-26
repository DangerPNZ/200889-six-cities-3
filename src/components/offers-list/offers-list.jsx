import React from 'react';
import PropTypes from 'prop-types';
import {OfferCard} from '../offer-card/offer-card.jsx';
import {SortOption} from '../../utils/utils.js';
import {compare} from '../../utils/utils.js';

const RENDER_MODE_TO_MAIN = `toMain`;
const OfferKey = {
  PRICE: `price`,
  RATING: `rating`
};
const getOffersBySortType = (sortType, offers) => {
  switch (sortType) {
    case SortOption.DEFAULT: return offers;
    case SortOption.BY_PRICE_LOW_TO_HIGHT: return offers.sort(compare(OfferKey.PRICE)).reverse();
    case SortOption.BY_PRICE_HIGHT_TO_LOW: return offers.sort(compare(OfferKey.PRICE));
    case SortOption.BY_RATING_HIGHT_TO_LOW: return offers.sort(compare(OfferKey.RATING));
  }
  return offers;
};

export class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="cities__places-list places__list tabs__content">
        {
          getOffersBySortType(this.props.offersSortType, this.props.offers).map((offerItem) => <OfferCard
            offer = {offerItem}
            onOfferMouseInteract = {this.props.onOfferMouseInteract}
            onOfferHeadingClick = {this.props.onOfferHeadingClick}
            key = {offerItem.id}
            renderMode = {RENDER_MODE_TO_MAIN}
          />)
        }
      </div>
    );
  }
}

OffersList.propTypes = {
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
  offersSortType: PropTypes.string.isRequired,
  onOfferMouseInteract: PropTypes.func.isRequired
};
