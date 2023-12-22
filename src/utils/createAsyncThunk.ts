import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunkDispatch, AppRootStateType } from "app/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppThunkDispatch;
  rejectValue: null;
}>();
