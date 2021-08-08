import React, { Component } from 'react'
import './index.css'

export default class index extends Component {
  delete=()=>{
    const {deleteAll} =this.props;
    deleteAll();
  }

    render() {
      const {todos}=this.props;
      const total=todos.length;
      const completedCount=todos.reduce((pre,todo)=>pre+(todo.completed?1:0),0);
      
        return (
            <div className="todo-footer">
            <label>
              <input type="checkbox" />
            </label>
            <span>
              <span>已完成{completedCount}</span> / 全部{total}
            </span>
            <button className="btn btn-danger" onClick={this.delete}>清除已完成任务</button>
          </div>
        )
    }
}
