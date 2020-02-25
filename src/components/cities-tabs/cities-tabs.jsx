import React from 'react';
import PropTypes from 'prop-types';
import {City} from '../../utils/utils.js';

const setCSSTabClasses = (activeCity, tabCity) => activeCity === tabCity ? `locations__item-link tabs__item tabs__item--active` : `locations__item-link tabs__item`;

export class CitiesTabs extends React.PureComponent {
  render() {
    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a className={setCSSTabClasses(this.props.selectedCity, City.PARIS)} onClick={() => this.props.onCityTabClick(City.PARIS)} href="#">
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a className={setCSSTabClasses(this.props.selectedCity, City.COLOGNE)} onClick={() => this.props.onCityTabClick(City.COLOGNE)} href="#">
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a className={setCSSTabClasses(this.props.selectedCity, City.BRUSSELS)} onClick={() => this.props.onCityTabClick(City.BRUSSELS)} href="#">
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a className={setCSSTabClasses(this.props.selectedCity, City.AMSTERDAM)} onClick={() => this.props.onCityTabClick(City.AMSTERDAM)} href="#">
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a className={setCSSTabClasses(this.props.selectedCity, City.HAMBURG)} onClick={() => this.props.onCityTabClick(City.HAMBURG)} href="#">
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a className={setCSSTabClasses(this.props.selectedCity, City.DUSSELDORF)} onClick={() => this.props.onCityTabClick(City.DUSSELDORF)} href="#">
                <span>Dusseldorf</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

CitiesTabs.propTypes = {
  selectedCity: PropTypes.string.isRequired,
  onCityTabClick: PropTypes.func.isRequired
};
