import React from 'react';
import PropTypes from 'prop-types';
import {OfferCard} from '../offer-card/offer-card.jsx';

const RENDER_MODE_TO_NEAR = `toNear`;

export class NearPlacesList extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="near-places__list places__list">
        {
          this.props.offers.map((offerItem) => <OfferCard
            offer = {offerItem}
            onOfferMouseInteract = {this.onOfferMouseInteract}
            onOfferHeadingClick = {this.props.onOfferHeadingClick}
            key = {offerItem.id}
            renderMode = {RENDER_MODE_TO_NEAR}
          />)
        }
      </div>
    );
  }
}

NearPlacesList.propTypes = {
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
  onOfferHeadingClick: PropTypes.func.isRequired
};
