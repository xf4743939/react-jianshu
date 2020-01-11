import React, { Component } from "react";
import PropTypes from 'prop-types'

class TodoItem extends Component{
  constructor(props){
    super(props)
    this.delete=this.delete.bind(this)
  }
   render(){
     const {content,test}=this.props
     return (
      <li>
   <span>{content}--{test}</span> 
      <button onClick={this.delete}>删除</button>
      </li>
     )
   }
   
   delete(){
     const {index,deleteItem}=this.props
     deleteItem(index)
   }
}

TodoItem.propTypes={
  content:PropTypes.string,
  index:PropTypes.number.isRequired,
  deleteItem:PropTypes.func.isRequired
}

TodoItem.defaultProps={
  test:"许徐"
}
export default TodoItem