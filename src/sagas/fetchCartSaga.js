import { take, put } from "redux-saga/effects";
//import { fetch } from "isomorphic-fetch";

import { SET_CURRENT_USER, setCartItems } from "./../actions";
//import { GET_CURRENT_USER_INFO, setCartItems } from "./../actions";

export function* fetchCartSaga() {
  const { user } = yield take(SET_CURRENT_USER);
  console.log(user);
  const { id } = user;
  console.log(id);
  const owner = id.toString();
  console.log(owner);
  //const response = yield fetch(`http://localhost:8081/cart/${owner}`);
  //const response1 = yield fetch(`http://localhost:8081/user/${id}`);
  const response = yield fetch(`http://localhost:8081/cart/${id}`);
  //yield fetch(`http://localhost:8081/cart/${id}`);
  //const response = yield call(fetch, `http://localhost:8081/cart/${owner}`);
  console.log(response);
  //const items = yield apply(response, response.json);
  const { items } = yield response.json();
  yield put(setCartItems(items));
  console.info("Set cart items, ", items);
}

/*export function* fetchCartSaga() {
  //const { user } = yield take(SET_CURRENT_USER);
  //const { user } = yield take(GET_CURRENT_USER_INFO);
  const { id } = yield take(GET_CURRENT_USER_INFO);
  //const { id } = user;
  //const { owner } = user;
  //console.log("Id is: " + id);
  const response = yield fetch(`http://localhost:8081/cart/${id}`);
  //const response = yield fetch(`http://localhost:8081/cart/${owner}`);
  //console.log(response);
  //const response = yield fetch(`http://localhost:8081/cart/U10000`);
  //const response = call(fetch, `http://localhost:8081/cart/${id}`);
  const { items } = yield response.json();
  yield put(setCartItems(items));
  console.info("Set cart items,", items);
}*/
//  This says line 9 something isn't an object. Loading spinners not showing up.
