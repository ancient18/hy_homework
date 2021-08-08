import React, { Component } from "react";
import './index.css'
import Item from "../Item";

export default class index extends Component {
  render() {
    const {todos,updatetodo,deletetodo} = this.props;
    return (
      <ul className="todo-main">
        {todos.map(function (todo) {
          return <Item key={todo.id} {...todo} updatetodo={updatetodo} deletetodo={deletetodo}/>;
        })}
      </ul>
    );
  }
}
