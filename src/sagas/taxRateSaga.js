import { take, put } from "redux-saga/effects";
//fetch

import { SET_CURRENT_USER, setTaxRate } from "./../actions";

export function* taxRateSaga() {
  //  Runs once at the beginning, BEC TAX RATE UNLIKELY TO CHANGE DURING
  //  THE TRANSACTION!
  const { user } = yield take(SET_CURRENT_USER);
  //  Runs whenever the "SET_CURRENT_USER" event runs:
  const { country } = user;
  const response = yield fetch(`http://localhost:8081/tax/${country}`);
  const { rate } = yield response.json();
  yield put(setTaxRate(rate));
}
