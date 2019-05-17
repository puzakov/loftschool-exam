import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  fetchListFailure,
  fetchListRequest,
  fetchListSuccess,
  fetchRouteSuccess,
  resetRoute
} from "./actions";

const listItems = handleActions(
  {
    [fetchListSuccess]: (state, action) => action.payload
  },
  []
);

const listIsLoading = handleActions(
  {
    [fetchListFailure]: () => false,
    [fetchListRequest]: () => true,
    [fetchListSuccess]: () => false
  },
  false
);

const routeIsLoaded = handleActions(
  {
    [fetchRouteSuccess]: () => true,
    [resetRoute]: () => false
  },
  false
);

const points = handleActions(
  {
    [resetRoute]: () => [],
    [fetchRouteSuccess]: (state, action) => action.payload
  },
  []
);

export default combineReducers({
  list: combineReducers({ items: listItems, isLoading: listIsLoading }),
  route: combineReducers({ points, isLoaded: routeIsLoaded })
});
