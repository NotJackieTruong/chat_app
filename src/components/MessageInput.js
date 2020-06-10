import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
const useStyles = (() => ({
  messageInputContainer: {

  }
}))
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

  }
  return (
    <div className="message-input-container" style={{
      height: 48,
      width: "100%",
      position: 'fixed',
      bottom: 0,
     
    }}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={8}>
            <InputBase 
              id="input" 
              placeholder="Enter your message..." 
              fullwidth="true" 
              value={message}
              style={{ backgroundColor: 'rgba(0, 0, 0, .04)', borderRadius: '18px'}}
              onKeyUp = {(e)=>{e.keyCode !==13 && sendTyping()}}
              onChange = {(e)=>{console.log(e.target.value);setMessage(e.target.value)}}
              />
          </Grid>
          <Grid item xs={4}>
            <Button color="secondary" disabled={message.length<1} type="submit">Send</Button>

          </Grid>

        </Grid>
      </form>
      
    </div>
  )
}

export default MessageInput