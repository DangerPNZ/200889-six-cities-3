import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator as AppStateActionCreator} from "../../reducer/app-state/app-state.js";
import {Main} from '../main/main.jsx';
import {OfferDetails} from '../offer-details/offer-details.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {getSelectedCityOffers} from '../../utils/utils.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {getOffers} from '../../reducer/data/selectors.js';
import {getSelectedCity, getCurrentOffer, getOffersSortType, getActiveOfferId} from '../../reducer/app-state/selectors.js';

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
              offers = {this.props.offers}
              onOfferHeadingClick = {this.props.onOfferHeadingClick}
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
        offers = {this.props.offers}
        onOfferHeadingClick = {this.props.onOfferHeadingClick}
      />;
    }
    return <Main
      offers = {this.props.offers}
      selectedCity = {this.props.selectedCity}
      onCityTabClick = {this.props.onCityTabClick}
      offersSortType = {this.props.offersSortType}
      onSortOptionClick = {this.props.onSortOptionClick}
      offerInMouseEnterId = {this.props.offerInMouseEnterId}
    />;
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.exact({
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
  ).isRequired,
  onOfferHeadingClick: PropTypes.func.isRequired,
  onCityTabClick: PropTypes.func.isRequired,
  selectedOffer: PropTypes.exact({
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
  }),
  selectedCity: PropTypes.string.isRequired,
  offersSortType: PropTypes.string.isRequired,
  onSortOptionClick: PropTypes.func.isRequired,
  offerInMouseEnterId: PropTypes.string
};

const mapStateToProps = (state) => ({
  selectedCity: getSelectedCity(state),
  offers: getSelectedCityOffers(getOffers(state), getSelectedCity(state)),
  selectedOffer: getCurrentOffer(state),
  offersSortType: getOffersSortType(state),
  offerInMouseEnterId: getActiveOfferId(state)
});

const mapDispatchToProps = (dispatch) => ({
  onOfferHeadingClick(selectedOffer) {
    dispatch(DataOperation.getDataByDetalize(selectedOffer));
  },
  onCityTabClick(city) {
    dispatch(AppStateActionCreator.changeCity(city));
  },
  onSortOptionClick(sortType) {
    dispatch(AppStateActionCreator.changeOffersSortType(sortType));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
