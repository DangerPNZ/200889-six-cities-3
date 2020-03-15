import React from 'react';
import renderer from 'react-test-renderer';
import {SignIn} from './sign-in.jsx';

const TestDataValue = {
  SELECTED_CITY: `Paris`
};

it(`SignIn component structure test`, () => {
  const tree = renderer
  .create(
      <SignIn
        selectedCity = {TestDataValue.SELECTED_CITY}
        onLogIn = {() => {}}
        onErrorClose = {() => {}}
        onError = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
