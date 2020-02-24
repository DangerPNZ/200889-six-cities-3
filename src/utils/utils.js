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
