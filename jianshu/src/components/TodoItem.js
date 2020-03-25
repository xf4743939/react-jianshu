import React, { Component } from "react";
import PropTypes from 'prop-types'

class TodoItem extends Component{
  constructor(props){
    super(props)
    this.delete=this.delete.bind(this)
  }
   render(){
     console.log('child render') 

     const {content,test}=this.props
     return (
      <li>
          <span>{content}--{test}</span> 
          <button onClick={this.delete}>删除</button>
      </li>
     )
   }
   
   // 从父组件接收参数
   // 只有这个组件第一次存在父组件中不会执行
   // 如果这个组件之前以前存在父组件中则会执行
   componentWillReceiveProps(){

   }
   // 提升性能优化 减少vitur dom
   shouldComponentUpdate(nextProps,nextState){
     if(nextProps.content!==this.props.content){
       return true
     }
     return false
   }
   delete(){
     const {index,deleteItem}=this.props
     deleteItem(index)
   }
}

TodoItem.propTypes={
  content:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  index:PropTypes.number.isRequired,
  deleteItem:PropTypes.func.isRequired
}

TodoItem.defaultProps={
  test:"许徐"
}
export default TodoItem