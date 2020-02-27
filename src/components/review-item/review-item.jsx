import React from 'react';
import PropTypes from 'prop-types';
import {getStyleForRating} from '../../utils/utils.js';

const ReviewItemComponent = ({reviewItem}) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">
        {reviewItem.author}
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
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    userRating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired
};
