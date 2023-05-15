import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {TaskType} from './Todolist';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TaskTypes = {
  [id: string]: TaskType[];
};

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ]);

  let [tasks, setTasks] = useState<TaskTypes>({
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
  });

  let [filter, setFilter] = useState<FilterValuesType>('all');

  function removeTask(todolistsID: string, taskID: string) {
    setTasks({
      ...tasks,
      [todolistsID]: tasks[todolistsID].filter((el) => el.id != taskID),
    });
  }

  function addTask(todolistsID: string, title: string) {
    let task = {id: v1(), title: title, isDone: false};

    setTasks({...tasks, [todolistsID]: [...tasks[todolistsID], task]});
  }

  function changeStatus(todolistsID: string, taskId: string, isDone: boolean) {
    setTasks({
      ...tasks,
      [todolistsID]: [
        ...tasks[todolistsID].map((el) =>
          el.id === taskId ? {...el, isDone} : el
        ),
      ],
    });
  }

  function changeFilter(todolistsID: string, value: FilterValuesType) {
    setTodolists(
      todolists.map((el) =>
        el.filter === todolistsID ? {...el, filter: value} : el
      )
    );
  }

  function removeTodoList(todolistsID: string) {
    setTodolists(todolists.filter((el) => el.id != todolistsID));
    delete tasks[todolistsID];
  }

  const addTodoLists = () => {
    const newTodolistID = v1();

  };

  return (
    <div className='App'>
      <AddItemForm todolistId={'props.id'} addTask={addTodoLists} />
      {todolists.map((el) => {
        let tasksForTodolist = tasks[el.id];

        if (el.filter === 'active') {
          console.log(el.id);
          tasksForTodolist = tasks[el.id].filter((t) => t.isDone === false);
        }
        if (el.filter === 'completed') {
          tasksForTodolist = tasks[el.id].filter((t) => t.isDone === true);
        }

        return (
          <Todolist
            title={el.title}
            todolistsID={el.id}
            key={el.id}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={filter}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
