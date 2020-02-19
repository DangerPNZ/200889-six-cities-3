import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

const MapSetting = {
  CITY: [52.38333, 4.9],
  ICON: leaflet.icon({
    iconUrl: `img/pin.svg`,
    iconSize: [30, 30]
  }),
  ZOOM: 12
};

export class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }
  componentDidMount() {
    if (this.map.current) {
      this.mapInit(this.map.current);
    }
  }
  render() {
    return (
      <div id="map" style={{height: `100%`}} ref={this.map}></div>
    );
  }
  mapInit(mapCurrent) {
    if (!mapCurrent) {
      throw new Error(`no mapCurrent`);
    }
    const map = leaflet.map(mapCurrent, {
      center: MapSetting.CITY,
      zoom: MapSetting.ZOOM,
      zoomControl: false,
      marker: true
    });
    map.setView(MapSetting.CITY, MapSetting.ZOOM);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);
    for (const coordinates of this.props.offerCoords) {
      leaflet
      .marker(coordinates, {icon: MapSetting.ICON})
      .addTo(map);
    }
  }
}

Map.propTypes = {
  offerCoords: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number.isRequired)
  ).isRequired
};
