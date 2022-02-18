import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from 'routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from 'utils/consts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from 'index'

const AppRouter = () => {
  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} key={path} />
      ))}
      <Route path='*' element={<Navigate replace to={CHAT_ROUTE} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route path={path} element={<Component />} key={path} />
      ))}
      <Route path='*' element={<Navigate replace to={LOGIN_ROUTE} />} />
    </Routes>
  )
}
export default AppRouter
