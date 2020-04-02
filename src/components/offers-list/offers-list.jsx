import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {OfferCard} from '../offer-card/offer-card.jsx';
import {ActionCreator as ContextActionCreator} from "../../reducer/context/context.js";
import {Operation as DataOperation} from '../../reducer/fetched-data/fetched-data.js';
import {getSortedOffers} from '../../reducer/fetched-data/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {CardRenderMode} from '../../utils/constants.js';

const OffersListComponent = ({sortedOffers, onOfferMouseInteract, onFavoriteStatusToggle, authorizationStatus}) => (
  <div className="cities__places-list places__list tabs__content">
    {
      sortedOffers.map((offerItem) => <OfferCard
        offer = {offerItem}
        onOfferMouseInteract = {onOfferMouseInteract}
        key = {offerItem.id}
        renderMode = {CardRenderMode.MAIN}
        onFavoriteStatusToggle = {onFavoriteStatusToggle}
        authorizationStatus = {authorizationStatus}
      />)
    }
  </div>
);

const OffersList = React.memo(OffersListComponent);

OffersListComponent.propTypes = {
  sortedOffers: PropTypes.arrayOf(PropTypes.exact({
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
  }).isRequired).isRequired,

  onOfferMouseInteract: PropTypes.func.isRequired,

  onFavoriteStatusToggle: PropTypes.func.isRequired,

  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  sortedOffers: getSortedOffers(state),
  authorizationStatus: getAuthorizationStatus(state)
});
const mapDispatchToProps = (dispatch) => ({
  onOfferMouseInteract(id) {
    dispatch(ContextActionCreator.setOfferId(id));
  },
  onFavoriteStatusToggle(offer) {
    dispatch(DataOperation.changeFavoriteState(offer));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);
