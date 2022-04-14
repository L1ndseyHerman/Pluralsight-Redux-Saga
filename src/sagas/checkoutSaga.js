import { take, call, put, select } from "./redux-saga/effects";
//  fetch

//  Seems like the State design pattern... but will he use it tho?
import {
  TOGGLE_CHECKING_OUT,
  QUANTITY_VERIFICATION_CHECKOUT_PHASE,
  CREDIT_VALIDATION_CHECKOUT_PHASE,
  ERROR_CHECKOUT_PHASE,
  PURCHASE_FINALIZATION_CHECKOUT_PHASE,
  SUCCESS_CHECKOUT_PHASE,
  setCheckoutPhase,
} from "./../actions";

import { currentUserSelector } from "./../selectors";

export function* validateCart(user) {
  const response = yield fetch(
    `http://localhost:8081/cart/validate/${user.get(`id`)}`
  );
  const { validated } = yield response.json();
  return validated;
}

export function* validateCreditCard(user) {
  const response = yield fetch(
    `http://localhost:8081/card/validate/${user.get(`id`)}`
  );
  const { validated } = yield response.json();
  return validated;
}

export function* checkout() {
  const user = yield select(currentUserSelector);
  //    Ah, this does look like the State design pattern.
  //    Or Chain of Command? Keeps going to next one unless an error state.
  //    ... guess it's state then since can error any time.
  yield put(setCheckoutPhase(QUANTITY_VERIFICATION_CHECKOUT_PHASE));
  yield call(validateCart, user);
  if (!cartValidated) {
    yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
    return;
  }
  console.info("Validated cart");

  yield put(setCheckoutPhase(CREDIT_VALIDATION_CHECKOUT_PHASE));
  const creditCardValidated = yield call(validateCreditCard, user);
  if (!creditCardValidated) {
    yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
    return;
  }

  yield put(setCheckoutPhase(PURCHASE_FINALIZATION_CHECKOUT_PHASE));
  //    The "call()" here makes it easier to test the app later.
  const purchaseSuccessful = yield call(executePurchase, user);

  if (!purchaseSuccessful) {
    yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
    return;
  }

  yield put(setCheckoutPhase(SUCCESS_CHECKOUT_PHASE));
}

export function* checkoutSaga() {
  while (true) {
    const isCheckingOut = yield take(TOGGLE_CHECKING_OUT);
    if (isCheckingOut) {
      yield call(checkout);
    }
  }
}
