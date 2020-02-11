import React from 'react';
import PropTypes from 'prop-types';

const setStyleWidth = (widthValue = `80%`) => {
  return {
    width: widthValue
  };
};

export class OfferCard extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  handleMouseHover(value) {
    return () => {
      this.props.onUpdateState(value);
      return value;
    };
  }
  render() {
    return (
      <article className="cities__place-card place-card" onMouseEnter={this.handleMouseHover(this.props.offerName)} onMouseLeave={this.handleMouseHover()}>
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src="img/apartment-01.jpg" width="260" height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;120</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={setStyleWidth()}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{this.props.offerName}</a>
          </h2>
          <p className="place-card__type">Apartment</p>
        </div>
      </article>
    );
  }
}

OfferCard.propTypes = {
  offerName: PropTypes.string.isRequired,
  onUpdateState: PropTypes.func.isRequired
};
