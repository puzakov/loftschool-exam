import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Button
} from "@material-ui/core";
import {
  fetchListRequest,
  getListItems,
  fetchRouteRequest,
  getRoutePoints,
  getRouteIsLoaded,
  resetRoute
} from "../../modules/Map";
import { getCardNumber } from "../../modules/Profile";
import { initMap, mapLoadRoute, reinitMap } from "./mapbox";
import { CompleteProfile, OrderSuccess } from "./dialogs";
import styles from "./Map.module.css";

class Map extends Component {
  map = null;
  mapContainer = React.createRef();
  state = {
    mapContainerHeight: window.innerHeight,
    dep: "",
    arr: "",
    enabledOrderSend: false
  };

  componentDidMount() {
    this.map = initMap(this.mapContainer);
    if (this.props.routeIsLoaded) {
      this.props.resetRoute();
    }
    this.updateHeight();
    this.props.fetchListRequest();
    window.addEventListener("resize", this.updateHeight);
  }

  componentDidUpdate() {
    if (this.map && this.map.isStyleLoaded() && this.props.routeIsLoaded) {
      mapLoadRoute(this.map, this.props.points);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight);
    this.map.remove();
  }

  updateHeight = () => {
    this.setState({ mapContainerHeight: window.innerHeight });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { dep, arr } = this.state;
      const enabledOrderSend = !!arr && !!dep && arr !== dep;
      this.setState({ enabledOrderSend });
    });
  };

  handleNewOrder = () => {
    this.setState(
      {
        dep: "",
        arr: "",
        enabledOrderSend: false
      },
      () => {
        this.props.resetRoute();
        this.map.remove();
        this.map = initMap(this.mapContainer);
      }
    );
  };

  renderOrderForm = () => {
    const { dep, arr } = this.state;
    const { fetchRouteRequest } = this.props;

    return (
      <Card className={styles.formWrapper}>
        <CardHeader
          title="Вызов такси"
          titleTypographyProps={{ variant: "h4" }}
        />
        <CardContent>
          {[
            { name: "dep", label: "Откуда" },
            { name: "arr", label: "Куда" }
          ].map(({ name, label }) => (
            <FormControl
              margin="normal"
              variant="outlined"
              key={name}
              fullWidth
            >
              <InputLabel htmlFor="outlined-age-simple">{label}</InputLabel>
              <Select
                value={this.state[name]}
                onChange={this.handleChange}
                input={<OutlinedInput labelWidth={55} name={name} />}
              >
                {this.props.addressList.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
          <Button
            disabled={!this.state.enabledOrderSend}
            margin="normal"
            variant="outlined"
            color="primary"
            onClick={() => {
              fetchRouteRequest({ dep, arr });
            }}
          >
            Вызвать такси
          </Button>
        </CardContent>
      </Card>
    );
  };

  render() {
    const { mapContainerHeight } = this.state;
    const { routeIsLoaded, profileCompleted } = this.props;
    return (
      <div className={styles.root}>
        <div
          style={{ height: mapContainerHeight }}
          className={styles.container}
          ref={this.mapContainer}
        />
        {!profileCompleted && <CompleteProfile />}
        {profileCompleted && routeIsLoaded && (
          <OrderSuccess onButtonClick={this.handleNewOrder} />
        )}
        {profileCompleted && !routeIsLoaded && this.renderOrderForm()}
      </div>
    );
  }
}

export default connect(
  state => ({
    addressList: getListItems(state),
    points: getRoutePoints(state),
    routeIsLoaded: getRouteIsLoaded(state),
    profileCompleted: !!getCardNumber(state)
  }),
  { fetchListRequest, fetchRouteRequest, resetRoute }
)(Map);
