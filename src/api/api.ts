import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "c25f665c-bffb-4af7-a854-7ec03c488ed6",
  },
});

export const TodolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },

  createTodoLists() {
    return instance.post<TodolistType>("todo-lists", { title: "React" });
  },
  deleteTodoLists(todolistId: string) {
    return instance.delete<TodolistType>(`todo-lists/${todolistId}`);
  },

  updateTodoLists(todolistId: string, title: string) {
    return instance.put<TodolistType>(`todo-lists/${todolistId}`, { title });
  },
  getTasks(todolistsId: string) {
    return instance.get(`todo-lists/${todolistsId}/tasks`);
  },
  createTask(todolistsId: string, title: string) {
    return instance.post(`todo-lists/${todolistsId}/tasks`, { title });
  },
  deleteTask(todolistId: string, tasksId: string) {
    return instance.delete(`todo-lists/${todolistId}/tasks/${tasksId}`);
  },
  updateTask(todolistId: string, tasksId: string, title: string) {
    return instance.put(`todo-lists/${todolistId}/tasks/${tasksId}`, { title });
  },
};

// types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}


export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}
