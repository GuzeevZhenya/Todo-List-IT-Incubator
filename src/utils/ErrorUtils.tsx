import { Dispatch } from "redux";
import { ResponseType } from "../api/todolists-api";

export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]));
  } else {
    dispatch(setErrorAC("someError"));
  }
  dispatch(setAppStatusAC("succeded"));
};
