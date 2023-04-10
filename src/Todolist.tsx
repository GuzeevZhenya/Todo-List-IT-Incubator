import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {convertToObject} from 'typescript';

type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: number) => void;
  changeFilter: (value: FilterValuesType) => void;
};

export function Todolist(props: PropsType) {
  const [inputTask, setInputTask] = useState('');
  console.log(inputTask);
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input onChange={(e) => setInputTask(e.target.value)}/>
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => (
          <li key={t.id}>
            <input
              type='checkbox'
              checked={t.isDone}
            />
            <span>{t.title}</span>
            <button
              onClick={() => {
                props.removeTask(t.id);
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            props.changeFilter('all');
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            props.changeFilter('active');
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.changeFilter('completed');
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
