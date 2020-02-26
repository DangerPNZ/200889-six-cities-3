import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

const MapSetting = {
  CITY: [52.38333, 4.9],
  ZOOM: 12
};

export class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.pins = [];
  }
  componentDidMount() {
    if (this.mapRef.current) {
      this._mapInit(this.mapRef.current);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.selectedOfferId !== prevProps.selectedOfferId) {
      this.rerenderPins();
    }
  }
  render() {
    return (
      <div id="map" style={{height: `100%`}} ref={this.mapRef}></div>
    );
  }
  getPin(offer) {
    return leaflet.icon({
      iconUrl: this.props.selectedOfferId && offer.id === this.props.selectedOfferId ? `img/pin-active.svg` : `img/pin.svg`,
      iconSize: [30, 30]
    });
  }
  rerenderPins() {
    if (this.map !== null) {
      this.pins.forEach((pin) => {
        this.map.removeLayer(pin);
      });
    }
    this.pin = [];
    this.addPins();
  }
  addPins() {
    this.props.offers.forEach((offerItem) => {
      const pin = leaflet.marker(offerItem.coordinates, {icon: this.getPin(offerItem)})
      .addTo(this.map);
      this.pins.push(pin);
    });
  }
  _mapInit(mapCurrent) {
    if (!mapCurrent) {
      throw new Error(`no mapCurrent`);
    }
    this.map = leaflet.map(mapCurrent, {
      center: MapSetting.CITY,
      zoom: MapSetting.ZOOM,
      zoomControl: false,
      marker: true
    });
    this.map.setView(MapSetting.CITY, MapSetting.ZOOM);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);
    this.addPins();
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired,
        id: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        premium: PropTypes.bool.isRequired,
        isFavorites: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
        activePin: PropTypes.bool,
        reviews: PropTypes.arrayOf(
            PropTypes.exact({
              author: PropTypes.string.isRequired,
              review: PropTypes.string.isRequired,
              userRating: PropTypes.number.isRequired,
              date: PropTypes.string.isRequired
            }).isRequired
        ).isRequired
      }).isRequired
  ).isRequired,
  selectedOfferId: PropTypes.string
};
