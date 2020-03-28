import {CompareDirection} from './constants.js';

const ONE_STAR_IN_PERCENTS = 20;
export const getStyleForRating = (rating) => {
  const ratingValueInPercents = Math.round(rating);
  return {width: `${ONE_STAR_IN_PERCENTS * ratingValueInPercents}%`};
};
export const extend = (a, b = null) => {
  return b !== null ? Object.assign({}, a, b) : Object.assign({}, a);
};
export const compare = (property, compareDirection = CompareDirection.ASC) => {
  return (a, b) => {
    if (a[property] < b[property] && compareDirection === CompareDirection.ASC) {
      return -1;
    } else if (a[property] < b[property] && compareDirection === CompareDirection.DESC) {
      return 1;
    } else if (a[property] > b[property] && compareDirection === CompareDirection.ASC) {
      return 1;
    } else if (a[property] > b[property] && compareDirection === CompareDirection.DESC) {
      return -1;
    }
    return 0;
  };
};
