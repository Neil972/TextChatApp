
import './App.css';
import React from 'react';
import {io} from 'socket.io-client'
//trying to connect to server by emitting connection event
const socket = io('http://localhost:5000')

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={sentMessage:"",recievedMessage:"",id:"*",roomID:''}
    this.messageChange=this.messageChange.bind(this)
    this.messageSent=this.messageSent.bind(this)
    this.roomIDChange=this.roomIDChange.bind(this)
    this.joinRoom=this.joinRoom.bind(this)
  }
  componentDidMount(){
    socket.on('me',(id)=>{
      this.setState((argState)=>{
        argState.id=`${id}`
        return argState.id
      })
      console.log(id,'socket-id')
    })
    socket.on('recieved',(recieved)=>{
       this.setState({recievedMessage:recieved})
       console.log(`recievedMessage`,this.state.recievedMessage)
    })
  }
  messageChange(event){
   this.setState((argState)=>{
    argState.sentMessage=event.target.value
    return argState.sentMessage
   })
  }
  messageSent(){
    socket.emit('sent',this.state.sentMessage,this.state.roomID)
  }
  roomIDChange(event){
    this.setState({roomID:event.target.value})
  }
  joinRoom(){
  socket.emit('join-room',this.state.roomID)
  }
  render(){
  return (
    <div className="App">
      <div>
      <p>Your ID : {this.state.id}</p>
      <p>You are connected to room : {this.state.roomID}</p>
      <h3>Message:</h3>
      <p>You : {this.state.sentMessage}</p>
      <p>Your friend:{this.state.recievedMessage}</p>
        
        <p>
        <span style={{paddingRight:"5vmin"}}>Type here</span>
        <input type="text" onChange={this.messageChange} /> <input type="button" value='send' onClick={this.messageSent} />
        </p>
        
        <p>
        <span style={{paddingRight:"5vmin"}}>Room ID/Person ID</span>
        <input type='password' onChange={this.roomIDChange}/> 
        </p>

        <p>
          <h4>To join Room Click the button below</h4>
          <input type='button' value='Join' onClick={this.joinRoom}/>
        </p>
      </div>
    </div>
   );
  }
}

export default App;
