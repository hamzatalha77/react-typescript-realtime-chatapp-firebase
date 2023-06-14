import React from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
const Auth = (props: any) => {
  const { setIsAuth } = props
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      cookies.set('auth-token', result.user.refreshToken)
      setIsAuth(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="auth">
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
  )
}

export default Auth
