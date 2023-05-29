import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {TaskType} from '../Todolist';

// export type removeTaskType = ReturnType<typeof removeTaskAC>;
// export type addTaskType = ReturnType<typeof addTaskAC>;
// export type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;

// type ActionsType = removeTaskType | addTaskType | changeTaskStatusType;

// export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
//   switch (action.type) {
//     case 'REMOVE-TASK':
//       return {
//         ...state,
//         [action.payload.todolistId]: state[action.payload.todolistId].filter(
//           (t) => t.id !== action.payload.taskId
//         ),
//       };
//     case 'ADD-TASK':
//       let newTask: TaskType = {
//         id: v1(),
//         title: action.payload.title,
//         isDone: false,
//       };

//       return {
//         ...state,
//         [action.payload.todolistId]: [
//           newTask,
//           ...state[action.payload.todolistId],
//         ],
//       };

//     case 'CHANGE-TASK':
//       return {
//         ...state,
//         [action.payload.todolistId]: state[action.payload.todolistId].map(
//           (el) =>
//             el.id === action.payload.taskId
//               ? {...el, isDone: action.payload.isDone}
//               : el
//         ),
//       };

//     default:
//       throw new Error("I don't understand this type");
//   }
// };

// export const removeTaskAC = (taskId: string, todolistId: string) => {
//   return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const;
// };
// export const addTaskAC = (title: string, todolistId: string) => {
//   return {type: 'ADD-TASK', payload: {title, todolistId}} as const;
// };

// export const changeTaskStatusAC = (
//   taskId: string,
//   isDone: boolean,
//   todolistId: string
// ) => {
//   return {type: 'CHANGE-TASK', payload: {taskId, isDone, todolistId}} as const;
// };

export type removeTaskType = ReturnType<typeof removeTaskAC>;
export type addTaskType = ReturnType<typeof addTaskAC>;
// export type changeTaskStatusType = ReturnType<typeof removeTaskAC>;

type ActionsType = removeTaskType | addTaskType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (el) => el.id !== action.payload.taskId
        ),
      };
    case 'ADD-TASK':
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

    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      taskId,
      todolistId,
    },
  } as const;
};

export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      title,
      todolistId,
    },
  } as const;
};
export const changeTaskStatusAC = () => {};
