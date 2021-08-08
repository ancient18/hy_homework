import React, { Component } from "react";
import './index.css'
import Item from "../../containers/Item";
import store from "../../redux/store";


export default class index extends Component <{state:{[propName:string]:any},store:any}>{
  
  render() {
     
    const todos = this.props.state;
    return (
      <ul className="todo-main">
        {todos.map(function (todo:{[propName:string]:any}) {
          return <Item store={store} key={todo.id} {...todo} />;
        })}
      </ul>
    );
  }
}
