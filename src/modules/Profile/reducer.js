import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { paymentFormSubmitAction as submit } from "./actions";

const cardName = handleActions(
  {
    [submit]: (state, action) => action.payload.cardName
  },
  ""
);
const cardNumber = handleActions(
  {
    [submit]: (state, action) => action.payload.cardNumber
  },
  ""
);
const expDate = handleActions(
  {
    [submit]: (state, action) => action.payload.expDate
  },
  ""
);
const cvv = handleActions(
  {
    [submit]: (state, action) => action.payload.cvv
  },
  ""
);

export const getCardName = state => state.profile.cardName;
export const getCardNumber = state => state.profile.cardNumber;
export const getExpDate = state => state.profile.expDate;
export const getCvv = state => state.profile.cvv;

export default combineReducers({ cardName, cardNumber, expDate, cvv });
