import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import styles from "./Map.module.css";

export default class Map extends Component {
  map = null;
  mapContainer = React.createRef();
  state = {
    mapContainerHeight: window.innerHeight
  };

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicHV6YWtvdiIsImEiOiJjanZqanN2cTcwNXJqNGJwaXk3NHo0eXhqIn0.BjCiXQX64qjTjsY9N_BnCw";
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [30.2656504, 59.8029126],
      zoom: 15
    });
    this.updateHeight();
    window.addEventListener("resize", this.updateHeight);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  updateHeight = () => {
    this.setState({ mapContainerHeight: window.innerHeight });
  };

  render() {
    const { mapContainerHeight } = this.state;
    return (
      <div className={styles.root}>
        <div
          style={{ height: mapContainerHeight }}
          className={styles.container}
          ref={this.mapContainer}
        />
      </div>
    );
  }
}
