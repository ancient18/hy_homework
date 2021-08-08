import React, { Component } from "react";
import './index.css'

export default class index extends Component {

  // 按回车触发函数
  handle = (event) => {
    const { target, keyCode } = event;
    if (keyCode === 13) {
      if (target.value.trim() === "") {
        alert("输入不能为空");
        return;
      } else {
        this.props.addtodo(target.value);
      }
    }
  };
  render() {
    return (
      <div className="todo-header">
        <input onKeyUp={this.handle}type="text"placeholder="请输入你的任务名称，按回车键确认"/>
      </div>
    );
  }
}
