<<<<<<< HEAD
import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import {Menu} from '@mui/icons-material';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
=======
import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import { TaskType } from "./Todolist";
import { AddItemForm } from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
>>>>>>> 3caf1b5f062495e2cde39a0b5f20fb984c4641a2
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

<<<<<<< HEAD
  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
    ],
    [todolistId2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'React Book', isDone: true},
    ],
  });

  function removeTask(id: string, todolistId: string) {
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
    tasks[todolistId] = todolistTasks.filter((t) => t.id != id);
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks});
  }

  function addTask(title: string, todolistId: string) {
    let task = {id: v1(), title: title, isDone: false};
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
    tasks[todolistId] = [task, ...todolistTasks];
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks});
=======
  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TaskTypes>({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(todolistsID: string, taskID: string) {
    setTasks({
      ...tasks,
      [todolistsID]: tasks[todolistsID].filter((el) => el.id != taskID),
    });
  }

  function addTask(todolistsID: string, title: string) {
    let task = { id: v1(), title: title, isDone: false };

    setTasks({ ...tasks, [todolistsID]: [...tasks[todolistsID], task] });
>>>>>>> 3caf1b5f062495e2cde39a0b5f20fb984c4641a2
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    // найдём нужную таску:
    let task = todolistTasks.find((t) => t.id === id);
    //изменим таску, если она нашлась
    if (task) {
      task.isDone = isDone;
      // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({...tasks});
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    // найдём нужную таску:
    let task = todolistTasks.find((t) => t.id === id);
    //изменим таску, если она нашлась
    if (task) {
      task.title = newTitle;
      // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({...tasks});
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function removeTodolist(id: string) {
    // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
    setTodolists(todolists.filter((tl) => tl.id != id));
    // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
    delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasks});
  }

  function changeTodolistTitle(id: string, title: string) {
    // найдём нужный todolist
    const todolist = todolists.find((tl) => tl.id === id);
    if (todolist) {
      // если нашёлся - изменим ему заголовок
      todolist.title = title;
      setTodolists([...todolists]);
    }
  }

  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistType = {
      id: newTodolistId,
      title: title,
      filter: 'all',
    };
    setTodolists([newTodolist, ...todolists]);
    setTasks({
      ...tasks,
<<<<<<< HEAD
      [newTodolistId]: [],
    });
  }

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <Menu />
          </IconButton>
          <Typography variant='h6'>News</Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === 'active') {
              tasksForTodolist = allTodolistTasks.filter(
                (t) => t.isDone === false
              );
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = allTodolistTasks.filter(
                (t) => t.isDone === true
              );
            }
=======
      [todolistsID]: [
        ...tasks[todolistsID].map((el) =>
          el.id === taskId ? { ...el, isDone } : el
        ),
      ],
    });
  }

  function changeFilter(todolistsID: string, value: FilterValuesType) {
    setTodolists(
      todolists.map((el) =>
        el.filter === todolistsID ? { ...el, filter: value } : el
      )
    );
  }

  function removeTodoList(todolistsID: string) {
    setTodolists(todolists.filter((el) => el.id != todolistsID));
    delete tasks[todolistsID];
  }

  const addTodoLists = (title: string) => {
    const newTodolistID = v1();
    const newTodolist: TodolistsType = {
      id: newTodolistID,
      title,
      filter: "all",
    };
    setTodolists([...todolists, newTodolist]);
    setTasks({...tasks, [newTodolistID]:[]})

  };

  return (
    <div className="App">
      <AddItemForm callBack={addTodoLists} />
      {todolists.map((el) => {
        let tasksForTodolist = tasks[el.id];

        if (el.filter === "active") {
          console.log(el.id);
          tasksForTodolist = tasks[el.id].filter((t) => t.isDone === false);
        }
        if (el.filter === "completed") {
          tasksForTodolist = tasks[el.id].filter((t) => t.isDone === true);
        }
>>>>>>> 3caf1b5f062495e2cde39a0b5f20fb984c4641a2

            return (
              <Grid key={tl.id} item>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
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
