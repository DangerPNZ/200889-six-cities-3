import React from 'react';
import PropTypes from 'prop-types';
import {CitiesTabs} from '../cities-tabs/cities-tabs.jsx';
import {Offers} from '../offers/offers.jsx';
import {OffersEmpty} from '../offers-empty/offers-empty.jsx';
import {ErrorMessage} from '../error-message/error-message.jsx';
import {Header} from '../header/header.jsx';

const MainComponent = ({sortedOffers, selectedCity, onCityTabClick, offersSortType, onSortOptionClick, offerInMouseEnterId, userEmail, errorData, onErrorClose, cities}) => (
  <div className="page page--gray page--main">
    {errorData && <ErrorMessage
      errorData = {errorData}
      onErrorClose = {onErrorClose}
    />}
    <Header
      userEmail = {userEmail}
    />
    <main className={sortedOffers.length ? `page__main page__main--index` : `page__main page__main--index page__main--index-empty`}>
      <h1 className="visually-hidden">Cities</h1>
      <CitiesTabs
        selectedCity = {selectedCity}
        onCityTabClick = {onCityTabClick}
        cities = {cities}
      />
      {sortedOffers.length !== 0 && <Offers
        sortedOffers = {sortedOffers}
        offersSortType = {offersSortType}
        selectedCity = {selectedCity}
        onSortOptionClick = {onSortOptionClick}
        offerInMouseEnterId = {offerInMouseEnterId}
      />}
      {sortedOffers.length === 0 && <OffersEmpty
        selectedCity = {selectedCity}
      />}
    </main>
  </div>
);

MainComponent.propTypes = {
  selectedCity: PropTypes.string.isRequired,

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

  userEmail: PropTypes.string,

  onCityTabClick: PropTypes.func.isRequired,

  offersSortType: PropTypes.string.isRequired,

  onSortOptionClick: PropTypes.func.isRequired,

  offerInMouseEnterId: PropTypes.number,

  errorData: PropTypes.exact({
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),

  onErrorClose: PropTypes.func.isRequired,

  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export const Main = React.memo(MainComponent);
