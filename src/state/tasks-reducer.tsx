import { FilterValuesType, TasksStateType, TodolistType } from "../App";
import { v1 } from "uuid";
import { TaskType } from "../Todolist";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";

export type removeTaskType = ReturnType<typeof removeTaskAC>;
export type addTaskType = ReturnType<typeof addTaskAC>;
export type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
export type changeTitleTaskType = ReturnType<typeof changeTitleTaskAC>;

type ActionsType =
  | removeTaskType
  | addTaskType
  | changeTaskStatusType
  | changeTitleTaskType
  | AddTodolistActionType
  | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (el) => el.id !== action.payload.taskId
        ),
      };
    case "ADD-TASK":
      let newTask: TaskType = {
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

    case "CHANGE-STATUS-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(
          (el) =>
            el.id === action.payload.taskId
              ? { ...el, isDone: action.payload.isDone }
              : el
        ),
      };

    case "CHANGE-TAKS-TITLE":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(
          (el) =>
            el.id === action.payload.taskId
              ? { ...el, title: action.payload.title }
              : el
        ),
      };

    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolistId]: [],
      };

    case "REMOVE-TODOLIST":
      let copyState = { ...state };
      delete copyState[action.id];
      return copyState;

      // let {
      //   [action.id]: [],
      //   ...rest
      // } = state;
      // return rest;

    default:
      throw new Error("I don't understand this type");
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
  taskId: string,
  isDone: boolean,
  todolistId: string
) => {
  return {
    type: "CHANGE-STATUS-TASK",
    payload: {
      taskId,
      isDone,
      todolistId,
    },
  } as const;
};

export const changeTitleTaskAC = (
  taskId: string,
  title: string,
  todolistId: string
) => {
  return {
    type: "CHANGE-TAKS-TITLE",
    payload: {
      taskId,
      title,
      todolistId,
    },
  } as const;
};
