import React from 'react';
import PropTypes from 'prop-types';
import {getStyleForRating} from '../../utils/utils.js';

const ReviewItemComponent = ({reviewItem}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={reviewItem.author.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">
        {reviewItem.author.name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={getStyleForRating(reviewItem.userRating)}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {reviewItem.review}
      </p>
      <time className="reviews__time" dateTime="2019-04-24">{reviewItem.date}</time>
    </div>
  </li>
);
export const ReviewItem = React.memo(ReviewItemComponent);

ReviewItemComponent.propTypes = {
  reviewItem: PropTypes.exact({
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
  }).isRequired
};
