import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import {SortOption} from '../../utils/constants.js';

const OffersSortOptionsComponent = ({offersSortType, onSortOptionClick, isActive, onActiveToggle}) => (
  <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex="0" onClick={onActiveToggle}>
      {offersSortType}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className={`places__options places__options--custom${isActive ? ` places__options--opened` : ``}`}>
      {
        Object.values(SortOption).map((sortType) => (
          <li onClick={() => onSortOptionClick(sortType)} className={`places__option${offersSortType === sortType ? ` places__option--active` : ``}`} key={nanoid()} tabIndex="0">{sortType}</li>)
        )
      }
    </ul>

  </form>
);

OffersSortOptionsComponent.propTypes = {
  offersSortType: PropTypes.string.isRequired,

  onSortOptionClick: PropTypes.func.isRequired,

  isActive: PropTypes.bool,

  onActiveToggle: PropTypes.func
};

export const OffersSortOptions = React.memo(OffersSortOptionsComponent);
