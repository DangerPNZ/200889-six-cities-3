import React from 'react';
import renderer from 'react-test-renderer';
import {ErrorMessage} from './error-message.jsx';

const TestDataValue = {
  ERROR_DATA: {
    heading: `Test error. This heading`,
    description: `Test error. This discription.`
  }
};

it(`ErrorMessage component structure test`, () => {
  const tree = renderer
  .create(
      <ErrorMessage
        errorData = {TestDataValue.ERROR_DATA}
        onErrorClose = {() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
