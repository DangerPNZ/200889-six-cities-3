import React from 'react';
import PropTypes from 'prop-types';
import {Map} from '../map/map.jsx';
import {Reviews} from '../reviews/reviews.jsx';
import {NearPlacesList} from '../near-places-list/near-places-list.jsx';
import {getStyleForRating} from '../../utils/utils.js';

const getCitiesOffersForMap = (currentOffer) => [currentOffer, ...currentOffer.nearby];

export const OfferDetails = ({offerCurrent, onOfferHeadingClick}) => (
  <div className="page">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="main.html">
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

    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offerCurrent.images.map((item) => (
              <div className="property__image-wrapper" key={item.id}>
                <img className="property__image" src={item.url} alt="Photo studio"/>
              </div>
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {offerCurrent.premium && <div className="property__mark">
              <span>Premium</span>
            </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offerCurrent.name}
              </h1>
              <button className={offerCurrent.isFavorites ? `property__bookmark-button property__bookmark-button--active button` : `property__bookmark-button button`} type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={getStyleForRating(offerCurrent.rating)}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offerCurrent.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offerCurrent.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offerCurrent.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offerCurrent.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offerCurrent.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {
                  offerCurrent.goods.map((item) => (
                    <li className="property__inside-item" key={item.id}>{item.text}</li>
                  ))
                }
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={`property__avatar-wrapper user__avatar-wrapper${offerCurrent.host.isPro ? ` property__avatar-wrapper--pro` : ``}`}>
                  <img className="property__avatar user__avatar" src={offerCurrent.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {offerCurrent.host.name}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {offerCurrent.description}
                </p>
              </div>
            </div>
            <Reviews
              offerCurrent = {offerCurrent}
            />
          </div>
        </div>
        <section className="property__map map">
          <Map
            offers = {getCitiesOffersForMap(offerCurrent)}
            selectedOfferId = {offerCurrent.id}
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <NearPlacesList
            offers = {offerCurrent.nearby}
            onOfferHeadingClick = {onOfferHeadingClick}
            /* нужна ли нам тут функция подсветки пина предложения на карте?
              Из ТЗ: При наведении курсора на карточку предложения, маркер,
              соответствующий объявлению, становится оранжевым
              НО активный пункт уже есть
            */
            // onOfferMouseInteract = {() => {}}
          />
        </section>
      </div>
    </main>
  </div>
);

OfferDetails.propTypes = {
  offerCurrent: PropTypes.exact({
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
  }),
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
