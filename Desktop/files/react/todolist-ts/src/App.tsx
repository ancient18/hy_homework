import React, { Component } from "react";
import "./App.css";
import Header from "./containers/Header";
import List from "./containers/List";
import Footer from "./containers/Footer";
import axios from "axios";
import store from "./redux/store.js";

export default class App extends Component {
  // 发送请求
  componentDidMount() {
    setTimeout(function () {}, 1000);
    let todos: any;
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      for (let i = 0; i < 10; i++) {
        todos.push(res.data[i]);
      }
      console.log(res);
      store.dispatch({ type: "decrement", payload: todos });
    });
  }

  render() {
    return (
      
      <div className="todo-container">
        <div className="todo-wrap">
          <Header store={store} />
          <List store={store} />
          <Footer store={store} />
        </div>
      </div>
    );
  }
}
