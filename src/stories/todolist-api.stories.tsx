import axios from "axios";
import React, { useEffect, useState } from "react";

export default {
  title: "API",
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "c8a46d02-6c53-4b46-a5bc-12e0cc125486",
  },
});

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    instance.get("todo-lists").then((res) => setState(res.data));
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    instance
      .post("todo-lists", { title: "12312313" })
      .then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    instance
      .delete(`todo-lists/${"447ab928-860b-4839-b72c-83c054199991"}`)
      .then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    instance
      .put(`todo-lists/447ab928-860b-4839-b72c-83c054199991`, { title: "2" })
      .then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "b7cca0b7-a0a4-4f42-a5e3-e698fedc44d8";
  useEffect(() => {
    instance
      .get(`todo-lists/${todolistId}/tasks`)
      .then((res) => setState(res.data));
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTasks = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "b7cca0b7-a0a4-4f42-a5e3-e698fedc44d8";
  useEffect(() => {
    instance
      .post(`todo-lists/${todolistId}/tasks`, { title: "12312313" })
      .then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "b7cca0b7-a0a4-4f42-a5e3-e698fedc44d8";
  const taskId = "035da651-40e6-4215-8306-100d9c21eb46";
  useEffect(() => {
    instance
      .delete(`todo-lists/${todolistId}/tasks/${taskId}`)
      .then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdatTask = () => {
  const [state, setState] = useState<any>(null);
  const todolistId = "b7cca0b7-a0a4-4f42-a5e3-e698fedc44d8";
  const taskId = "4fc33ab2-fe97-4b62-9962-c58e3c3672e1";
  useEffect(() => {
    instance
      .put(`todo-lists/${todolistId}/tasks/${taskId}`, { title: "2" })
      .then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
