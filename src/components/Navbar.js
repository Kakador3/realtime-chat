import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from 'utils/consts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from 'index'

const Navbar = () => {
  const { auth } = useContext(Context)
  const [user] = useAuthState(auth)

  return (
    <AppBar color={'secondary'} position='static'>
      <Toolbar variant={'dense'}>
        <Grid container justifyContent={'flex-end'}>
          {user ? (
            <Button onClick={() => auth.signOut()} variant='outlined'>
              Выйти
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button variant='outlined'>Логин</Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
