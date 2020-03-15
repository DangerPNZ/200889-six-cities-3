import React from 'react';

export const withVisibilityControl = (Component) => {
  return class WithVisibilityControl extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isVisible: false
      };
      this.handleToggleVisible = this.handleToggleVisible.bind(this);
    }
    render() {
      return <Component
        {...this.props}
        isVisible = {this.state.isVisible}
        onToggleVisible = {this.handleToggleVisible}
      />;
    }
    handleToggleVisible() {
      this.setState((prevState) => ({isVisible: !prevState.isVisible}));
    }
  };
};
