import React from 'react';
import PropTypes from 'prop-types';
import {City} from '../../utils/utils.js';
import nanoid from 'nanoid';

const setCSSTabClasses = (activeCity, tabCity) => activeCity === tabCity ? `locations__item-link tabs__item tabs__item--active` : `locations__item-link tabs__item`;
/*
  Допускаю, что тебе данная реализация может не понравиться.
  Как альтернативу можно конечно использовать связывание двух объектов через Map
  (города и предложения - два разных массива), но мне больше этот способ понравился.
  Недостаток один - приходится применять лишнюю проверку. (if внури for, линтер заставляет).
  Хотя, если ты одобришь вариант для теста, который я предложил, if как раз тут будет нужен, только с другим условием
*/
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
                /* Создавать тут еще один компонент считаю избыточным */
                <React.Fragment key={nanoid()}>
                  <li className="locations__item">
                    <a className={setCSSTabClasses(this.props.selectedCity, city)} onClick={() => this.props.onCityTabClick(city)} href="#">
                      <span>{city}</span>
                    </a>
                  </li>
                </React.Fragment>)
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
