import React from 'react';
import PropTypes from 'prop-types';
import {CitiesTabs} from '../cities-tabs/cities-tabs.jsx';
import {Offers} from '../offers/offers.jsx';
import {OffersEmpty} from '../offers-empty/offers-empty.jsx';

const MainComponent = ({sortedOffers, selectedCity, onCityTabClick, offersSortType, onSortOptionClick, offerInMouseEnterId}) => (
  <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className={sortedOffers.length ? `page__main page__main--index` : `page__main page__main--index page__main--index-empty`}>
      <h1 className="visually-hidden">Cities</h1>
      <CitiesTabs
        selectedCity = {selectedCity}
        onCityTabClick = {onCityTabClick}
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
export const Main = React.memo(MainComponent);

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

  onCityTabClick: PropTypes.func.isRequired,

  offersSortType: PropTypes.string.isRequired,

  onSortOptionClick: PropTypes.func.isRequired,

  offerInMouseEnterId: PropTypes.number
};
