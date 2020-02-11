import React from 'react';
import PropTypes from 'prop-types';
import {OfferCard} from '../offer-card/offer-card.jsx';

/* Временная функция. (магические значения не соответствуют критериям)
Использую во избежание антипаттерна с назначением в качестве id индексов итерируемого массива.
Применение на данном этапе пакета nanoid считаю избыточным.
Если необходимость в генерации id останется актуальной, подключу nanoid */
const getId = () => `_` + Math.random().toString(36).substr(2, 9);

export class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeItemData: null
    };
  }
  onUpdateState(activeItemData = null) {
    this.setState({
      activeItemData
    });
  }
  render() {
    return (
      <div className="cities__places-list places__list tabs__content">
        {
          this.props.offersNames.map((name) => <OfferCard
            offerName = {name}
            onUpdateState = {this.onUpdateState.bind(this)}
            key = {getId()}
          />)
        }
      </div>
    );
  }
}

OffersList.propTypes = {
  offersNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
