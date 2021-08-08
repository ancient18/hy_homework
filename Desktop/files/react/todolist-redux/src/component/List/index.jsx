import React, { Component } from "react";
import './index.css'
import Item from "../../containers/Item";
import store from "../../redux/store";


export default class index extends Component {
  
  render() {
     
    const todos = this.props.state;
    return (
      <ul className="todo-main">
        {todos.map(function (todo) {
          return <Item store={store} key={todo.id} {...todo} />;
        })}
      </ul>
    );
  }
}
