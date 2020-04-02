import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({component, path, redirectPath, isPass}) => (
  <Route exact path={path}>
    {isPass ? component : <Redirect to={redirectPath}/>}
  </Route>
);

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
  redirectPath: PropTypes.string.isRequired,
  isPass: PropTypes.bool.isRequired
};

export {PrivateRoute};
