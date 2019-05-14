import React, { Component } from "react";
import { connect } from "react-redux";
import { getAuthError, fetchRequest as authRequest, getIsLoading } from "../../modules/Auth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import styles from "./Login.module.css";

const CustomField = ({
  input,
  type,
  meta: { touched, error },
  serverError,
  ...rest
}) => {
  const currentError = error ? error : serverError;

  return (
    <TextField
      {...input}
      fullWidth
      error={touched && currentError ? true : false}
      helperText={touched && currentError ? currentError : null}
      type={type}
      label={rest.label}
      margin="normal"
      variant="outlined"
    />
  );
};

const validator = values => {
  const { email, password } = values;
  const errors = {};
  if (!email) {
    errors.email = "Имя пользователя не может быть пустым";
  }
  if (!password) {
    errors.password = "Пароль не может быть пустым";
  }
  return errors;
};

const LoginForm = reduxForm({ form: "loginForm", validate: validator })(
  ({ handleSubmit, onSubmit, serverError, isProcessing }) => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        component={CustomField}
        label="Имя пользователя"
        name="email"
        type="email"
        serverError={
          serverError && serverError.includes("пользовател")
            ? serverError
            : null
        }
      />
      <Field
        component={CustomField}
        label="Пароль"
        type="password"
        name="password"
        serverError={
          serverError && serverError.includes("пароль") ? serverError : null
        }
      />
      <Button
        style={{ marginTop: 10 }}
        variant="contained"
        color="primary"
        type="submit"
        disabled={isProcessing}
      >
        Войти
      </Button>
    </form>
  )
);

class Login extends Component {
  handleSubmit = values => {
    const { authRequest } = this.props;
    authRequest(values);
  };

  render() {
    const { error, isLoading } = this.props;

    return (
      <div className={styles.root}>
        <Card className={styles.container}>
          <CardHeader
            title="Войти"
            titleTypographyProps={{ align: "center", variant: "h4" }}
          />
          <CardContent>
            <LoginForm onSubmit={this.handleSubmit} serverError={error} isProcessing={isLoading}/>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default connect(
  state => ({ error: getAuthError(state), isLoading: getIsLoading(state) }),
  { authRequest }
)(Login);
