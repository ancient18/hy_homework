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

    render() {
      
        const {id,title,completed,handleChecked,handleDelete}=this.props;
        const {mouse}=this.state;
        return (
            
            <li style={{backgroundColor:mouse?"#ddd":"white"}} onMouseEnter={this.onmouse(true)} onMouseLeave={this.onmouse(false)}>
              <label>
                <input type="checkbox" checked={completed} onChange={handleChecked(id)}/>
                <span>{title}</span>
              </label>
              <button className="btn btn-danger" style={{display:mouse?'':'none'}} onClick={handleDelete(id)}>
                删除
              </button>
            </li>
        )
    }
}
