import { takeLatest, put, call, fork } from "redux-saga/effects";
import {
  fetchListFailure,
  fetchListRequest,
  fetchListSuccess,
  fetchRouteFailure,
  fetchRouteRequest,
  fetchRouteSuccess
} from "./actions";
import { getAddressList, getRoute } from "./api";

function* fetchListWorker() {
  yield takeLatest(fetchListRequest.toString(), function*(action) {
    try {
      const response = yield call(getAddressList);
      yield put(fetchListSuccess(response));
    } catch {
      yield put(fetchListFailure());
    }
  });
}

function* fetchRouteWorker() {
  yield takeLatest(fetchRouteRequest.toString(), function*(action) {
    const { dep, arr } = action.payload;
    try {
      const response = yield call(getRoute, dep, arr);
      yield put(fetchRouteSuccess(response));
    } catch {
      yield put(fetchRouteFailure());
    }
  });
}

export default function*() {
  yield fork(fetchListWorker);
  yield fork(fetchRouteWorker);
}
