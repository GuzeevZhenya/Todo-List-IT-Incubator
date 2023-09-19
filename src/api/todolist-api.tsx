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
  addTodolists(title: string) {
    return instance.post<DeleteTodolistType>("todo-lists", { title });
  },
  deleteTodolists(id: string) {
    return instance.delete<CreateTodoListType>(`todo-lists/${id}`);
  },
  updateTodolists(todolistId: string, title: string) {
    instance.put(`todo-lists/${todolistId}`, {
      title,
    });
  },
};

type TodolistType = {
  id: string;
  title: string;
  addedDate: Date;
  order: number;
};

type DeleteTodolistType = {
  resultCode: number;
  messages: string[];
  data: {};
};

type CreateTodoListType = {
  resultCode: number;
  messages: string[];
  data: {
    item: TodolistType;
  };
};

type UpdateTodoListTyhpe = {
  data: {};
  fieldsErrors: [];
  messages: [];
  resultCode: number;
};
