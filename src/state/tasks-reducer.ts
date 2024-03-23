import { TasksStateType } from "../APP/App";
import { v1 } from "uuid";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsType,
} from "./todolists-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
  todolistsAPI,
} from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "../APP/store";
import { setAppErrorAC, setAppStatusAC } from "../APP/app-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todolistId: string;
  taskId: string;
};

// export type AddTaskActionType = {
//   type: "ADD-TASK";
//   todolistId: string;
//   title: string;
// };

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  todolistId: string;
  taskId: string;
  status: TaskStatuses;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  todolistId: string;
  taskId: string;
  title: string;
};

type ActionsType =
  | RemoveTaskActionType
  //   | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsType
  | SetTasksType
  | ReturnType<typeof setTask>;

const initialState: TasksStateType = {
  /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/
};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    // case "ADD-TASK": {
    //   const stateCopy = { ...state };
    //   const newTask: TaskType = {
    //     id: v1(),
    //     title: action.title,
    //     status: TaskStatuses.New,
    //     todoListId: action.todolistId,
    //     description: "",
    //     startDate: "",
    //     deadline: "",
    //     addedDate: "",
    //     order: 0,
    //     priority: TaskPriorities.Low,
    //   };
    //   const tasks = stateCopy[action.todolistId];
    //   const newTasks = [newTask, ...tasks];
    //   stateCopy[action.todolistId] = newTasks;
    //   return stateCopy;
    // }
    case "CHANGE-TASK-STATUS": {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, status: action.status } : t
      );

      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    case "CHANGE-TASK-TITLE": {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let newTasksArray = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      );

      state[action.todolistId] = newTasksArray;
      return { ...state };
    }
    case "SET-TODOLISTS": {
      const copyState = { ...state };
      action.todolists.forEach((tl) => {
        copyState[tl.id] = [];
      });
      return copyState;
    }

    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    case "SET-TASKS": {
      //  action.todoId
      return { ...state, [action.todoId]: action.tasks };
    }
    case "SET-TASK": {
      //  action.task
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };
    }
    // case "SET-TASKS":{
    //    return {...state,[action.todoId]:action.tasks}
    // }
    // case "SET-TASK":{
    //    return {...state,[action.task.todoL]:[action.task,...state[action.task.todoListId]]}
    // }
    // case "SET-TASKS":{
    //    return {...state,[action.todoId]:action.tasks}
    // }
    // case "SET-TASK":{
    //    return {...state,[action.task.todoL]:[action.task,...state[action.task.todoListId]]}
    // }
    // case "SET-TASKS":{
    //    return {...state,[action.todoId]:action.tasks}
    // }
    // case "SET-TASK":{
    // case "SET-TASK":{
    //    return {
    //     ...state,[action.task.todoL]:[action.task,...state[action.task.todoListId]]
    //    }
    // }
    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId };
};
// export const addTaskAC = (
//   title: string,
//   todolistId: string
// ): AddTaskActionType => {
//   return { type: "ADD-TASK", title, todolistId };
// };
export const changeTaskStatusAC = (
  taskId: string,
  status: TaskStatuses,
  todolistId: string
): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", status, todolistId, taskId };
};
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", title, todolistId, taskId };
};

export type SetTasksType = ReturnType<typeof setTasks>;
export const setTasks = (todoId: string, tasks: TaskType[]) =>
  ({ type: "SET-TASKS", tasks, todoId } as const);

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  // внутри санки можно делать побочные эффекты (запросы на сервер)
  todolistsAPI.getTasks(todoId).then((res) => {
    // и диспатчить экшены (action) или другие санки (thunk)
    dispatch(setTasks(todoId, res.data.items));
    dispatch(setAppStatusAC("succeeded"));
  });
};
export type CreateTask = ReturnType<typeof setTask>;
export const setTask = (task: TaskType) =>
  ({ type: "SET-TASK", task } as const);
export const createTasksTC =
  (todoListId: string, title: string) => (dispatch: Dispatch) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistsAPI.createTask(todoListId, title).then((res) => {
      if (res.data.resultCode === 0) {
        // и диспатчить экшены (action) или другие санки (thunk)
        dispatch(setTask(res.data.data.item));
      } else {
        if (res.data.messages.length) {
          dispatch(setAppErrorAC(res.data.messages[0]));
        } else {
          dispatch(setAppErrorAC("ошибка произошла"));
        }
        dispatch(setAppStatusAC("failed"));
      }
    });
  };
export const removeTasksTC =
  (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    // внутри санки можно делать побочные эффекты (запросы на сервер)
    todolistsAPI.deleteTask(todoListId, taskId).then((res) => {
      // и диспатчить экшены (action) или другие санки (thunk)
      if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(taskId, todoListId));
      }
    });
  };
export const updateTasksTC =
  (todoListId: string, taskId: string, status: TaskStatuses) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tasks = getState().tasks;
    const task = tasks[todoListId].find((t) => t.id === taskId);

    if (task) {
      const model: UpdateTaskModelType = {
        title: task?.title,
        description: task?.description,
        status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.startDate,
      };
      todolistsAPI.updateTask(todoListId, taskId, model).then((res) => {
        // и диспатчить экшены (action) или другие санки (thunk)
        if (res.data.resultCode === 0) {
          dispatch(changeTaskStatusAC(taskId, status, todoListId));
        }
      });
    }
  };
