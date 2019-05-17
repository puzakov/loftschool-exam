import { takeLatest, put, call, fork } from "redux-saga/effects";
import {
  fetchListFailure,
  fetchListRequest,
  fetchListSuccess,
  fetchRouteFailure,
  fetchRouteRequest,
  fetchRouteSuccess
} from "./actions";
import { apiRequest } from "../api";

function* fetchListWorker() {
  yield takeLatest(fetchListRequest.toString(), function*(action) {
    try {
      const response = yield call(apiRequest, "addressList");
      yield put(fetchListSuccess(response.addresses));
    } catch {
      yield put(fetchListFailure());
    }
  });
}

function* fetchRouteWorker() {
  yield takeLatest(fetchRouteRequest.toString(), function*(action) {
    const { dep, arr } = action.payload;
    try {
      const response = yield call(
        apiRequest,
        `route?address1=${dep}&address2=${arr}`
      );
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
