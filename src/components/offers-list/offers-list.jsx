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
    this.onOfferMouseInteract = this.onOfferMouseInteract.bind(this);
  }
  render() {
    return (
      <div className="cities__places-list places__list tabs__content">
        {
          this.props.offersNames.map((name) => <OfferCard
            offerName = {name}
            onOfferMouseInteract = {this.onOfferMouseInteract}
            onOfferHeadingClick = {this.props.onOfferHeadingClick}
            key = {getId()}
          />)
        }
      </div>
    );
  }
  /* для обнуления состояния передать null */
  onOfferMouseInteract(activeItemData) {
    this.setState({
      activeItemData
    });
  }
}

OffersList.propTypes = {
  offersNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onOfferHeadingClick: PropTypes.func.isRequired
};
