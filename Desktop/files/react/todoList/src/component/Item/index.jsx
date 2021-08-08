import React, { Component } from 'react'
import './index.css'
import PropsTypes from 'prop-types'

export default class index extends Component {
    state={mouse:false};

  // 简单的限定
    static propsTypes={
      completed:PropsTypes.bool.isRequired
    }

    // 鼠标经过事件
    onmouse=(flag)=>{
      return ()=>{
          this.setState({mouse:flag});
      }
  }

  // 改变勾选的状态
  handleChecked=(id)=>{
    return (event)=>{
      this.props.updatetodo(id,event.target.checked)
    }
  }

  // 点击删除
  handleDelete=(id)=>{
    return ()=>{
      this.props.deletetodo(id);
    }
  }
    render() {
        const {id,title,completed}=this.props;
        const {mouse}=this.state;
        return (
            
            <li style={{backgroundColor:mouse?"#ddd":"white"}} onMouseEnter={this.onmouse(true)} onMouseLeave={this.onmouse(false)}>
              <label>
                <input type="checkbox" defaultChecked={completed} onChange={this.handleChecked(id)}/>
                <span>{title}</span>
              </label>
              <button className="btn btn-danger" style={{display:mouse?'':'none'}} onClick={this.handleDelete(id)}>
                删除
              </button>
            </li>
        )
    }
}
