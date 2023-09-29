import { useDispatch } from "react-redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import {
  combineReducers,
  createStore,
  applyMiddleware,
  AnyAction,
  legacy_createStore,
} from "redux";
import thunkMiddleware from "redux-thunk";
import thunk, { ThunkDispatch } from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});
// самостоятельно определяет что передается, функция или объект и вызываем(но не работает)
export type ThunkType = ThunkDispatch<AppRootStateType, any, AnyAction>;
// // непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const useAppDispatch = useDispatch<ThunkType>;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
