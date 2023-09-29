import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "c8a46d02-6c53-4b46-a5bc-12e0cc125486",
  },
});

export const todolistApi = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {
      title,
    });
  },
  deleteTodolists(id: string) {
    return instance.delete<ResponseType<{ item: TodolistType }>>(
      `todo-lists/${id}`
    );
  },
  updateTodolists(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title,
    });
  },
  getTasks(todolistId: string) {
    return instance.get(`todo-lists/${todolistId}/tasks`);
  },
  createTasks(todolistId: string, title: string) {
    return instance.post(`todo-lists/${todolistId}/tasks`, { title });
  },
  deleteTasks(todolistId: string, taskId: string) {
    return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTasks(todolistId: string, taskId: string, title: string) {
    return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, { title });
  },
};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: Date;
  order: number;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
