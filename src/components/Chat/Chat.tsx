import React from 'react'
import useChat from '../../hooks/useChat'
import { useForm } from 'react-hook-form'

type Inputs = {
  message: string
}

const Chat: React.FC = () => {
  const { handleSubmit, register, reset } = useForm<Inputs>()
  const { messages, sendMessage } = useChat('test')

  return (
    <>
      <h2>chat</h2>
      {messages.length > 0 &&
        messages.map((message, key) => {
          return (
            <li
              style={{
                paddingLeft: !message.ownedByCurrentUser ? '20px' : 0,
              }}
              key={message.body + key}
            >
              {message.body}
            </li>
          )
        })}
      <form
        onSubmit={handleSubmit((data: Inputs) => {
          sendMessage(data.message)
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
