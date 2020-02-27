import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import {ReviewItem} from '../review-item/review-item.jsx';

const ReviewsListComponent = ({reviews}) => (
  <ul className="reviews__list">
    {
      reviews.map((review) => (<ReviewItem
        reviewItem = {review}
        key = {nanoid()}
      />))
    }
  </ul>
);
export const ReviewsList = React.memo(ReviewsListComponent);

ReviewsListComponent.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        review: PropTypes.string.isRequired,
        userRating: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired
      }).isRequired
  ).isRequired
};
