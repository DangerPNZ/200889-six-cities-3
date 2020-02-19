import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import {ReviewItem} from '../review-item/review-item.jsx';

export const ReviewsList = ({reviews}) => (
  <ul className="reviews__list">
    {
      reviews.map((review) => (<ReviewItem
        review = {review}
        key = {nanoid()}
      />))
    }
  </ul>
);

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.object.isRequired
  ).isRequired
};
