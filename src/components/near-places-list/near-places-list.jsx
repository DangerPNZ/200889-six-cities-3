import React from 'react';
import PropTypes from 'prop-types';
import {OfferCard} from '../offer-card/offer-card.jsx';

const RENDER_MODE_TO_NEAR = `toNear`;
const NearPlacesListComponent = ({offers, onOfferHeadingClick}) => (
  <div className="near-places__list places__list">
    {
      offers.map((offerItem) => <OfferCard
        offer = {offerItem}
        onOfferMouseInteract = {() => {}}
        onOfferHeadingClick = {onOfferHeadingClick}
        key = {offerItem.id}
        renderMode = {RENDER_MODE_TO_NEAR}
      />)
    }
  </div>
);
export const NearPlacesList = React.memo(NearPlacesListComponent);

NearPlacesListComponent.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.exact({
    city: PropTypes.exact({
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      mapZoom: PropTypes.number.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    bedrooms: PropTypes.number.isRequired,
    host: PropTypes.exact({
      avatarUrl: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    previewImage: PropTypes.string.isRequired,
    location: PropTypes.exact({
      coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      zoom: PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    isFavorites: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired
  }).isRequired).isRequired,
  onOfferHeadingClick: PropTypes.func.isRequired,
  onOfferMouseInteract: PropTypes.func
};
