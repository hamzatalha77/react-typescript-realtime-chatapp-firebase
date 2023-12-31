import React, { useState, useEffect } from 'react'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { auth, db } from '../firebase-config'
// import { Timestamp } from 'firebase/firestore'

interface Message {
  text: string
  // Replace `any` with the appropriate type for timestamps
  user: string
  id: string
  createdAt: any
}

const Chat = (props: any) => {
  const { room } = props
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const messagesRef = collection(db, 'messages')

  useEffect(() => {
    const queryMessage = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    )
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      const newMessages: Message[] = []
      snapshot.forEach((doc) => {
        newMessages.push({ ...doc.data(), id: doc.id } as Message)
      })
      setMessages(newMessages)
    })

    return () => unsubscribe()
  }, [room, messagesRef])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage === '') return

    const currentUser = auth.currentUser
    if (currentUser) {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: currentUser.displayName,
        room,
      })
      setNewMessage('')
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center p-4">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div>
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span>{message.user}</span>
            <h1>
              {message.text}
              {/* *{message.createdAt.toDate().toLocaleString()} */}
            </h1>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
          <input
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder="Type Your Message Here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            required
          />
          <button
            className="!absolute right-1 top-1 z-10 select-none rounded bg-pink-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
            type="submit"
            data-ripple-light="true"
          >
            Send !
          </button>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
        </div>
      </form>
    </div>
  )
}

export default Chat
