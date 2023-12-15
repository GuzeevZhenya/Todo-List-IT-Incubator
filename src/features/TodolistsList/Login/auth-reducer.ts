import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";
import { authAPI } from "api/todolists-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "utils/error-utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk, AppThunkDispatch } from "app/store";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const authReducer = slice.reducer;
export const authAction = slice.actions;

// thunks
export const loginTC =
  (data: any): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await authAPI.login(data);

      if (res.data.resultCode === 0) {
        dispatch(authAction.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      handleServerNetworkError(error as { message: string }, dispatch);
    }
  };

export const authTC = (): AppThunk => async (dispatch) => {
  const res = await authAPI.me();
  try {
    if (res.data.resultCode === 0) {
      dispatch(authAction.setIsLoggedIn({ isLoggedIn: true }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error) {
    handleServerNetworkError(error as { message: string }, dispatch);
  } finally {
    dispatch(appActions.setAppInitialized({ initialized: true }));
  }
};

export const logOutTC = (): AppThunk => async (dispatch) => {
  try {
    const res = await authAPI.logOut();
    if (res.data.resultCode === 0) {
      dispatch(authAction.setIsLoggedIn({ isLoggedIn: true }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error) {
    handleServerNetworkError(error as { message: string }, dispatch);
  } finally {
    dispatch(appActions.setAppInitialized({ initialized: true }));
  }
};
