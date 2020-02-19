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
    this.mapInit();
  }
  render() {
    return (
      <div id="map" style={{height: `100%`}} ref={this.map}></div>
    );
  }
  mapInit() {
    // Данное условие нарушает концепцию Код не должен подстраиваться под тесты
    if (!this.map || !this.map.current) {
      return;
    }

    const map = leaflet.map(this.map.current, {
      center: MapSetting.CITY,
      zoom: MapSetting.ZOOM,
      zoomControl: false,
      marker: true
    });
    const icon = MapSetting.ICON;
    map.setView(MapSetting.CITY, MapSetting.ZOOM);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);
    this.props.offerCoords.map((offer) => {
      leaflet
      .marker(offer, {icon})
      .addTo(map);
    });
  }
}

Map.propTypes = {
  offerCoords: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number.isRequired)
  ).isRequired
};
