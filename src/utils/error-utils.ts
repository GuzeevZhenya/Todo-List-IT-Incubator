import { appActions } from "../app/app-reducer";
import { ResponseType } from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppThunkDispatch } from "app/store";
import axios from "axios";
import { ErrorMessage } from "formik";

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch
) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};

export const _handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch
) => {
  dispatch(
    appActions.setAppError({
      error: error.message ? error.message : "Some error occurred",
    })
  );
  dispatch(appActions.setAppStatus({ status: "failed" }));
};

export const handleServerNetworkError = (
  err: unknown,
  dispatch: AppThunkDispatch
): void => {
  let error = "Some error occurred";
  if (axios.isAxiosError(err)) {
    error = err.response?.data?.message || err?.message || error;
  } else if (err instanceof Error) {
    error = `Native error : ${err.message}`;
  } else {
    error = JSON.stringify(err);
  }

  dispatch(appActions.setAppError({ error }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
