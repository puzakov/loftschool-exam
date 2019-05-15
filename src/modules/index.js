import { combineReducers } from "redux";
import { fork } from "redux-saga/effects";
import auth, { sagas as authSaga } from "./Auth";
import profile from "./Profile";
import { reducer as formReducer } from "redux-form";
// import followers, { sagas as followersSagas } from './Followers';
// import user, { sagas as userSagas } from './User';

export default combineReducers({
  auth,
  form: formReducer,
  profile
});
// export default combineReducers({ auth, followers, user });

export function* rootSaga() {
  yield fork(authSaga);
  // yield fork(followersSagas);
  // yield fork(userSagas);
}
