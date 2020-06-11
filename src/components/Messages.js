import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { useRadioGroup } from '@material-ui/core'
const useStyle = makeStyles(()=>({
  threadContainer:{
    padding: '1vw'
  },
  message: {
    backgroundColor: 'rgba(0, 0, 0, .04)',
    borderRadius: '2em',
    width: 'fit-content',
    height: 'fit-content',
    padding: '0.01vh 1vw',
    marginTop: '1vh'
  },
  time: {
    padding: '0.01vh 1vw',
    margin: '0 0.5%',
    marginTop: '1vh'
  }
}))

const Message = (props)=>{
  const classes = useStyle()
  return(
    <div className={`message ${classes.message}`}>
      <p>{props.message}</p>
      {/* <p>SOmethin is in here...</p> */}
    </div>
  )
}



const Messages = (props)=>{
  const classes = useStyle()
  return(
    <div className={classes.threadContainer}>
      
      {

        props.messages.length !== 0? (
          props.messages.map((mes)=>{
            console.log('sender: ', mes.sender, ', user: ', props.user.name)
            return(
              <div key={mes.id} className={`message-container ${mes.sender === props.user.name && "right"}`}>
                <Message time={mes.time} message={mes.message} sender={mes.sender}/>
                <div className={classes.time}><p>{mes.time}</p></div>
              </div>
              
            )
          })
        ):(
          <div>Say hi to your partner</div>
        ) 
      }
      {
        props.typingUsers.map((name)=>{
          return(
            <div key={name} className="typing-user">{`${name} is typing...`}</div>
          )
        })
      }
    </div>
  )
}

export default Messages