export const City = {
  PARIS: `Paris`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  AMSTERDAM: `Amsterdam`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`
};
export const SortOption = {
  DEFAULT: `Popular`,
  BY_PRICE_LOW_TO_HIGHT: `Price: low to high`,
  BY_PRICE_HIGHT_TO_LOW: `Price: high to low`,
  BY_RATING_HIGHT_TO_LOW: `Top rated first`,
};
export const CompareDirection = {
  ASC: `ASC`,
  DESC: `DESK`
};
const MAX_RATING_VALUE = 5;
export const getStyleForRating = (rating) => {
  const ratingValueInPercents = (rating / MAX_RATING_VALUE) * 100;
  return {width: `${ratingValueInPercents}%`};
};
export const extend = (a, b = null) => {
  return b !== null ? Object.assign({}, a, b) : Object.assign({}, a);
};
export const getValuesListFromEnum = (enumeration) => {
  const values = [];
  for (let val in enumeration) {
    if (typeof enumeration[val] !== `undefined`) {
      values.push(enumeration[val]);
    }
  }
  return values;
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
