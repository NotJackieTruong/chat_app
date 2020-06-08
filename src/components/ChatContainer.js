import React, {useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import {COMMUNITY_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT, TYPING} from '../Events'
import ChatHeading from './ChatHeading'
import Messages from './Messages'
import MessageInput from './MessageInput'
import Grid from '@material-ui/core/Grid'


const ChatContainer = (props)=>{
    var user = props.user
    var logout = props.logout

    const [chats, setChats] = useState([])
    const [activeChat, setActiveChat] = useState(null)

    

    useEffect(()=>{
        const socket = props.socket
        socket.emit(COMMUNITY_CHAT, resetChat)
    },[])

    var resetChat=(chat)=>{
        return addChat(chat, true)
    }

    var addChat = (chat, reset)=>{
        const socket = props.socket
        const newChats = reset ? [chat]:[...chats, chat]
        setChats(newChats)

        const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`
        const typingEvent = `${TYPING}-${chat.id}`

        socket.on(messageEvent, addMessageToChat(chat.id))
        socket.on(typingEvent, updateTypingInChat(chat.id))

    }

    var addMessageToChat = (chatId)=>{
		return message => {
			let newChats = chats.map((chat)=>{
				if(chat.id === chatId)
					chat.messages.push(message)
				return chat
			})
            setChats(newChats)
		}
	}

	/*
	*	Updates the typing of chat with id passed in.
	*	@param chatId {number}
	*/
	var updateTypingInChat = (chatId) =>{
		return ({isTyping, user})=>{
			if(user !== props.user.name){

				let newChats = chats.map((chat)=>{
					if(chat.id === chatId){
						if(isTyping && !chat.typingUsers.includes(user)){
							chat.typingUsers.push(user)
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
						}
					}
					return chat
				})
                setChats(newChats)
            }
		}
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
    console.log('active chat: ', activeChat)
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
                    />
                </Grid>
                <Grid item xs>
                {
                        activeChat !== null ? (
                            <div className="chat-room">
                                {/* display chat dialouge part */}
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
          

            {/* if not choosing the chat room yet, it appears the welcome message, else it appears the chat dialogue */}
            <div className="chat-room-container">
               

            </div>
        </div>
    )
}

export default ChatContainer