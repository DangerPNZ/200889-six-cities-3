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
      selectedOfferName: null
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
    if (this.state.selectedOfferName) {
      component = <OfferDetails
        offerName = {this.state.selectedOfferName}
      />;
    } else {
      component = <Main
        offersAmount = {this.props.offersAmount}
        offersNames = {this.props.offersNames}
        headingsHandler = {HEADING_HANDLER}
        onUpdateAppState = {this.onUpdateAppState}
      />;
    }
    return component;
  }
  onUpdateAppState(selectedOfferName) {
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
