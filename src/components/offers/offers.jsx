import React from 'react';
import PropTypes from 'prop-types';
import {OffersList} from '../offers-list/offers-list.jsx';
import {Map} from '../map/map.jsx';

export const Offers = ({offers, onOfferHeadingClick}) => (
  <div className="cities">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in Amsterdam</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex="0">
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex="0">Popular</li>
            <li className="places__option" tabIndex="0">Price: low to high</li>
            <li className="places__option" tabIndex="0">Price: high to low</li>
            <li className="places__option" tabIndex="0">Top rated first</li>
          </ul>

          {/* <select className="places__sorting-type" id="places-sorting">
            <option className="places__option" value="popular" selected="">Popular</option>
            <option className="places__option" value="to-high">Price: low to high</option>
            <option className="places__option" value="to-low">Price: high to low</option>
            <option className="places__option" value="top-rated">Top rated first</option>
          </select> */}

        </form>

        <OffersList
          offers = {offers}
          onOfferHeadingClick = {onOfferHeadingClick}
        />

      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            offers = {offers}
          />
        </section>
      </div>
    </div>
  </div>
);

Offers.propTypes = {
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
