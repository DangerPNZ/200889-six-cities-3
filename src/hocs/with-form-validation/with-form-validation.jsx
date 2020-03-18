import React from 'react';

const MIN_REVIEW_LENGTH = 50;

export const withFormValidation = (Component) => {
  return class WithFormValidation extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        rating: ``,
        review: ``,
        notFilled: true
      };
      this.handleInputChange = this.handleInputChange.bind(this);
    }
    render() {
      return <Component
        {...this.props}
        onInputChange = {this.handleInputChange}
        notFilled = {this.state.notFilled}
        reviewData = {{
          comment: this.state.review,
          rating: Number(this.state.rating)
        }}
      />;
    }
    handleInputChange(event) {
      const {name, value} = event.target;
      this.setState({[name]: value}, this.checkValues);
    }
    checkValues() {
      this.setState({
        notFilled: (this.state.rating.length &&
          this.state.review.length &&
          this.state.review.length >= MIN_REVIEW_LENGTH) ? false : true
      });
    }
  };
};
