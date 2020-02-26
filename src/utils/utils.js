export const City = {
  PARIS: `Paris`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  AMSTERDAM: `Amsterdam`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusselgorf`
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
export const getStyleForRating = (rating) => {
  let style = null;
  if (rating < 1) {
    style = {width: `0`};
  } else if (rating >= 1 && rating < 2) {
    style = {width: `20%`};
  } else if (rating >= 2 && rating < 3) {
    style = {width: `40%`};
  } else if (rating >= 3 && rating < 4) {
    style = {width: `60%`};
  } else if (rating >= 4 && rating < 5) {
    style = {width: `80%`};
  } else if (rating === 5) {
    style = {width: `100%`};
  }
  return style;
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
      return 1;
    } else if (a[property] < b[property] && compareDirection === CompareDirection.DESC) {
      return -1;
    } else if (a[property] > b[property] && compareDirection === CompareDirection.ASC) {
      return -1;
    } else if (a[property] > b[property] && compareDirection === CompareDirection.DESC) {
      return 1;
    }
    return 0;
  };
};
export const compareByDate = (property, compareDirection = CompareDirection.ASC) => {
  return (a, b) => {
    if (new Date(a[property]) < new Date(b[property]) && compareDirection === CompareDirection.ASC) {
      return 1;
    } else if (new Date(a[property]) < new Date(b[property]) && compareDirection === CompareDirection.DESC) {
      return -1;
    } else if (new Date(a[property]) > new Date(b[property]) && compareDirection === CompareDirection.ASC) {
      return -1;
    } else if (new Date(a[property]) > new Date(b[property]) && compareDirection === CompareDirection.DESC) {
      return 1;
    }
    return 0;
  };
};


