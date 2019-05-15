import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./modules";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();

const createAppStore = () => {
  const persistedReducer = persistReducer(
    { key: "state", storage },
    rootReducer
  );
  const store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : noop => noop
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createAppStore;
