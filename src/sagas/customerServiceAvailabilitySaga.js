import { take, put } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { connect } from "../createSocketConnection";
import { setCustomerServiceAvailability } from "../actions";

export function* customerServiceAvailabilitySaga() {
  const socket = connect();
  const chan = new eventChannel((emit) => {
    const enableSupportMessage = () => {
      emit(true);
    };
    const disableSupportMessage = () => {
      emit(false);
    };

    //  Oh gosh, it's sockets! :O
    socket.on(`SUPPORT_AVAILABLE`, enableSupportMessage);
    socket.on(`SUPPORT_NOT_AVAILABLE`, disableSupportMessage);

    //  Removing the listeners would go here if u need to, but don't for this.
    return () => {};
  });

  while (true) {
    let supportAvailable = yield take(chan);
    yield put(setCustomerServiceAvailability(supportAvailable));
  }
}
