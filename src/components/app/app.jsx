import React from 'react';
import PropTypes from 'prop-types';
import {Main} from '../main/main.jsx';
import {OfferDetails} from '../offer-details/offer-details.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOffer: null
    };
    this.onOfferHeadingClick = this.onOfferHeadingClick.bind(this);
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
              offerCurrent = {this.state.selectedOffer}
              offers = {this.props.offers}
              onOfferHeadingClick = {this.onOfferHeadingClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
  get screen() {
    if (this.state.selectedOffer) {
      return <OfferDetails
        offerCurrent = {this.state.selectedOffer}
        offers = {this.props.offers}
        onOfferHeadingClick = {this.onOfferHeadingClick}
      />;
    }
    return <Main
      offers = {this.props.offers}
      onOfferHeadingClick = {this.onOfferHeadingClick}
    />;
  }
  onOfferHeadingClick(selectedOffer) {
    /* передать null для возврата к главному экрану */
    this.setState({
      selectedOffer
    });
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
  ).isRequired
};
