import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import {withFormValidation} from './with-form-validation.jsx';

const TestComponent = ({notFilled, reviewData, onInputChange}) => (
  <div>
    {notFilled === true && <div>notFilled prop value equal to true</div>}
    {reviewData.comment === `` && <div>reviewData.comment is empty string</div>}
    {reviewData.rating === 0 && <div>reviewData.rating equal 0</div>}
    <textarea onChange={onInputChange}></textarea>
  </div>
);
const ResultComponent = withFormValidation(TestComponent);

it(`Test component, returned by HOC withFormValidation`, () => {
  const tree = renderer
  .create(
      <ResultComponent/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

TestComponent.propTypes = {
  reviewData: PropTypes.exact({
    comment: PropTypes.string,
    rating: PropTypes.number
  }),

  notFilled: PropTypes.bool.isRequired,

  onInputChange: PropTypes.func.isRequired
};

