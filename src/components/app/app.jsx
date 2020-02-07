import React from 'react';
import PropTypes from 'prop-types';
import {Main} from '../main/main.jsx';

export const App = (props) => {
  const {offersAmount} = props;
  const {offersNames} = props;

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
  offersAmount: PropTypes.string,
  offersNames: PropTypes.arrayOf(PropTypes.string)
};
