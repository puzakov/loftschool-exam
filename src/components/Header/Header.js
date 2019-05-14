import React from "react";
import { logout, getIsAuthorized } from "../../modules/Auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

const Header = ({ classes, isAuthorized, logout }) => (
  <AppBar className={classes.root} position="static" color="default">
    <Toolbar>
      <Typography className={classes.grow} variant="title" color="inherit">
        Loft Taxi
      </Typography>
      <Button to="/map" component={Link}>
        КАРТА
      </Button>
      <Button to="/profile" component={Link}>
        ПРОФИЛЬ
      </Button>
      {!isAuthorized && (
        <Button to="/login" component={Link}>
          ВОЙТИ
        </Button>
      )}
      {isAuthorized && <Button onClick={() => logout()}>ВЫЙТИ</Button>}
    </Toolbar>
  </AppBar>
);

export default connect(
  state => ({ isAuthorized: getIsAuthorized(state) }),
  { logout }
)(withStyles(styles)(Header));
