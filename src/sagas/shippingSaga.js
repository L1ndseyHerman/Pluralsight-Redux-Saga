import { select, put, takeLatest } from "redux-saga/effects";
//  fetch

import {
  SET_CART_ITEMS,
  INCREASE_ITEM_QUANTITY,
  DECREASE_ITEM_QUANTITY,
  FETCHED,
  FETCHING,
  setShippingFetchStatus,
  setShippingCost,
} from "./../actions";

import { cartItemsSelector } from "../selectors";

function* shipping() {
  yield put(setShippingFetchStatus(FETCHING));
  const items = yield select(cartItemsSelector);

  //    Not right, but not worrying abt it.
  /*const itemRequestString = items.reduce((string, item => {
      for (let i = 0; i < item.get(`quantity`); i++) {
          string += item.get(`id`) + ",";
      }
      return string;
  },"").replace())*/

  const response = yield fetch(
    `http://localhost:8081/shipping/${itemRequestString}`
  );
  const { total } = yield response.json();
  yield put(setShippingCost(total));
  yield put(setShippingFetchStatus(FETCHED));
}

export function* shippingSaga() {
  //  When any of these actions are dispatched, it will start the
  //  shipping sub-process, but if any of them accidently happen
  //  more than once, it will stop the process and start all of them
  //  over again? Or does he just mean the one w the duplicate?
  yield takeLatest(
    [SET_CART_ITEMS, INCREASE_ITEM_QUANTITY, DECREASE_ITEM_QUANTITY],
    shipping
  );
}
