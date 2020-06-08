import React, {useState} from 'react'
import Sidebar from './Sidebar'
const ChatContainer = (props)=>{
    var user = props.user
    var logout = props.logout

    const [chats, setChats] = useState([])
    const [activeChat, setActiveChat] = useState(null)

    var handleSetActiveChat = (activeChat)=>{
        setActiveChat(activeChat)
    }
    return(
        <div className="container" style={{height: '100%'}}>
            <Sidebar 
                logout = {logout}
                user = {user}
                chats={chats}
                activeChat = {activeChat}
                setActiveChat = {handleSetActiveChat}
            />
        </div>
    )
}

export default ChatContainer