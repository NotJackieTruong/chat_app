import React, { useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(() => ({
  messageInputContainer: {
    position: 'absolute',
    bottom: 0,
    height: '48px',
    width: '100%',
    margin: '1vh 1vw',
    backgroundColor: 'white'
  }
}))

var lastUpdateTime, typingInterval

const MessageInput = (props) => {
  const classes = useStyles()
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  
  var handleSubmit = (e)=>{
    e.preventDefault()
    props.sendMessage(message)
    setMessage("")

  }

  var sendTyping = ()=>{
    lastUpdateTime = Date.now()
    if(!isTyping){
      setIsTyping(true)
      props.sendTyping(true)
      startCheckingTyping()
    }
  }

  var startCheckingTyping=()=>{
    console.log("Typing")
    typingInterval = setInterval(()=>{
      if((Date.now() - lastUpdateTime)>300){
        setIsTyping(false)
        stopCheckingTyping()
      }
    })
  }

  var stopCheckingTyping= ()=>{
    console.log("Stop typing")
    if(typingInterval){
      clearInterval(typingInterval)
      props.sendTyping(false)
    }
  }

  return (
    <div style={{position: 'absolute',
    bottom: 0,
    height: '48px',
    width: '100%',
    margin: '1vh 1vw',
    backgroundColor: 'white'}}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{width: '100%'}}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs={10}>
            <Input 
              id="input" 
              placeholder="Enter your message..." 
              fullwidth="true" 
              disableUnderline={true}
              value={message}
              style={{ backgroundColor: 'rgba(0, 0, 0, .04)', borderRadius: '18px', width: "100%", padding: '1vh'}}
              onKeyUp = {(e)=>{e.keyCode !==13 && sendTyping()}}
              onChange = {(e)=>{setMessage(e.target.value)}}
              />
          </Grid>
          <Grid item xs={2}>
            <Button color="secondary" disabled={message.length<1} type="submit">Send</Button>

          </Grid>

        </Grid>
      </form>
      
    </div>
  )
}

export default MessageInput