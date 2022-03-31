import { createStore, applyMiddleware, compose } from "redux";

import { createLogger } from "redux-logger";
import { Iterable } from "immutable";
import thunk from "redux-thunk";

import { getQuery } from "./utility";
import { reducer } from "./combineReducers";
import { defaultState } from "./defaultState";

//  New! Lets u have mult middlewares in mult parts of app!
import createSagaMiddleware from "redux-saga";
//  Runs the sagas:
import { initSagas } from "./initSagas";

const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  else return state;
};

const logger = createLogger({
  stateTransformer,
});

export const getStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  //    The "thunk" was there already:
  const middleWares = [sagaMiddleware, thunk];
  if (getQuery()["logger"]) {
    middleWares.push(logger);
  }
  const composables = [applyMiddleware(...middleWares)];
  const enhancer = compose(...composables);
  const store = createStore(reducer, defaultState, enhancer);
  //    I guess this is the same as console.log()?
  console.info("Saga middleware implemented.");
  //    Call this at the very end!:
  //    Needs to happen after the middleware is placed inside this store.
  initSagas(sagaMiddleware);
  return store;
};
