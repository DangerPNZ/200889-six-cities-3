import React from 'react';
import PropTypes from 'prop-types';
import {CitiesTabs} from '../cities-tabs/cities-tabs.jsx';
import {Offers} from '../offers/offers.jsx';
import {OffersEmpty} from '../offers-empty/offers-empty.jsx';

export const Main = ({offers, onOfferHeadingClick, selectedCity, onCityTabClick, offersSortType, onSortOptionClick, offerInMouseEnterId, onOfferMouseInteract}) => (
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

    <main className={offers.length ? `page__main page__main--index` : `page__main page__main--index page__main--index-empty`}>
      <h1 className="visually-hidden">Cities</h1>
      <CitiesTabs
        selectedCity = {selectedCity}
        onCityTabClick = {onCityTabClick}
      />
      {offers.length !== 0 && <Offers
        offers = {offers}
        onOfferHeadingClick = {onOfferHeadingClick}
        offersSortType = {offersSortType}
        onSortOptionClick = {onSortOptionClick}
        offerInMouseEnterId = {offerInMouseEnterId}
        onOfferMouseInteract = {onOfferMouseInteract}
      />}
      {offers.length === 0 && <OffersEmpty
        selectedCity = {selectedCity}
      />}
    </main>
  </div>
);

Main.propTypes = {
  offers: PropTypes.array.isRequired,
  selectedCity: PropTypes.string.isRequired,
  onOfferHeadingClick: PropTypes.func.isRequired,
  onCityTabClick: PropTypes.func.isRequired,
  offersSortType: PropTypes.string.isRequired,
  onSortOptionClick: PropTypes.func.isRequired,
  offerInMouseEnterId: PropTypes.string,
  onOfferMouseInteract: PropTypes.func.isRequired
};
