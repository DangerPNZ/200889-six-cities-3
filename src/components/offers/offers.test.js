import React from 'react';
import renderer from 'react-test-renderer';
import nanoid from 'nanoid';
import {Offers} from './offers.jsx';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from '../../reducer/reducer.js';

const store = createStore(reducer, (f) => f);
const TestDataValue = {
  OFFERS: [
    {
      name: `Apartment overlooking the river`,
      coordinates: [],
      id: nanoid(),
      price: 200,
      type: `Apartment`,
      premium: true,
      isFavorites: true,
      rating: 4.7,
      reviews: []
    },
    {
      name: `Room in the city center`,
      coordinates: [],
      id: nanoid(),
      price: 170,
      type: `Hotel room`,
      premium: true,
      isFavorites: false,
      rating: 4,
      reviews: []
    }
  ]
};
const OFFERS_SORT_TYPE = `Price: low to high`;
const SELECTED_CITY = `Cologne`;

it(`Offers component structure test`, () => {
  const tree = renderer
  .create(
      <Provider store = {store}>
        <Offers
          offers = {TestDataValue.OFFERS}
          offersSortType = {OFFERS_SORT_TYPE}
          onSortOptionClick = {() => {}}
          selectedCity = {SELECTED_CITY}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
