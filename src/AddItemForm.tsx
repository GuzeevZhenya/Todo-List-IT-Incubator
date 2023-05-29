<<<<<<< HEAD
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


=======
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type PropsType = {
  callBack: (newTitle: string) => void;
};

export const AddItemForm = (props: PropsType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);
>>>>>>> 3caf1b5f062495e2cde39a0b5f20fb984c4641a2

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

<<<<<<< HEAD
export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
=======
  const addHandler = () =>{

  }

  const addTask = () => {
    let newTitle = title.trim();
    if (newTitle !== "") {
      props.callBack(newTitle);
      setTitle("");
    } else {
      setError("Title is required");
>>>>>>> 3caf1b5f062495e2cde39a0b5f20fb984c4641a2
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

<<<<<<< HEAD
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox />
        </IconButton>
=======
  return (
    <div>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
>>>>>>> 3caf1b5f062495e2cde39a0b5f20fb984c4641a2
    </div>
}
