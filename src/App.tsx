import React, { useState, useRef } from 'react'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'
import Chat from './components/Chat'

const cookies = new Cookies()

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState('')
  const roomInputRef = useRef<HTMLInputElement>(null)

  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
        <Chat />
      </>
    )
  }
  return (
    <>
      {room ? (
        <div className="bg-slate-600 caret-lime-600">Chat</div>
      ) : (
        <div className="room">
          <label className="w-8">Enter Room Name</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current!.value)}>
            Enter Chat
          </button>
        </div>
      )}
    </>
  )
}

export default App
