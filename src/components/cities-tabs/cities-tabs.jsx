import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';

const CitiesTabsComponent = ({selectedCity, onCityTabClick, cities}) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          cities.map((city) => (
            <li className="locations__item" key={nanoid()}>
              <a className={`locations__item-link tabs__item${selectedCity === city ? ` tabs__item--active` : ``}`} onClick={() => onCityTabClick(city)} href="#">
                <span>{city}</span>
              </a>
            </li>)
          )
        }
      </ul>
    </section>
  </div>
);

CitiesTabsComponent.propTypes = {
  selectedCity: PropTypes.string.isRequired,

  onCityTabClick: PropTypes.func.isRequired,

  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export const CitiesTabs = React.memo(CitiesTabsComponent);
