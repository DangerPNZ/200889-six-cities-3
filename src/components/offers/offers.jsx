import React from 'react';
import PropTypes from 'prop-types';
import {withBooleanToggle} from '../../hocs/with-boolean-toggle/with-boolean-toggle.jsx';
import {OffersSortOptions} from '../offers-sort-options/offers-sort-options.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import {Map} from '../map/map.jsx';

const OffersComponent = ({sortedOffers, offersSortType, onSortOptionClick, offerInMouseEnterId, selectedCity}) => {
  const SortOptionsWithVisibilityControl = withBooleanToggle(OffersSortOptions);
  return (<div className="cities">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortedOffers.length} places to stay in {selectedCity}</b>
        {
          <SortOptionsWithVisibilityControl
            offersSortType = {offersSortType}
            onSortOptionClick = {onSortOptionClick}
          />
        }
        <OffersList/>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            offers = {sortedOffers}
            selectedOfferId = {offerInMouseEnterId}
          />
        </section>
      </div>
    </div>
  </div>
  );
};

OffersComponent.propTypes = {
  sortedOffers: PropTypes.arrayOf(PropTypes.exact({
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

  offersSortType: PropTypes.string.isRequired,

  onSortOptionClick: PropTypes.func.isRequired,

  offerInMouseEnterId: PropTypes.number,

  selectedCity: PropTypes.string.isRequired
};

export const Offers = React.memo(OffersComponent);
