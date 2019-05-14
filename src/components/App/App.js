import React, { Component } from "react";
import { connect } from "react-redux";
import { getIsAuthorized } from "../../modules/Auth";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import Header from "../Header";
import Map from "../Map";
import Login from "../Login";
import Profile from "../Profile";

class App extends Component {
  render() {
    const { isAuthorized } = this.props;
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Redirect exact path="/" to="/map" />
          {!isAuthorized && <Route path="/login" component={Login} />}
          {isAuthorized && <Redirect path="/login" to="/map" />}
          <PrivateRoute path="/map" component={Map} />
          <PrivateRoute path="/profile" component={Profile} />
          <Redirect to="/map" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(state => ({ isAuthorized: getIsAuthorized(state) }))(
  App
);
