import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase-config'

const Chat = (props: any) => {
  const { room } = props
  const [newMessage, setNewMessage] = useState('')

  const messagesRef = collection(db, 'messages')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (newMessage === '') return

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    })
    setNewMessage('')
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
