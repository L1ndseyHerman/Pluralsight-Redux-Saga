//  HIS IMPORT IS DEPRECATED, "DELAY" COMES FROM "REDUX-SAGA/EFFECTS NOW!!"
import { delay } from "redux-saga/effects";
//  "function*" means that it's a generator function:
export function* currentUserSaga() {
  //  Something abt this would normally crash the computer, but doesn't w a delay?
  while (true) {
    //    Won't run until this much time has passed:
    yield delay(1000);
    console.info("User saga loop");
  }
}
