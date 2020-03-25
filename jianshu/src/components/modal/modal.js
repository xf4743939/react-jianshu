import React,{Component} from 'react';
import './modal.css';

class Modal extends Component{
   constructor(props){
     super(props)
     this.state={
       isOpen:false
     }
     this.container=React.createRef()
     this.handlerClick=this.handlerClick.bind(this)
     this.close=this.close.bind(this)
   }
   componentDidMount(){
     window.addEventListener('click',this.close)
   }
   
   componentWillUnmount(){
     window.removeEventListener('click',this.close)
   }

  handlerClick(){
    this.setState(prevState=>({
      isOpen:!prevState.isOpen
    }))
  }
  close(event){
    if(this.state.isOpen && !this.container.current.contains(event.target)){
      this.setState(()=>({
        isOpen:false
      }))
    }
  
  }


   render(){
     return (<div ref={this.container} className="wrap">
        <button onClick={this.handlerClick}>展开</button>
        {
          this.state.isOpen && (
            <ul className="list">
              <li>条件一</li>
              <li>条件二</li>
              <li>条件三</li>
            </ul>
          )
        }
     </div>)
   }

 
}

export default Modal