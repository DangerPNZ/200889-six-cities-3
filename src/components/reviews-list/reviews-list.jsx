import React from 'react';
import PropTypes from 'prop-types';
import {ReviewItem} from '../review-item/review-item.jsx';

const ReviewsListComponent = ({reviews}) => (
  <ul className="reviews__list">
    {
      reviews.map((review) => (<ReviewItem
        reviewItem = {review}
        key = {review.commentId}
      />))
    }
  </ul>
);

ReviewsListComponent.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.exact({
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
      })
  ).isRequired
};

export const ReviewsList = React.memo(ReviewsListComponent);
