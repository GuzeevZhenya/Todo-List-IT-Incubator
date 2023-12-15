import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    initialized: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (
      state,
      action: PayloadAction<{ initialized: boolean }>
    ) => {
      state.initialized = action.payload.initialized;
    },
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export type AppInitialState = ReturnType<typeof slice.getInitialState>;

// export const _appReducer = (
//   state: InitialStateType = initialState,
//   action: ActionsType
// ): InitialStateType => {
//   switch (action.type) {
//     case "APP/SET-STATUS":
//       return { ...state, status: action.status };

//     case "APP/SET-INITIALIZED":
//       return { ...state, initialized: action.isInitialized };
//     default:
//       return { ...state };
//   }
// };

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
