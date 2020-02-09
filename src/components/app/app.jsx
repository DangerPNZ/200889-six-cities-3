import React from 'react';
import PropTypes from 'prop-types';
import {Main} from '../main/main.jsx';

export const App = ({offersAmount, offersNames, headingsHandler}) => {

  return (
    <React.Fragment>
      <Main
        offersAmount = {offersAmount}
        offersNames = {offersNames}
        headingsHandler = {headingsHandler}
      />
    </React.Fragment>
  );
};

App.propTypes = {
  offersAmount: PropTypes.string.isRequired,
  offersNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  headingsHandler: PropTypes.func
};
