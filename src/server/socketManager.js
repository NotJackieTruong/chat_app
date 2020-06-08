const io = require('./index').io
const { VERIFY_USER, USER_CONNECTED, LOGOUT, COMMUNITY_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT} = require("../Events") // import namespaces
const { createMessage, createChat, createUser } = require('../Factories')
let connectedUsers = {}

// function to receive message on the server
module.exports = function (socket) {
  console.log("Socket id: ", socket.id)
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

  socket.on(USER_CONNECTED, (user)=>{
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user
    socket.emit(USER_CONNECTED, connectedUsers)
    console.log('Connected user list: ',connectedUsers)
  })

  socket.on(COMMUNITY_CHAT, (callback)=>{
		callback(createChat())
	})

	// socket.on(MESSAGE_SENT, ({chatId, message})=>{
	// 	sendMessageToChatFromUser(chatId, message)
	// })

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