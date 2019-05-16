import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography
} from "@material-ui/core";
import styles from "./Map.module.css";

const Alert = ({ title, text, button }) => {
  return (
    <Card className={styles.formWrapper}>
      <CardHeader title={title} titleTypographyProps={{ variant: "h4" }} />
      <CardContent>
        <Typography>{text}</Typography>
        {button()}
      </CardContent>
    </Card>
  );
};

export const CompleteProfile = () => {
  return (
    <Alert
      title="Заполните платежные данные"
      text="Укажите информацию о банковской карте, чтобы сделать заказ."
      button={() => (
        <Button
          to="/profile"
          variant="outlined"
          color="primary"
          component={Link}
        >
          ПЕРЕЙТИ В ПРОФИЛЬ
        </Button>
      )}
    />
  );
};

export const OrderSuccess = ({ onButtonClick }) => {
  return (
    <Alert
      title="Заказ размещён"
      text="Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут."
      button={() => (
        <Button variant="outlined" color="primary" onClick={onButtonClick}>
          СДЕЛАТЬ НОВЫЙ ЗАКАЗ
        </Button>
      )}
    />
  );
};
