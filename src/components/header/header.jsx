import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {PagePath} from '../../utils/constants.js';

const HeaderComponent = ({userEmail}) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to={PagePath.MAIN} className="header__logo-link header__logo-link--active">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              {
                userEmail && <Link to={PagePath.FAVORITES} className="header__nav-link header__nav-link--profile"><div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">{userEmail}</span>
                </Link>
              }
              {
                !userEmail && <Link to={PagePath.LOGIN} className="header__nav-link header__nav-link--profile"><div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">Sign in</span>
                </Link>
              }
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

HeaderComponent.propTypes = {
  userEmail: PropTypes.string
};

export const Header = React.memo(HeaderComponent);
