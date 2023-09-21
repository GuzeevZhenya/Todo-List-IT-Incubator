import React, { useCallback, useEffect } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Delete } from "@mui/icons-material";
import { Task } from "./Task";
import { FilterValuesType, TodolistType } from "./App";
import { TodolistDomainType } from "./state/todolists-reducer";
import { getTasksTC } from "./state/tasks-reducer";
import { useDispatch } from "react-redux";

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

type PropsType = {
  todolist: TodolistType;
  id: string;
  title: string;
  tasks: Array<TaskType>;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  // filter: FilterValuesType;
};

export const Todolist = React.memo(function (props: PropsType) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksTC(props.id));
  }, []);

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id]
  );

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.id, title);
    },
    [props.id, props.changeTodolistTitle]
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.id),
    [props.id, props.changeFilter]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.id),
    [props.id, props.changeFilter]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.id, props.changeFilter]
  );

  let tasksForTodolist = props.tasks;

  // if (props.filter === "active") {
  //   tasksForTodolist = props.tasks.filter((t) => t.isDone === false);
  // }
  // if (props.filter === "completed") {
  //   tasksForTodolist = props.tasks.filter((t) => t.isDone === true);
  // }

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {tasksForTodolist &&
          tasksForTodolist.map((t) => (
            <Task
              key={t.id}
              task={t}
              todolistId={props.id}
              removeTask={props.removeTask}
              changeTaskTitle={props.changeTaskTitle}
              changeTaskStatus={props.changeTaskStatus}
            />
          ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        {/* <Button
          variant={props.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button> */}
      </div>
    </div>
  );
});
