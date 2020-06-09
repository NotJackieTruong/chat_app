const io = require('./index').io
const { VERIFY_USER, USER_CONNECTED, LOGOUT, COMMUNITY_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT, USER_DISCONNECTED} = require("../Events") // import namespaces
const { createMessage, createChat, createUser } = require('../Factories')
let connectedUsers = {}

// socket.emit('something', 'another something') is used to send to sender-client only
// io.emit('something', 'another something') is used to send to all connected clients

// function to receive message on the server
module.exports = function (socket) {
  console.log("Socket id: ", socket.id)

  let sendMessageToChatFromUser
  // verify user name
  socket.on(VERIFY_USER, (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user: null })
    } else {
      callback({ isUser: false, user: createUser({ name: nickname }) })
    }

  })

  // test socket emit
  socket.on('new message', (msg, callback)=>{
    callback({message: msg})
  })

  // handle when user is connected
  socket.on(USER_CONNECTED, (user)=>{
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user
    sendMessageToChatFromUser = sendMessageToChat(user.name)
    io.emit(USER_CONNECTED, connectedUsers)
    console.log('Connected user list: ',socket.user)
  })

  // user disconnected
  socket.on('disconnected', ()=>{
    // check if the object 'socket' has property 'user'
    if('user' in socket){
      connectedUsers = removeUser(connectedUsers, socket.user.name)
      io.emit(USER_DISCONNECTED, connectedUsers)
      console.log('user connected list after disconnecting: ', connectedUsers)
    }
  })
  // user logout
  socket.on(LOGOUT, ()=>{
    connectedUsers = removeUser(connectedUsers, socket.user.name)
    io.emit(USER_DISCONNECTED, connectedUsers)
    console.log('user connected list after loggin out: ', connectedUsers)
  })
  // get community_chat
  socket.on(COMMUNITY_CHAT, (callback)=>{
		callback(createChat())
	})

	socket.on(MESSAGE_SENT, ({chatId, message})=>{
		sendMessageToChatFromUser(chatId, message)
	})

	// socket.on(TYPING, ({chatId, isTyping})=>{
	// 	sendTypingFromUser(chatId, isTyping)
	// })


}

function addUser(userList, user) {
  let newList = Object.assign({}, userList)
  newList[user.name] = user
  return newList
}

function removeUser(userList, username) {
  let newList = Object.assign({}, userList)
  delete newList[username]
  return newList
}

function isUser(userList, username) {
  // check username whether it's in the list or not
  return username in userList
}

function sendMessageToChat(sender){
  return (chatId, message)=>{
    io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({messages, sender}))
  }
}