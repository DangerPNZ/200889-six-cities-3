import React from 'react';
import PropTypes from 'prop-types';
import {OfferCard} from '../offer-card/offer-card.jsx';
import {CardRenderMode} from '../../utils/constants.js';

const NearPlacesListComponent = ({offers, onFavoriteStatusToggle, selectedOfferId, authorizationStatus}) => (
  <div className="near-places__list places__list">
    {
      offers.map((offerItem) => <OfferCard
        offer = {offerItem}
        onOfferMouseInteract = {() => {}}
        key = {offerItem.id}
        renderMode = {CardRenderMode.NEAR}
        onFavoriteStatusToggle = {onFavoriteStatusToggle}
        selectedOfferId = {selectedOfferId}
        authorizationStatus = {authorizationStatus}
      />)
    }
  </div>
);

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

  onOfferMouseInteract: PropTypes.func,

  onFavoriteStatusToggle: PropTypes.func.isRequired,

  selectedOfferId: PropTypes.number.isRequired,

  authorizationStatus: PropTypes.string.isRequired
};

export const NearPlacesList = React.memo(NearPlacesListComponent);
