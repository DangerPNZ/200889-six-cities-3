import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessageComponent = ({errorData, onErrorClose}) => (
  <section className="error-message">
    <div className="error-message__header">
      <div className="error-message__header-text">Error: {errorData.heading}</div>
      <div className="error-message__close-btn" onClick={onErrorClose}></div>
    </div>
    <div className="error-message__inner-container">
      <div className="error-message__error-text">{errorData.description}</div>
    </div>
  </section>
);

ErrorMessageComponent.propTypes = {
  errorData: PropTypes.exact({
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,

  onErrorClose: PropTypes.func.isRequired
};

export const ErrorMessage = React.memo(ErrorMessageComponent);
