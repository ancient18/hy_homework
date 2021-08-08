import { add, dele, remove, update, allAdd, allDele } from "./action";
import axios from "axios";

const initState = [];
axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
  for (let i = 0; i < 10; i++) {
    initState.push(res.data[i]);
  }
  console.log(res);
});

export default function todos(state = initState, action) {
  // 发送请求

  switch (action.type) {
    case add:
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          completed: false,
        },
      ];
    case dele:
      return state.filter(function (todo) {
        return todo.id !== action.id;
      });
    case remove:
      return state.filter(function (todo) {
        return todo.completed === false;
      });
    case update:
      return state.map(function (todo) {
        if (todo.id === action.id) {
          return {
            id: todo.id,
            title: todo.title,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      });
    case allAdd:
      return state.map(function (todo) {
        return {
          id: todo.id,
          title: todo.title,
          completed: true,
        };
      });
    case allDele:
      return state.map(function (todo) {
        return {
          id: todo.id,
          title: todo.title,
          completed: false,
        };
      });
    default:
      return action?.payload??state;
  }
}
