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
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <div className="flex flex-col max-w-[600px] w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Enter Room Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ref={roomInputRef}
              />
            </div>

            <button onClick={() => setRoom(roomInputRef.current!.value)}>
              Enter Chat
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
