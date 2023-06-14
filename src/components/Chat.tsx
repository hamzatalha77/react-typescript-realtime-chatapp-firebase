import React, { useState } from 'react'

const Chat = () => {
  const [newMessage, setNewMessage] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type Your Message Here..."
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send!</button>
      </form>
    </div>
  )
}

export default Chat
