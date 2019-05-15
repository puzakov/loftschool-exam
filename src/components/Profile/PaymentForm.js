import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import Typography from "@material-ui/core/Typography";
import {
  paymentFormSubmitAction,
  getCardName,
  getCardNumber,
  getExpDate,
  getCvv
} from "../../modules/Profile";

const formFields = [
  {
    name: "cardNumber",
    label: "Номер карты",
    type: ""
  },
  {
    name: "cardName",
    label: "Имя владельца",
    type: ""
  },
  {
    name: "expDate",
    label: "Дата окончания действия",
    type: "date"
  },
  {
    name: "cvv",
    label: "CVV",
    type: "number"
  }
];

const CustomField = ({ input, type, meta: { touched, error }, ...rest }) => {
  console.log(input);
  return (
    <TextField
      {...input}
      fullWidth
      // value={value}
      error={touched && error ? true : false}
      helperText={touched && error ? error : null}
      type={type}
      label={rest.label}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true
      }}
    />
  );
};

const validator = values => {
  const errors = {};
  formFields.forEach(({ name }) => {
    if (!values[name]) errors[name] = "Поле не может быть пустым";
  });

  if (!errors.cardName && !RegExp(/[a-zA-Z\s]+/).test(values.cardName))
    errors.cardName = "Недопустимое имя";

  if (!errors.expDate && !RegExp(/\d{4}-\d{2}-\d{2}/).test(values.expDate))
    errors.expDate = "Неверный формат даты";

  if (!errors.cardNumber && !RegExp(/\d{16}/).test(values.cardNumber))
    errors.cardNumber = "Должен содержать 16 цифр";

  if (!errors.cvv && !RegExp(/\d{3}/).test(values.cvv))
    errors.cvv = "Должен содержать 3 цифры";

  return errors;
};

class PaymentForm extends Component {
  state = {
    submited: false
  };

  componentDidMount() {
    this.props.initialize({ ...this.props.formValues });
  }

  onSubmit = values => {
    this.setState({ submited: true });
    this.props.paymentFormSubmitAction(values);
  };

  render() {
    if (!this.state.submited)
      return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {formFields.map(items => (
            <Field component={CustomField} key={items.name} {...items} />
          ))}
          <Button
            style={{ marginTop: 10 }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Сохранить
          </Button>
        </form>
      );
    else
      return (
        <Fragment>
          <Typography>
            Платёжные данные обновлены. Теперь вы можете заказывать такси.
          </Typography>
          <Button to="/map" variant="outlined" color="primary" component={Link}>
            ПЕРЕЙТИ НА КАРТУ
          </Button>
        </Fragment>
      );
  }
}

export default connect(
  state => ({
    formValues: {
      cardNumber: getCardNumber(state),
      cardName: getCardName(state),
      expDate: getExpDate(state),
      cvv: getCvv(state)
    }
  }),
  { paymentFormSubmitAction }
)(reduxForm({ form: "paymentForm", validate: validator })(PaymentForm));
