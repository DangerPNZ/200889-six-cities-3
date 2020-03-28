import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {SignIn} from './sign-in.jsx';

const TestDataValue = {
  SELECTED_CITY: `Paris`
};

it(`SignIn component structure test`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <SignIn
          selectedCity = {TestDataValue.SELECTED_CITY}
          onLogIn = {() => {}}
          onErrorClose = {() => {}}
          onError = {() => {}}
          onAuthorized = {() => {}}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
