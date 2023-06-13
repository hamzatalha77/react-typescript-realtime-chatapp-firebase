import React, { useState } from 'react'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState('')
  if (!isAuth) {
    return (
      <>
        <Auth />
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
          <input onChange={(e) => setRoom(e.target.value)} />
          <button>Enter Chat</button>
        </div>
      )}
    </>
  )
}

export default App
