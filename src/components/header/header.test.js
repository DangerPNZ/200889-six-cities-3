import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Header} from './header.jsx';

const TestDataValue = {
  USER_EMAIL: `user@mail.ru`
};

it(`Header component structure test with user name`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <Header
          userEmail = {TestDataValue.USER_EMAIL}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Header component structure test with unauthorized user`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <Header/>
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
