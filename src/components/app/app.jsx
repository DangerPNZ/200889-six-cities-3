import React from 'react';
import PropTypes from 'prop-types';
import {Main} from '../main/main.jsx';
import {OfferDetails} from '../offer-details/offer-details.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const HEADING_HANDLER = () => {};
const URL_DETAILS_ENDPOINT = `/offer`;

export class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      path: `/`,
      selectedOfferName: ``
    };
    this.onUpdateAppState = this.onUpdateAppState.bind(this);
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
    switch (this.state.path) {
      case `/`:
        component = <Main
          offersAmount = {this.props.offersAmount}
          offersNames = {this.props.offersNames}
          headingsHandler = {HEADING_HANDLER}
          onUpdateAppState = {this.onUpdateAppState}
        />;
        break;
      case URL_DETAILS_ENDPOINT:
        component = <OfferDetails
          offerName = {this.state.selectedOfferName}
        />;
        break;
    }
    return component;
  }
  onUpdateAppState(selectedOfferName, path) {
    this.setState({
      selectedOfferName,
      path
    });
  }
}

App.propTypes = {
  offersAmount: PropTypes.string.isRequired,
  offersNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
