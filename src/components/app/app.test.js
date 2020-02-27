import React from 'react';
import renderer from 'react-test-renderer';
import nanoid from 'nanoid';
import {App} from './app.jsx';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from '../../reducer/reducer.js';

const store = createStore(reducer, (f) => f);
const TestDataValue = {
  OFFERS: [
    {
      name: `Canal`,
      coordinates: [],
      id: nanoid(),
      price: 110,
      type: `Room`,
      premium: false,
      isFavorites: true,
      rating: 4.2,
      reviews: []
    },
    {
      name: `Nice, warm big bed apartment`,
      coordinates: [],
      id: nanoid(),
      price: 177,
      type: `Lux apartment`,
      premium: true,
      isFavorites: false,
      rating: 2.2,
      reviews: []
    }
  ]
};
const SELECTED_CITY = `Paris`;
const OFFERS_SORT_TYPE = `Price: low to high`;

it(`App component structure test`, () => {
  const tree = renderer
  .create(
      <Provider store = {store}>
        <App
          offers = {TestDataValue.OFFERS}
          onOfferHeadingClick = {() => {}}
          selectedCity = {SELECTED_CITY}
          onCityTabClick = {() => {}}
          offersSortType = {OFFERS_SORT_TYPE}
          onSortOptionClick = {() => {}}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
