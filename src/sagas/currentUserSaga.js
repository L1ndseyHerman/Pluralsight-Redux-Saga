//  Something abt apply changes the scope of call?
import { take, put, call, apply } from "redux-saga/effects";
//  Lets u call the API... but doesn't React come w a "fetch()"?
//import fetch from "isomorphic-fetch";

import { GET_CURRENT_USER_INFO, setCurrentUser } from "./../actions";

//  "function*" means that it's a generator function:
export function* currentUserSaga() {
  const { id } = yield take(GET_CURRENT_USER_INFO);
  const response = yield call(fetch, `http://localhost:8081/user/${id}`);
  const data = yield apply(response, response.json);
  yield put(setCurrentUser(data));
}
