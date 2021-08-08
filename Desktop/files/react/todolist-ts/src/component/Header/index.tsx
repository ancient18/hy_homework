import React, { Component } from "react";
import './index.css'

export default class index extends Component <{add:any,store:any}>{

  
  render() {
    
    return (
      <div className="todo-header">
        <input onKeyUp={this.props.add}type="text"placeholder="请输入你的任务名称，按回车键确认"/>
      </div>
    );
  }
}
