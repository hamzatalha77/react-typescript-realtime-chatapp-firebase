import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase-config'

const Chat = () => {
  const [newMessage, setNewMessage] = useState('')

  const messagesRef = collection(db, 'messages')
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (newMessage === '') return
    await addDoc()
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
