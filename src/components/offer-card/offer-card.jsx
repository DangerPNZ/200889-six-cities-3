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
const getCSSClass = (renderMode, elementType) => {
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
export class OfferCard extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <article
        className={getCSSClass(this.props.renderMode, ElementType.CONTAINER)}
        onMouseEnter={
          () => {
            this.props.onOfferMouseInteract(this.props.offer);
          }
        }
        onMouseLeave={
          () => {
            this.props.onOfferMouseInteract(null);
          }
        }
      >
        {this.props.offer.premium && <div className="place-card__mark">
          <span>Premium</span>
        </div>
        }
        <div className={getCSSClass(this.props.renderMode, ElementType.IMAGE_WRAPPER)}>
          <a href="#">
            <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{this.props.offer.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className={this.props.offer.isFavorites ? `place-card__bookmark-button place-card__bookmark-button--active button` : `place-card__bookmark-button button`} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={getStyleForRating(this.props.offer.rating)}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name"
            onClick={() => this.props.onOfferHeadingClick(this.props.offer)}
          >
            <a href="#">{this.props.offer.name}</a>
          </h2>
          <p className="place-card__type">{this.props.offer.type}</p>
        </div>
      </article>
    );
  }
}

OfferCard.propTypes = {
  offer: PropTypes.exact({
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
  }).isRequired,
  onOfferMouseInteract: PropTypes.func,
  onOfferHeadingClick: PropTypes.func,
  renderMode: PropTypes.string.isRequired
};
