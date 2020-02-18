import React from 'react';
import renderer from 'react-test-renderer';
import {Map} from './map.jsx';

const TestDataValue = {
  COORDINATES: [
    [0, 0]
  ]
};

const Leaflet = {
  tileLayer: () => {},
  addTo: () => {},
  marker: () => {},
  setView: () => {},
  icon: () => {},
  map: () => {}
};
const MapSetting = {
  CITY: [52.38333, 4.9],
  ICON: Leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [30, 30]
  }),
  ZOOM: 12
};
it(`Map component structure test`, () => {
  const tree = renderer
  .create(
      <Map
        offerCoords = {TestDataValue.COORDINATES}
        Leaflet = {Leaflet}
        MapSetting = {MapSetting}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
