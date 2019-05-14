import { createAction } from "redux-actions";

export const fetchRequest = createAction("AUTH/FETCH_REQUEST");
export const fetchSuccess = createAction("AUTH/FETCH_SUCCESS");
export const fetchFailure = createAction("AUTH/FETCH_FAILURE");
export const logout = createAction("AUTH/LOGOUT");
