import React from 'react';
import {Main} from '../main/index.jsx';

export const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {offersAmount} = props;

  return (
    <React.Fragment>
      <Main
        offersAmount = {offersAmount}
      />
    </React.Fragment>
  );
};
