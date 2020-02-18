import React from 'react';
import PropTypes from 'prop-types';


export class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.map = React.createRef();
  }
  componentDidMount() {
    const map = this.props.Leaflet.map(`map`, {
      center: this.props.MapSetting.CITY,
      zoom: this.props.MapSetting.ZOOM,
      zoomControl: false,
      marker: true
    });
    const icon = this.props.MapSetting.ICON;
    map.setView(this.props.MapSetting.CITY, this.props.MapSetting.ZOOM);
    this.props.Leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);
    this.props.offerCoords.map((offer) => {
      this.props.Leaflet
      .marker(offer, {icon})
      .addTo(map);
    });
  }
  render() {
    return (
      <section className="cities__map map">
        <div id="map" style={{height: `100%`}}></div> {/* ref={this.map} */}
      </section>
    );
  }
}
Map.propTypes = {
  offerCoords: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number.isRequired)
  ).isRequired,
  Leaflet: PropTypes.object.isRequired,
  MapSetting: PropTypes.object.isRequired
};
