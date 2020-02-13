import React from 'react';
import PropTypes from 'prop-types';
import {Main} from '../main/main.jsx';
import {OfferDetails} from '../offer-details/offer-details.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOfferName: ``
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
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
  getScreen() {
    let component = null;
    if (this.state.selectedOfferName) {
      component = <OfferDetails
        offerName = {this.state.selectedOfferName}
      />;
    } else {
      component = <Main
        offersAmount = {this.props.offersAmount}
        offersNames = {this.props.offersNames}
        onOfferHeadingClick = {this.onOfferHeadingClick}
      />;
    }
    return component;
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
  offersNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
