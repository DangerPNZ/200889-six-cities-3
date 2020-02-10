import React from 'react';
import PropTypes from 'prop-types';
import {Main} from '../main/main.jsx';

export const App = ({offersAmount, offersNames}) => {
  const HEADING_HANDLER = () => {};

  return (
    <React.Fragment>
      <Main
        offersAmount = {offersAmount}
        offersNames = {offersNames}
        headingsHandler = {HEADING_HANDLER}
      />
    </React.Fragment>
  );
};

App.propTypes = {
  offersAmount: PropTypes.string.isRequired,
  offersNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
