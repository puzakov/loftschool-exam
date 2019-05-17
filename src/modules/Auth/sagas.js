import { takeLatest, put, call, fork } from "redux-saga/effects";
import { fetchRequest, fetchSuccess, fetchFailure } from "./actions";
import { apiRequest } from "../api";

function* fetchAuthorizeWorker() {
  yield takeLatest(fetchRequest.toString(), function*(action) {
    const { email, password } = action.payload;
    try {
      const response = yield call(
        apiRequest,
        `auth?username=${email}&password=${password}`
      );
      yield put(fetchSuccess(response));
    } catch {
      yield put(fetchFailure("Ошибка сервера"));
    }
  });
}

export default function*() {
  yield fork(fetchAuthorizeWorker);
}
