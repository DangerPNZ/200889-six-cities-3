import React from 'react';
import PropTypes from 'prop-types';
import {ReviewsList} from '../reviews-list/reviews-list.jsx';
import {CompareDirection} from '../../utils/utils.js';
import {compareByDate} from '../../utils/utils.js';

const getSortedReviewsByDate = (reviews) => {
  return reviews.sort(compareByDate(`date`, CompareDirection.ASC));
};
const getReviews = (reviews) => getSortedReviewsByDate(reviews.slice()).slice(0, 10);

export class Reviews extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="property__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{this.props.offerCurrent.reviews.length}</span></h2>
        <ReviewsList
          reviews = {getReviews(this.props.offerCurrent.reviews).map((item) => ({
            id: this.props.offerCurrent.id,
            review: item.review,
            author: item.author,
            userRating: item.userRating,
            date: item.date
          }))}
        />
        <form className="reviews__form form" action="#" method="post">
          <label className="reviews__label form__label" htmlFor="review">Your review</label>
          <div className="reviews__rating-form form__rating">
            <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
            <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>

            <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
            <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>

            <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
            <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>

            <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
            <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>

            <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
            <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </div>
          <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
          <div className="reviews__button-wrapper">
            <p className="reviews__help">
              To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
            </p>
            <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
          </div>
        </form>
      </section>
    );
  }
}

Reviews.propTypes = {
  offerCurrent: PropTypes.exact({
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
  }).isRequired
};
