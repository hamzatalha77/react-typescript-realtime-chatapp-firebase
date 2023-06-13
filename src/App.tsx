import React, { useState } from 'react'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  return (
    <>
      <Auth />
    </>
  )
}

export default App
