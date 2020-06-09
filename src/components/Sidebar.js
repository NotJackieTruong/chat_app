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
      },
      chats:{
          "&:hover":{
              cursor: 'pointer',
              backgroundColor: 'rgba(0, 0, 0, .04)',
              borderRadius: '10px'
          }
      }
}))

const SidebarHeader = (props)=>{
    const classes = useStyles()
    return(
        <div className="sidebar-header" style={{height: 'fit-content', margin: '0 0.8vw', padding: '1vh 0'}}>
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
    const [isClicked, setIsClicked] = useState(false)
    var handleOnclick = (e)=>{
        props.onClick(props.chat)
        setIsClicked(true)
    }
    return(
        <div className={classes.chats} style={isClicked?{height: 48, margin: '1vh 0.8vw',backgroundColor: 'rgba(0, 0, 0, .04)', borderRadius: '10px'}:{height: 48, margin: '1vh 0.8vw',}} key={props.chatId} onClick={handleOnclick}>
            <Grid container>
                <Grid item xs sm={2}>
                    <IconButton size="medium">
                        {props.user.name[0].toUpperCase()}
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <div className="chat-name">{props.user.name}</div>
                    <div className="chat-last-message">{props.lastMessage? props.lastMessage: 'No message!'}</div>
                </Grid>
                <Grid item xs sm={2}>
                    <div className="chat-time">{props.lastMessage? props.lastMessage.time : null}</div>
                </Grid>
            </Grid>
        </div>
    )
}
const Sidebar = (props)=>{

    var handleOnclick = (chat)=>{
        props.setActiveChat(chat)
    }

    return(
        <div className="container" style={{borderRight: '1px solid lightgrey', height: '100vh'}}>
            <SidebarHeader/>
            <SidebarSearch/>
            {/* <Chat key="somethin" className="something" user="anc" lastMessage="yo what's up"/> */}
            <div className="active-chat" style={{marginTop: '2vh'}}>
                {props.chats.map((chat)=>{
                    if(chat.name){
                        var lastMessage = chat.messages[chat.messages.length-1]
                        var user = chat.users.find(({name})=>{
                            return name !== props.name
                        }) || {name: "Community"}
                        var classNames = (props.activeChat && props.activeChat.id === chat.id) ? 'active': null
                        return(
                            <Chat key={chat.id} chatId={chat.id} className={`user ${classNames}`} chat={chat} onClick={handleOnclick} user={user} lastMessage={lastMessage}/>
                        )
                    }
                    return null
                })}
            </div>
        </div>
    )
}

export default Sidebar