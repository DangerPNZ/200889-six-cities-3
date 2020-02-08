import React from 'react';
import PropTypes from 'prop-types';
import {Main} from '../main/main.jsx';

export const App = ({offersAmount, offersNames}) => {

  return (
    <React.Fragment>
      <Main
        offersAmount = {offersAmount}
        offersNames = {offersNames}
      />
    </React.Fragment>
  );
};

App.propTypes = {
  offersAmount: PropTypes.string.isRequired,
  offersNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
