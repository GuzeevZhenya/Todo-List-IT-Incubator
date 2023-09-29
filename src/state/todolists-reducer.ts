import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";
import { Dispatch } from "redux";
import { todolistApi } from "../api/todolist-api";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  todolist: TodolistType;
};
export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};
export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
};

export type GetTodolistsType = ReturnType<typeof getTodolistsAC>;

// export type SetTodolistsType = {
//   type: "GET-TODOLISTS";
//   todolists: TodolistType[];
// };

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | GetTodolistsType;

const initialState: Array<TodolistType> = [];

export const todolistsReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionsType
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      const newTodolist = {
        ...action.todolist,
        filter: "all",
        entityStatus: "idle",
      };
      return [newTodolist, ...state];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title;
      }
      return [...state];
    }
    // case "CHANGE-TODOLIST-FILTER": {
    //   const todolist = state.find((tl) => tl.id === action.id);
    //   if (todolist) {
    //     // если нашёлся - изменим ему заголовок
    //     todolist.filter = action.filter;
    //   }
    //   return [...state];
    // }

    case "GET-TODOLISTS": {
      return action.todolists.map((tl) => {
        return {
          ...tl,
          filter: "all",
        };
      });
    }
    default:
      return state;
  }
};

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};
export const addTodolistAC = (
  todolist: TodolistType
): AddTodolistActionType => {
  console.log(todolist);
  return { type: "ADD-TODOLIST", todolist };
};
export const changeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title };
};
export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter };
};

export const getTodolistsAC = (todolists: TodolistType[]) => {
  return { type: "GET-TODOLISTS", todolists } as const;
};

export const GetTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    todolistApi
      .getTodolists()
      .then((res) => dispatch(getTodolistsAC(res.data)));
  };
};

export const AddTodolistTC = (title: string): any => {
  return (dispatch: Dispatch) => {
    todolistApi
      .createTodolist(title)
      .then((res) => dispatch(addTodolistAC(res.data.data.item)));
  };
};

export const RemoveTodolistTC = (id: string): any => {
  return (dispatch: Dispatch) => {
    console.log(id);
    todolistApi
      .deleteTodolists(id)
      .then((res) => dispatch(removeTodolistAC(id)));
  };
};
