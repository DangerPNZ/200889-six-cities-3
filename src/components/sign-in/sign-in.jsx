import React from 'react';
import PropTypes from 'prop-types';
import validator from 'email-validator';
import {Redirect} from 'react-router-dom';
import {ErrorMessage} from '../error-message/error-message.jsx';
import {Header} from '../header/header.jsx';
import {PagePath} from '../../utils/constants.js';

const ErrorData = {
  INVALID_EMAIL: {
    heading: `Invalid email`,
    description: `You entered an invalid email address. Correct the value of the field.`
  },
  NO_EMAIL: {
    heading: `Email not specified`,
    description: `Enter email address.`
  },
  NO_PASSWORD: {
    heading: `Password is not filled`,
    description: `Fill in the password field.`
  },
  NO_LOGIN_DATA: {
    heading: `Login data is not filled`,
    description: `Fill in the email and password field.`
  }
};

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.handleLogIn = this.handleLogIn.bind(this);
  }
  render() {
    if (this.props.userEmail) {
      return <Redirect to={PagePath.MAIN} />;
    }
    return (
      <div className="page page--gray page--login">
        {this.props.errorData && <ErrorMessage
          errorData = {this.props.errorData}
          onErrorClose = {this.props.onErrorClose}
        />}
        <Header/>

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={this.handleLogIn}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" ref={this.emailRef}/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" ref={this.passwordRef}/>
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{this.props.selectedCity}</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
  handleLogIn(event) {
    event.preventDefault();
    const emailFieldValue = this.emailRef.current.value;
    const passwordFieldValue = this.passwordRef.current.value;
    if (!emailFieldValue && !passwordFieldValue) {
      this.props.onError(ErrorData.NO_LOGIN_DATA);
    } else if (!passwordFieldValue) {
      this.props.onError(ErrorData.NO_PASSWORD);
    } else if (!emailFieldValue) {
      this.props.onError(ErrorData.NO_EMAIL);
    } else if (validator.validate(emailFieldValue)) {
      this.props.onLogIn({
        email: emailFieldValue,
        password: this.passwordRef.current.value
      }, this.props.onAuthorized);
    } else {
      this.props.onError(ErrorData.INVALID_EMAIL);
    }
  }
}

SignIn.propTypes = {
  selectedCity: PropTypes.string.isRequired,

  userEmail: PropTypes.string,

  onLogIn: PropTypes.func.isRequired,

  errorData: PropTypes.exact({
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }),

  onErrorClose: PropTypes.func.isRequired,

  onError: PropTypes.func.isRequired,

  onAuthorized: PropTypes.func.isRequired
};

export {SignIn};
