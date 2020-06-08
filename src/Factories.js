// create unique id for each user
const uuidv4 = require('objectid')
// create user
const createUser = ({name= ""} = {})=>(
  {
    id: uuidv4(),
    name
  }
)

// create message
const createMessage = ({message="", sender=""} = {})=>({
  id: uuidv4(),
  time: getTime(new Date(Date.now())),
  message,
  sender
})

// function to format the date
const getTime = (date)=>{
  return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

// create chat
const createChat = ({message=[], name= "Community", users=[]}={})=>({
  id: uuidv4(),
  message,
  name,
  users,
  typingUsers: []
})

module.exports ={
  createMessage,
  createChat,
  createUser
}