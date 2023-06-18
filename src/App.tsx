import React, { useState, useRef } from 'react'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'
import Chat from './components/Chat'
import { signOut } from 'firebase/auth'

const cookies = new Cookies()

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState(null)
  const roomInputRef = useRef<HTMLInputElement>(null)
  const signUserOut = async () => {
    await signOut()
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }

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
        <Chat room={room} />
      ) : (
        <div className="w-full h-screen bg-[#f2f2f2] flex justify-center items-center p-4">
          <div className="flex flex-col max-w-[600px] w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">
              Enter Room Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ref={roomInputRef}
            />
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setRoom(roomInputRef.current!.value)}
            >
              Enter Chat
            </button>
          </div>
        </div>
      )}
      <button>Log Out</button>
    </>
  )
}

export default App
