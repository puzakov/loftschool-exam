import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { fetchSuccess, fetchRequest, fetchFailure, logout } from "./actions";

const isAuthorized = handleActions(
  {
    [fetchSuccess]: (state, action) => action.payload.success,
    [fetchRequest]: () => false,
    [fetchFailure]: () => false,
    [logout]: () => false,
  },
  false
  );
  
  const error = handleActions({
    [fetchSuccess]: (state, action) => action.payload.error,
    [fetchRequest]: () => null,
    [fetchFailure]: (state, action) => action.payload,
}, null);

export const getIsAuthorized = state => state.auth.isAuthorized;
export const getAuthError = state => state.auth.error;

export default combineReducers({ isAuthorized, error });
