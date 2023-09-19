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
