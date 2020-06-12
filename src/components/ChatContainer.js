import React, {useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import {COMMUNITY_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT, TYPING, PRIVATE_MESSAGE} from '../Events'
import ChatHeading from './ChatHeading'
import Messages from './Messages'
import MessageInput from './MessageInput'
import Grid from '@material-ui/core/Grid'


const ChatContainer = (props)=>{
    var user = props.user
    var logout = props.logout

    const [chats, setChats] = useState([])
    const [activeChat, setActiveChat] = useState(null)
    
    // componentDidMount()
    useEffect(()=>{
        const socket = props.socket
        // socket.emit(COMMUNITY_CHAT, resetChat)
        initSocket(socket)
    }, [])

    var initSocket = (socket)=>{
        socket.emit(COMMUNITY_CHAT, resetChat)
        socket.on(PRIVATE_MESSAGE, addChat)
        socket.on('connect', ()=>{
            socket.emit(COMMUNITY_CHAT, resetChat)
        })
    }

    // Adds chat to the chat container, if reset is true removes all chats
	// and sets that chat to the main chat.
    // Sets the message and typing socket events for the chat.
    // the chat parameter here is the result of the callback function createChat() in the socketManager
    var resetChat=(chat)=>{
        return addChat(chat, true)
    }
   
    var addChat = (chat, reset = false)=>{
        const socket = props.socket
        const newChats = reset ? [chat]:[...chats, chat]
        setChats(newChats)
        setActiveChat(reset? chat: activeChat)
        
        // check if has a new chat, then set that chat active
        reset? setActiveChat(chat):setActiveChat(activeChat)

        const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`
        const typingEvent = `${TYPING}-${chat.id}`

        // receive message event from messageEvent namespace
        socket.on(messageEvent, (message)=>{
            var newChats2 = newChats.map((newChat)=>{
                // only append messages array of an active chat
                if(newChat.id === chat.id){
                    newChat.messages.push(message)
                }
                return newChat
            })
            setChats(newChats2)
        })

        // receive typing event from typingEvent namespace
        socket.on(typingEvent, ({isTyping, user})=>{
            // only show the "user is typing" for the client that is not the sender
			if(user !== props.user.name){
				var newChats3 = newChats.map((newChat)=>{
					if(newChat.id === chat.id){
                        // typingUser = [] (initiate)

                        // Scenario 1: user is typing
                        // active chat checks if the user is in typingUser array or not
                        // if not, then active chat push user into the array

                        // Scenerio 2: user is not typing
                        // Remove objects that is current user and reassigns the active chat's typingUser array
						if(isTyping && !newChat.typingUsers.includes(user)){
							newChat.typingUsers.push(user)
						}else if(!isTyping && newChat.typingUsers.includes(user)){
							newChat.typingUsers = newChat.typingUsers.filter(u => u !== user)
						}
					}
					return newChat
				})
                setChats(newChats3)
            }
		})

    }

    var sendMessage = (chatId, message)=>{
        const socket = props.socket
        socket.emit(MESSAGE_SENT, {chatId, message})
    }

    var sendTyping = (chatId, isTyping)=>{
        const socket = props.socket
        socket.emit(TYPING, {chatId, isTyping})
    }

    var handleSetActiveChat = (activeChat)=>{
        setActiveChat(activeChat)
    }

    var sendPrivateMessage = (receiver)=>{
        const socket = props.socket
        socket.emit(PRIVATE_MESSAGE, {sender: props.user.name, receiver})

    }

    // render component
    return(
        <div className="container" style={{height: '100%'}}>
            <Grid container>
                <Grid item xs={3}>  
                    <Sidebar 
                    logout = {logout}
                    user = {user}
                    chats={chats}
                    activeChat = {activeChat}
                    setActiveChat = {handleSetActiveChat}
                    onSendPrivateMessage = {sendPrivateMessage}
                    />
                </Grid>
                <Grid item xs>
                {
                        activeChat !== null ? (
                            <div className="chat-room" style={{display: 'flex', flexDirection: 'column', height: '100%', position: 'relative'}}>
                                {/* display chat dialouge part (messages in an active chat) */}
                                <ChatHeading name={activeChat.name}/>
                                <Messages messages={activeChat.messages} user={user} typingUsers={activeChat.typingUsers}/>
                                <MessageInput sendMessage={(message)=>{sendMessage(activeChat.id, message)}} sendTyping={(isTyping)=>{sendTyping(activeChat.id, isTyping)}}/>
                            </div>


                        ):(<div className="chat-room choose">
                            <h3>Welcome to our chat application!</h3>
                        </div>)
                    }

                </Grid>

            </Grid>
          

            {/* if not choosing the chat room yet, it appears the welcome message, else it appears the chat dialogue
            <div className="chat-room-container">
               

            </div> */}
        </div>
    )
}

export default ChatContainer