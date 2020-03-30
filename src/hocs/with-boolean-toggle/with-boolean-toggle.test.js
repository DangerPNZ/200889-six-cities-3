import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import {withBooleanToggle} from './with-boolean-toggle.jsx';

const TestComponent = ({isActive, onActiveToggle}) => (
  <div>
    {isActive === false && <div>isActive prop value equal to false</div>}
    <button type="button" onClick={() => onActiveToggle()}>Just a button</button>
  </div>
);
const ResultComponent = withBooleanToggle(TestComponent);

it(`Test component, returned by HOC withBooleanToggle`, () => {
  const tree = renderer
  .create(
      <ResultComponent/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

TestComponent.propTypes = {
  isActive: PropTypes.bool,

  onActiveToggle: PropTypes.func
};

