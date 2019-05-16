import { createAction } from "redux-actions";

export const fetchListRequest = createAction("MAP/FETCH_LIST_REQUEST");
export const fetchListSuccess = createAction("MAP/FETCH_LIST_SUCCESS");
export const fetchListFailure = createAction("MAP/FETCH_LIST_FAILURE");

export const fetchRouteRequest = createAction("MAP/FETCH_ROUTE_REQUEST");
export const fetchRouteSuccess = createAction("MAP/FETCH_ROUTE_SUCCESS");
export const fetchRouteFailure = createAction("MAP/FETCH_ROUTE_FAILURE");
export const resetRoute = createAction("MAP/RESET_ROUTE");
