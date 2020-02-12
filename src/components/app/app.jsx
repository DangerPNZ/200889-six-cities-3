import React from 'react';
import PropTypes from 'prop-types';
import {Main} from '../main/main.jsx';
import {OfferDetails} from '../offer-details/offer-details.jsx';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const HEADING_HANDLER = () => {};

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
            {
              <React.Fragment>
                <Main
                  offersAmount = {this.props.offersAmount}
                  offersNames = {this.props.offersNames}
                  headingsHandler = {HEADING_HANDLER}
                  onUpdateAppState = {this.onUpdateAppState}
                />
              </React.Fragment>
            }
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
  onUpdateAppState(path, selectedOfferName) {
    this.setState({
      path,
      selectedOfferName
    }, () => {
      window.location = `${window.location.origin}${path}`;
    });
  }
}

App.propTypes = {
  offersAmount: PropTypes.string.isRequired,
  offersNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
