import React from 'react';

export const withBooleanToggle = (Component) => {
  return class WithBooleanToggle extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isActive: false
      };
      this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle() {
      this.setState((prevState) => ({isActive: !prevState.isActive}));
    }
    render() {
      return <Component
        {...this.props}
        isActive = {this.state.isActive}
        onActiveToggle = {this.handleToggle}
      />;
    }
  };
};
