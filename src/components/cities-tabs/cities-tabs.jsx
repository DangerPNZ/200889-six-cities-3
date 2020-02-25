import React from 'react';
import PropTypes from 'prop-types';
import {City} from '../../utils/utils.js';
import nanoid from 'nanoid';

const getCitiesList = (cities) => {
  const citiesList = [];
  for (let cityName in cities) {
    if (City[cityName]) {
      citiesList.push(cities[cityName]);
    }
  }
  return citiesList;
};

export class CitiesTabs extends React.PureComponent {
  render() {
    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              getCitiesList(City).map((city) => (
                <li className="locations__item" key={nanoid()}>
                  <a className={this.props.selectedCity === city ? `locations__item-link tabs__item tabs__item--active` : `locations__item-link tabs__item`} onClick={() => this.props.onCityTabClick(city)} href="#">
                    <span>{city}</span>
                  </a>
                </li>)
              )
            }
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
