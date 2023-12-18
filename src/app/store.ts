import { tasksReducer } from "features/TodolistsList/tasks-reducer";
import { todolistsReducer } from "features/TodolistsList/todolists-reducer";
import { AnyAction, combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ThunkAction } from "redux-thunk";

import { appReducer } from "./app-reducer";
import { authReducer } from "features/TodolistsList/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

// непосредственно создаём store
// export const store = legacy_createStore(
//   rootReducer,
//   applyMiddleware(thunkMiddleware)
// );

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
});

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>;
// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  void,
  AppRootStateType,
  unknown,
  AnyAction
>;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

//еще 1 вариант
// export type AppRootStateType = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppRootStateType,
//   unknown,
//   AnyAction
// >;
// export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

// window.store = store;
