import { takeLatest, put, call, fork } from "redux-saga/effects";
import { fetchRequest, fetchSuccess, fetchFailure } from "./actions";
import { authorize } from "./api";

function* fetchAuthorizeWorker() {
  yield takeLatest(fetchRequest.toString(), function*(action) {
    const { email, password } = action.payload;
    try {
      const response = yield call(authorize, email, password);
      yield put(fetchSuccess(response));
    } catch {
      yield put(fetchFailure("Ошибка сервера"));
    }
  });
}

export default function*() {
  yield fork(fetchAuthorizeWorker);
}
