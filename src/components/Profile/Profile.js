import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./Profile.module.css";
import { FormControl } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// const styles = theme => ({
//   ...styles,
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//   },
// })

class Login extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Card className={styles.container}>
          <CardHeader
            title="Профиль"
            titleTypographyProps={{ align: "center", variant: "h4" }}
          />
          <CardContent className={styles.formWrapper}>
              <TextField
                fullWidth
                id="outlined-name"
                label="Номер карты"
                required
                // className={classes.textField}
                // value={this.state.name}
                // onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-name"
                label="Имя владельца"
                // className={classes.textField}
                // value={this.state.name}
                // onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
              <Button
                style={{ marginTop: 10 }}
                variant="contained"
                color="primary"
              >
                Сохранить
              </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Login;
