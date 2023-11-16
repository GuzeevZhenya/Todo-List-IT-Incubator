import { Dispatch } from "redux";
import {
  SetAppErrorActionType,
  SetAppStatusActionType,
  setAppInitializedAC,
  setAppStatusAC,
} from "../../../app/app-reducer";
import { authAPI } from "../../../api/todolists-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../../utils/error-utils";

const initialState = {
  isLoggedIn: false,
  isAuth: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    case "login/SET-IS-AUTH-ME":
      return { ...state, isAuth: action.value };
    default:
      return state;
  }
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

export const setIsAuthMeAC = (value: boolean) =>
  ({ type: "login/SET-IS-AUTH-ME", value } as const);

// thunks
export const loginTC =
  (data: any) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    try {
      const res = await authAPI.login(data);

      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      handleServerNetworkError(error as { message: string }, dispatch);
    }
  };

export const authTC = () => async (dispatch: Dispatch) => {
  const res = await authAPI.me();
  try {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error) {
    handleServerNetworkError(error as { message: string }, dispatch);
  } finally {
    dispatch(setAppInitializedAC(true));
  }
};

export const logOutTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.logOut();
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(false));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error) {
    handleServerNetworkError(error as { message: string }, dispatch);
  } finally {
    dispatch(setAppInitializedAC(true));
  }
};

// types
type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setIsAuthMeAC>
  | SetAppStatusActionType
  | SetAppErrorActionType;
