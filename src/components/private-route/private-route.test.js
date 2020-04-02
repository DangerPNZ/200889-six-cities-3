import React from 'react';
import renderer from 'react-test-renderer';
import {PrivateRoute} from './private-route.jsx';
import {BrowserRouter} from 'react-router-dom';

const TestDataValue = {
  ELEMENT: <div></div>,
  PATH: `/component`,
  REDIRECT_PATH: `/redirect`
};

it(`PrivateRoute component structure test with pass access`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <PrivateRoute
          component = {TestDataValue.ELEMENT}
          path = {TestDataValue.PATH}
          redirectPath = {TestDataValue.REDIRECT_PATH}
          isPass = {true}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`PrivateRoute component structure test with pass denied`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <PrivateRoute
          component = {TestDataValue.ELEMENT}
          path = {TestDataValue.PATH}
          redirectPath = {TestDataValue.REDIRECT_PATH}
          isPass = {false}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

