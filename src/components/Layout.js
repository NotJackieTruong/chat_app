import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'
import {USER_CONNECTED, LOGOUT} from '../Events'
import LoginForm from './LoginForm'
import ChatContainer from './ChatContainer'

// port 3001: server
// port 3000: reactjs
const socketURL = "http://localhost:3001"
const Layout = (props)=>{
  const [socket, setSocket] = useState(null)
  const [user, setUser] = useState(null)

  // component will mount
  useEffect(()=>{
    const socket = io(socketURL)
    socket.on('connect', ()=>{
      console.log('Socket connected!')
    })
    setSocket(socket)
  }, [])

  var setUserFunc = (user)=>{
    // send user connected event to the server
    socket.emit(USER_CONNECTED, user)
    setUser(user)
  }

  var setLogoutFunc = ()=>{
    socket.emit(LOGOUT)
    setUser(null)
  }

  const title = props.title
  return(
    <div className="contaienr">
      {!user? <LoginForm socket={socket} setUser={setUserFunc}/>:<ChatContainer user={user} socket={socket} logout={setLogoutFunc}/>}
      {/* <ChatContainer user={user} socket={socket} logout={setLogoutFunc}/> */}
    </div>
  )
}

export default Layout