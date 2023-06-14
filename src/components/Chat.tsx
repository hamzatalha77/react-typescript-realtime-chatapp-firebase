import React from 'react'

const Chat = () => {
  const handleSubmit = () => {}
  return (
    <div className="chat-app">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Type Your Message Here..." />
        <button type="submit">Send!</button>
      </form>
    </div>
  )
}

export default Chat
