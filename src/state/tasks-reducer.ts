import { FilterValuesType, TasksStateType, TodolistType } from "../App";
import { v1 } from "uuid";
import { AddTodolistActionType } from "./todolists-reducer";
import { RemoveTodolistActionType } from "./todolists-reducer";

export type RemoveTaskType = ReturnType<typeof removeTaskAC>;
export type AddTaskType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleType = ReturnType<typeof changeTitleTaskAC>;
// export type AddTodolist = ReturnType<typeof AddTodolistAC>;

type ActionsType =
  | RemoveTaskType
  | AddTaskType
  | ChangeTaskStatusType
  | ChangeTaskTitleType
  | AddTodolistActionType
  | RemoveTodolistActionType;

let initialState: TasksStateType = {};

export const tasksReducer = (
  state = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (el) => el.id != action.payload.taskId
        ),
      };

    case "ADD-TASK":
      let newTask = {
        id: v1(),
        title: action.payload.title,
        isDone: false,
      };

      return {
        ...state,
        [action.payload.todolistId]: [
          newTask,
          ...state[action.payload.todolistId],
        ],
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(
          (el) =>
            el.id === action.payload.id
              ? { ...el, isDone: action.payload.isDone }
              : el
        ),
      };

    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(
          (el) =>
            el.id === action.payload.id
              ? { ...el, title: action.payload.newTitle }
              : el
        ),
      };

    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolistId]: [],
      };

    case "REMOVE-TODOLIST": {
      // let copyState = { ...state };
      // delete copyState[action.id];
      // return copyState;
      let {
        [action.id]: [],
        ...rest
      } = state;
      return rest;
    }

    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      taskId,
      todolistId,
    },
  } as const;
};
export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      title,
      todolistId,
    },
  } as const;
};

export const changeTaskStatusAC = (
  id: string,
  isDone: boolean,
  todolistId: string
) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: {
      id,
      isDone,
      todolistId,
    },
  } as const;
};

export const changeTitleTaskAC = (
  id: string,
  newTitle: string,
  todolistId: string
) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: {
      id,
      newTitle,
      todolistId,
    },
  } as const;
};

// export const removeTodolistAC = (todolistId: string) => {
//   return {
//     type: "CHANGE-TASK-TITLE",
//     payload: {
//       todolistId,
//     },
//   } as const;
// };
