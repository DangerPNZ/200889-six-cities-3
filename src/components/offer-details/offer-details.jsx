import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import {Link} from 'react-router-dom';
import {Map} from '../map/map.jsx';
import {Reviews} from '../reviews/reviews.jsx';
import {NearPlacesList} from '../near-places-list/near-places-list.jsx';
import {ErrorMessage} from '../error-message/error-message.jsx';
import {Header} from '../header/header.jsx';
import {getStyleForRating} from '../../utils/utils.js';
import {AuthorizationStatus, PagePath} from '../../utils/constants.js';

const TYPE_ROOM = `room`;
const getCitiesOffersForMap = (currentOffer) => [currentOffer, ...currentOffer.nearbyOffers];
const formatCurrentOfferType = (offerType) => {
  return offerType === TYPE_ROOM ? `Private ${offerType[0].toUpperCase() + offerType.slice(1)}` : offerType[0].toUpperCase() + offerType.slice(1);
};

class OfferDetails extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.updateSelectedOfferData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.offerId !== prevProps.offerId) {
      this.updateSelectedOfferData();
    }
  }
  updateSelectedOfferData() {
    const offer = this.props.allOffers.find((item) => item.id === this.props.offerId);
    if (offer) {
      this.props.onOfferGetDetalizeInfo(offer);
    }
  }
  render() {
    return (
      this.props.offerCurrent !== null && <div className="page">
        {this.props.errorData && <ErrorMessage
          errorData = {this.props.errorData}
          onErrorClose = {this.props.onErrorClose}
        />}
        <Header
          userEmail = {this.props.userEmail}
        />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {this.props.offerCurrent.images.map((item) => (
                  <div className="property__image-wrapper" key={nanoid()}>
                    <img className="property__image" src={item} alt="Photo studio"/>
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {this.props.offerCurrent.premium && <div className="property__mark">
                  <span>Premium</span>
                </div>}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {this.props.offerCurrent.name}
                  </h1>
                  {
                    this.props.authorizationStatus === AuthorizationStatus.AUTHORIZED && <button className={this.props.offerCurrent.isFavorites ? `property__bookmark-button property__bookmark-button--active button` : `property__bookmark-button button`} onClick={() => this.props.onFavoriteStatusToggle(this.props.offerCurrent, this.props.offerCurrent.id)} type="button">
                      <svg className="property__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  }
                  {
                    this.props.authorizationStatus === AuthorizationStatus.NO_AUTH && <Link to={PagePath.LOGIN} className={this.props.offerCurrent.isFavorites ? `property__bookmark-button property__bookmark-button--active button` : `property__bookmark-button button`}>
                      <svg className="property__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </Link>
                  }
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={getStyleForRating(this.props.offerCurrent.rating)}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{this.props.offerCurrent.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {formatCurrentOfferType(this.props.offerCurrent.type)}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {this.props.offerCurrent.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {this.props.offerCurrent.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{this.props.offerCurrent.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {
                      this.props.offerCurrent.goods.map((item) => (
                        <li className="property__inside-item" key={nanoid()}>{item}</li>
                      ))
                    }
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper user__avatar-wrapper${this.props.offerCurrent.host.isPro ? ` property__avatar-wrapper--pro` : ``}`}>
                      <img className="property__avatar user__avatar" src={this.props.offerCurrent.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {this.props.offerCurrent.host.name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {this.props.offerCurrent.description}
                    </p>
                  </div>
                </div>
                <Reviews
                  offerCurrent = {this.props.offerCurrent}
                  authorizationStatus = {this.props.authorizationStatus}
                  onReviewSend = {this.props.onReviewSend}
                />
              </div>
            </div>
            <section className="property__map map">
              <Map
                offers = {getCitiesOffersForMap(this.props.offerCurrent)}
                selectedOfferId = {this.props.offerCurrent.id}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <NearPlacesList
                offers = {this.props.offerCurrent.nearbyOffers}
                onFavoriteStatusToggle = {this.props.onFavoriteStatusToggle}
                selectedOfferId = {this.props.offerCurrent.id}
                authorizationStatus = {this.props.authorizationStatus}
              />
            </section>
          </div>
        </main>
      </div>);
  }
}

OfferDetails.propTypes = {
  offerCurrent: PropTypes.exact({
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
    maxAdults: PropTypes.number.isRequired,
    reviews: PropTypes.arrayOf(PropTypes.exact({
      review: PropTypes.string.isRequired,
      userRating: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      commentId: PropTypes.number.isRequired,
      author: PropTypes.exact({
        avatarUrl: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isPro: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    })).isRequired,
    nearbyOffers: PropTypes.arrayOf(PropTypes.exact({
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
    }))
  }),

  userEmail: PropTypes.string,

  authorizationStatus: PropTypes.string.isRequired,

  onOfferGetDetalizeInfo: PropTypes.func.isRequired,

  errorData: PropTypes.exact({
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),

  onErrorClose: PropTypes.func.isRequired,

  onReviewSend: PropTypes.func.isRequired,

  onFavoriteStatusToggle: PropTypes.func.isRequired,

  offerId: PropTypes.number.isRequired,

  allOffers: PropTypes.arrayOf(PropTypes.exact({
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
  }).isRequired).isRequired
};

export {OfferDetails};
