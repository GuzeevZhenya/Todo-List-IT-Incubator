export type RequestStatusType = "idle" | "loading" | "succeded" | "failed";

export const initialState = {
  status: "loading" as RequestStatusType,
  error: null as string | null,
};

export type setAppStatusType = ReturnType<typeof setAppStatusAC>;
export type setAppErrorType = ReturnType<typeof setErrorAC>;

type initialStateType = typeof initialState;

export const appReducer = (
  state: initialStateType = initialState,
  action: ActionType
): initialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS": {
      return { ...state, status: action.status };
    }

    case "APP/SET-ERROR": {
        return { ...state, error: action.error };
      }

    default:
      return state;
  }
};

export const setAppStatusAC = (status: RequestStatusType) =>
  ({
    type: "APP/SET-STATUS",
    status,
  } as const);

export const setErrorAC = (error: string | null) =>
  ({
    type: "APP/SET-ERROR",
    error,
  } as const);

type ActionType = setAppStatusType | setAppErrorType;
