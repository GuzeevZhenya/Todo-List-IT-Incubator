import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  UpdateTaskModelType,
} from "../../api/todolists-api";

import { AppRootStateType, AppThunk, AppThunkDispatch } from "../../app/store";

import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { appActions } from "app/app-reducer";
import { todolistsActions } from "./todolists-reducer";
import { createAppAsyncThunk } from "utils/createAsyncThunk";

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (
      state,
      action: PayloadAction<{ taskId: string; todolistId: string }>
    ) => {
      const tasksForTodolists = state[action.payload.todolistId];
      const index = tasksForTodolists.findIndex(
        (task) => task.id === action.payload.taskId
      );
      if (index !== -1) {
        tasksForTodolists.splice(index, 1);
      }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasksForTodolist = state[action.payload.task.todoListId];
      tasksForTodolist.unshift(action.payload.task);
    },

    updateTask: (
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        apiModel: UpdateDomainTaskModelType;
      }>
    ) => {
      const tasksForTodolist = state[action.payload.todolistId];
      const index = tasksForTodolist.findIndex(
        (task) => task.id === action.payload.taskId
      );
      if (index !== -1) {
        tasksForTodolist[index] = {
          ...tasksForTodolist[index],
          ...action.payload.apiModel,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsActions.removeTodolists, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      });
    // .addCase(fetchTasks.fulfilled, (state, action) => {
    //   const tasksForTodolist = state[action.payload.task.todoListId];
    //  tasksForTodolist.unshift(action.payload.task);
    // });
  },
});

export const fetchTasks = createAppAsyncThunk<
  {
    tasks: TaskType[];
    todolistId: string;
  },
  string
>("tasks/fetchTasks", async (todolistId: string, thunkApi) => {
  const { dispatch, rejectWithValue } = thunkApi;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistsAPI.getTasks(todolistId);
    const tasks = res.data.items;
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return { tasks, todolistId };
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

export const removeTasks = createAsyncThunk(
  "/tasks/removeTasks",
  async (param: { taskId: string; todolistId: string }, thunkApi) => {
    const { dispatch } = thunkApi;
    const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId);
    const action = tasksActions.removeTask({
      taskId: param.taskId,
      todolistId: param.todolistId,
    });
    dispatch(action);
  }
);

// thunks

// export const addTask = createAsyncThunk (
//   "/tasks/addTasks",
//   param: { title: string; todolistId: string },
//   thinkApi
// ) => {

// export const addTask = createAsyncThunk(
//   "/tasks/addTasks",
//   (param: { title: string; todolistId: string }, thunkApi) => {
//     const { dispatch } = thunkApi;
//     const res = todolistsAPI.createTask(param.todolistId, param.title);
//     const task = res.data.data.item;
//     const action = tasksActions.addTaskAC({ task });
//     dispatch(action);
//   }
// );

// export const addTaskTC =
//   (title: string, todolistId: string): AppThunk =>
//   (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: "loading" }));
//     todolistsAPI
//       .createTask(todolistId, title)
//       .then((res) => {
//         if (res.data.resultCode === 0) {
//           const task = res.data.data.item;
//           const action = tasksActions.addTaskAC({ task });
//           dispatch(action);
//           dispatch(appActions.setAppStatus({ status: "succeeded" }));
//         } else {
//           handleServerAppError(res.data, dispatch);
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(error, dispatch);
//       });
//   };
export const updateTaskTC =
  (
    taskId: string,
    domainModel: UpdateDomainTaskModelType,
    todolistId: string
  ): AppThunk =>
  (dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn("task not found in the state");
      return;
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    };

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === 0) {
          const action = tasksActions.updateTask({
            taskId,
            todolistId,
            apiModel: domainModel,
          });
          dispatch(action);
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunk = { fetchTasks, removeTasks };
