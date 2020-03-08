import React from 'react';
import PropTypes from 'prop-types';
import {getStyleForRating} from '../../utils/utils.js';

const RenderMode = {
  TO_MAIN: `toMain`,
  TO_NEAR: `toNear`
};
const ElementType = {
  CONTAINER: `main container`,
  IMAGE_WRAPPER: `image wrapper`
};
const getCSSClassToElementByRenderMode = (renderMode, elementType) => {
  let cls = null;
  if (elementType === ElementType.CONTAINER) {
    switch (renderMode) {
      case RenderMode.TO_MAIN:
        cls = `cities__place-card place-card`;
        break;
      case RenderMode.TO_NEAR:
        cls = `near-places__card place-card`;
        break;
    }
  } else if (elementType === ElementType.IMAGE_WRAPPER) {
    switch (renderMode) {
      case RenderMode.TO_MAIN:
        cls = `cities__image-wrapper place-card__image-wrapper`;
        break;
      case RenderMode.TO_NEAR:
        cls = `near-places__image-wrapper place-card__image-wrapper`;
        break;
    }
  }
  return cls;
};
const OfferCardComponent = ({renderMode, offer, onOfferMouseInteract, onOfferHeadingClick}) => (
  <article
    className={getCSSClassToElementByRenderMode(renderMode, ElementType.CONTAINER)}
    onMouseEnter={
      () => {
        onOfferMouseInteract(offer.id);
      }
    }
    onMouseLeave={
      () => {
        onOfferMouseInteract(null);
      }
    }
  >
    {offer.premium && <div className="place-card__mark">
      <span>Premium</span>
    </div>
    }
    <div className={getCSSClassToElementByRenderMode(renderMode, ElementType.IMAGE_WRAPPER)}>
      <a href="#">
        <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={`place-card__bookmark-button button${offer.isFavorites ? ` place-card__bookmark-button--active` : ``}`} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={getStyleForRating(offer.rating)}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name"
        onClick={() => onOfferHeadingClick(offer)}
      >
        <a href="#">{offer.name}</a>
      </h2>
      <p className="place-card__type">{offer.type}</p>
    </div>
  </article>
);
export const OfferCard = React.memo(OfferCardComponent);

OfferCardComponent.propTypes = {
  offer: PropTypes.exact({
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
  }).isRequired,
  onOfferMouseInteract: PropTypes.func,
  onOfferHeadingClick: PropTypes.func,
  renderMode: PropTypes.string.isRequired
};
