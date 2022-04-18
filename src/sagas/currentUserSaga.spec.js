//  The first unit test!
//  fetch
import { take, call, put, apply } from "redux-saga/effects";

import { GET_CURRENT_USER_INFO, setCurrentUser } from "./../actions";

//  The saga u going to test:
import { currentUserSaga } from "./currentUserSaga";

//  So this is Jest I'm guessing?
describe("The current user saga", () => {
  test("It fetches and puts the current user's data", () => {
    //    These are mocks:
    //    Why backticks?
    const id = `NCC1701`;
    const user = { name: "Jean Luc" };
    const json = () => {};
    const response = { json };

    //  Generator object:
    const gen = currentUserSaga();

    //  Can test anything after a yield, and there's only 1 in currentUserSaga,
    //  so test the data after it:
    expect(gen.next().value).toEqual(take(GET_CURRENT_USER_INFO));
    //  Testing the id property:
    expect(gen.next({ id }).value).toEqual(
      call(fetch, `http://localhost:8081/user/${id}`)
    );
    expect(gen.next(response).value).toEqual(apply(response, json));
    expect(gen.next(user).value).toEqual(put(setCurrentUser(user)));
  });
});
