import axios from "axios";
import { config } from "process";
import React, { useEffect, useState } from "react";
import { TodolistAPI } from "../api/api";
// import { todolistsAPI } from "../todolists.api";
export default {
  title: "API",
};

const settings = {
  withCredentials: true,
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const response = TodolistAPI.getTodolists().then((res): void => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    TodolistAPI.createTodoLists().then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "1c79907e-3ba5-49ff-a60b-d8309022fce4";

    TodolistAPI.deleteTodoLists(todolistId).then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "22b20928-89a6-4458-9fd6-620492238d42";
    const title = "new title";

    TodolistAPI.updateTodoLists(todolistId, title).then((res) =>
      setState(res.data)
    );
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const todolitsId = "f8c0c711-d5e6-41a8-8086-461b4f850a40";

  useEffect(() => {
    TodolistAPI.getTasks(todolitsId).then((res): void => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTasks = () => {
  const [state, setState] = useState<any>(null);
  const todolitsId = "f8c0c711-d5e6-41a8-8086-461b4f850a40";
  const title = "1";

  useEffect(() => {
    TodolistAPI.createTask(todolitsId, title).then((res): void => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null);
  const todolitsId = "f8c0c711-d5e6-41a8-8086-461b4f850a40";
  const taskId = "d3330d3d-33b3-4756-ab4a-b59f711c9aac";

  useEffect(() => {
    TodolistAPI.deleteTask(todolitsId, taskId).then((res): void => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTasks = () => {
  const [state, setState] = useState<any>(null);
  const todolitsId = "f8c0c711-d5e6-41a8-8086-461b4f850a40";
  const taskId = "7454da2a-7ba2-4ff6-9dc0-8a911322274f";
  const title = "2";

  useEffect(() => {
    TodolistAPI.updateTask(todolitsId, taskId, title).then((res): void => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

// export const CreateTodolist = () => {
//   const [state, setState] = useState<any>(null);
//   const [todolistTitle, setTodolistTutle] = useState("");

//   const createTodolist = () => {
//     todolistsAPI
//       .createTodolists(todolistTitle)
//       .then((res) => setState(res.data));
//   };

//   return (
//     <div>
//       {JSON.stringify(state)}
//       <div>
//         <input
//           value={todolistTitle}
//           onChange={(e) => setTodolistTutle(e.currentTarget.value)}
//         />
//         <button onClick={createTodolist}>delete todolist</button>
//       </div>
//     </div>
//   );
// };

// export const DeleteTodolist = () => {
//   const [state, setState] = useState<any>(null);
//   const [todolistId, setTodolistId] = useState("");

//   const deleteTodolist = () => {
//     todolistsAPI.removeTodolist(todolistId).then((res) => setState(res.data));
//   };

//   return (
//     <div>
//       {JSON.stringify(state)}
//       <div>
//         <input
//           value={todolistId}
//           onChange={(e) => setTodolistId(e.currentTarget.value)}
//         />
//         <button onClick={deleteTodolist}>delete todolist</button>
//       </div>
//     </div>
//   );
// };

// export const UpdateTodolistTitle = () => {
//   const [state, setState] = useState<any>(null);
//   const [todolistId, setTodolistId] = useState("");
//   const [todolistTitle, setTodolistTitle] = useState("");

//   const updateTodolistTitle = () => {
//     todolistsAPI
//       .updateTodolist(todolistId, todolistTitle)
//       .then((res) => setState(res.data));
//   };

//   return (
//     <div>
//       {JSON.stringify(state)}
//       <div>
//         <input
//           value={todolistId}
//           onChange={(e) => setTodolistId(e.currentTarget.value)}
//           placeholder="id"
//         />
//         <input
//           value={todolistTitle}
//           onChange={(e) => setTodolistTitle(e.currentTarget.value)}
//           placeholder="title"
//         />
//         <button onClick={updateTodolistTitle}>update todolist</button>
//       </div>
//     </div>
//   );
// };

// export const GetTasks = () => {
//   const [state, setState] = useState<any>({ name: "ivan" });
//   const [todolistId, setTodolistId] = useState("");

//   const getTasks = () => {
//     todolistsAPI.getTasks(todolistId).then((res) => setState(res.data));
//   };
//   return (
//     <div>
//       {JSON.stringify(state)}
//       <div>
//         <input
//           value={todolistId}
//           onChange={(e) => setTodolistId(e.currentTarget.value)}
//           placeholder="id"
//         />

//         <button onClick={getTasks}>get tasks</button>
//       </div>
//     </div>
//   );
// };

// export const DeleteTask = () => {
//   const [state, setState] = useState<any>(null);
//   const [todolisId, setTodolistId] = useState("");
//   const [taskId, setTaskId] = useState("");

//   const deleteTask = () => {
//     todolistsAPI
//       .deleteTask(todolisId, taskId)
//       .then((res) => setState(res.data));
//   };

//   return (
//     <div>
//       {JSON.stringify(state)}
//       <div>
//         <input
//           value={todolisId}
//           onChange={(e) => setTodolistId(e.currentTarget.value)}
//           placeholder="todolistId"
//         />
//         <input
//           value={taskId}
//           onChange={(e) => setTaskId(e.currentTarget.value)}
//           placeholder="taskId"
//         />

//         <button onClick={deleteTask}>delete tasks</button>
//       </div>
//     </div>
//   );
// };

// export const CreateTask = () => {
//   const [state, setState] = useState<any>(null);
//   const [taskTitle, setTaskTitle] = useState("");
//   const [todolistId, setTodolistId] = useState("");

//   const createTask = () => {
//     todolistsAPI
//       .createTasks(todolistId, taskTitle)
//       .then((res) => setState(res.data));
//   };

//   return (
//     <div>
//       {JSON.stringify(state)}
//       <div>
//         <input
//           value={todolistId}
//           onChange={(e) => setTodolistId(e.currentTarget.value)}
//           placeholder="id"
//         />
//         <input
//           value={taskTitle}
//           onChange={(e) => setTaskTitle(e.currentTarget.value)}
//           placeholder="title"
//         />
//         <button onClick={createTask}>create task</button>
//       </div>
//     </div>
//   );
// };

// export const UpdateTask = () => {
//   const [state, setState] = useState<any>(null);
//   const [taskTitle, setTaskTitle] = useState("");
//   const [taskId, setTaskId] = useState("");
//   const [todolistId, setTodolistId] = useState("");

//   const createTask = () => {
//     todolistsAPI
//       .updateTask(todolistId, taskId, taskTitle)
//       .then((res) => setState(res.data));
//   };

//   return (
//     <div>
//       {JSON.stringify(state)}
//       <div>
//         <input
//           value={todolistId}
//           onChange={(e) => setTodolistId(e.currentTarget.value)}
//           placeholder="TodolistId"
//         />
//         <input
//           value={taskId}
//           onChange={(e) => setTaskId(e.currentTarget.value)}
//           placeholder="TaskId"
//         />
//         <input
//           value={taskTitle}
//           onChange={(e) => setTaskTitle(e.currentTarget.value)}
//           placeholder="title"
//         />
//         <button onClick={createTask}>update task</button>
//       </div>
//     </div>
//   );
// };
