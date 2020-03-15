import React from 'react';
import PropTypes from 'prop-types';
import {SortOption} from '../../utils/utils.js';
import {getValuesListFromEnum} from '../../utils/utils.js';
import nanoid from 'nanoid';

const OffersSortOptionsComponent = ({offersSortType, onSortOptionClick, isVisible, onToggleVisible}) => (
  <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex="0" onClick={onToggleVisible}>
      {offersSortType}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className={`places__options places__options--custom${isVisible ? ` places__options--opened` : ``}`}>
      {
        getValuesListFromEnum(SortOption).map((sortType) => (
          <li onClick={() => onSortOptionClick(sortType)} className={`places__option${offersSortType === sortType ? ` places__option--active` : ``}`} key={nanoid()} tabIndex="0">{sortType}</li>)
        )
      }
    </ul>

  </form>
);
export const OffersSortOptions = React.memo(OffersSortOptionsComponent);

OffersSortOptionsComponent.propTypes = {
  offersSortType: PropTypes.string.isRequired,

  onSortOptionClick: PropTypes.func.isRequired,

  isVisible: PropTypes.bool,

  onToggleVisible: PropTypes.func
};
