import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { useRadioGroup } from '@material-ui/core'
import '../index.css'
const useStyle = makeStyles(()=>({
  message: {
    backgroundColor: 'rgba(0, 0, 0, .04)',
    borderRadius: '2em',
    width: 'fit-content',
    height: 'fit-content',
    padding: '0.025vh 1vw',
    margin: '2%',
  }
}))

const Message = (props)=>{
  const classes = useStyle()
  return(
    <div className={classes.message}>
      {/* <p>{props.message}</p> */}
      <p>SOmethin is in here...</p>
    </div>
  )
}



const Messages = (props)=>{
  const classes = useStyle()
  return(
    <div className="thread-container">
      
      {

        props.messages.length !== 0? (
          props.messages.map((mes)=>{
            return(
              <div key={mes.id} className={`message-container ${mes.sender === props.user.name && "right"}`}>
                <Message time={mes.time} message={mes.message} sender={mes.sender}/>
              </div>
            )
          })
        ):(
          <div>Say hi to your partner</div>
        ) 
      }
      {/* {
        props.typingUsers.map((name)=>{
          return(
            <div key={name} className="typing-user">{`${name} is typing...`}</div>
          )
        })
      } */}
    </div>
  )
}

export default Messages