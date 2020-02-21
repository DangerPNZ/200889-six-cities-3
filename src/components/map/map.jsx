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
    this.map = React.createRef();
  }
  componentDidMount() {
    if (this.map.current) {
      this._mapInit(this.map.current);
    }
  }
  render() {
    return (
      <div id="map" style={{height: `100%`}} ref={this.map}></div>
    );
  }
  _getPin(offer) {
    if (this.props.offerCurrent) {
      return leaflet.icon({
        iconUrl: offer.id === this.props.offerCurrent.id ? `img/pin-active.svg` : `img/pin.svg`,
        iconSize: [30, 30]
      });
    }
    return leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
  }
  _mapInit(mapCurrent) {
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
    this.props.offers.forEach((offerItem) => {
      leaflet
      .marker(offerItem.coordinates, {icon: this._getPin(offerItem)})
      .addTo(map);
    });
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
  offerCurrent: PropTypes.exact({
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
  })
};
