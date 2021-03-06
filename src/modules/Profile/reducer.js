import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { paymentFormSubmitAction as submit } from "./actions";
import { logout } from "../Auth/actions";

const cardName = handleActions(
  {
    [submit]: (state, action) => action.payload.cardName,
    [logout]: () => null,
  },
  null
);
const cardNumber = handleActions(
  {
    [submit]: (state, action) => action.payload.cardNumber,
    [logout]: () => null,
  },
  null
);
const expDate = handleActions(
  {
    [submit]: (state, action) => action.payload.expDate,
    [logout]: () => null,
  },
  null
);
const cvv = handleActions(
  {
    [submit]: (state, action) => action.payload.cvv,
    [logout]: () => null,
  },
  null
);

export default combineReducers({ cardName, cardNumber, expDate, cvv });
