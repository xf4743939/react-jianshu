import React,{Component,Fragment} from 'react';
import TodoList from './components/TodoList'
import Modal from './components/modal/modal'
class App extends Component{
  render(){
    return (
      <Fragment>
        <TodoList></TodoList>
        <Modal></Modal>
      </Fragment>
    )
  }
}

export default App;
