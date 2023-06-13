import React, { useState, useRef } from 'react'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(null)
  const roomInputRef = useRef(null)
  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
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
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
    </>
  )
}

export default App
