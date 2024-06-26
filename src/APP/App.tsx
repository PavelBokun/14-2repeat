import React, { useCallback, useEffect } from "react";
import "./App.css";
import { Todolist } from "../Todolist";
import { AddItemForm } from "../AddItemForm";
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
  addTodolistAC,
  addTodoListTC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  getTodosTC,
  removeTodolistAC,
  setTodoListsAC,
  TodolistDomainType,
} from "../state/todolists-reducer";
import {
  //   addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTasksTC,
  removeTaskAC,
  removeTasksTC,
  updateTasksTC,
} from "../state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";

import { TaskStatuses, TaskType, todolistsAPI } from "../api/todolists-api";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import CustomizedSnackbars from "../components/ErrorSnackBar/ErrorSnackBar";
import { AppRootStateType, useAppDispach, AppDispatchType } from "./store";
import { RequestStatusType } from "./app-reducer";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks
  );
  const status = useSelector <AppRootStateType, RequestStatusType>(state=>state.app.status)
  const dispatch = useAppDispach();
  

  const removeTask = useCallback(function (id: string, todolistId: string) {
    // const action = removeTaskAC(id, todolistId);
    dispatch(removeTasksTC(todolistId, id));
  }, []);

  const addTask = useCallback(function (title: string, todolistId: string) {
    // const action = addTaskAC(title, todolistId);

    dispatch(createTasksTC(todolistId, title));
  }, []);

  const changeStatus = useCallback(function (
    id: string,
    status: TaskStatuses,
    todolistId: string
  ) {
    // const action = changeTaskStatusAC(id, status, todolistId);
    dispatch(updateTasksTC(todolistId, id, status));
  },
  []);

  const changeTaskTitle = useCallback(function (
    id: string,
    newTitle: string,
    todolistId: string
  ) {
    const action = changeTaskTitleAC(id, newTitle, todolistId);
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
    const action = removeTodolistAC(id);
    dispatch(action);
  }, []);

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatch(action);
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      // const action = addTodolistAC(title);
      dispatch(addTodoListTC(title));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getTodosTC());
  }, []);

  return (
    <div className="App">
      <CustomizedSnackbars />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
       { status === "loading"? <LinearProgress />: <div></div>}
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            console.log(tasks);
            let allTodolistTasks = tasks[tl.id];

            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    id={tl.id}
                    title={tl.title}
                    tasks={allTodolistTasks}
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
