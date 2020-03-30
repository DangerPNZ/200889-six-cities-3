import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ActionCreator as ContextActionCreator} from "../../reducer/context/context.js";
import {Main} from '../main/main.jsx';
import {OfferDetails} from '../offer-details/offer-details.jsx';
import {SignIn} from '../sign-in/sign-in.jsx';
import {Favorites} from '../favorites/favorites.jsx';
import {Operation as DataOperation} from '../../reducer/fetched-data/fetched-data.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {getOffers, getSortedOffers, getFavorites, getCities} from '../../reducer/fetched-data/selectors.js';
import {getSelectedCity, getCurrentOffer, getOffersSortType, getActiveOfferId, getErrorData} from '../../reducer/context/selectors.js';
import {getUserEmail, getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {PagePath, AuthorizationStatus} from '../../utils/constants.js';
import {PrivateRoute} from '../private-route/private-route.jsx';

const AppComponent = ({
  onReviewSend,
  sortedOffers,
  selectedCity,
  onCityTabClick,
  offersSortType,
  onSortOptionClick,
  offerInMouseEnterId,
  userEmail,
  errorData,
  onErrorClose,
  onFavoriteStatusToggle,
  selectedOffer,
  onOfferGetDetalizeInfo,
  authorizationStatus,
  onLogIn,
  onAuthorized,
  onError,
  favorites,
  allOffers,
  cities
}) => (
  <BrowserRouter>
    <Switch>
      <Route exact path={PagePath.MAIN} render={() => (
        <Main
          sortedOffers = {sortedOffers}
          selectedCity = {selectedCity}
          onCityTabClick = {onCityTabClick}
          offersSortType = {offersSortType}
          onSortOptionClick = {onSortOptionClick}
          offerInMouseEnterId = {offerInMouseEnterId}
          userEmail = {userEmail}
          errorData = {errorData}
          onErrorClose = {onErrorClose}
          onFavoriteStatusToggle = {onFavoriteStatusToggle}
          cities = {cities}
        />
      )}/>
      <Route exact path={`${PagePath.OFFER}:id`} render={(props) => (
        <OfferDetails
          offerCurrent = {selectedOffer}
          onOfferGetDetalizeInfo = {onOfferGetDetalizeInfo}
          authorizationStatus = {authorizationStatus}
          userEmail = {userEmail}
          errorData = {errorData}
          onErrorClose = {onErrorClose}
          onReviewSend = {onReviewSend}
          onFavoriteStatusToggle = {onFavoriteStatusToggle}
          offerId = {Number(props.match.params.id)}
          allOffers = {allOffers}
        />
      )}/>
      <PrivateRoute
        component = {<SignIn
          selectedCity = {selectedCity}
          userEmail = {userEmail}
          onLogIn = {onLogIn}
          onAuthorized = {onAuthorized}
          errorData = {errorData}
          onErrorClose = {onErrorClose}
          onError = {onError}
        />}
        path = {PagePath.LOGIN}
        redirectPath = {PagePath.MAIN}
        isPass = {(authorizationStatus === AuthorizationStatus.NO_AUTH)}
      />
      <PrivateRoute
        component = {<Favorites
          offers = {favorites}
          userEmail = {userEmail}
          errorData = {errorData}
          onErrorClose = {onErrorClose}
          onFavoriteStatusToggle = {onFavoriteStatusToggle}
          authorizationStatus = {authorizationStatus}
          cities = {cities}
        />}
        path = {PagePath.FAVORITES}
        redirectPath = {PagePath.LOGIN}
        isPass = {(authorizationStatus === AuthorizationStatus.AUTHORIZED)}
      />
    </Switch>
  </BrowserRouter>
);

const App = React.memo(AppComponent);

AppComponent.propTypes = {
  selectedCity: PropTypes.string.isRequired,

  favorites: PropTypes.arrayOf(PropTypes.exact({
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
  }).isRequired).isRequired,

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

  selectedOffer: PropTypes.exact({
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
    nearby: PropTypes.arrayOf(PropTypes.exact({
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

  userEmail: PropTypes.string,

  authorizationStatus: PropTypes.string.isRequired,

  onOfferGetDetalizeInfo: PropTypes.func.isRequired,

  onCityTabClick: PropTypes.func.isRequired,

  offersSortType: PropTypes.string.isRequired,

  onSortOptionClick: PropTypes.func.isRequired,

  offerInMouseEnterId: PropTypes.number,

  onLogIn: PropTypes.func.isRequired,

  onErrorClose: PropTypes.func.isRequired,

  onError: PropTypes.func.isRequired,

  errorData: PropTypes.exact({
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),

  onReviewSend: PropTypes.func.isRequired,

  onAuthorized: PropTypes.func.isRequired,

  onFavoriteStatusToggle: PropTypes.func.isRequired,

  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,

  match: PropTypes.object
};

const mapStateToProps = (state) => ({
  selectedCity: getSelectedCity(state),
  allOffers: getOffers(state),
  sortedOffers: getSortedOffers(state),
  selectedOffer: getCurrentOffer(state),
  offersSortType: getOffersSortType(state),
  offerInMouseEnterId: getActiveOfferId(state),
  userEmail: getUserEmail(state),
  authorizationStatus: getAuthorizationStatus(state),
  errorData: getErrorData(state),
  favorites: getFavorites(state),
  cities: getCities(state)
});

const mapDispatchToProps = (dispatch) => ({
  onOfferGetDetalizeInfo(selectedOffer) {
    dispatch(DataOperation.getDataByDetalize(selectedOffer));
  },
  onCityTabClick(city) {
    dispatch(ContextActionCreator.changeCity(city));
  },
  onSortOptionClick(sortType) {
    dispatch(ContextActionCreator.changeOffersSortType(sortType));
  },
  onLogIn(logInData, onAuthorized) {
    dispatch(UserOperation.logIn(logInData, onAuthorized));
  },
  onErrorClose() {
    dispatch(ContextActionCreator.setErrorData(null));
  },
  onReviewSend(offer, reviewData, onFail) {
    dispatch(DataOperation.sendReview(offer, reviewData, onFail));
  },
  onFavoriteStatusToggle(offer, selectedOfferId = null) {
    return dispatch(DataOperation.changeFavoriteState(offer, selectedOfferId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
