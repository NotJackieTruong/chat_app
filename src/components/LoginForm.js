import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button'

import {VERIFY_USER} from '../Events'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(),
  },
}));

var LoginForm = (props) => {
  console.log('hellor from login form: ', props.socket)
  const classes = useStyles();

  const [nickname, setNickName] = useState('')
  const [error, setError] = useState('')

  const setUser = ({isUser, user})=>{
    console.log('user: ', user, ', isUser: ', isUser)
    if(isUser){
      setError('User name taken!')
    } else {
      setError('')
      props.setUser(user)
    }
  }
  // just for testing :))
  // const setMessage = ({message})=>{
  //   console.log(message)
  // }

  const handleChange = (e) => {
    setNickName(e.target.value)
    console.log(nickname)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(props)
    const socket = props.socket
    // send verify user event to the server
    socket.emit(VERIFY_USER, nickname, setUser)

    // just for testing
    // socket.emit('new message', 'hello 123', setMessage)
  }
  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField id="input-with-icon-grid" label="Nickname" onChange={handleChange} fullWidth />
          <div className="error">{error ? error : null}</div>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Primary
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginForm