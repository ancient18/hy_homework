import React, { Component } from "react";
import "./index.css";

export default class index extends Component <{state:{[propName:string]:any},remove:any,allAdd:any,allDele:any,store:any}>{
  render() {
    const todos = this.props.state;
    const total = todos.length;
    const completedCount = todos.reduce(
      (pre:number, todo:{[propName:string]:any}) => pre + (todo.completed ? 1 : 0),
      0
    );
    const { remove, allAdd,allDele } = this.props;
    

    console.log(this.props);

    return (
      <div className="todo-footer">
        <label>
          <input
            type="checkbox"
            onChange={completedCount === total && total !== 0 ?allDele:allAdd}
            checked={completedCount === total && total !== 0 ? true : false}
          />
        </label>
        <span>
          <span>已完成{completedCount}</span> / 全部{total}
        </span>
        <button className="btn btn-danger" onClick={remove}>
          清除已完成任务
        </button>
      </div>
    );
  }
}

