import { TaskStatuses, TaskType, UpdateTaskModelType } from "../Todolist";
import { v1 } from "uuid";
import {
  AddTodolistActionType,
  GetTodolistsType,
  RemoveTodolistActionType,
} from "./todolists-reducer";
import { TasksStateType } from "../App";
import { Dispatch } from "redux";
import { todolistApi } from "../api/todolist-api";
import { AppRootStateType } from "./store";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  task: TaskType;
  todolistId: string;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  isDone: boolean;
};

export type UpdateTaskActionType = {
  type: "UPDATE-TASK";
  todolistId: string;
  taskId: string;
  task: TaskType;
};

type SetTasksActionType = ReturnType<typeof getTaskAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType
  | GetTodolistsType;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.filter((t) => t.id != action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      return {
        ...state,
        [action.todolistId]: [action.task, ...state[action.todolistId]],
      };
    }
    case "CHANGE-TASK-STATUS": {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, isDone: action.isDone } : t
      );

      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    case "CHANGE-TASK-TITLE": {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let newTasksArray = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      );

      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    // case 'ADD-TODOLIST': {
    //     return {
    //         ...state,
    //         [action.todolistId]: []
    //     }
    // }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    // case "GET-TODOLISTS": {
    //   const copyState = { ...state };
    //   action.todolists.forEach((tl) => {
    //     copyState[tl.id] = [];
    //   });
    //   return copyState;
    // }

    case "UPDATE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todoListId].map((tl) =>
          tl.id === action.taskId ? { tl, action: action.task } : tl
        ),
      };
    case "GET-TASKS": {
      return { ...state, [action.todolistId]: action.tasks };
    }
    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId };
};
export const addTaskAC = (
  todolistId: string,
  task: TaskType
): AddTaskActionType => {
  return { type: "ADD-TASK", task, todolistId };
};
export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", isDone, todolistId, taskId };
};
export const updateTaskAC = (
  taskId: string,
  todolistId: string,
  task: TaskType
): UpdateTaskActionType => {
  return { type: "UPDATE-TASK", task, todolistId, taskId };
};

export const getTaskAC = (tasks: TaskType[], todolistId: string): any => {
  return {
    type: "GET-TASKS",
    tasks,
    todolistId,
  } as const;
};

export const getTasksTC = (todolistId: string): any => {
  return (dispatch: Dispatch) => {
    todolistApi
      .getTasks(todolistId)
      .then((tl) => dispatch(getTaskAC(tl.data.items, todolistId)));
  };
};

export const addTasksTC = (title: string, todoListId: string): any => {
  return (dispatch: Dispatch) => {
    todolistApi
      .createTasks(todoListId, title)
      .then((tl) => dispatch(addTaskAC(todoListId, tl.data.data.item)));
  };
};

// export const removeTaskTC = (todolistId: string, taskId: string) => {
//   return (dispatch: Dispatch) => {
//     todolistApi
//       .deleteTasks(todolistId, taskId)
//       .then((tl) => dispatch(removeTaskAC(taskId, todolistId)));
//   };
// };

export const removeTaskTC = (todolistId: string, taskId: string): any => {
  return (dispatch: Dispatch) => {
    todolistApi
      .deleteTasks(todolistId, taskId)
      .then((res) => dispatch(removeTaskAC(taskId, todolistId)));
  };
};

type Args = {
  status?: TaskStatuses;
  title?: string;
};

export const updateTaskTC = (
  todolistId: string,
  taskId: string,
  args: Args
): any => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task: TaskType | undefined = getState().tasks[todolistId].find(
      (t) => t.id === taskId
    );

    if (task) {
      const model: UpdateTaskModelType = {
        deadline: task?.deadline,
        description: task?.description,
        priority: task?.priority,
        startDate: task?.startDate,
        status: task?.status,
        title: task?.title,
        ...args,
      };

      console.log(model);
      todolistApi
        .updateTasks(todolistId, taskId, model)
        .then((res) =>
          dispatch(updateTaskAC(taskId, todolistId, res.data.item))
        );
    }
  };
};
