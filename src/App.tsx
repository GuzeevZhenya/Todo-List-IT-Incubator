import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TaskStatuses, TaskType, Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Menu } from "@mui/icons-material";
import {
  AddTodolistTC,
  GetTodolistsTC,
  RemoveTodolistTC,
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  addTasksTC,
  changeTaskStatusAC,
  getTasksTC,
  removeTaskAC,
  removeTaskTC,
  updateTaskTC,
} from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { ThunkType, AppRootStateType, useAppDispatch } from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  addedDate: Date;
  order: number;
  // filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetTodolistsTC());
  }, []);

  const removeTask = useCallback(function (id: string, todolistId: string) {
    console.log(todolistId, id);
    const thunk = removeTaskTC(todolistId, id);
    dispatch(thunk);
  }, []);

  const addTask = useCallback(function (title: string, todolistId: string) {
    const thunk = addTasksTC(title, todolistId);
    dispatch(thunk);
  }, []);



  const updateTask = useCallback(function (
    id: string,
    todolistId: string,
    title?: string,
    status?: TaskStatuses
  ) {
    const action = updateTaskTC(todolistId, id, { title, status });
    dispatch(action);
  },
  []);

  const changeFilter = useCallback(function (
    value: FilterValuesType,
    todolistId: string
  ) {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatch(action);
  },
  []);

  const removeTodolist = useCallback(function (id: string) {
    const thunk = RemoveTodolistTC(id);
    dispatch(thunk);
  }, []);

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatch(action);
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      console.log(title);
      const thunk = AddTodolistTC(title);
      dispatch(thunk);
    },
    [dispatch]
  );

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let allTodolistTasks = tasks[tl.id];

            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    todolist={tl}
                    id={tl.id}
                    title={tl.title}
                    tasks={allTodolistTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    // filter={tl.filter}
                    removeTodolist={removeTodolist}
                    updateTask={updateTask}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
