import React from 'react';
import Enzume, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ErrorMessage} from './error-message.jsx';

Enzume.configure({
  adapter: new Adapter()
});

const TestDataValue = {
  ERROR_DATA: {
    heading: `Test error. This heading`,
    description: `Test error. This discription.`
  }
};

it(`ErrorMessage component e2e test`, () => {
  const onClose = jest.fn();
  const component = shallow(
      <ErrorMessage
        errorData = {TestDataValue.ERROR_DATA}
        onErrorClose = {onClose}
      />
  );
  const closeBtn = component.find(`.error-message__close-btn`);
  closeBtn.simulate(`click`);
  expect(onClose.mock.calls.length).toBe(1);
});
