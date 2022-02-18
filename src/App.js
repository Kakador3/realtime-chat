import AppRouter from 'components/AppRouter'
import Navbar from 'components/Navbar'
import Loader from 'components/Loader'
import { Context } from 'index'
import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {
  //Вытаскиваем значение auth из index
  const { auth } = useContext(Context)
  const [, loading] = useAuthState(auth)

  if (loading) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
