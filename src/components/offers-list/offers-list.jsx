import React from 'react';
import PropTypes from 'prop-types';
import {OfferCard} from '../offer-card/offer-card.jsx';

/* Временная функция. (магические значения не соответствуют критериям)
Использую во избежание антипаттерна с назначением в качестве id индексов итерируемого массива.
Применение на данном этапе пакета nanoid считаю избыточным.
Если необходимость в генерации id останется актуальной, подключу nanoid */
const getId = () => `_` + Math.random().toString(36).substr(2, 9);

export const OffersList = (props) => {
  const {offersNames} = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offersNames.map((name) => <OfferCard offerName = {name} key = {getId()}/>)
      }
    </div>
  );
};

OffersList.propTypes = {
  offersNames: PropTypes.arrayOf(PropTypes.string)
};
