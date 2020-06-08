import React, {useState} from 'react'
import {makeStyles, fade} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import SettingsRounded from '@material-ui/icons/SettingsRounded'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Videocam from '@material-ui/icons/Videocam'

const useStyles = makeStyles((theme)=>({
    search: {
        position: 'relative',
        borderRadius: '50px',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
       
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
        height: '12px',
      },
      icons:{
          fontSize: 30
      }, 
      buttons: {
        backgroundColor: 'rgba(0, 0, 0, .04)'
      }
}))

const SidebarHeader = (props)=>{
    const classes = useStyles()
    return(
        <div className="sidebar-header" style={{height: 'fit-content', margin: '1vh 0.8vw'}}>
            <Grid container>
                <Grid item xs>
                    <IconButton size="small">
                        <AccountCircle className={classes.icons}/>
                    </IconButton>
                   
                </Grid>
                <Grid item container xs style={{float: 'right'}}>
                    <Grid item xs></Grid>
                    <Grid item xs>
                        <IconButton size="small" className={classes.buttons}>
                            <SettingsRounded className={classes.icons}/>
                        </IconButton>
                    </Grid>
                    <Grid item xs>
                         <IconButton size="small" className={classes.buttons}>
                            <Videocam className={classes.icons}/>
                        </IconButton>
                    </Grid>
                    <Grid item xs>
                        <IconButton size="small" className={classes.buttons}>
                            <SettingsRounded className={classes.icons}/>
                        </IconButton>
                    </Grid>
                    
                  
                    
                </Grid>
            </Grid>
            
        </div>
    )
}
const SidebarSearch = (props)=>{
    const classes = useStyles()
    return(
        <div className={classes.search} style={{height: 'fit-content', margin: '0 1vw', backgroundColor: 'rgba(0, 0, 0, .04)'}}>
            <div className={classes.searchIcon}>
                <SearchIcon style={{color: 'rgba(0, 0, 0, 0.54)'}}/>
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    )
}

const Chat = (props)=>{
    const classes = useStyles()
    return(
        <div className="chat" style={{height: 'fit-content', margin: '1vh 0.8vw'}}>
            <Grid container xs>
                <Grid item xs sm={2}>
                    <IconButton size="small">
                        <AccountCircle className={classes.icons} style={{color: 'blue'}}/>
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <div className="chat-name">Chat name</div>
                    <div className="chat-last-message">Last message</div>
                </Grid>
            </Grid>
        </div>
    )
}
const Sidebar = (props)=>{
    const chats = props.chats
    const activeChat = props.activeChat
    const setActiveChat = props.setActiveChat
    const logout = props.logout
    const user = props.user
    return(
                
        <div className="container" style={{borderRight: '1px solid lightgrey', maxWidth: '20vw', height: '100vh'}}>
            <SidebarHeader/>
            <SidebarSearch/>
            <Chat/>
        </div>
    )
}

export default Sidebar