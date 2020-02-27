import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer.js";
import {Main} from '../main/main.jsx';
import {OfferDetails} from '../offer-details/offer-details.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

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
  selectedCity: state.selectedCity,
  offers: state.offers,
  selectedOffer: state.currentOffer,
  offersSortType: state.offersSortType,
  offerInMouseEnterId: state.offerInMouseEnterId
});

const mapDispatchToProps = (dispatch) => ({
  onOfferHeadingClick(selectedOffer) {
    /* передать null для возврата к главному экрану */
    dispatch(ActionCreator.selectOffer(selectedOffer));
  },
  onCityTabClick(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getCityOffers(city));
  },
  onSortOptionClick(sortType) {
    dispatch(ActionCreator.changeOffersSortType(sortType));
    dispatch(ActionCreator.sortOffers(sortType));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
