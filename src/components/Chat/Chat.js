import React, { useContext, useState } from 'react'
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { Context } from 'index'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Container, Grid, TextField, Button, Avatar } from '@material-ui/core'
import Loader from '../Loader'
import classes from './Chat.module.css'

const Chat = () => {
  const { auth, firestore } = useContext(Context)
  const [user] = useAuthState(auth)
  const [value, setValue] = useState('')

  const messageRef = collection(firestore, 'messages')

  //Хук для получения коллекции(сообщений)
  const [messages, loading] = useCollectionData(
    query(messageRef, orderBy('createdAt'))
  )

  //Добавление сообщение в БД
  const sendMessage = async () => {
    await addDoc(messageRef, {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: serverTimestamp(),
    })
    setValue('')
  }

  //Отправка сообщений на Enter
  const sendMessageHandler = (event) => {
    if (event.key === 'Enter' && value.trim()) {
      sendMessage()
      setValue('')
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Container>
      <Grid
        container
        justifyContent={'center'}
        style={{ height: window.innerHeight - 50 }}
      >
        <div className={classes.message__page}>
          {messages.map((message) => (
            <div
              key={message.createdAt}
              className={classes.message__window}
              style={{
                border:
                  user.uid === message.uid
                    ? '2px solid #eb8b8d'
                    : '2px solid #D24136',
                marginLeft: user.uid === message.uid ? 'auto' : '10px',
              }}
            >
              <Grid container style={{ borderRadius: 16 }}>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction={'column'}
          alignItems={'flex-end'}
          style={{ width: '60%' }}
        >
          <TextField
            fullWidth
            rowsMax={2}
            variant={'outlined'}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyPress={sendMessageHandler}
            InputProps={{ style: { borderRadius: 16 } }}
          ></TextField>
          <Button
            style={{ borderRadius: 16, marginTop: 10 }}
            onClick={sendMessage}
            variant={'outlined'}
          >
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Chat
