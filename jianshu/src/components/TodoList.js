import React, { Component,Fragment } from "react";
import TodoItem from './TodoItem'

class TodoList extends Component{
    constructor(props){
      super(props)
      this.state={
        value:"",
        list:[]
      }
      this.handleChange=this.handleChange.bind(this)
      this.submit=this.submit.bind(this)
      this.deleteItem=this.deleteItem.bind(this)
    }

    render(){
      return(
        <Fragment>
            <form onSubmit={this.submit}>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              <button type="submit">提交</button>
            </form>  
            <ul>
             {this.getToDoItem()}
            </ul>
          
        </Fragment>
      
      ) 
    }
    getToDoItem(){
      return this.state.list.map((item,index)=>{
            return (<TodoItem key={index} index={index} deleteItem={this.deleteItem} content={item}></TodoItem>)
            })
    }
    handleChange(event){
      let value=event.target.value
      this.setState(()=>({
        value
      }))
    }
    submit(event){
      event.preventDefault()
      const {value} =this.state
      if(!value){
        alert('不能为空')
        return
      }
      this.setState((state)=>({
        list:[...state.list,state.value],
        value:''
      }))
    }
    deleteItem(index){
      this.setState((state)=>{
        const arrs=[...state.list]
        arrs.splice(index,1)
        return {
          list:arrs
        }
      })
    }
    
}



export default TodoList