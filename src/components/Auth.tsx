import React from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'

const Auth = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
  }
  return (
    <div className="auth">
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
  )
}

export default Auth
