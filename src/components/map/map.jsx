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
  }
  componentDidMount() {
    if (this.mapRef.current) {
      this.mapInit(this.mapRef.current);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.offers[0].city.name !== prevProps.offers[0].city.name) {
      this.updatePins();
      this.map.setView(this.props.offers[0].city.coordinates, this.props.offers[0].city.zoom);
    }
    if (this.props.selectedOfferId !== prevProps.selectedOfferId) {
      this.updatePins();
    }
  }
  render() {
    return (
      <div id="map" style={{height: `100%`}} ref={this.mapRef}></div>
    );
  }
  getPinIcon(offer) {
    return leaflet.icon({
      iconUrl: this.props.selectedOfferId && offer.id === this.props.selectedOfferId ? `img/pin-active.svg` : `img/pin.svg`,
      iconSize: [30, 30]
    });
  }
  updatePins() {
    if (this.map !== null) {
      this.pins.forEach((pin) => {
        this.map.removeLayer(pin);
      });
    }
    this.addPinsToMap();
  }
  addPinsToMap() {
    this.pins = [];
    this.props.offers.forEach((offerItem) => {
      const pin = leaflet.marker(offerItem.location.coordinates, {icon: this.getPinIcon(offerItem)})
      .addTo(this.map);
      this.pins.push(pin);
    });
  }
  mapInit(mapCurrent) {
    if (!mapCurrent) {
      throw new Error(`no mapCurrent`);
    }
    this.map = leaflet.map(mapCurrent, {
      center: MapSetting.CITY,
      zoom: MapSetting.ZOOM,
      zoomControl: false,
      marker: true
    });
    this.map.setView(this.props.offers[0].city.coordinates, this.props.offers[0].city.zoom);
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);
    this.addPinsToMap();
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.exact({
    city: PropTypes.exact({
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      mapZoom: PropTypes.number.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    goods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    bedrooms: PropTypes.number.isRequired,
    host: PropTypes.exact({
      avatarUrl: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isPro: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    previewImage: PropTypes.string.isRequired,
    location: PropTypes.exact({
      coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      zoom: PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    isFavorites: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,

    reviews: PropTypes.arrayOf(PropTypes.exact({
      review: PropTypes.string.isRequired,
      userRating: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      commentId: PropTypes.number.isRequired,
      author: PropTypes.exact({
        avatarUrl: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isPro: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    })),
    nearby: PropTypes.arrayOf(PropTypes.exact({
      city: PropTypes.exact({
        name: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        mapZoom: PropTypes.number.isRequired
      }).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      goods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      bedrooms: PropTypes.number.isRequired,
      host: PropTypes.exact({
        avatarUrl: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isPro: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired,
      images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      previewImage: PropTypes.string.isRequired,
      location: PropTypes.exact({
        coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        zoom: PropTypes.number.isRequired
      }).isRequired,
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      premium: PropTypes.bool.isRequired,
      isFavorites: PropTypes.bool.isRequired,
      rating: PropTypes.number.isRequired,
      maxAdults: PropTypes.number.isRequired
    }))
  }).isRequired).isRequired,

  selectedOfferId: PropTypes.number
};
