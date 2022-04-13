//  Mentions "take" and "put" most commonly-used effects:
//  Action channel still comes from /effects, unlike event channel:
import { take, actionChannel, put } from "redux-saga/effects";

import {
  SET_SHIPPING_FETCH_STATUS,
  setCanCheckOut,
  FETCHED,
} from "./../actions";

export function* checkoutAvailabilitySaga() {
  const checkoutAvailabilityChannel = yield actionChannel(
    SET_SHIPPING_FETCH_STATUS
  );
  //    These while(true)s are just for his demo not real code, right?
  while (true) {
    const { status } = yield take(checkoutAvailabilityChannel);
    //  Anytime an item quantity goes up or down, or at the application start:
    //  True if status === FETCHED:
    yield put(setCanCheckOut(status === FETCHED));
    //  Makes it so the user can't click the checkout button when they
    //  aren't supposed to or something.
  }
}
