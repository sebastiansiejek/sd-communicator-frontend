import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import { useForm } from 'react-hook-form'

type Inputs = {
  message: string
}

const Chat = () => {
  const { handleSubmit, register, reset } = useForm<Inputs>()
  const [messages, setMessage] = useState<Array<string>>([])

  const socket = socketIOClient(process.env.REACT_APP_SOCKETIO_SERVER_URL)

  useEffect(() => {
    socket.on('msgToClient', (message: string) => {
      setMessage([...messages, message])
    })
  })

  return (
    <>
      {messages.length > 0 && messages.map((message, key) => <li key={message + key}>{message}</li>)}
      <form
        onSubmit={handleSubmit((data: Inputs) => {
          socket.emit('msgToServer', data.message)
          reset({
            message: '',
          })
        })}
      >
        <input type='text' name='message' ref={register} required />
        <button type='submit'>Send</button>
      </form>
    </>
  )
}

export default Chat
