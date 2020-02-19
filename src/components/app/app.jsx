import React from 'react';
import PropTypes from 'prop-types';
import {Main} from '../main/main.jsx';
import {OfferDetails} from '../offer-details/offer-details.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOfferName: null
    };
    this.onOfferHeadingClick = this.onOfferHeadingClick.bind(this);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.getScreen()}
          </Route>
          <Route exact path="/offer">
            <OfferDetails
              offerName = {this.state.selectedOfferName}
              offerCoords = {this.props.offerCoords}
              reviews = {this.props.reviews}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
  getScreen() {
    if (this.state.selectedOfferName) {
      return <OfferDetails
        offerName = {this.state.selectedOfferName}
        offerCoords = {this.props.offerCoords}
        reviews = {this.props.reviews}
      />;
    }
    return <Main
      offersAmount = {this.props.offersAmount}
      offersNames = {this.props.offersNames}
      onOfferHeadingClick = {this.onOfferHeadingClick}
      offerCoords = {this.props.offerCoords}
    />;
  }
  onOfferHeadingClick(selectedOfferName) {
    /* передать null для возврата к главному экрану */
    this.setState({
      selectedOfferName
    });
  }
}

App.propTypes = {
  offersAmount: PropTypes.string.isRequired,
  offersNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  offerCoords: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number.isRequired)
  ).isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.object.isRequired
  ).isRequired
};
