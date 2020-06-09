import React, {useState, useEffect} from 'react'

const ChatHeading = (props)=>{
  return(
    <div className="heading-container" style={{height: 48, borderBottom: '1px solid lightgrey'}}>
      <div className="container" style={{margin: '0 0.8vw', padding: '1vh 0', }}>
        <h3 style={{margin: 0, padding: 0}}>{props.name}</h3>
      </div>
    </div>
  )
}

export default ChatHeading