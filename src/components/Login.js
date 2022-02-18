import React, { useContext } from 'react'
import { Container, Grid, Box, Button } from '@material-ui/core'
import { Context } from 'index'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const Login = () => {
  const { auth } = useContext(Context)

  const login = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Grid
          style={{ width: 400, background: 'lightgray', borderRadius: '12px' }}
          container
          alignItems={'center'}
          direction={'column'}
        >
          <Box p={5}>
            <Button onClick={login} variant={'outlined'}>
              Войти с помощь Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
