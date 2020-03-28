import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import {Link, Redirect} from 'react-router-dom';
import {ErrorMessage} from '../error-message/error-message.jsx';
import {Header} from '../header/header.jsx';
import {OfferCard} from '../offer-card/offer-card.jsx';
import {CardRenderMode, AuthorizationStatus, PagePath} from '../../utils/constants.js';

const ElementType = {
  MAIN_CONTAINER: `MAIN_CONTAINER`,
  MAIN: `MAIN`,
  FAVORITES: `FAVORITES`
};
const getCSSClassToElement = (offers, elementType) => {
  let cls = null;
  switch (elementType) {
    case ElementType.MAIN_CONTAINER:
      cls = `page${offers.length ? `` : ` page--favorites-empty`}`;
      break;
    case ElementType.MAIN:
      cls = `page__main page__main--favorites${offers.length ? `` : ` page__main--favorites-empty`}`;
      break;
    case ElementType.FAVORITES:
      cls = `favorites${offers.length ? `` : ` favorites--empty`}`;
      break;
  }
  return cls;
};
const getFavoritesByCities = (offers, cities) => {
  const offersByCity = [];
  cities.forEach((cityName) => {
    const cityOffers = offers.filter((item) => item.city.name === cityName);
    if (cityOffers.length) {
      offersByCity.push({
        city: cityName,
        offers: cityOffers
      });
    }
  });
  return offersByCity;
};

const FavoritesComponent = ({offers, userEmail, errorData, onErrorClose, onFavoriteStatusToggle, authorizationStatus, cities}) => {
  if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
    return <Redirect to={PagePath.LOGIN}/>;
  }
  return (
    <div className={getCSSClassToElement(offers, ElementType.MAIN_CONTAINER)}>
      {errorData && <ErrorMessage
        errorData = {errorData}
        onErrorClose = {onErrorClose}
      />}
      <Header
        userEmail = {userEmail}
      />
      <main className={getCSSClassToElement(offers, ElementType.MAIN)}>
        <div className="page__favorites-container container">
          <section className={getCSSClassToElement(offers, ElementType.FAVORITES)}>
            {offers.length !== 0 &&
            <React.Fragment>
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  getFavoritesByCities(offers, cities).map((item) => (<li className="favorites__locations-items" key={nanoid()}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{item.city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {
                        item.offers.map((offerItem) => <OfferCard
                          offer = {offerItem}
                          onOfferMouseInteract = {() => {}}
                          key = {offerItem.id}
                          renderMode = {CardRenderMode.FAVORITE}
                          onFavoriteStatusToggle = {onFavoriteStatusToggle}
                          authorizationStatus = {authorizationStatus}
                        />)
                      }
                    </div>
                  </li>))
                }
              </ul>
            </React.Fragment>
            }

            {offers.length === 0 &&
            <React.Fragment>
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
              </div>
            </React.Fragment>
            }

          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to={PagePath.MAIN} className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};

FavoritesComponent.propTypes = {
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

  userEmail: PropTypes.string,

  errorData: PropTypes.exact({
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),

  onErrorClose: PropTypes.func.isRequired,

  onFavoriteStatusToggle: PropTypes.func.isRequired,

  authorizationStatus: PropTypes.string.isRequired,

  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export const Favorites = React.memo(FavoritesComponent);
