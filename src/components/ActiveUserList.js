import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import ListSubheader from '@material-ui/core/ListSubheader'
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        borderLeft: '1px solid lightgrey',
        overflowY: 'scroll'
      },
      listContainer:{
        maxHeight: 800,
      },
      list:{
        margin: '0 1vw',
        padding: '0'
      }
  }));
var handleOnclick = ()=>{
  console.log('hello')
}

const ActiveUser = (props)=>{
  return(
    <ListItem button onClick={handleOnclick}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItem>
  )
}
const ActiveUserList = (props)=>{
	const classes = useStyles();
	return(
		<div className={classes.root}>
      <ListSubheader disableGutters={true} style={{borderBottom: '1px solid lightgrey', backgroundColor: 'white', width: '100%'}}>Active users</ListSubheader>

      <div className={classes.listContainer}>
        <List component="nav" aria-label="main mailbox folders" className={classes.list}>    
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>
          <ActiveUser/>

        </List>
			
      </div>
		
		</div>
	)
}

export default ActiveUserList