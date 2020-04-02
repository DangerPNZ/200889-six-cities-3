import React from 'react';
import PropTypes from 'prop-types';
import {ReviewsList} from '../reviews-list/reviews-list.jsx';
import {ReviewForm} from '../review-form/review-form.jsx';
import {withFormValidation} from '../../hocs/with-form-validation/with-form-validation.jsx';
import {withBooleanToggle} from '../../hocs/with-boolean-toggle/with-boolean-toggle.jsx';
import {AuthorizationStatus} from '../../utils/constants.js';

const ReviewsComponent = ({offerCurrent, authorizationStatus, onReviewSend}) => {
  const ReviewFormWithValidation = withFormValidation(ReviewForm);
  const ReviewFormWithStateControl = withBooleanToggle(ReviewFormWithValidation);
  return (<section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{offerCurrent.reviews.length}</span></h2>
    <ReviewsList
      reviews = {offerCurrent.reviews}
    />
    {
      authorizationStatus === AuthorizationStatus.AUTHORIZED &&
      <ReviewFormWithStateControl
        offerCurrent = {offerCurrent}
        onReviewSend = {onReviewSend}
      />
    }
  </section>);
};

ReviewsComponent.propTypes = {
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
    })).isRequired
  }),

  authorizationStatus: PropTypes.string.isRequired,

  onReviewSend: PropTypes.func.isRequired
};

export const Reviews = React.memo(ReviewsComponent);
