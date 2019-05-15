import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import PaymentForm from "./PaymentForm";
import styles from "./Profile.module.css";

class Profile extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Card className={styles.container}>
          <CardHeader
            title="Профиль"
            titleTypographyProps={{ align: "center", variant: "h4" }}
          />
          <CardContent className={styles.formWrapper}>
            <PaymentForm />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Profile;
