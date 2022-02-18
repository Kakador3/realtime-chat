import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

initializeApp({
  apiKey: 'AIzaSyBY62Pb7BluAvoU6WNRsZzZ3Bsqfw2N4Ys',
  authDomain: 'react-chat-7a4a6.firebaseapp.com',
  projectId: 'react-chat-7a4a6',
  storageBucket: 'react-chat-7a4a6.appspot.com',
  messagingSenderId: '450511518121',
  appId: '1:450511518121:web:6b62f25d0177db0d1eacb8',
  measurementId: 'G-HRPNN07Q6H',
})

export const Context = createContext(null)

const auth = getAuth()
const firestore = getFirestore()

ReactDOM.render(
  <Context.Provider
    value={{
      auth,
      firestore,
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById('root')
)
