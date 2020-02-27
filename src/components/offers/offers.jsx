import React from 'react';
import PropTypes from 'prop-types';
import {OffersSortOptions} from '../offers-sort-options/offers-sort-options.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import {Map} from '../map/map.jsx';

const OffersComponent = ({offers, offersSortType, onSortOptionClick, offerInMouseEnterId, selectedCity}) => (
  <div className="cities">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {selectedCity}</b>
        <OffersSortOptions
          offersSortType = {offersSortType}
          onSortOptionClick = {onSortOptionClick}
        />
        <OffersList/>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            offers = {offers}
            selectedOfferId = {offerInMouseEnterId}
          />
        </section>
      </div>
    </div>
  </div>
);
export const Offers = React.memo(OffersComponent);

OffersComponent.propTypes = {
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
  offersSortType: PropTypes.string.isRequired,
  onSortOptionClick: PropTypes.func.isRequired,
  offerInMouseEnterId: PropTypes.string,
  selectedCity: PropTypes.string.isRequired
};
