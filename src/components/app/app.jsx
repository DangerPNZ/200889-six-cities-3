import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator as ContextActionCreator} from "../../reducer/context/context.js";
import {Main} from '../main/main.jsx';
import {OfferDetails} from '../offer-details/offer-details.jsx';
import {SignIn} from '../sign-in/sign-in.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Operation as DataOperation} from '../../reducer/fetched-data/fetched-data.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {getSortedOffers} from '../../reducer/fetched-data/selectors.js';
import {getSelectedCity, getCurrentOffer, getOffersSortType, getActiveOfferId, getErrorData} from '../../reducer/context/selectors.js';
import {getUserEmail, getAuthorizationStatus} from '../../reducer/user/selectors.js';

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.screen}
          </Route>
          <Route exact path="/offer">
            <OfferDetails
              offerCurrent = {this.props.selectedOffer}
              onOfferHeadingClick = {this.props.onOfferHeadingClick}
              authorizationStatus = {this.props.authorizationStatus}
              userEmail = {this.props.userEmail}
              errorData = {this.props.errorData}
              onErrorClose = {this.props.handleCloseError}
            />
          </Route>
          <Route exact path="/dev-auth">
            <SignIn
              selectedCity = {this.props.selectedCity}
              userEmail = {this.props.userEmail}
              onLogIn = {this.props.onLogIn}
              errorData = {this.props.errorData}
              onErrorClose = {this.props.handleCloseError}
              onError = {this.props.onError}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
  get screen() {
    if (this.props.selectedOffer) {
      return <OfferDetails
        offerCurrent = {this.props.selectedOffer}
        onOfferHeadingClick = {this.props.onOfferHeadingClick}
        authorizationStatus = {this.props.authorizationStatus}
        userEmail = {this.props.userEmail}
        errorData = {this.props.errorData}
        onErrorClose = {this.props.handleCloseError}
      />;
    }
    return <Main
      sortedOffers = {this.props.sortedOffers}
      selectedCity = {this.props.selectedCity}
      onCityTabClick = {this.props.onCityTabClick}
      offersSortType = {this.props.offersSortType}
      onSortOptionClick = {this.props.onSortOptionClick}
      offerInMouseEnterId = {this.props.offerInMouseEnterId}
      userEmail = {this.props.userEmail}
      errorData = {this.props.errorData}
      onErrorClose = {this.props.handleCloseError}
    />;
  }
}

App.propTypes = {
  selectedCity: PropTypes.string.isRequired,

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

  onOfferHeadingClick: PropTypes.func.isRequired,

  onCityTabClick: PropTypes.func.isRequired,

  offersSortType: PropTypes.string.isRequired,

  onSortOptionClick: PropTypes.func.isRequired,

  offerInMouseEnterId: PropTypes.number,

  onLogIn: PropTypes.func.isRequired,

  handleCloseError: PropTypes.func.isRequired,

  onError: PropTypes.func.isRequired,

  errorData: PropTypes.exact({
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};

const mapStateToProps = (state) => ({
  selectedCity: getSelectedCity(state),
  sortedOffers: getSortedOffers(state),
  selectedOffer: getCurrentOffer(state),
  offersSortType: getOffersSortType(state),
  offerInMouseEnterId: getActiveOfferId(state),
  userEmail: getUserEmail(state),
  authorizationStatus: getAuthorizationStatus(state),
  errorData: getErrorData(state)
});

const mapDispatchToProps = (dispatch) => ({
  onOfferHeadingClick(selectedOffer) {
    dispatch(DataOperation.getDataByDetalize(selectedOffer));
  },
  onCityTabClick(city) {
    dispatch(ContextActionCreator.changeCity(city));
  },
  onSortOptionClick(sortType) {
    dispatch(ContextActionCreator.changeOffersSortType(sortType));
  },
  onLogIn(logInData) {
    dispatch(UserOperation.logIn(logInData));
  },
  handleCloseError() {
    dispatch(ContextActionCreator.setErrorData(null));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
