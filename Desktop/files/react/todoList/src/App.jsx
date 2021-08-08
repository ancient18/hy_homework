import React, { Component } from "react";
import "./App.css";
import Header from "./component/Header";
import List from "./component/List";
import Footer from "./component/Footer";
import { nanoid } from "nanoid";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  state = { todos: [] };

  // 发送请求
  componentWillMount() {
    const todos=[];
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      for (let i = 0; i < 10; i++) {
        todos.push(res.data[i]);
      }
      console.log(res);
      this.setState({todos:todos})
    });
  }

  // 增加选项
  addtodo = (value) => {
    const { todos } = this.state;
    const newobj = { id: nanoid(), title: value, completed: false };
    this.setState({ todos: [...todos, newobj] });
  };

  // 更新选择的状态
  updatetodo = (id, completed) => {
    const { todos } = this.state;
    const newtodos = todos.map(function (todoobj) {
      if (todoobj.id === id) {
        return { ...todoobj, completed };
      } else {
        return todoobj;
      }
    });
    this.setState({ todos: newtodos });
  };

  //   删除选项
  deletetodo = (id) => {
    const { todos } = this.state;
    const newtodos = todos.filter(function (todo) {
      return todo.id !== id;
    });
    this.setState({ todos: newtodos });
  };

  // 清空已完成任务
  deleteAll = () => {
    const { todos } = this.state;
    const newtodos = todos.filter(function (todo) {
      return todo.completed !== true;
    });
    this.setState({ todos: newtodos });
  };

  render() {
    const { todos } = this.state;
    
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addtodo={this.addtodo} />
          <List
            todos={todos}
            updatetodo={this.updatetodo}
            deletetodo={this.deletetodo}
          />
          <Footer todos={todos} deleteAll={this.deleteAll} />
        </div>
      </div>
    );
  }
}
