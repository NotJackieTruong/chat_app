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
const MessageInput = () => {
  const classes = useStyles()
  console.log('parentn width: ', )
  return (
    <div className="message-input-container" style={{
      height: 48,
      width: "100%",
      position: 'fixed',
      bottom: 0,
     
    }}>
      <Grid container>
          <Grid item xs={8}>
            <InputBase id="input" placeholder="Enter your message..." fullwidth={true} style={{ backgroundColor: 'rgba(0, 0, 0, .04)', borderRadius: '18px'}}/>
          </Grid>
          <Grid item xs={4}>
            <Button color="secondary">Send</Button>

          </Grid>

        </Grid>
    </div>
  )
}

export default MessageInput