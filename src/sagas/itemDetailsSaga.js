import { take, fork, put } from "redux-saga/effects";
//import fetch from "isomorphic-fetch";

import { SET_CART_ITEMS, setItemDetails } from "./../actions";

export function* loadItemDetails(item) {
  //console.info("Item?", item);
  console.log("Got here");
  console.log(item);
  const { id } = item;
  const response = yield fetch(`http://localhost:8081/items/${id}`);
  console.log(response);
  const data = yield response.json();
  const info = data[0];
  yield put(setItemDetails(info));
  //yield put(setItemDetails(data));
}

export function* itemDetailsSaga() {
  const { items } = yield take(SET_CART_ITEMS);
  console.log(items);
  const response = yield items.map((item) => fork(loadItemDetails, item));
  console.log(response);
  //yield items.map((item) => fork(loadItemDetails, item));
  //yield items.map((item) => fork(loadItemDetails(item)));
}
