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
        <div>Chat</div>
      ) : (
        <div className="room">
          <label>Enter Room Name</label>
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
